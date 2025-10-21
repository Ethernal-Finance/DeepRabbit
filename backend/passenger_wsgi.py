#!/usr/bin/env python3
"""
WSGI entry point for cPanel deployment
"""
import os
import sys

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Set environment variables if not set
os.environ.setdefault('FLASK_ENV', 'production')
os.environ.setdefault('SECRET_KEY', 'globlyfe')
os.environ.setdefault('JWT_SECRET_KEY', 'globlyfejwt')
os.environ.setdefault('DATABASE_URL', 'sqlite:///deeprabbit.db')
os.environ.setdefault('JWT_COOKIE_SECURE', 'True')

try:
    from app import app
    
    # Expose the application object for cPanel
    application = app
    
    # Initialize database
    with app.app_context():
        from app import db
        db.create_all()
        print("Database initialized successfully")
    
    print("Flask app loaded successfully")
    
except Exception as e:
    print(f"Error loading Flask app: {e}")
    import traceback
    traceback.print_exc()
    
    # Create a simple fallback app
    from flask import Flask
    fallback_app = Flask(__name__)
    
    @fallback_app.route('/')
    def fallback():
        return f"Error loading main app: {str(e)}"
    
    application = fallback_app