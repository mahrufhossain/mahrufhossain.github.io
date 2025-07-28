// js/script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        const mobileNavLinks = mobileMenu.querySelectorAll('a[href^="#"], a[href^="../index.html#"]');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });
    }

    // --- Smooth Scrolling for ALL navigation links (desktop and mobile) ---
    const allNavLinks = document.querySelectorAll('a[href^="#"], a[href^="../index.html#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const currentPath = window.location.pathname.split('/').pop();

            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.split('#')[1];
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else if (href.startsWith('../index.html#')) {
                // If on a sub-page and linking to an anchor on index.html
                if (currentPath !== 'index.html' && currentPath !== '' && !currentPath.endsWith('/')) {
                    // Allow default navigation to index.html#anchor
                    // No need to prevent default, let the browser navigate
                } else {
                    // If already on index.html or root, prevent default and scroll
                    e.preventDefault();
                    const targetId = href.split('#')[1];
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            }
        });
    });

    // --- Scroll-to-Top button functionality ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const scrollThreshold = 300; // Pixels to scroll before showing button

    function toggleScrollToTopButton() {
        if (scrollToTopBtn) { // Check if button exists before trying to access its style
            if (window.pageYOffset > scrollThreshold) {
                scrollToTopBtn.style.display = 'flex';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }
    }

    // Show/hide the button based on scroll position
    window.addEventListener('scroll', toggleScrollToTopButton);
    // Scroll to top when button is clicked
    if (scrollToTopBtn) { // Check if button exists before adding event listener
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    // Initial check for scroll to top button visibility on page load
    toggleScrollToTopButton();


    // --- Dark Theme Toggle Logic ---
    const htmlElement = document.documentElement; // Correctly targets the <html> tag

    // Desktop theme toggle elements
    const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
    const sunIconDesktop = document.getElementById('sun-icon-desktop');
    const moonIconDesktop = document.getElementById('moon-icon-desktop');

    // Mobile header theme toggle elements
    const themeToggleMobileHeader = document.getElementById('theme-toggle-mobile-header');
    const sunIconMobileHeader = document.getElementById('sun-icon-mobile-header');
    const moonIconMobileHeader = document.getElementById('moon-icon-mobile-header');

    // Function to set theme across all relevant elements
    function setTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark'); // Add 'dark' class to <html>

            // Desktop icons
            if (sunIconDesktop) sunIconDesktop.classList.add('opacity-0', 'pointer-events-none');
            if (moonIconDesktop) moonIconDesktop.classList.remove('opacity-0', 'pointer-events-none');

            // Mobile header icons
            if (sunIconMobileHeader) sunIconMobileHeader.classList.add('opacity-0', 'pointer-events-none');
            if (moonIconMobileHeader) moonIconMobileHeader.classList.remove('opacity-0', 'pointer-events-none');

            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark'); // Remove 'dark' class from <html>

            // Desktop icons
            if (sunIconDesktop) sunIconDesktop.classList.remove('opacity-0', 'pointer-events-none');
            if (moonIconDesktop) moonIconDesktop.classList.add('opacity-0', 'pointer-events-none');

            // Mobile header icons
            if (sunIconMobileHeader) sunIconMobileHeader.classList.remove('opacity-0', 'pointer-events-none');
            if (moonIconMobileHeader) moonIconMobileHeader.classList.add('opacity-0', 'pointer-events-none');

            localStorage.setItem('theme', 'light');
        }
        // Update the scroll-to-top button's color immediately on theme change
        updateScrollToTopButtonColor(theme);
    }

    // Function to update the scroll-to-top button's color based on theme
    function updateScrollToTopButtonColor(theme) {
        if (scrollToTopBtn) {
            if (theme === 'dark') {
                scrollToTopBtn.classList.remove('bg-blue-500', 'hover:bg-blue-600');
                scrollToTopBtn.classList.add('bg-teal-600', 'hover:bg-teal-700', 'text-white');
            } else {
                scrollToTopBtn.classList.remove('bg-teal-600', 'hover:bg-teal-700');
                scrollToTopBtn.classList.add('bg-blue-500', 'hover:bg-blue-600', 'text-white');
            }
        }
    }

    // --- IMPORTANT: Initial theme application for icons and scroll-to-top button on load ---
    // Check the actual state of the html element class, which was set by the synchronous script
    const initialTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(initialTheme); // Call setTheme to correctly set icon visibility and button color on load.

    // Event listeners for theme toggle buttons
    if (themeToggleDesktop) {
        themeToggleDesktop.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                setTheme('light');
            } else {
                setTheme('dark');
            }
        });
    }

    if (themeToggleMobileHeader) {
        themeToggleMobileHeader.addEventListener('click', () => {
            if (htmlElement.classList.contains('dark')) {
                setTheme('light');
            } else {
                setTheme('dark');
            }
        });
    }
});