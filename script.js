/* ==========================================================================
   Interactive JavaScript Logic - Siddharth Patwal Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileNav();
    initTypingEffect();
    initCounterAnimation();
    initSkillTabs();
    initCharts();
    initResumeModal();
});

/* --------------------------------------------------------------------------
   1. Navbar Scroll Effect & Active Link Highlight
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

/* --------------------------------------------------------------------------
   2. Mobile Navigation Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }
}

/* --------------------------------------------------------------------------
   3. Hero Dynamic Typing Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
    const phrases = [
        "Data Analytics & Insights",
        "Power BI & Excel Dashboards",
        "SQL Querying & Data Modeling",
        "Python (Pandas, NumPy, Seaborn)",
        "Machine Learning & AI (Watsonx)",
        "Python APIs (FastAPI, Flask)"
    ];
    
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIdx];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIdx === currentPhrase.length) {
            typeSpeed = 2200; // Pause at end of sentence
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* --------------------------------------------------------------------------
   4. Animated Metric Counter
   -------------------------------------------------------------------------- */
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(stat => {
                    const target = parseFloat(stat.getAttribute('data-target'));
                    const isDecimal = target % 1 !== 0 || target === 82 || target === 808;
                    
                    let start = 0;
                    const duration = 2000;
                    const startTime = performance.now();

                    function updateNumber(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Ease out quad
                        const currentProgress = progress * (2 - progress);
                        const currentValue = start + (target - start) * currentProgress;

                        if (target === 82) {
                            stat.textContent = (currentValue / 10).toFixed(1);
                        } else if (target === 808) {
                            stat.textContent = (currentValue / 100).toFixed(2);
                        } else {
                            stat.textContent = Math.floor(currentValue).toLocaleString();
                        }

                        if (progress < 1) {
                            requestAnimationFrame(updateNumber);
                        } else {
                            if (target === 82) stat.textContent = "8.2";
                            else if (target === 808) stat.textContent = "8.08";
                            else stat.textContent = target.toLocaleString();
                        }
                    }

                    requestAnimationFrame(updateNumber);
                });
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
}

/* --------------------------------------------------------------------------
   5. Skill Category Filtering Tabs
   -------------------------------------------------------------------------- */
function initSkillTabs() {
    const tabs = document.querySelectorAll('.skill-tab');
    const skillCards = document.querySelectorAll('.skill-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');

            skillCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   6. Chart.js Data Visualizations
   -------------------------------------------------------------------------- */
function initCharts() {
    // Chart 1: Netflix Content Breakdown
    const ctxNetflix = document.getElementById('netflixChart');
    if (ctxNetflix) {
        new Chart(ctxNetflix, {
            type: 'bar',
            data: {
                labels: ['United States', 'India (2nd)', 'United Kingdom', 'Japan', 'South Korea'],
                datasets: [
                    {
                        label: 'Movies',
                        data: [2818, 972, 534, 517, 301],
                        backgroundColor: '#06b6d4',
                        borderRadius: 6
                    },
                    {
                        label: 'TV Shows',
                        data: [1231, 79, 272, 169, 158],
                        backgroundColor: '#6366f1',
                        borderRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } }
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleColor: '#38bdf8',
                        borderColor: 'rgba(6,182,212,0.3)',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    y: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    }
                }
            }
        });
    }

    // Chart 2: Unemployment Trend Line Chart
    const ctxUnemp = document.getElementById('unemploymentChart');
    if (ctxUnemp) {
        new Chart(ctxUnemp, {
            type: 'line',
            data: {
                labels: ['Jan 2020', 'Feb 2020', 'Mar 2020', 'Apr 2020 (Peak)', 'May 2020', 'Jun 2020', 'Jul 2020', 'Aug 2020'],
                datasets: [
                    {
                        label: 'Urban Unemployment Rate (%)',
                        data: [9.2, 8.8, 9.4, 24.9, 21.4, 12.0, 9.1, 9.8],
                        borderColor: '#ec4899',
                        backgroundColor: 'rgba(236, 72, 153, 0.15)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4
                    },
                    {
                        label: 'Rural Unemployment Rate (%)',
                        data: [7.1, 6.9, 8.3, 22.8, 17.5, 10.5, 6.7, 7.6],
                        borderColor: '#38bdf8',
                        backgroundColor: 'rgba(56, 189, 248, 0.15)',
                        fill: true,
                        tension: 0.4,
                        pointRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#94a3b8', font: { family: 'Plus Jakarta Sans' } }
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleColor: '#38bdf8',
                        borderColor: 'rgba(6,182,212,0.3)',
                        borderWidth: 1
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    },
                    y: {
                        ticks: { color: '#94a3b8' },
                        grid: { color: 'rgba(255, 255, 255, 0.05)' }
                    }
                }
            }
        });
    }
}

/* --------------------------------------------------------------------------
   7. Resume Modal Controls
   -------------------------------------------------------------------------- */
function initResumeModal() {
    const openBtn = document.getElementById('openResumeBtn');
    const closeBtn = document.getElementById('closeResumeBtn');
    const closeModalBtn = document.getElementById('closeResumeModalBtn');
    const modal = document.getElementById('resumeModal');

    if (openBtn && modal) {
        openBtn.addEventListener('click', () => modal.classList.add('active'));
    }

    [closeBtn, closeModalBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => modal.classList.remove('active'));
        }
    });

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
}

/* --------------------------------------------------------------------------
   8. Utility Helpers: Copy Email & Toast Notifications
   -------------------------------------------------------------------------- */
function copyEmail() {
    const email = 'sidpatwal26@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
    }).catch(() => {
        showToast('Email: sidpatwal26@gmail.com');
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

/* Contact form: messages are emailed to Siddharth.
   1. Get a free access key at https://web3forms.com (enter sidpatwal26@gmail.com).
   2. Paste it below. Until then the form falls back to opening the visitor's email app. */
const WEB3FORMS_KEY = '0d53a388-8f64-418c-8ba7-28e0cf2efb75';
const CONTACT_EMAIL = 'sidpatwal26@gmail.com';

async function handleFormSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('contactForm');
    const btn = form.querySelector('button[type="submit"]');
    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    if (WEB3FORMS_KEY.startsWith('PASTE_')) {
        const body = encodeURIComponent('From: ' + data.name + ' (' + data.email + ')\n\n' + data.message);
        window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(data.subject) + '&body=' + body;
        showToast('Opening your email app to send the message.');
        return;
    }

    btn.disabled = true;
    try {
        const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
                access_key: WEB3FORMS_KEY,
                name: data.name,
                email: data.email,
                subject: 'Portfolio message: ' + data.subject,
                message: data.message
            })
        });
        const out = await res.json();
        if (!res.ok || !out.success) throw new Error(out.message || 'Request failed');
        showToast('Thank you! Your message has been sent.');
        form.reset();
    } catch (err) {
        showToast('Could not send. Please email ' + CONTACT_EMAIL + ' directly.');
    } finally {
        btn.disabled = false;
    }
}


/* Track switch: filter projects by focus */
(function(){
  const btns=document.querySelectorAll('.track-btn');
  const roles={all:null,data:'Data analyst',ai:'AI / ML engineer',backend:'Backend developer'};
  btns.forEach(b=>b.addEventListener('click',()=>{
    const t=b.dataset.track;
    btns.forEach(x=>x.classList.toggle('active',x===b));
    document.querySelectorAll('.project-card[data-track]').forEach(c=>{
      c.style.display=(t==='all'||c.dataset.track.split(' ').includes(t))?'':'none';
    });
    const p=document.getElementById('projects'); if(p&&t!=='all') p.scrollIntoView({behavior:'smooth'});
  }));
})();
