# DeepRabbit Backend Deployment Guide

## Overview
This guide covers deploying the Flask backend with JWT authentication to cPanel using the "Setup Python App" feature.

## Backend Architecture
- **Flask** with JWT authentication
- **SQLite** database (file-based, no external DB needed)
- **bcrypt** password hashing
- **HttpOnly cookies** for secure token storage
- **Rotating refresh tokens** for enhanced security

## cPanel Deployment Steps

### 1. Prepare Backend Files
Upload these files to your cPanel account:
```
backend/
├── app.py                 # Main Flask application
├── requirements.txt      # Python dependencies
├── passenger_wsgi.py     # WSGI entry point for cPanel
├── env.example          # Environment variables template
└── deeprabbit.db        # SQLite database (created automatically)
```

### 2. cPanel Setup Python App
1. Log into cPanel
2. Find "Setup Python App" in the Software section
3. Click "Create Application"
4. Configure:
   - **Python Version**: 3.9 or higher
   - **App Directory**: `/backend` (or your chosen path)
   - **App URL**: `/api` (or your chosen subdomain)
   - **Startup File**: `passenger_wsgi.py`

### 3. Environment Configuration
1. In cPanel Python App, go to "Environment Variables"
2. Add these variables:
   ```
   SECRET_KEY=your-super-secret-key-change-this-in-production
   JWT_SECRET_KEY=your-jwt-secret-key-change-this-in-production
   DATABASE_URL=sqlite:///deeprabbit.db
   JWT_COOKIE_SECURE=True
   FLASK_ENV=production
   ```

### 4. Install Dependencies
1. In cPanel Python App, go to "Terminal"
2. Run:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

### 5. Initialize Database
1. In Terminal, run:
   ```bash
   python -c "from app import app, db; app.app_context().push(); db.create_all(); print('Database initialized!')"
   ```

### 6. Start Application
1. In cPanel Python App, click "Restart"
2. Your API will be available at: `https://yourdomain.com/api/`

## Frontend Configuration

### Environment Variables
Add to your `.env` file:
```
VITE_API_URL=https://yourdomain.com/api
```

### Build and Deploy Frontend
1. Update the API URL in your frontend
2. Build the frontend:
   ```bash
   npm run build
   ```
3. Upload the `dist/` folder contents to your web root

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user info

### Health Check
- `GET /api/health` - API health status

## Security Features

### JWT Tokens
- **Access Token**: 15 minutes expiry
- **Refresh Token**: 7 days expiry with rotation
- **HttpOnly Cookies**: Prevents XSS attacks
- **SameSite**: Lax for CSRF protection

### Password Security
- **bcrypt** hashing with salt
- No plaintext password storage
- Secure password validation

### Database Security
- **SQLite** file permissions
- No external database dependencies
- Automatic table creation

## Testing the Deployment

### 1. Health Check
```bash
curl https://yourdomain.com/api/health
```

### 2. Register User
```bash
curl -X POST https://yourdomain.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

### 3. Login User
```bash
curl -X POST https://yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}' \
  -c cookies.txt
```

### 4. Test Protected Route
```bash
curl https://yourdomain.com/api/auth/me \
  -b cookies.txt
```

## Troubleshooting

### Common Issues

1. **Import Errors**
   - Ensure all dependencies are installed
   - Check Python version compatibility

2. **Database Errors**
   - Verify file permissions on SQLite database
   - Check database initialization

3. **Authentication Issues**
   - Verify JWT secret keys are set
   - Check cookie settings for HTTPS

4. **CORS Issues**
   - Ensure frontend domain is allowed
   - Check credentials: 'include' in fetch requests

### Logs
Check cPanel Python App logs for error details.

## Production Considerations

### Security
- Use strong, unique secret keys
- Enable HTTPS (JWT_COOKIE_SECURE=True)
- Regular security updates
- Monitor authentication logs

### Performance
- SQLite is suitable for moderate traffic
- Consider database backups
- Monitor memory usage

### Scaling
- For high traffic, consider PostgreSQL
- Add Redis for session storage
- Implement rate limiting

## Support
For issues with this deployment, check:
1. cPanel Python App logs
2. Browser developer console
3. Network tab for API calls
4. Database file permissions



