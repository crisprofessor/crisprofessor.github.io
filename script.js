'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- Elements ---
    const nav = document.getElementById('main-nav');
    const navList = document.getElementById('main-nav-list');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navLinks = navList.querySelectorAll('a[href^="#"]');
    const yearSpan = document.getElementById('current-year');

    // --- Config ---
    const stickyNavHeight = nav ? nav.offsetHeight : 60; // Get nav height or fallback

    // --- Set Current Year ---
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Navigation Toggle ---
    if (mobileNavToggle && navList) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNavToggle.classList.toggle('active'); // For hamburger icon styling
            navList.classList.toggle('active'); // Show/hide nav list

            // Change aria-label for accessibility
            mobileNavToggle.setAttribute('aria-label', !isExpanded ? 'Fechar menu' : 'Abrir menu');

            // Optional: Toggle body class to prevent scrolling (add .no-scroll { overflow: hidden; } to CSS)
            // document.body.classList.toggle('no-scroll', !isExpanded);
        });

        // Close mobile menu when a link inside it is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    mobileNavToggle.classList.remove('active');
                    navList.classList.remove('active');
                    // document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // --- Smooth Scrolling ---
    // Note: We rely more on html { scroll-behavior: smooth; scroll-padding-top: 70px; }
    // This JS provides a fallback and ensures clicks work even if CSS smooth scroll isn't supported,
    // and potentially allows for more precise offset calculation if needed later.
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Check if native smooth scroll is likely supported
                if (!('scrollBehavior' in document.documentElement.style)) {
                    e.preventDefault(); // Only prevent default if we need JS scroll
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - stickyNavHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'auto' // Use auto scroll if JS is handling it
                    });
                }
                // For browsers supporting CSS smooth scroll, the default link behavior
                // combined with html scroll-padding-top should handle it.
            }
        });
    });

    // --- Basic Form Handler Placeholder ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Replace with actual submission logic
            // For now, just log to console and allow default (which might fail)
            console.log('Form submitted (implement backend processing)');
            // event.preventDefault(); // Uncomment to stop submission for testing
            // alert('Implement form submission logic!');
        });
    }

}); // End DOMContentLoaded
