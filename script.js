document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor tracking
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if (cursorDot && cursorRing) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX = mouseX;
        let ringY = mouseY;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly move dot
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });
        
        // Smoothly move ring
        const renderCursorRing = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            
            requestAnimationFrame(renderCursorRing);
        };
        renderCursorRing();
        
        // Hover effects
        const hoverables = document.querySelectorAll('a, button, .hoverable');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.style.width = '50px';
                cursorRing.style.height = '50px';
                cursorRing.style.backgroundColor = 'rgba(232, 25, 44, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.style.width = '36px';
                cursorRing.style.height = '36px';
                cursorRing.style.backgroundColor = 'transparent';
            });
        });
    }

    // Navigation Background and Scroll Highlight
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Shrink nav
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Highlight active link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
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

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuToggle && closeMenu && mobileNav) {
        menuToggle.addEventListener('click', () => {
            mobileNav.classList.add('open');
        });

        closeMenu.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
            });
        });
    }

    // Scroll Reveal with Staggering
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once revealed (uncomment below if desired)
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-reveal').forEach(section => {
        revealObserver.observe(section);
    });

    // Skill Modal Logic
    const skillData = {
        'dm': {
            title: 'DM Setting & Outreach',
            desc: 'Turned cold prospects into warm connections through personalized, strategic outreach. I don\'t just send messages; I start meaningful conversations that consistently fill pipelines and drive real revenue.'
        },
        'appointment': {
            title: 'Appointment Setting',
            desc: 'Mastered the art of the follow-up and objection handling. By seamlessly coordinating schedules and qualifying leads, I ensure your calendar is packed with high-intent prospects ready to close.'
        },
        'fb-ads': {
            title: 'Facebook Ads',
            desc: 'Designed and managed high-converting ad campaigns that maximize ROI. I meticulously analyze data, refine targeting, and optimize ad spend to turn clicks into loyal customers.'
        },
        'copywriting': {
            title: 'Copywriting',
            desc: 'Crafted compelling, conversion-focused copy that resonates with target audiences. From persuasive emails to engaging ad scripts, my writing captures attention and drives action.'
        },
        'content': {
            title: 'Content Creation',
            desc: 'Produced engaging, brand-aligned content that builds trust and authority. I know how to tell your story in a way that captivates your audience and keeps them coming back.'
        },
        'code': {
            title: 'HTML/CSS/JS',
            desc: 'Built responsive, visually stunning web experiences from the ground up. I blend clean code with modern design principles to create interfaces that aren\'t just functional, but unforgettable.'
        },
        'seo': {
            title: 'Basic SEO',
            desc: 'Implemented foundational SEO strategies that boost organic visibility. By optimizing site structure and content, I help businesses get found by the right people at the right time.'
        },
        'support': {
            title: 'Customer Support',
            desc: 'Delivered exceptional, empathetic frontline support that turns frustrated users into brand advocates. I resolve issues swiftly while maintaining a 5-star standard of care.'
        },
        'email': {
            title: 'Email Management',
            desc: 'Transformed chaotic inboxes into streamlined communication hubs. I handle inquiries efficiently and set up automated workflows so no opportunity ever slips through the cracks.'
        },
        'admin': {
            title: 'Admin & Scheduling',
            desc: 'Orchestrated complex schedules and handled day-to-day operations with precision. I take the administrative burden off your shoulders so you can focus entirely on scaling your business.'
        }
    };

    const skillBadges = document.querySelectorAll('.skill-badge');
    const modal = document.getElementById('skill-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const closeModal = document.querySelector('.close-modal');

    if (skillBadges.length > 0 && modal) {
        skillBadges.forEach(badge => {
            badge.addEventListener('click', () => {
                const skillKey = badge.getAttribute('data-skill');
                const data = skillData[skillKey];
                
                if (data) {
                    modalTitle.textContent = data.title;
                    modalDesc.textContent = data.desc;
                    modal.classList.add('open');
                }
            });
        });

        // Close modal handlers
        closeModal.addEventListener('click', () => {
            modal.classList.remove('open');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
            }
        });
    }

    // Back to Top Logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
