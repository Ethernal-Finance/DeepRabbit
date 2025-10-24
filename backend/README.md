# DeepRabbit Backend API

A Flask-based authentication API for DeepRabbit.net with JWT token management and SQLite database.

## Features

- 🔐 **JWT Authentication** with access & refresh tokens
- 🍪 **HttpOnly Cookies** for secure token storage
- 🔄 **Token Rotation** for enhanced security
- 🗄️ **SQLite Database** - no external DB required
- 🛡️ **bcrypt Password Hashing**
- 🌐 **CORS Support** for frontend integration
- 📱 **Mobile-Friendly** authentication flow

## Quick Start

### Development Setup

1. **Install Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Run Development Server**
   ```bash
   python run_dev.py
   ```

4. **Test API**
   ```bash
   curl http://localhost:5000/api/health
   ```

### Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for cPanel deployment instructions.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user  
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user info

### Health
- `GET /api/health` - API health check

## Authentication Flow

1. **Registration/Login** → User provides email/password
2. **Password Hashing** → bcrypt hashes password securely
3. **Token Generation** → JWT access token (15min) + refresh token (7 days)
4. **Cookie Storage** → Tokens stored in HttpOnly cookies
5. **Automatic Refresh** → Frontend refreshes tokens automatically
6. **Logout** → Tokens invalidated and cookies cleared

## Security Features

- **JWT Tokens**: Short-lived access tokens with refresh rotation
- **HttpOnly Cookies**: Prevents XSS token theft
- **bcrypt Hashing**: Secure password storage with salt
- **CORS Protection**: Configurable origin restrictions
- **SQLite**: File-based database, no external dependencies

## Frontend Integration

The frontend uses `fetch` with `credentials: 'include'` to automatically send cookies:

```javascript
// Login example
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  credentials: 'include',
  body: JSON.stringify({ email, password })
});
```

## Database Schema

### Users Table
- `id` - Primary key
- `email` - Unique email address
- `password_hash` - bcrypt hashed password
- `created_at` - Account creation timestamp
- `last_login` - Last login timestamp
- `is_active` - Account status

### Refresh Tokens Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `token_id` - Unique token identifier
- `created_at` - Token creation timestamp
- `expires_at` - Token expiration timestamp

## Environment Variables

```bash
# Required
SECRET_KEY=your-super-secret-key-change-this-in-production
JWT_SECRET_KEY=your-jwt-secret-key-change-this-in-production

# Optional
DATABASE_URL=sqlite:///deeprabbit.db
JWT_COOKIE_SECURE=False  # Set to True in production
FLASK_ENV=development
```

## Development

### Running Tests
```bash
python -m pytest tests/
```

### Database Management
```bash
# Create tables
python -c "from app import app, db; app.app_context().push(); db.create_all()"

# Reset database
rm deeprabbit.db
python -c "from app import app, db; app.app_context().push(); db.create_all()"
```

### API Testing
```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'

# Login user
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}' \
  -c cookies.txt

# Test protected route
curl http://localhost:5000/api/auth/me -b cookies.txt
```

## License

Proprietary - DeepRabbit.net



