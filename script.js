
/* Mobile navigation menu */
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    const toggleMenu = (forceClose = false) => {
        const isOpen = forceClose
            ? false
            : !navLinks.classList.contains('active');

        navLinks.classList.toggle('active', isOpen);
        mobileMenu.classList.toggle('active', isOpen);
        mobileMenu.setAttribute('aria-expanded', String(isOpen));
    };

    // Open and close the menu
    mobileMenu.addEventListener('click', () => toggleMenu());

    // Support keyboard navigation
    mobileMenu.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });

    // Close the menu when a navigation link is selected
    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => toggleMenu(true));
    });

    // Close the menu when Escape is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            toggleMenu(true);
            mobileMenu.focus();
        }
    });

    // Close the menu when the user taps outside it
    document.addEventListener('click', (event) => {
        const clickedInsideMenu =
            mobileMenu.contains(event.target) ||
            navLinks.contains(event.target);

        if (!clickedInsideMenu) {
            toggleMenu(true);
        }
    });

    // Close the mobile menu when returning to desktop layout
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            toggleMenu(true);
        }
    });
}


/* Reveal sections as they enter the viewport */
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


/* Change the header appearance when scrolling */
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

