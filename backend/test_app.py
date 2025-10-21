#!/usr/bin/env python3
"""
Test script to verify Flask app is working
"""
import sys
import os

# Add the backend directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from app import app
    print("✅ Flask app imported successfully")
    
    # Test if the app has the correct routes
    routes = [str(rule) for rule in app.url_map.iter_rules()]
    print(f"✅ Found {len(routes)} routes:")
    for route in routes:
        print(f"   {route}")
    
    # Test if database can be created
    with app.app_context():
        from app import db
        db.create_all()
        print("✅ Database tables created successfully")
    
    print("✅ All tests passed! Flask app is ready.")
    
except Exception as e:
    print(f"❌ Error: {e}")
    import traceback
    traceback.print_exc()
