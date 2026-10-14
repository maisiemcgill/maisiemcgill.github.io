// Mobile navigation menu
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    const toggleMenu = () => {
        const isOpen = navLinks.classList.toggle('active');

        mobileMenu.classList.toggle('active', isOpen);
        mobileMenu.setAttribute('aria-expanded', String(isOpen));
    };

    mobileMenu.addEventListener('click', toggleMenu);

    mobileMenu.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        });
    });
}

// Reveal sections as they enter the viewport.
// If IntersectionObserver is unavailable, show all sections normally.
const sections = document.querySelectorAll('section');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                currentObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach((section) => {
        section.classList.add('will-reveal');
        observer.observe(section);
    });
} else {
    sections.forEach((section) => {
        section.classList.add('is-visible');
    });
}

// Change the header appearance when scrolling
const header = document.querySelector('header');

if (header) {
    const updateHeader = () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    };

    updateHeader();

    window.addEventListener('scroll', updateHeader, {
        passive: true
    });
}
