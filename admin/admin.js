// Admin Panel JavaScript

const API_URL = `http://${window.location.hostname}:5000/api`;
const authTokenKey = 'portfolioAdminToken';

function getAuthToken() {
    return localStorage.getItem(authTokenKey);
}

function setAuthToken(token) {
    localStorage.setItem(authTokenKey, token);
}

function clearAuthToken() {
    localStorage.removeItem(authTokenKey);
}

function authHeaders() {
    const token = getAuthToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
}

function isLoggedIn() {
    return Boolean(getAuthToken());
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active from all nav links
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active to clicked nav link
    event.target.closest('a').classList.add('active');
    
    // Load data for the section
    switch(sectionId) {
        case 'education':
            loadEducation();
            break;
        case 'skills':
            loadSkills();
            break;
        case 'certificates':
            loadCertificates();
            break;
        case 'experience':
            loadExperience();
            break;
        case 'projects':
            loadProjects();
            break;
        case 'gallery':
            loadGallery();
            break;
        case 'blog':
            loadBlog();
            break;
        case 'messages':
            loadMessages();
            break;
        case 'dashboard':
            loadDashboard();
            break;
    }
}

// ============ DASHBOARD ============
async function loadDashboard() {
    try {
        const messagesRes = await fetch(`${API_URL}/messages`);
        const messages = await messagesRes.json();
        document.getElementById('messagesCount').textContent = messages.length || 0;
        
        const educationRes = await fetch(`${API_URL}/education`);
        const education = await educationRes.json();
        document.getElementById('educationCount').textContent = education.length || 0;
        
        const skillsRes = await fetch(`${API_URL}/skills`);
        const skills = await skillsRes.json();
        document.getElementById('skillsCount').textContent = skills.length || 0;
        
        const blogRes = await fetch(`${API_URL}/blog`);
        const blog = await blogRes.json();
        document.getElementById('blogCount').textContent = blog.length || 0;
    } catch (error) {
        console.log('Dashboard - Backend not running');
    }
}

// ============ EDUCATION ============
async function loadEducation() {
    try {
        const response = await fetch(`${API_URL}/education`);
        const data = await response.json();
        const tbody = document.querySelector('#educationTable tbody');
        tbody.innerHTML = '';
        
        data.forEach(edu => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${edu.degree}</td>
                <td>${edu.institution}</td>
                <td>${edu.year_from} - ${edu.year_to}</td>
                <td>
                    <button class="btn-small btn-danger" onclick="deleteItem('education', ${edu.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.log('Education loading - Backend not running');
    }
}

document.getElementById('educationForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        degree: document.getElementById('degreeInput').value,
        institution: document.getElementById('institutionInput').value,
        year_from: parseInt(document.getElementById('yearFromInput').value),
        year_to: parseInt(document.getElementById('yearToInput').value),
        course: document.getElementById('courseInput').value,
        cgpa: document.getElementById('cgpaInput').value
    };
    
    try {
        const response = await authFetch(`${API_URL}/education`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Education added successfully!');
            e.target.reset();
            loadEducation();
        }
    } catch (error) {
        alert('Error: Backend not running');
    }
});

// ============ SKILLS ============
async function loadSkills() {
    try {
        const response = await fetch(`${API_URL}/skills`);
        const data = await response.json();
        const tbody = document.querySelector('#skillsTable tbody');
        tbody.innerHTML = '';
        
        data.forEach(skill => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${skill.name}</td>
                <td>${skill.percentage}%</td>
                <td>
                    <button class="btn-small btn-danger" onclick="deleteItem('skills', ${skill.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.log('Skills loading - Backend not running');
    }
}

document.getElementById('skillsForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        name: document.getElementById('skillNameInput').value,
        icon: document.getElementById('skillIconInput').value,
        percentage: parseInt(document.getElementById('skillPercentInput').value)
    };
    
    try {
        const response = await authFetch(`${API_URL}/skills`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Skill added successfully!');
            e.target.reset();
            loadSkills();
        }
    } catch (error) {
        alert('Error: Backend not running');
    }
});

// ============ CERTIFICATES ============
async function loadCertificates() {
    try {
        const response = await fetch(`${API_URL}/certificates`);
        const data = await response.json();
        const tbody = document.querySelector('#certificatesTable tbody');
        tbody.innerHTML = '';
        
        data.forEach(cert => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${cert.title}</td>
                <td>${cert.organization}</td>
                <td>${cert.category}</td>
                <td>
                    <button class="btn-small btn-danger" onclick="deleteItem('certificates', ${cert.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.log('Certificates loading - Backend not running');
    }
}

document.getElementById('certificatesForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', document.getElementById('certTitleInput').value);
    formData.append('organization', document.getElementById('certOrgInput').value);
    formData.append('issue_date', document.getElementById('certDateInput').value);
    formData.append('category', document.getElementById('certCategoryInput').value);
    
    if (document.getElementById('certImageInput').files.length > 0) {
        formData.append('image', document.getElementById('certImageInput').files[0]);
    }
    if (document.getElementById('certPdfInput').files.length > 0) {
        formData.append('pdf_file', document.getElementById('certPdfInput').files[0]);
    }
    
    try {
        const response = await authFetch(`${API_URL}/certificates`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Certificate added successfully!');
            e.target.reset();
            loadCertificates();
        }
    } catch (error) {
        alert('Error: Backend not running');
    }
});

// ============ EXPERIENCE ============
async function loadExperience() {
    try {
        const response = await fetch(`${API_URL}/experience`);
        const data = await response.json();
        const tbody = document.querySelector('#experienceTable tbody');
        tbody.innerHTML = '';
        
        data.forEach(exp => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${exp.position}</td>
                <td>${exp.company}</td>
                <td>${exp.duration_from} - ${exp.duration_to}</td>
                <td>
                    <button class="btn-small btn-danger" onclick="deleteItem('experience', ${exp.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.log('Experience loading - Backend not running');
    }
}

document.getElementById('experienceForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        position: document.getElementById('positionInput').value,
        company: document.getElementById('companyInput').value,
        duration_from: document.getElementById('expFromInput').value,
        duration_to: document.getElementById('expToInput').value,
        type: document.getElementById('expTypeInput').value,
        description: document.getElementById('expDescInput').value
    };
    
    try {
        const response = await authFetch(`${API_URL}/experience`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Experience added successfully!');
            e.target.reset();
            loadExperience();
        }
    } catch (error) {
        alert('Error: Backend not running');
    }
});

// ============ PROJECTS ============
async function loadProjects() {
    try {
        const response = await fetch(`${API_URL}/projects`);
        const data = await response.json();
        const tbody = document.querySelector('#projectsTable tbody');
        tbody.innerHTML = '';
        
        data.forEach(proj => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${proj.title}</td>
                <td>${proj.category}</td>
                <td>
                    <button class="btn-small btn-danger" onclick="deleteItem('projects', ${proj.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.log('Projects loading - Backend not running');
    }
}

document.getElementById('projectsForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', document.getElementById('projTitleInput').value);
    formData.append('category', document.getElementById('projCategoryInput').value);
    formData.append('description', document.getElementById('projDescInput').value);
    formData.append('link', document.getElementById('projLinkInput').value);
    formData.append('github_link', document.getElementById('projGithubInput').value);
    
    if (document.getElementById('projImageInput').files.length > 0) {
        formData.append('image', document.getElementById('projImageInput').files[0]);
    }
    
    try {
        const response = await authFetch(`${API_URL}/projects`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Project added successfully!');
            e.target.reset();
            loadProjects();
        }
    } catch (error) {
        alert('Error: Backend not running');
    }
});

// ============ GALLERY ============
async function loadGallery() {
    try {
        const response = await fetch(`${API_URL}/gallery`);
        const data = await response.json();
        const tbody = document.querySelector('#galleryTable tbody');
        tbody.innerHTML = '';
        
        data.forEach(photo => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${photo.title || 'Untitled'}</td>
                <td>${photo.category}</td>
                <td>
                    <button class="btn-small btn-danger" onclick="deleteItem('gallery', ${photo.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.log('Gallery loading - Backend not running');
    }
}

document.getElementById('galleryForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('category', document.getElementById('galCategoryInput').value);
    formData.append('title', document.getElementById('galTitleInput').value);
    
    if (document.getElementById('galImageInput').files.length > 0) {
        formData.append('image', document.getElementById('galImageInput').files[0]);
    }
    
    try {
        const response = await authFetch(`${API_URL}/gallery`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Photo added successfully!');
            e.target.reset();
            loadGallery();
        }
    } catch (error) {
        alert('Error: Backend not running');
    }
});

// ============ BLOG ============
async function loadBlog() {
    try {
        const response = await fetch(`${API_URL}/blog`);
        const data = await response.json();
        const tbody = document.querySelector('#blogTable tbody');
        tbody.innerHTML = '';
        
        data.forEach(post => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${post.title}</td>
                <td>${post.category}</td>
                <td>
                    <button class="btn-small btn-danger" onclick="deleteItem('blog', ${post.id})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.log('Blog loading - Backend not running');
    }
}

document.getElementById('blogForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', document.getElementById('blogTitleInput').value);
    formData.append('category', document.getElementById('blogCategoryInput').value);
    formData.append('excerpt', document.getElementById('blogExcerptInput').value);
    formData.append('content', document.getElementById('blogContentInput').value);
    formData.append('author', document.getElementById('blogAuthorInput').value);
    
    if (document.getElementById('blogImageInput').files.length > 0) {
        formData.append('image', document.getElementById('blogImageInput').files[0]);
    }
    
    try {
        const response = await authFetch(`${API_URL}/blog`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Blog post published successfully!');
            e.target.reset();
            loadBlog();
        }
    } catch (error) {
        alert('Error: Backend not running');
    }
});

// ============ SOCIAL LINKS ============
document.getElementById('socialForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const platforms = {
        'Instagram': 'instagramInput',
        'LinkedIn': 'linkedinInput',
        'Facebook': 'facebookInput',
        'Twitter': 'twitterInput',
        'GitHub': 'githubInput',
        'YouTube': 'youtubeInput'
    };
    
    try {
        for (const [platform, inputId] of Object.entries(platforms)) {
            const url = document.getElementById(inputId).value;
            if (url) {
                await fetch(`${API_URL}/social-links`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ platform, url })
                });
            }
        }
        alert('Social links updated successfully!');
    } catch (error) {
        alert('Error: Backend not running');
    }
});

// ============ CONTACT INFO ============
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        email: document.getElementById('contactEmailInput').value,
        phone: document.getElementById('contactPhoneInput').value,
        whatsapp: document.getElementById('contactWhatsappInput').value,
        address: document.getElementById('contactAddressInput').value
    };
    
    try {
        const response = await authFetch(`${API_URL}/contact-info`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            alert('Contact information updated successfully!');
        }
    } catch (error) {
        alert('Error: Backend not running');
    }
});

// ============ MESSAGES ============
async function loadMessages() {
    try {
        const response = await fetch(`${API_URL}/messages`);
        const data = await response.json();
        const tbody = document.querySelector('#messagesTable tbody');
        tbody.innerHTML = '';
        
        data.forEach(msg => {
            const row = document.createElement('tr');
            const date = new Date(msg.created_at).toLocaleDateString();
            row.innerHTML = `
                <td>${msg.name}</td>
                <td>${msg.email}</td>
                <td>${msg.subject}</td>
                <td>${date}</td>
                <td>
                    <button class="btn-small btn-edit" onclick="viewMessage(${msg.id}, '${msg.name}', '${msg.email}', '${msg.subject}', '${msg.message}')">View</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.log('Messages loading - Backend not running');
    }
}

function viewMessage(id, name, email, subject, message) {
    alert(`From: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`);
}

// ============ GENERAL DELETE FUNCTION ============
async function deleteItem(type, id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
        const response = await authFetch(`${API_URL}/${type}/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Item deleted successfully!');
            // Reload the current section
            switch(type) {
                case 'education':
                    loadEducation();
                    break;
                case 'skills':
                    loadSkills();
                    break;
                case 'certificates':
                    loadCertificates();
                    break;
                case 'experience':
                    loadExperience();
                    break;
                case 'projects':
                    loadProjects();
                    break;
                case 'gallery':
                    loadGallery();
                    break;
                case 'blog':
                    loadBlog();
                    break;
            }
        }
    } catch (error) {
        alert('Error: Backend not running');
    }
}

// ============ LOGIN SECTION ============
async function showLogin() {
    document.body.innerHTML = `
        <div class="login-container">
            <div class="login-card">
                <h2>Admin Login</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" id="loginUsername" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" id="loginPassword" required>
                    </div>
                    <button type="submit">Login</button>
                </form>
                <div id="loginError" class="alert alert-error" style="display: none;"></div>
            </div>
        </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();
            if (!response.ok) {
                document.getElementById('loginError').textContent = result.error || 'Login failed';
                document.getElementById('loginError').style.display = 'block';
                return;
            }

            setAuthToken(result.token);
            window.location.reload();
        } catch (error) {
            document.getElementById('loginError').textContent = 'Unable to connect to backend';
            document.getElementById('loginError').style.display = 'block';
        }
    });
}

function requireAuth() {
    if (!isLoggedIn()) {
        showLogin();
        return false;
    }
    return true;
}

function authFetch(url, options = {}) {
    const headers = {
        ...options.headers,
        ...authHeaders(),
    };
    return fetch(url, { ...options, headers }).then(async response => {
        if (response.status === 401 || response.status === 403) {
            clearAuthToken();
            showLogin();
            throw new Error('Unauthorized');
        }
        return response;
    });
}

function logout() {
    clearAuthToken();
    showLogin();
}

// ============ INITIALIZE ============
window.addEventListener('DOMContentLoaded', () => {
    if (!requireAuth()) return;
    loadDashboard();
    console.log('Admin panel loaded');
});
