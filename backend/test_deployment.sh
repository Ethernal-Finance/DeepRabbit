#!/bin/bash
# Test script for DeepRabbit API deployment
# Replace YOUR_DOMAIN with your actual domain

DOMAIN="https://YOUR_DOMAIN.com"
API_URL="$DOMAIN/api"

echo "🧪 Testing DeepRabbit API Deployment"
echo "=================================="
echo "API URL: $API_URL"
echo ""

# Test 1: Health Check
echo "1. Testing Health Check..."
curl -s "$API_URL/health" | head -1
echo ""

# Test 2: Register User
echo "2. Testing User Registration..."
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}')
echo "Registration response: $REGISTER_RESPONSE"
echo ""

# Test 3: Login User
echo "3. Testing User Login..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}' \
  -c cookies.txt)
echo "Login response: $LOGIN_RESPONSE"
echo ""

# Test 4: Protected Route
echo "4. Testing Protected Route..."
PROTECTED_RESPONSE=$(curl -s "$API_URL/auth/me" -b cookies.txt)
echo "Protected route response: $PROTECTED_RESPONSE"
echo ""

# Test 5: Logout
echo "5. Testing Logout..."
LOGOUT_RESPONSE=$(curl -s -X POST "$API_URL/auth/logout" -b cookies.txt)
echo "Logout response: $LOGOUT_RESPONSE"
echo ""

echo "✅ API testing complete!"
echo "If all tests passed, your API is working correctly."



