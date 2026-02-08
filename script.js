/* ============================================================
   Partio Marketing Website - JavaScript
   ============================================================ */

(function () {
    'use strict';

    // --- Theme Toggle ---
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    function getPreferredTheme() {
        const stored = localStorage.getItem('partio-theme');
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('partio-theme', theme);
    }

    setTheme(getPreferredTheme());

    themeToggle.addEventListener('click', function () {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!localStorage.getItem('partio-theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // --- Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });

    // Close mobile nav on outside click
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-inner')) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        }
    });

    // --- Tabs ---
    document.querySelectorAll('.tabs, .start-tabs').forEach(function (tabContainer) {
        var buttons = tabContainer.querySelectorAll('.tab-btn');
        var panels = tabContainer.querySelectorAll('.tab-panel');

        buttons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var target = btn.getAttribute('data-tab');

                buttons.forEach(function (b) { b.classList.remove('active'); });
                panels.forEach(function (p) { p.classList.remove('active'); });

                btn.classList.add('active');
                var panel = tabContainer.querySelector('#tab-' + target);
                if (panel) panel.classList.add('active');
            });
        });
    });

    // --- Copy to Clipboard ---
    document.querySelectorAll('.copy-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var codeBlock = btn.closest('.code-block');
            var code = codeBlock.querySelector('pre').textContent;

            navigator.clipboard.writeText(code).then(function () {
                btn.classList.add('copied');
                btn.querySelector('span').textContent = 'Copied!';
                setTimeout(function () {
                    btn.classList.remove('copied');
                    btn.querySelector('span').textContent = 'Copy';
                }, 2000);
            });
        });
    });

    // --- Scroll-based Nav Background ---
    var nav = document.getElementById('nav');
    var lastScroll = 0;

    window.addEventListener('scroll', function () {
        var scrollY = window.scrollY;
        if (scrollY > 20) {
            nav.style.borderBottomColor = 'var(--border)';
        } else {
            nav.style.borderBottomColor = 'var(--border-light)';
        }
        lastScroll = scrollY;
    }, { passive: true });

    // --- Intersection Observer for Animations ---
    var animateElements = document.querySelectorAll(
        '.benefit-card, .use-case-card, .dashboard-card, .sdk-card, .strategy-card, .db-card, .arch-node, .feature-group, .api-group, .start-step'
    );

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        animateElements.forEach(function (el) {
            el.classList.add('animate-target');
            observer.observe(el);
        });
    }

    // --- Active Nav Highlighting ---
    var sections = document.querySelectorAll('section[id]');
    var navAnchors = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        var scrollPos = window.scrollY + 120;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var bottom = top + section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navAnchors.forEach(function (a) {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + id) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();
})();
