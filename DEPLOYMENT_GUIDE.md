# DeepRabbit Authentication System - Complete Deployment Guide

## 📋 Overview

This guide provides step-by-step instructions for deploying the DeepRabbit authentication system to cPanel using the "Setup Python App" feature. The system includes a Flask backend with JWT authentication and a frontend that integrates with the new API.

## 🏗️ System Architecture

### Backend Components
- **Flask Application** (`app.py`) - Main API server
- **SQLite Database** - User storage (file-based)
- **JWT Authentication** - Access & refresh tokens
- **bcrypt Password Hashing** - Secure password storage
- **HttpOnly Cookies** - Secure token storage

### Frontend Components
- **AuthService** - API client replacing Supabase
- **AuthModal** - Login/register interface
- **UserProfile** - User management dropdown
- **Integrated UI** - Seamless authentication flow

## 📁 Required Files

### Backend Files (Upload to cPanel)
```
backend/
├── app.py                 # Main Flask application
├── requirements.txt      # Python dependencies
├── passenger_wsgi.py     # WSGI entry point for cPanel
├── env.example          # Environment variables template
└── README.md            # Backend documentation
```

### Frontend Files (Already in project)
```
utils/AuthService.ts      # Authentication service
components/AuthModal.ts   # Login/register modal
components/UserProfile.ts # User profile component
index.tsx                # Updated main app
package.json             # Updated dependencies
```

## 🚀 Step-by-Step Deployment Process

### Phase 1: Backend Deployment

#### Step 1: Prepare Files
1. **Create a `backend` folder** in your project root
2. **Copy these files** to the backend folder:
   - `app.py`
   - `requirements.txt`
   - `passenger_wsgi.py`
   - `env.example`

#### Step 2: Upload to cPanel
1. **Log into your cPanel account**
2. **Open File Manager**
3. **Navigate to your domain's root directory** (`public_html`)
4. **Create a new folder** called `backend` (or `api`)
5. **Upload all backend files** to this folder

#### Step 3: Set Up Python App
1. **In cPanel, find "Setup Python App"** (Software section)
2. **Click "Create Application"**
3. **Configure the application:**
   ```
   Python Version: 3.9 or higher
   App Directory: /backend
   App URL: /api
   Startup File: passenger_wsgi.py
   ```
4. **Click "Create"**

#### Step 4: Configure Environment Variables
1. **In your Python App, click "Environment Variables"**
2. **Add these variables:**

   **Required Variables:**
   ```
   SECRET_KEY=your-super-secret-key-change-this-in-production
   JWT_SECRET_KEY=your-jwt-secret-key-change-this-in-production
   DATABASE_URL=sqlite:///deeprabbit.db
   JWT_COOKIE_SECURE=True
   FLASK_ENV=production
   ```

   **Generate Strong Keys:**
   ```python
   import secrets
   print("SECRET_KEY=" + secrets.token_urlsafe(32))
   print("JWT_SECRET_KEY=" + secrets.token_urlsafe(32))
   ```

#### Step 5: Install Dependencies
1. **In your Python App, click "Terminal"**
2. **Run these commands:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

#### Step 6: Initialize Database
1. **In Terminal, run:**
   ```bash
   python -c "from app import app, db; app.app_context().push(); db.create_all(); print('Database initialized!')"
   ```

#### Step 7: Start Application
1. **In your Python App, click "Restart"**
2. **Verify the app is running** - you should see it in "Running" status

### Phase 2: API Testing

#### Step 8: Test API Endpoints
1. **Health Check:**
   ```bash
   curl https://deeprabbit.net/api/health
   ```
   Expected response: `{"status": "healthy", "timestamp": "..."}`

2. **User Registration:**
   ```bash
   curl -X POST https://deeprabbit.net/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"testpass123"}'
   ```
   Expected response: `{"message": "User registered successfully", "user": {...}}`

3. **User Login:**
   ```bash
   curl -X POST https://deeprabbit.net/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"testpass123"}' \
     -c cookies.txt
   ```
   Expected response: `{"message": "Login successful", "user": {...}}`

4. **Protected Route Test:**
   ```bash
   curl https://deeprabbit.net/api/auth/me -b cookies.txt
   ```
   Expected response: `{"user": {...}}`

### Phase 3: Frontend Deployment

#### Step 9: Update Frontend Configuration
1. **Create/update `.env` file** in your frontend root:
   ```
   VITE_API_URL=https://deeprabbit.net/api
   ```

2. **Rebuild the frontend:**
   ```bash
   npm run build
   ```

3. **Upload `dist/` folder contents** to your web root

#### Step 10: Test Frontend Integration
1. **Visit your website**
2. **Click the user icon** (👤) in the header
3. **Test registration flow:**
   - Click "Sign up"
   - Enter email and password
   - Verify successful registration
4. **Test login flow:**
   - Click "Sign in"
   - Enter credentials
   - Verify successful login
5. **Test user profile:**
   - Verify user email shows in header
   - Click profile dropdown
   - Test logout functionality

## 🔧 Troubleshooting Guide

### Common Issues and Solutions

#### 1. Python App Won't Start
**Symptoms:** App shows "Not Running" status
**Solutions:**
- Check Python version (3.9+ required)
- Verify `passenger_wsgi.py` exists
- Check startup file name matches exactly
- Review Python App logs for errors

#### 2. Import Errors
**Symptoms:** "Module not found" errors in logs
**Solutions:**
```bash
cd backend
pip install -r requirements.txt
```
- Verify all dependencies are installed
- Check Python path configuration

#### 3. Database Errors
**Symptoms:** SQLite-related errors
**Solutions:**
```bash
python -c "from app import app, db; app.app_context().push(); db.create_all()"
```
- Ensure database file permissions
- Check DATABASE_URL environment variable

#### 4. Authentication Not Working
**Symptoms:** Login/register fails
**Solutions:**
- Verify SECRET_KEY and JWT_SECRET_KEY are set
- Check JWT_COOKIE_SECURE setting (True for HTTPS)
- Ensure CORS settings allow your domain
- Check browser developer console for errors

#### 5. CORS Errors
**Symptoms:** Browser blocks API requests
**Solutions:**
- Verify frontend domain is allowed
- Check `credentials: 'include'` in fetch requests
- Ensure API URL is correct in frontend

#### 6. 500 Internal Server Error
**Symptoms:** API returns 500 errors
**Solutions:**
- Check Python App logs
- Verify environment variables are set
- Ensure all dependencies are installed
- Check database file permissions

### Debugging Steps

1. **Check Python App Logs:**
   - Go to Python App → Logs
   - Look for error messages
   - Check both application and error logs

2. **Verify Environment Variables:**
   - Go to Python App → Environment Variables
   - Ensure all required variables are set
   - Check for typos in variable names/values

3. **Test API Manually:**
   ```bash
   curl -v https://deeprabbit.net/api/health
   ```
   - Use `-v` flag for verbose output
   - Check response headers and status codes

4. **Browser Developer Tools:**
   - Open Network tab
   - Check for failed requests
   - Look at request/response details
   - Check Console for JavaScript errors

## 📊 API Endpoints Reference

### Authentication Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh
GET  /api/auth/me
```

### Health Check
```
GET /api/health
```

### Request/Response Examples

#### Register User
```bash
curl -X POST https://deeprabbit.net/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"securepass123"}'
```

Response:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00",
    "last_login": null,
    "is_active": true
  }
}
```

#### Login User
```bash
curl -X POST https://deeprabbit.net/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"securepass123"}' \
  -c cookies.txt
```

Response:
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00",
    "last_login": "2024-01-01T12:00:00",
    "is_active": true
  }
}
```

## 🔒 Security Considerations

### Production Security Checklist
- [ ] **Strong Secret Keys:** Use cryptographically secure random keys
- [ ] **HTTPS Only:** Set `JWT_COOKIE_SECURE=True` for production
- [ ] **Environment Variables:** Never commit secrets to version control
- [ ] **Database Permissions:** Restrict SQLite file permissions
- [ ] **CORS Configuration:** Limit allowed origins
- [ ] **Rate Limiting:** Consider implementing API rate limits
- [ ] **Logging:** Monitor authentication attempts
- [ ] **Backup:** Regular database backups

### Security Features Implemented
- **JWT Tokens:** Short-lived access tokens (15 minutes)
- **Refresh Tokens:** Longer-lived with rotation (7 days)
- **HttpOnly Cookies:** Prevents XSS token theft
- **bcrypt Hashing:** Secure password storage with salt
- **CORS Protection:** Configurable origin restrictions
- **SQLite Security:** File-based database, no external dependencies

## 📈 Performance Considerations

### Database Performance
- **SQLite:** Suitable for moderate traffic (up to ~1000 concurrent users)
- **Indexes:** Email field is indexed for fast lookups
- **Connection Pooling:** Not needed with SQLite file-based approach

### Scaling Options
- **High Traffic:** Consider PostgreSQL for better concurrency
- **Session Storage:** Add Redis for distributed sessions
- **Load Balancing:** Multiple app instances behind load balancer
- **CDN:** Static assets served from CDN

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All backend files uploaded to cPanel
- [ ] Python App created and configured
- [ ] Environment variables set
- [ ] Dependencies installed
- [ ] Database initialized

### Post-Deployment
- [ ] API health check passes
- [ ] User registration works
- [ ] User login works
- [ ] Protected routes accessible
- [ ] Frontend updated with new API URL
- [ ] Frontend authentication flow tested
- [ ] Logout functionality works
- [ ] Mobile authentication tested

### Production Readiness
- [ ] Strong secret keys generated
- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] Monitoring/logging set up
- [ ] Backup strategy implemented
- [ ] Error handling tested
- [ ] Performance monitoring active

## 🆘 Support and Maintenance

### Regular Maintenance Tasks
1. **Monitor Logs:** Check Python App logs regularly
2. **Update Dependencies:** Keep Python packages updated
3. **Database Backups:** Regular SQLite file backups
4. **Security Updates:** Monitor for security patches
5. **Performance Monitoring:** Track API response times

### Getting Help
If you encounter issues during deployment:

1. **Check the logs** in cPanel Python App
2. **Verify all steps** were completed correctly
3. **Test API endpoints** manually with curl
4. **Check browser console** for frontend errors
5. **Review this documentation** for troubleshooting steps

### Contact Information
For deployment support, provide:
- Specific error messages
- Which step failed
- Python App logs
- Browser console errors
- Your domain and cPanel setup

---

## 🎉 Success!

Once all steps are completed successfully, you'll have:
- ✅ **Secure JWT authentication** system
- ✅ **SQLite database** with user management
- ✅ **HttpOnly cookie** security
- ✅ **Mobile-friendly** authentication UI
- ✅ **Production-ready** deployment
- ✅ **No external dependencies** (Supabase removed)

Your DeepRabbit authentication system is now fully deployed and ready for production use!

