// Portfolio Backend Server
// Express API with SQLite Database

const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin7023580421@';

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Serve static files
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ============ DATABASE SETUP ============
const db = new sqlite3.Database(path.join(__dirname, 'portfolio.db'), (err) => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to SQLite database');
        db.serialize(() => {
            initializeDatabase();
            initializeAdminUser();
        });
    }
});

function initializeDatabase() {
    // Portfolio table
    db.run(`
        CREATE TABLE IF NOT EXISTS portfolio (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            tagline TEXT,
            introduction TEXT,
            profile_image TEXT,
            about_intro TEXT,
            career_objectives TEXT,
            background_info TEXT,
            interests TEXT,
            achievements TEXT,
            strengths TEXT,
            resume_file TEXT,
            resume_summary TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Education table
    db.run(`
        CREATE TABLE IF NOT EXISTS education (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            degree TEXT NOT NULL,
            institution TEXT NOT NULL,
            year_from INTEGER,
            year_to INTEGER,
            course TEXT,
            cgpa TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Skills table
    db.run(`
        CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            icon TEXT,
            percentage INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Certificates table
    db.run(`
        CREATE TABLE IF NOT EXISTS certificates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            organization TEXT NOT NULL,
            issue_date TEXT,
            category TEXT,
            image TEXT,
            pdf_file TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Experience table
    db.run(`
        CREATE TABLE IF NOT EXISTS experience (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            position TEXT NOT NULL,
            company TEXT NOT NULL,
            duration_from TEXT,
            duration_to TEXT,
            description TEXT,
            type TEXT DEFAULT 'work',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Projects table
    db.run(`
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT,
            description TEXT,
            image TEXT,
            link TEXT,
            github_link TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Gallery table
    db.run(`
        CREATE TABLE IF NOT EXISTS gallery (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT NOT NULL,
            category TEXT,
            title TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Blog table
    db.run(`
        CREATE TABLE IF NOT EXISTS blog (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT,
            excerpt TEXT,
            content TEXT,
            image TEXT,
            author TEXT,
            published BOOLEAN DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Social Links table
    db.run(`
        CREATE TABLE IF NOT EXISTS social_links (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            platform TEXT UNIQUE NOT NULL,
            url TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Contact Info table
    db.run(`
        CREATE TABLE IF NOT EXISTS contact_info (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT,
            phone TEXT,
            whatsapp TEXT,
            address TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Contact Messages table
    db.run(`
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            read BOOLEAN DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Admin Users table
    db.run(`
        CREATE TABLE IF NOT EXISTS admin_users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log('Database tables initialized');
}

function initializeAdminUser() {
    db.get('SELECT * FROM admin_users WHERE username = ?', [ADMIN_USERNAME], async (err, row) => {
        if (err) {
            console.error('Error checking admin user:', err);
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

            if (!row) {
                db.run(
                    'INSERT INTO admin_users (username, password_hash) VALUES (?, ?)',
                    [ADMIN_USERNAME, hashedPassword],
                    (insertErr) => {
                        if (insertErr) {
                            console.error('Error creating default admin user:', insertErr);
                        } else {
                            console.log('Default admin user created');
                        }
                    }
                );
            } else {
                const passwordMatches = await bcrypt.compare(ADMIN_PASSWORD, row.password_hash);
                if (!passwordMatches) {
                    db.run(
                        'UPDATE admin_users SET password_hash = ? WHERE username = ?',
                        [hashedPassword, ADMIN_USERNAME],
                        (updateErr) => {
                            if (updateErr) {
                                console.error('Error updating admin password:', updateErr);
                            } else {
                                console.log('Default admin password reset successfully');
                            }
                        }
                    );
                }
            }
        } catch (hashErr) {
            console.error('Error hashing admin password:', hashErr);
        }
    });
}

function getAdminUserByUsername(username, callback) {
    db.get('SELECT * FROM admin_users WHERE username = ?', [username], callback);
}

function generateToken(user) {
    return jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        req.user = user;
        next();
    });
}

// ============ API ROUTES ============

// Admin Authentication
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    getAdminUserByUsername(username, async (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.json({ token, username: user.username });
    });
});

// GET Portfolio Data
app.get('/api/portfolio', (req, res) => {
    db.get('SELECT * FROM portfolio LIMIT 1', (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row || {});
        }
    });
});

// GET Education
app.get('/api/education', (req, res) => {
    db.all('SELECT * FROM education ORDER BY year_to DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows || []);
        }
    });
});

// POST Education
app.post('/api/education', authenticateToken, (req, res) => {
    const { degree, institution, year_from, year_to, course, cgpa } = req.body;
    db.run(
        'INSERT INTO education (degree, institution, year_from, year_to, course, cgpa) VALUES (?, ?, ?, ?, ?, ?)',
        [degree, institution, year_from, year_to, course, cgpa],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

// DELETE Education
app.delete('/api/education/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM education WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Education item not found' });
        }
        res.json({ success: true });
    });
});

// GET Skills
app.get('/api/skills', (req, res) => {
    db.all('SELECT * FROM skills', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows || []);
        }
    });
});

// POST Skills
app.post('/api/skills', authenticateToken, (req, res) => {
    const { name, icon, percentage } = req.body;
    db.run(
        'INSERT INTO skills (name, icon, percentage) VALUES (?, ?, ?)',
        [name, icon, percentage],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

// GET Certificates
app.get('/api/certificates', (req, res) => {
    db.all('SELECT * FROM certificates ORDER BY issue_date DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows || []);
        }
    });
});

// POST Certificate
app.post('/api/certificates', authenticateToken, upload.fields([{ name: 'image' }, { name: 'pdf_file' }]), (req, res) => {
    const { title, organization, issue_date, category } = req.body;
    const image = req.files?.image ? req.files.image[0].filename : null;
    const pdf_file = req.files?.pdf_file ? req.files.pdf_file[0].filename : null;

    db.run(
        'INSERT INTO certificates (title, organization, issue_date, category, image, pdf_file) VALUES (?, ?, ?, ?, ?, ?)',
        [title, organization, issue_date, category, image, pdf_file],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

// GET Experience
app.get('/api/experience', (req, res) => {
    db.all('SELECT * FROM experience ORDER BY duration_to DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows || []);
        }
    });
});

// POST Experience
app.post('/api/experience', authenticateToken, (req, res) => {
    const { position, company, duration_from, duration_to, description, type } = req.body;
    db.run(
        'INSERT INTO experience (position, company, duration_from, duration_to, description, type) VALUES (?, ?, ?, ?, ?, ?)',
        [position, company, duration_from, duration_to, description, type || 'work'],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

// GET Projects
app.get('/api/projects', (req, res) => {
    db.all('SELECT * FROM projects ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows || []);
        }
    });
});

// POST Project
app.post('/api/projects', authenticateToken, upload.single('image'), (req, res) => {
    const { title, category, description, link, github_link } = req.body;
    const image = req.file ? req.file.filename : null;

    db.run(
        'INSERT INTO projects (title, category, description, image, link, github_link) VALUES (?, ?, ?, ?, ?, ?)',
        [title, category, description, image, link, github_link],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

// GET Gallery
app.get('/api/gallery', (req, res) => {
    db.all('SELECT * FROM gallery ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows || []);
        }
    });
});

// POST Gallery
app.post('/api/gallery', authenticateToken, upload.single('image'), (req, res) => {
    const { category, title } = req.body;
    const image = req.file ? req.file.filename : null;

    db.run(
        'INSERT INTO gallery (image, category, title) VALUES (?, ?, ?)',
        [image, category, title],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

// GET Blog Posts
app.get('/api/blog', (req, res) => {
    db.all('SELECT * FROM blog WHERE published = 1 ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows || []);
        }
    });
});

// POST Blog Post
app.post('/api/blog', authenticateToken, upload.single('image'), (req, res) => {
    const { title, category, excerpt, content, author } = req.body;
    const image = req.file ? req.file.filename : null;

    db.run(
        'INSERT INTO blog (title, category, excerpt, content, image, author) VALUES (?, ?, ?, ?, ?, ?)',
        [title, category, excerpt, content, image, author],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID });
            }
        }
    );
});

// GET Social Links
app.get('/api/social-links', (req, res) => {
    db.all('SELECT * FROM social_links', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows || []);
        }
    });
});

// POST Social Link
app.post('/api/social-links', authenticateToken, (req, res) => {
    const { platform, url } = req.body;
    db.run(
        'INSERT OR REPLACE INTO social_links (platform, url) VALUES (?, ?)',
        [platform, url],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ success: true });
            }
        }
    );
});

// GET Contact Info
app.get('/api/contact-info', (req, res) => {
    db.get('SELECT * FROM contact_info LIMIT 1', (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(row || {});
        }
    });
});

// POST Contact Info
app.post('/api/contact-info', authenticateToken, (req, res) => {
    const { email, phone, whatsapp, address } = req.body;
    db.run(
        'INSERT OR REPLACE INTO contact_info (id, email, phone, whatsapp, address) VALUES (1, ?, ?, ?, ?)',
        [email, phone, whatsapp, address],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ success: true });
            }
        }
    );
});

// POST Contact Message
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    db.run(
        'INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)',
        [name, email, subject, message],
        function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ id: this.lastID, message: 'Message received!' });
            }
        }
    );
});

// GET Contact Messages
app.get('/api/messages', (req, res) => {
    db.all('SELECT * FROM contact_messages ORDER BY created_at DESC', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows || []);
        }
    });
});

// Download Resume
app.get('/api/download-resume', (req, res) => {
    db.get('SELECT resume_file FROM portfolio LIMIT 1', (err, row) => {
        if (err || !row || !row.resume_file) {
            res.status(404).json({ error: 'Resume not found' });
        } else {
            const filePath = path.join(uploadsDir, row.resume_file);
            res.download(filePath);
        }
    });
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// ============ ERROR HANDLING ============
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

// ============ START SERVER ============
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api/*`);
});

module.exports = app;
