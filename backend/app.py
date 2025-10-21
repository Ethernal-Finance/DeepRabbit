"""
DeepRabbit Backend - Flask API with JWT Authentication
"""
from flask import Flask, request, jsonify, make_response
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, create_refresh_token, get_jwt_identity, get_jwt
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import os
import uuid

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///deeprabbit.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=15)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=7)
app.config['JWT_COOKIE_SECURE'] = os.environ.get('JWT_COOKIE_SECURE', 'True').lower() == 'true'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False  # Disable CSRF for API
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_SAMESITE'] = 'Lax'

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'last_login': self.last_login.isoformat() if self.last_login else None,
            'is_active': self.is_active
        }

# Refresh Token Model for rotation
class RefreshToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    token_id = db.Column(db.String(36), unique=True, nullable=False)  # UUID
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expires_at = db.Column(db.DateTime, nullable=False)
    
    user = db.relationship('User', backref=db.backref('refresh_tokens', lazy=True))

# JWT Error Handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({'error': 'Token has expired'}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({'error': 'Invalid token'}), 401

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({'error': 'Authorization token is required'}), 401

# Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.utcnow().isoformat()})

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        email = data['email'].lower().strip()
        password = data['password']
        
        # Validate email format
        if '@' not in email or '.' not in email.split('@')[1]:
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'User already exists'}), 409
        
        # Create new user
        user = User(email=email)
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        # Create tokens
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        
        # Store refresh token
        token_record = RefreshToken(
            user_id=user.id,
            token_id=str(uuid.uuid4()),
            expires_at=datetime.utcnow() + timedelta(days=7)
        )
        db.session.add(token_record)
        db.session.commit()
        
        # Create response with cookies
        response = make_response(jsonify({
            'message': 'User registered successfully',
            'user': user.to_dict()
        }))
        
        # Set HttpOnly cookies
        response.set_cookie(
            'access_token_cookie',
            access_token,
            max_age=15*60,  # 15 minutes
            httponly=True,
            secure=app.config['JWT_COOKIE_SECURE'],
            samesite='Lax'
        )
        
        response.set_cookie(
            'refresh_token_cookie',
            refresh_token,
            max_age=7*24*60*60,  # 7 days
            httponly=True,
            secure=app.config['JWT_COOKIE_SECURE'],
            samesite='Lax'
        )
        
        return response, 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Registration failed'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        email = data['email'].lower().strip()
        password = data['password']
        
        # Find user
        user = User.query.filter_by(email=email).first()
        
        if not user or not user.check_password(password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        if not user.is_active:
            return jsonify({'error': 'Account is disabled'}), 401
        
        # Update last login
        user.last_login = datetime.utcnow()
        
        # Create tokens
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        
        # Store refresh token (rotate old ones)
        RefreshToken.query.filter_by(user_id=user.id).delete()
        token_record = RefreshToken(
            user_id=user.id,
            token_id=str(uuid.uuid4()),
            expires_at=datetime.utcnow() + timedelta(days=7)
        )
        db.session.add(token_record)
        db.session.commit()
        
        # Create response with cookies
        response = make_response(jsonify({
            'message': 'Login successful',
            'user': user.to_dict()
        }))
        
        # Set HttpOnly cookies
        response.set_cookie(
            'access_token_cookie',
            access_token,
            max_age=15*60,  # 15 minutes
            httponly=True,
            secure=app.config['JWT_COOKIE_SECURE'],
            samesite='Lax'
        )
        
        response.set_cookie(
            'refresh_token_cookie',
            refresh_token,
            max_age=7*24*60*60,  # 7 days
            httponly=True,
            secure=app.config['JWT_COOKIE_SECURE'],
            samesite='Lax'
        )
        
        return response
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Login failed'}), 500

@app.route('/api/auth/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh access token"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or not user.is_active:
            return jsonify({'error': 'User not found or inactive'}), 401
        
        # Create new access token
        new_access_token = create_access_token(identity=user.id)
        
        response = make_response(jsonify({
            'message': 'Token refreshed successfully'
        }))
        
        # Set new access token cookie
        response.set_cookie(
            'access_token_cookie',
            new_access_token,
            max_age=15*60,  # 15 minutes
            httponly=True,
            secure=app.config['JWT_COOKIE_SECURE'],
            samesite='Lax'
        )
        
        return response
        
    except Exception as e:
        return jsonify({'error': 'Token refresh failed'}), 500

@app.route('/api/auth/logout', methods=['POST'])
@jwt_required()
def logout():
    """Logout user"""
    try:
        current_user_id = get_jwt_identity()
        
        # Remove refresh tokens
        RefreshToken.query.filter_by(user_id=current_user_id).delete()
        db.session.commit()
        
        response = make_response(jsonify({
            'message': 'Logout successful'
        }))
        
        # Clear cookies
        response.set_cookie('access_token_cookie', '', expires=0)
        response.set_cookie('refresh_token_cookie', '', expires=0)
        
        return response
        
    except Exception as e:
        return jsonify({'error': 'Logout failed'}), 500

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current user info"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({'user': user.to_dict()})
        
    except Exception as e:
        return jsonify({'error': 'Failed to get user info'}), 500

# Protected route example
@app.route('/api/protected', methods=['GET'])
@jwt_required()
def protected():
    """Example protected route"""
    current_user_id = get_jwt_identity()
    return jsonify({
        'message': f'Hello user {current_user_id}!',
        'timestamp': datetime.utcnow().isoformat()
    })

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get public statistics"""
    try:
        # Count total users
        total_users = User.query.count()
        
        # Count active users (logged in within last 30 days)
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        active_users = User.query.filter(User.last_login >= thirty_days_ago).count()
        
        # Count users registered today
        today = datetime.utcnow().date()
        today_users = User.query.filter(db.func.date(User.created_at) == today).count()
        
        # Count users registered this week
        week_ago = datetime.utcnow() - timedelta(days=7)
        week_users = User.query.filter(User.created_at >= week_ago).count()
        
        return jsonify({
            'total_users': total_users,
            'active_users': active_users,
            'today_users': today_users,
            'week_users': week_users,
            'timestamp': datetime.utcnow().isoformat()
        })
    except Exception as e:
        return jsonify({'error': 'Failed to get statistics'}), 500

# CORS handling for development
@app.after_request
def after_request(response):
    """Add CORS headers"""
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("Database tables created successfully!")
    
    # For development
    app.run(debug=True, host='0.0.0.0', port=5000)

