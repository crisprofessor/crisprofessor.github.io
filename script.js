document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration ---
    const smoothScrollOffset = 70; // Adjust based on sticky nav height
    const scrollSpyThreshold = 0.4; // Percentage of section visibility to trigger active state
    const mobileBreakpoint = 768; // Matches CSS media query

    // --- Elements ---
    const nav = document.getElementById('main-nav');
    const navList = document.getElementById('main-nav-list');
    const navLinks = navList.querySelectorAll('a[href^="#"]');
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const sections = document.querySelectorAll('main section[id]'); // Get sections with IDs
    const animatedSections = document.querySelectorAll('.fade-in-section');
    const currentDateSpan = document.getElementById('current-date');

    // --- Update Current Date ---
    if (currentDateSpan) {
        currentDateSpan.textContent = new Date().toLocaleDateString('pt-BR');
    }

    // --- Mobile Navigation Toggle ---
    if (mobileNavToggle && navList) {
        mobileNavToggle.addEventListener('click', () => {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
            navList.classList.toggle('active');
            mobileNavToggle.classList.toggle('active'); // For styling the button itself (e.g., change icon)
            // Optional: Toggle body class to prevent scrolling when menu is open
            // document.body.classList.toggle('no-scroll');
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < mobileBreakpoint && navList.classList.contains('active')) {
                     mobileNavToggle.setAttribute('aria-expanded', 'false');
                     navList.classList.remove('active');
                     mobileNavToggle.classList.remove('active');
                     // document.body.classList.remove('no-scroll');
                }
            });
        });
    }

    // --- Smooth Scrolling ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - smoothScrollOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Optional: Update URL hash without jumping
                // history.pushState(null, null, targetId);
            }
        });
    });

    // --- Scrollspy (Active Link Highlighting) ---
    const activateNavLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= scrollSpyThreshold) {
                 activateNavLink(entry.target.id);
            }
        });
        // Fallback for when no section is prominently in view (e.g., top/bottom of page)
        // Find the first one that's at least partially visible from the top
        let firstVisibleSection = null;
        for (const section of sections) {
             const rect = section.getBoundingClientRect();
             // Check if top of section is above the bottom of viewport AND bottom of section is below the top of viewport + offset
             if (rect.top < window.innerHeight && rect.bottom > smoothScrollOffset) {
                  firstVisibleSection = section.id;
                  break;
             }
        }
        if (!document.querySelector('#main-nav-list a.active') && firstVisibleSection) {
             // activateNavLink(firstVisibleSection); // Can sometimes be jumpy, activate only on threshold crossing for stability
        }

    }, {
        rootMargin: `-${smoothScrollOffset}px 0px -${window.innerHeight - smoothScrollOffset - 100}px 0px`, // Adjust trigger zone based on nav height
        threshold: scrollSpyThreshold
    });

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });

    // --- Scroll Animations (Fade-in) ---
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    animatedSections.forEach(section => {
        animationObserver.observe(section);
    });

    // --- Basic Form Handler Placeholder ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent default for now, replace with actual submission logic
            // event.preventDefault();
            // alert('Formulário enviado! (Funcionalidade de envio real precisa ser implementada)');
            // Add actual form submission logic here (e.g., using fetch to send data)
            // this.reset(); // Optional: Reset form
        });
    }

}); // End DOMContentLoaded
