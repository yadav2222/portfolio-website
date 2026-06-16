# 🚀 Quick Start Guide

Get your premium portfolio website running in 5 minutes!

## Step 1: Install Node.js (If Not Already Installed)

Download from: https://nodejs.org/ (Install LTS version)

## Step 2: Open Terminal/Command Prompt

### On Windows:
- Press `Win + R`
- Type `cmd` and press Enter
- Navigate to your portfolio folder: `cd path\to\portfolio-website\backend`

### On Mac/Linux:
- Open Terminal
- Navigate to backend: `cd path/to/portfolio-website/backend`

## Step 3: Install Backend Dependencies

```bash
npm install
```

This installs all necessary packages (Express, SQLite, etc.)

## Step 4: Start the Backend Server

```bash
npm start
```

You should see:
```
Backend server running on http://localhost:5000
```

**Keep this terminal open!** The backend must be running.

## Step 5: Open Frontend Website

### Option A: Direct Open (Simplest)
1. Navigate to `portfolio-website/frontend/`
2. Double-click `index.html`
3. Website opens in your browser

### Option B: Local Server (Better)
1. Open a **new** terminal
2. Navigate to frontend: `cd path/to/portfolio-website/frontend`
3. Start server: `npm run serve`
4. Open: `http://localhost:8000`

## Step 6: Open Admin Panel

1. Navigate to `portfolio-website/admin/`
2. Double-click `index.html`
   OR
3. Go to `http://localhost:8000/../../admin/index.html`

## Step 7: Customize Your Portfolio

### In Admin Panel:
1. Click "Portfolio Info"
2. Update your name, tagline, introduction
3. Add profile image, resume
4. Fill in all sections with your information
5. Save!

### Or Edit Frontend JavaScript:
Edit `frontend/assets/js/main.js` and update:
```javascript
// Your social links
const socialLinks = {
    instagram: 'your-link',
    linkedin: 'your-link',
    // ... etc
};

// Your contact info
const contactInfo = {
    email: 'your@email.com',
    phone: '+91 XXXXXXXXXX',
    whatsapp: '+91 XXXXXXXXXX'
};
```

## 📋 Checklist

- [x] Node.js installed
- [ ] Backend running (`npm start` in backend folder)
- [ ] Frontend opens in browser
- [ ] Admin panel opens
- [ ] Updated portfolio information
- [ ] Added profile picture
- [ ] Updated contact links
- [ ] Dark mode toggle works
- [ ] Mobile responsive (test in mobile view)
- [ ] Contact form works (check admin Messages section)

## 🎯 Main URLs

- **Frontend**: `http://localhost:8000` (if served locally)
- **Admin Panel**: `admin/index.html`
- **Backend API**: `http://localhost:5000/api`

## ⚠️ Important Notes

1. **Backend Must Be Running**: The admin panel and contact form won't work without the backend server running
2. **Backend on Port 5000**: Don't change this port without updating API URLs
3. **CORS**: Backend allows requests from localhost:8000
4. **Database**: Auto-creates `portfolio.db` in backend folder on first run

## 🛠️ Troubleshooting

### "npm: command not found"
- Node.js not installed
- Close and reopen terminal after installing Node.js

### "Port 5000 already in use"
- Another application using port 5000
- Use: `npm start -- --port 5001`

### Frontend can't connect to backend
- Ensure backend is running
- Check if `http://localhost:5000/api/health` works
- Check browser console for errors

### Images not loading
- Check image file exists in `frontend/assets/images/`
- Verify file path is correct
- Try using absolute paths

## 🎨 Customization Quick Tips

### Change Colors
Edit `frontend/assets/css/style.css`:
```css
--primary-color: #667eea;      /* Purple - change to your color */
--secondary-color: #764ba2;    /* Dark purple - change to your color */
```

### Change Profile Image
1. Save your image in `frontend/assets/images/`
2. Update in `frontend/index.html`:
```html
<img src="assets/images/your-image.jpg" alt="Your Name">
```

### Add Resume
1. Save PDF in `backend/uploads/`
2. Update in admin panel

## 📱 Test Responsive Design

1. Open website in browser
2. Press `F12` (Developer Tools)
3. Click device icon (top-left)
4. Select different devices to test

## 🌙 Dark Mode

Toggle using the moon icon in top-right corner of website. Preference is saved!

## 💾 Saving Your Work

- Frontend files auto-save (just edit files)
- Admin panel changes save to database (auto-saved)
- Database file: `backend/portfolio.db`

## 📈 Next Steps

1. Customize all sections in admin panel
2. Add your projects and certificates
3. Write blog posts
4. Upload photos to gallery
5. Configure social media links
6. Test contact form
7. Deploy to live server (see README.md)

## 🎉 You're All Set!

Your premium portfolio website is ready to showcase your amazing work! 

**Happy customizing! ✨**

---

Need help? Check:
- [README.md](README.md) - Detailed documentation
- [FEATURES.md](FEATURES.md) - Complete features list
- Browser Developer Console (F12) - Error messages
