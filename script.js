const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 75) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Add active class styling for nav-link
const style = document.createElement('style');
style.innerHTML = `
.nav-link.active {
    color: var(--primary-color);
}
.nav-link.active::after {
    width: 100%;
}
`;
document.head.appendChild(style);

// Language switching functionality
let currentLanguage = 'ko';

function switchLanguage(lang) {
    currentLanguage = lang;

    // Update all elements with data-ko and data-en attributes
    const elements = document.querySelectorAll('[data-ko][data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else if (element.innerHTML.includes('<span') || element.innerHTML.includes('<br>')) {
                element.innerHTML = text;
            } else {
                element.textContent = text;
            }
        }
    });

    // Update active language button
    document.querySelectorAll('.lang-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        }
    });

    // Store language preference
    localStorage.setItem('preferredLanguage', lang);

    // Update document language
    document.documentElement.lang = lang;
}

// Initialize language switching
document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'ko';

    // Set initial language
    switchLanguage(savedLanguage);

    // Add click event listeners to language options
    langToggle.addEventListener('click', (e) => {
        if (e.target.classList.contains('lang-option')) {
            const selectedLang = e.target.getAttribute('data-lang');
            switchLanguage(selectedLang);
        }
    });
});