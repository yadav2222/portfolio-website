# 🌐 Deployment Guide

Learn how to deploy your premium portfolio website to the world!

## Overview

This guide covers deploying both frontend and backend to various platforms.

---

## Frontend Deployment

### Option 1: Netlify (Recommended - FREE)

1. **Create Account**
   - Go to https://netlify.com
   - Sign up with GitHub/Google

2. **Connect Your Repository**
   - Push your project to GitHub
   - In Netlify, click "New site from Git"
   - Select your repository
   - Set build command: (leave blank for frontend)
   - Publish directory: `frontend`
   - Click "Deploy"

3. **Auto-deploy on Push**
   - Any push to main branch auto-deploys
   - Get a free HTTPS certificate
   - CDN included

### Option 2: Vercel (Recommended - FREE)

1. **Create Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Deploy Frontend**
   ```bash
   npm install -g vercel
   cd frontend
   vercel
   ```

3. **Configuration**
   - Select Next.js or Static
   - Choose directory: `frontend`
   - Accept defaults
   - Done!

### Option 3: GitHub Pages (FREE)

1. **Create GitHub Repository**
   - Push your code to GitHub

2. **Enable Pages**
   - Go to repository Settings
   - Scroll to "GitHub Pages"
   - Source: main branch
   - Folder: `/frontend`
   - Save

3. **Access Site**
   - Your site: `https://username.github.io/portfolio-website`

### Option 4: Firebase Hosting (FREE)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Project**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure**
   - Public directory: `frontend`
   - Single page app: No
   - Overwrite index.html: No

4. **Deploy**
   ```bash
   firebase deploy
   ```

### Option 5: AWS Amplify (FREE TIER)

1. **Connect Repository**
   - Go to AWS Amplify
   - Connect GitHub
   - Select repository

2. **Configure Build**
   - Build settings: Leave default
   - App name: portfolio
   - Deploy

3. **Custom Domain**
   - Add your domain in Amplify console

---

## Backend Deployment

### Option 1: Railway.app (Recommended - EASY)

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Choose your repository
   - Select `backend` folder as root

3. **Configuration**
   ```
   Root Directory: backend
   Environment: Node
   ```

4. **Environment Variables**
   - Add in Railway console:
   ```
   PORT=5000
   NODE_ENV=production
   ```

5. **Get URL**
   - Railway provides: `your-app.up.railway.app`
   - Update API URL in frontend

### Option 2: Heroku (PAID - LOW COST)

1. **Create Account**
   - Go to https://heroku.com

2. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

3. **Deploy**
   ```bash
   heroku login
   cd backend
   heroku create your-app-name
   git push heroku main
   ```

4. **Environment Variables**
   ```bash
   heroku config:set PORT=5000
   heroku config:set NODE_ENV=production
   ```

5. **View Logs**
   ```bash
   heroku logs --tail
   ```

### Option 3: Render (FREE)

1. **Create Account**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +"
   - Select "Web Service"
   - Connect GitHub repo

3. **Configure**
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment: Node

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment
   - Get URL like: `your-app.onrender.com`

### Option 4: AWS EC2 (PAID - FULL CONTROL)

1. **Launch EC2 Instance**
   - AWS Console > EC2 > Launch Instance
   - Select Ubuntu 22.04
   - Configure security groups (open port 5000)

2. **Connect & Setup**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance.com
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Clone repository
   git clone your-repo
   cd your-repo/backend
   npm install
   npm start
   ```

3. **Keep Running**
   - Use PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "portfolio"
   pm2 startup
   pm2 save
   ```

### Option 5: DigitalOcean App Platform (PAID)

1. **Create Account**
   - Go to https://digitalocean.com

2. **Create App**
   - Apps > Create App
   - Connect GitHub
   - Select repository

3. **Configure**
   - Root directory: `backend`
   - Build: `npm install`
   - Run: `npm start`
   - Port: 5000

4. **Deploy**
   - Click "Deploy"
   - Get URL

---

## Updating API URL

After deploying backend, update frontend API URL:

### In `frontend/assets/js/main.js`:
```javascript
// Before (local):
const API_URL = 'http://localhost:5000/api';

// After (production):
const API_URL = 'https://your-backend-url.com/api';
```

### Or in `frontend/index.html` if needed:
```html
<script>
    const API_URL = 'https://your-backend-url.com/api';
</script>
```

---

## Custom Domain

### Connect Your Domain

1. **Buy Domain**
   - Go to GoDaddy, Namecheap, Route53, etc.
   - Purchase your domain: `yourname.com`

2. **Frontend (Netlify Example)**
   - Netlify Dashboard
   - Site settings > Domain management
   - Add custom domain
   - Update nameservers at registrar

3. **Backend**
   - Most platforms provide custom domain option
   - Add in platform settings
   - Update API_URL accordingly

### Using Subdomain

```
Portfolio: yourname.com (frontend)
API: api.yourname.com (backend)
Admin: admin.yourname.com (admin panel)
```

---

## SSL/HTTPS

### Automatic (Recommended)
Most platforms auto-enable SSL:
- ✅ Netlify
- ✅ Vercel
- ✅ Railway
- ✅ Render
- ✅ Firebase

### Manual (AWS/DigitalOcean)
Use Let's Encrypt (free):
```bash
sudo apt-get install certbot
certbot certonly -d yourname.com
```

---

## Environment Variables for Production

Create `.env` in backend root:

```env
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourname.com
```

Different for production:
```env
# Production
NODE_ENV=production
CORS_ORIGIN=https://yourname.com,https://admin.yourname.com
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-specific-password
```

---

## Performance Optimization

### Frontend
1. Minify CSS/JS
2. Compress images
3. Use CDN
4. Enable gzip
5. Lazy load images

### Backend
1. Use database indexes
2. Cache responses
3. Enable compression
4. Optimize queries
5. Monitor performance

---

## Monitoring & Logging

### Frontend
- Google Analytics
- Sentry (error tracking)
- LogRocket (session replay)

### Backend
- Application logs
- PM2 monitoring
- Sentry for errors
- New Relic (paid)

---

## Database in Production

### Local SQLite (Current)
- Simple but not recommended for production
- Data stored on server
- Not scalable

### Migrate to PostgreSQL

1. **Install PostgreSQL**
   ```bash
   npm install pg
   ```

2. **Update Connection**
   - Use pg client
   - Update queries for PostgreSQL
   - See backend/server.js for structure

3. **Popular Hosting**
   - Railway: Built-in PostgreSQL
   - Supabase: Free PostgreSQL
   - AWS RDS
   - DigitalOcean Managed Database

---

## Deployment Checklist

### Before Deployment
- [ ] All features tested locally
- [ ] Backend running on backend server
- [ ] Frontend API calls working
- [ ] Admin panel fully functional
- [ ] Contact form saves messages
- [ ] Images upload correctly
- [ ] Dark mode works
- [ ] Mobile responsive tested
- [ ] No console errors

### Frontend Deployment
- [ ] Code pushed to GitHub
- [ ] Choose deployment platform
- [ ] Connect repository
- [ ] Build settings correct
- [ ] Deploy successful
- [ ] Website loads correctly
- [ ] All links work

### Backend Deployment
- [ ] Backend code pushed
- [ ] Environment variables set
- [ ] Database initialized
- [ ] API endpoints working
- [ ] CORS configured
- [ ] Logs visible
- [ ] Error handling works

### Post-Deployment
- [ ] Update API_URL in frontend
- [ ] Test all features on live site
- [ ] Contact form works
- [ ] Messages save correctly
- [ ] Admin panel connects to backend
- [ ] Custom domain set up
- [ ] SSL certificate active
- [ ] Monitor for errors

---

## Troubleshooting Deployment

### 502 Bad Gateway
- Backend not running
- Port not exposed
- Check logs for errors

### CORS Errors
- Backend CORS_ORIGIN not set correctly
- Check frontend API_URL
- Verify domain names

### Database Connection Error
- Database not initialized
- Check connection string
- Verify file permissions

### Slow Performance
- Enable compression
- Optimize images
- Use CDN
- Check database queries

### Contact Form Not Working
- Verify API_URL is correct
- Check backend is running
- Ensure CORS allows requests
- Review network tab in DevTools

---

## Cost Comparison

| Platform | Frontend | Backend | Total/Month |
|----------|----------|---------|-------------|
| Railway | Free | $7-50 | $7-50 |
| Netlify + Railway | Free | $7-50 | $7-50 |
| Vercel + Railway | Free | $7-50 | $7-50 |
| Heroku | Free | $50+ | $50+ |
| AWS | ~$10 | ~$20 | ~$30 |
| DigitalOcean | ~$6 | ~$6 | ~$12 |

---

## Support & Help

- Check platform documentation
- Review logs for errors
- Test locally before deploying
- GitHub Issues for code help
- Platform support forums

---

**Your portfolio is ready to go live! 🚀**

Choose your deployment platform and start showcasing your work to the world! ✨
