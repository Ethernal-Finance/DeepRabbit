#!/usr/bin/env python3
"""
Development startup script for DeepRabbit Backend
"""
import os
import sys
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app, db

if __name__ == "__main__":
    with app.app_context():
        # Create database tables if they don't exist
        db.create_all()
        print("✅ Database tables created successfully!")
        print("🚀 Starting DeepRabbit Backend...")
        print("📡 API available at: http://localhost:5000")
        print("🔗 Health check: http://localhost:5000/api/health")
        print("📚 API docs: Check DEPLOYMENT.md for endpoint details")
        print("=" * 50)
    
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)



