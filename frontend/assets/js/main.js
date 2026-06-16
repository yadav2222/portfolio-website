// Portfolio Website - Main JavaScript
// Modern, Premium, Fully Responsive

// ============ DARK MODE TOGGLE ============
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = htmlElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.classList.remove('fa-moon', 'fa-sun');
    icon.classList.add(theme === 'light' ? 'fa-moon' : 'fa-sun');
}

// ============ MOBILE NAVIGATION ============
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============ BACK TO TOP BUTTON ============
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ FLOATING WHATSAPP BUTTON ============
const floatingWhatsapp = document.getElementById('floatingWhatsapp');
const whatsappLink = document.getElementById('whatsappLink');

floatingWhatsapp.addEventListener('click', (e) => {
    e.preventDefault();
    const link = whatsappLink.getAttribute('href');
    window.open(link, '_blank');
});

// ============ AOS INITIALIZATION ============
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ============ API CONFIGURATION ============
const API_URL = 'http://localhost:5000/api';

// ============ LOAD PORTFOLIO DATA ============
async function loadPortfolioData() {
    try {
        const response = await fetch(`${API_URL}/portfolio`);
        if (!response.ok) throw new Error('Failed to load data');
        
        const data = await response.json();
        populatePortfolioData(data);
    } catch (error) {
        console.log('Using default data. Make sure backend is running.');
        populateDefaultData();
    }
}

// ============ POPULATE DEFAULT DATA ============
function populateDefaultData() {
    // Hero Section
    document.getElementById('tagline').textContent = 'Creating Premium Digital Experiences';
    document.getElementById('heroIntro').textContent = 'Welcome to my portfolio. I\'m a passionate developer and designer creating innovative solutions.';
    
    // About Section
    document.getElementById('aboutIntro').textContent = 'I\'m a dedicated professional with a passion for technology and innovation. With years of experience in web development and design, I create digital solutions that make a real impact.';
    document.getElementById('careerObjectives').textContent = 'My goal is to become a leading expert in full-stack development and help businesses transform their digital presence through innovative and scalable solutions.';
    document.getElementById('backgroundInfo').textContent = 'I have a strong educational background in Computer Science with hands-on experience in modern web technologies, UI/UX design, and project management.';
    document.getElementById('interests').textContent = 'Web Development, UI/UX Design, Photography, Travel';
    document.getElementById('achievements').textContent = 'Multiple awards, Successful projects, Happy clients';
    document.getElementById('strengths').textContent = 'Problem-solving, Leadership, Creativity, Communication';
    
    // Resume
    document.getElementById('resumeSummary').textContent = 'Experienced developer with a proven track record of creating scalable and user-friendly web applications. Proficient in modern web technologies and always eager to learn new skills.';
    
    // Load education, skills, certificates, etc.
    loadEducation();
    loadSkills();
    loadCertificates();
    loadExperience();
    loadProjects();
    loadGallery();
    loadBlog();
    loadSocialLinks();
    loadContactInfo();
}

// ============ LOAD EDUCATION ============
function loadEducation() {
    const educationData = [
        {
            degree: 'Bachelor of Technology',
            institution: 'University Name',
            year_from: 2020,
            year_to: 2024,
            course: 'Computer Science & Engineering',
            cgpa: '3.8/4.0'
        },
        {
            degree: 'High School',
            institution: 'School Name',
            year_from: 2018,
            year_to: 2020,
            course: 'Science',
            cgpa: '95%'
        }
    ];

    const educationTimeline = document.getElementById('educationTimeline');
    if (!educationTimeline.querySelector('.education-item:nth-child(n+2)')) {
        educationData.forEach(edu => {
            const html = `
                <div class="education-item" data-aos="fade-right">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>${edu.degree}</h3>
                        <p class="institution">${edu.institution}</p>
                        <p class="duration">${edu.year_from} - ${edu.year_to}</p>
                        <p class="cgpa">CGPA: ${edu.cgpa}</p>
                        <p class="course">Course: ${edu.course}</p>
                    </div>
                </div>
            `;
            educationTimeline.insertAdjacentHTML('beforeend', html);
        });
    }
}

// ============ LOAD SKILLS ============
function loadSkills() {
    const skillsData = [
        { name: 'Web Development', icon: 'fab fa-html5', percentage: 90 },
        { name: 'UI/UX Design', icon: 'fas fa-palette', percentage: 85 },
        { name: 'JavaScript', icon: 'fab fa-js', percentage: 88 },
        { name: 'React', icon: 'fab fa-react', percentage: 87 },
        { name: 'Node.js', icon: 'fab fa-node', percentage: 85 },
        { name: 'Database Design', icon: 'fas fa-database', percentage: 82 }
    ];

    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = ''; // Clear existing
    
    skillsData.forEach(skill => {
        const html = `
            <div class="skill-card" data-aos="fade-up">
                <div class="skill-icon">
                    <i class="${skill.icon}"></i>
                </div>
                <h3>${skill.name}</h3>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.percentage}%"></div>
                </div>
                <p class="skill-percent">${skill.percentage}%</p>
            </div>
        `;
        skillsGrid.insertAdjacentHTML('beforeend', html);
    });
}

// ============ LOAD CERTIFICATES ============
function loadCertificates() {
    const certificatesData = [
        {
            title: 'Advanced Web Development',
            organization: 'Coursera',
            issue_date: '2024',
            category: 'certification',
            image: 'https://via.placeholder.com/300x200?text=Certificate+1'
        },
        {
            title: 'Best Project Award',
            organization: 'TechHub',
            issue_date: '2023',
            category: 'award',
            image: 'https://via.placeholder.com/300x200?text=Certificate+2'
        }
    ];

    const certificatesGrid = document.getElementById('certificatesGrid');
    certificatesGrid.innerHTML = '';
    
    certificatesData.forEach(cert => {
        const html = `
            <div class="certificate-card" data-aos="fade-up" data-category="${cert.category}">
                <div class="certificate-image">
                    <img src="${cert.image}" alt="${cert.title}">
                    <div class="certificate-overlay">
                        <a href="${cert.image}" class="overlay-btn" download>
                            <i class="fas fa-download"></i> Download
                        </a>
                    </div>
                </div>
                <div class="certificate-info">
                    <h3>${cert.title}</h3>
                    <p class="issuer">${cert.organization}</p>
                    <p class="date"><i class="fas fa-calendar"></i> ${cert.issue_date}</p>
                </div>
            </div>
        `;
        certificatesGrid.insertAdjacentHTML('beforeend', html);
    });
}

// ============ LOAD EXPERIENCE ============
function loadExperience() {
    const workData = [
        {
            position: 'Senior Web Developer',
            company: 'Tech Company Ltd.',
            duration_from: '2023',
            duration_to: 'Present',
            description: 'Leading the development of scalable web applications, mentoring junior developers, and implementing best practices.'
        },
        {
            position: 'Full Stack Developer',
            company: 'Digital Solutions Inc.',
            duration_from: '2021',
            duration_to: '2023',
            description: 'Developed full-stack web applications using modern technologies, optimized performance, and improved user experience.'
        }
    ];

    const workTab = document.getElementById('work-tab');
    workTab.innerHTML = '';
    
    workData.forEach(work => {
        const html = `
            <div class="experience-item">
                <div class="timeline-dot"></div>
                <div class="experience-details">
                    <h3>${work.position}</h3>
                    <p class="company">${work.company}</p>
                    <p class="duration"><i class="fas fa-calendar"></i> ${work.duration_from} - ${work.duration_to}</p>
                    <p class="description">${work.description}</p>
                </div>
            </div>
        `;
        workTab.insertAdjacentHTML('beforeend', html);
    });
}

// ============ LOAD PROJECTS ============
function loadProjects() {
    const projectsData = [
        {
            title: 'E-Commerce Platform',
            category: 'Web Development',
            description: 'A fully functional e-commerce platform with payment integration, inventory management, and admin dashboard.'
        },
        {
            title: 'Task Management App',
            category: 'Web App',
            description: 'A collaborative task management application with real-time updates, notifications, and team collaboration features.'
        }
    ];

    const projectsTab = document.getElementById('projects-tab');
    projectsTab.innerHTML = '';
    
    projectsData.forEach(project => {
        const html = `
            <div class="project-item">
                <h3>${project.title}</h3>
                <p class="project-category">${project.category}</p>
                <p class="project-description">${project.description}</p>
                <a href="#" class="project-link">View Project <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        projectsTab.insertAdjacentHTML('beforeend', html);
    });
}

// ============ LOAD GALLERY ============
function loadGallery() {
    const galleryData = [
        { url: 'https://via.placeholder.com/300x300?text=Photo+1', category: 'personal' },
        { url: 'https://via.placeholder.com/300x300?text=Photo+2', category: 'events' },
        { url: 'https://via.placeholder.com/300x300?text=Photo+3', category: 'achievement' },
        { url: 'https://via.placeholder.com/300x300?text=Photo+4', category: 'personal' },
        { url: 'https://via.placeholder.com/300x300?text=Photo+5', category: 'events' },
        { url: 'https://via.placeholder.com/300x300?text=Photo+6', category: 'achievement' }
    ];

    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';
    
    galleryData.forEach(photo => {
        const html = `
            <div class="gallery-item" data-aos="zoom-in" data-category="${photo.category}">
                <img src="${photo.url}" alt="Gallery Image">
                <div class="gallery-overlay">
                    <a href="${photo.url}" class="gallery-link" data-lightbox="gallery">
                        <i class="fas fa-search-plus"></i>
                    </a>
                </div>
            </div>
        `;
        galleryGrid.insertAdjacentHTML('beforeend', html);
    });
}

// ============ LOAD BLOG ============
function loadBlog() {
    const blogData = [
        {
            title: 'Getting Started with Web Development',
            category: 'Technology',
            excerpt: 'Learn the basics of web development and start your journey as a developer.',
            date: 'Today',
            reading_time: '5 min'
        },
        {
            title: 'Best Practices for UI/UX Design',
            category: 'Design',
            excerpt: 'Discover the essential practices for creating beautiful and user-friendly interfaces.',
            date: '1 day ago',
            reading_time: '8 min'
        },
        {
            title: 'JavaScript Tips and Tricks',
            category: 'Programming',
            excerpt: 'Master advanced JavaScript techniques to improve your coding skills.',
            date: '2 days ago',
            reading_time: '10 min'
        }
    ];

    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = '';
    
    blogData.forEach(post => {
        const html = `
            <article class="blog-card" data-aos="fade-up">
                <div class="blog-image">
                    <img src="https://via.placeholder.com/400x250?text=${post.title}" alt="Blog Post">
                </div>
                <div class="blog-content">
                    <span class="blog-category">${post.category}</span>
                    <h3>${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-meta">
                        <span class="date"><i class="fas fa-calendar"></i> ${post.date}</span>
                        <span class="reading-time"><i class="fas fa-clock"></i> ${post.reading_time} read</span>
                    </div>
                    <a href="#" class="read-more">Read More <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>
        `;
        blogGrid.insertAdjacentHTML('beforeend', html);
    });
}

// ============ LOAD SOCIAL LINKS ============
function loadSocialLinks() {
    const socialLinks = {
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
        youtube: 'https://youtube.com'
    };

    document.getElementById('instagramLink').href = socialLinks.instagram;
    document.getElementById('linkedinLink').href = socialLinks.linkedin;
    document.getElementById('facebookLink').href = socialLinks.facebook;
    document.getElementById('twitterLink').href = socialLinks.twitter;
    document.getElementById('githubLink').href = socialLinks.github;
    document.getElementById('youtubeLink').href = socialLinks.youtube;

    // Footer social links
    document.getElementById('footerInstagram').href = socialLinks.instagram;
    document.getElementById('footerLinkedin').href = socialLinks.linkedin;
    document.getElementById('footerGithub').href = socialLinks.github;
    document.getElementById('footerTwitter').href = socialLinks.twitter;
}

// ============ LOAD CONTACT INFO ============
function loadContactInfo() {
    const contactInfo = {
        email: 'your@email.com',
        phone: '+91 9876543210',
        whatsapp: '+91 9876543210'
    };

    document.getElementById('emailLink').href = `mailto:${contactInfo.email}`;
    document.getElementById('emailLink').textContent = contactInfo.email;
    
    document.getElementById('phoneLink').href = `tel:${contactInfo.phone}`;
    document.getElementById('phoneLink').textContent = contactInfo.phone;
    
    document.getElementById('whatsappLink').href = `https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`;
    document.getElementById('floatingWhatsapp').href = document.getElementById('whatsappLink').href;

    // Footer contact
    document.getElementById('footerEmail').textContent = contactInfo.email;
    document.getElementById('footerPhone').textContent = contactInfo.phone;
}

// ============ EXPERIENCE TAB SWITCHING ============
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    });
});

// ============ FILTER FUNCTIONALITY ============
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active button
        btn.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter items
        const items = btn.parentElement.nextElementSibling.querySelectorAll('[data-category]');
        items.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = '';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
            }
        });
    });
});

// ============ CONTACT FORM SUBMISSION ============
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value
    };

    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            alert('Failed to send message. Please try again.');
        }
    } catch (error) {
        console.log('Form submitted (backend not running)');
        alert('Message submitted locally. Backend server is not running.');
        contactForm.reset();
    }
});

// ============ RESUME DOWNLOAD ============
document.getElementById('resumeDownload').addEventListener('click', (e) => {
    e.preventDefault();
    downloadResume();
});

document.getElementById('resumeDownloadBtn').addEventListener('click', (e) => {
    e.preventDefault();
    downloadResume();
});

function downloadResume() {
    // This would trigger a download from the backend
    window.location.href = `${API_URL}/download-resume`;
}

// ============ INITIALIZE ON PAGE LOAD ============
window.addEventListener('DOMContentLoaded', () => {
    loadPortfolioData();
});

// ============ SMOOTH SCROLL BEHAVIOR ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============ ACTIVE NAV LINK ON SCROLL ============
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

console.log('Portfolio website loaded successfully!');
