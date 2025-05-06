'use strict';

// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selectors ---
    const navElement = document.getElementById('main-nav');
    const navList = document.getElementById('main-nav-list');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const yearSpan = document.getElementById('current-year');
    const contactForm = document.getElementById('contact-form'); // Get the form

    // --- Configuration ---
    // const stickyNavHeight = navElement ? navElement.offsetHeight : 60; // Not strictly needed if relying on CSS scroll-padding

    // --- Update Footer Year ---
    if (yearSpan) {
        try {
            yearSpan.textContent = new Date().getFullYear();
        } catch (e) {
            console.error("Error setting current year:", e);
            yearSpan.textContent = "2025"; // Fallback year
        }
    }

    // --- Mobile Navigation Toggle ---
    if (mobileNavToggle && navList) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';

            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            mobileNavToggle.classList.toggle('active'); // For hamburger icon styling
            navList.classList.toggle('active');     // For showing/hiding nav list

            // Change aria-label for accessibility
            mobileNavToggle.setAttribute('aria-label', !isExpanded ? 'Fechar menu de navegação' : 'Abrir menu de navegação');

            // Optional: Lock body scroll when menu is open
            // document.body.classList.toggle('no-scroll', !isExpanded);
        });

        // Close mobile menu if a link inside it is clicked
        navList.addEventListener('click', (event) => {
            if (event.target.matches('a[href^="#"]')) { // Check if the clicked element is an anchor link
                if (navList.classList.contains('active')) {
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                    mobileNavToggle.classList.remove('active');
                    navList.classList.remove('active');
                    // document.body.classList.remove('no-scroll');
                }
            }
        });
    } else {
        // console.warn('Mobile navigation toggle or list not found.');
    }

    // --- Smooth Scrolling ---
    // Primarily handled by CSS: html { scroll-behavior: smooth; scroll-padding-top: var(--nav-height); }
    // JavaScript for smooth scrolling can be added as a fallback or for more complex scenarios,
    // but for this minimalist approach, CSS is preferred.
    // The navList click listener above already ensures the menu closes.

    // --- Contact Form Handling (with mailto:) ---
    if (contactForm) {
        // If using a third-party service like Formspree, this JS might not be needed,
        // or you'd add JS for AJAX submission to show success/error messages without page reload.
        // With mailto:, the browser handles the "submission" by opening the email client.
        // We can add a simple alert or log for user feedback if desired, but it won't send the email via JS.
        contactForm.addEventListener('submit', (event) => {
            // Note: With `mailto:`, `event.preventDefault()` would stop the email client from opening.
            // We generally let the default action proceed.
            console.log('Attempting to open email client for form submission...');

            // If you want to provide some feedback BEFORE the email client opens:
            // alert("Você será redirecionado ao seu cliente de email para enviar a mensagem.");

            // No actual email sending logic here, browser handles mailto:
        });
    }

}); // End DOMContentLoaded

// Optional CSS for body scroll lock (if you uncomment the JS lines):
// body.no-scroll {
//   overflow: hidden;
//   position: fixed; /* or position: relative; */
//   width: 100%;
//   height: 100%;
// }
