

// Mobile menu
const mobileMenu = document.querySelector('.mobile-menu')
const navLinks = document.querySelector('.nav-links')

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active')
    mobileMenu.classList.toggle('active')
})

// Scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'translateY(0)'
        }
    })
}, observerOptions)

document.querySelectorAll('section').forEach((section) => {
    section.style.opacity = '0'
    section.style.transform = "translateY(30px)"
    section.style.transition = "all 0.6s ease"

    observer.observe(section)
})

window.addEventListener('scroll', () => {
    document.querySelector('header').classList.toggle('scrolled', window.scrollY > 50);
});