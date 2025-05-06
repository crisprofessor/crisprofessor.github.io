'use strict';

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selectors ---
    const navElement = document.getElementById('main-nav');
    const navList = document.getElementById('main-nav-list');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const yearSpan = document.getElementById('current-year');

    // --- Configuration ---
    const stickyNavHeight = navElement ? navElement.offsetHeight : 60;

    // --- Update Footer Year ---
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Mobile Navigation Toggle ---
    if (mobileNavToggle && navList) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';

            // Toggle ARIA attribute for accessibility
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);

            // Toggle classes for styling hamburger icon and showing/hiding the menu
            mobileNavToggle.classList.toggle('active');
            navList.classList.toggle('active');

            // Optional: Lock body scroll when menu is open
            // document.body.classList.toggle('no-scroll', !isExpanded);
        });

        // Close mobile menu if a link inside it is clicked
        // Use event delegation on the list for slightly better performance
        navList.addEventListener('click', (event) => {
            // Check if the clicked element is a link within the list
            if (event.target.matches('a[href^="#"]')) {
                if (navList.classList.contains('active')) {
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    mobileNavToggle.classList.remove('active');
                    navList.classList.remove('active');
                    // document.body.classList.remove('no-scroll');
                }
            }
        });
    } else {
        console.warn('Mobile navigation elements not found.');
    }


    // --- Smooth Scrolling (using CSS scroll-padding-top primarily) ---
    // Add click listeners to nav links to ensure menu closes and potentially
    // provide a JS fallback if needed, but rely on CSS for the scrolling itself.
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // The closing of the mobile menu is handled by the delegation above.
            // CSS `scroll-behavior: smooth` and `scroll-padding-top` handle the rest.
            // No need for `e.preventDefault()` or manual scrolling typically.
        });
    });


    // --- Placeholder for Contact Form ---
    const contactForm = document.getElementById('contact-form-id');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            // !! IMPORTANT !!
            // This is a placeholder. You NEED a backend service (like Netlify Forms,
            // Formspree, or your own server) to actually process the form data.
            // This example just logs to the console.
            console.log('Form submission attempted. Implement backend processing.');

            // Prevent actual submission for this example if you don't have a backend
            // event.preventDefault();
            // alert('Form functionality requires backend setup.');
        });
    }

}); // End DOMContentLoaded

// Optional CSS for body scroll lock (add to style.css if used)
// body.no-scroll { overflow: hidden; }
