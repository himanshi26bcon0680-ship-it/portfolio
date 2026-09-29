document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const menuBtn = document.getElementById('menuBtn'), navMenu = document.getElementById('navMenu');
  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => navMenu.classList.toggle('active'));
    navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navMenu.classList.remove('active')));
  }

  // GSAP Cinematic Reveal Animations
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.8 } });
    tl.from('.navbar', { y: -30, opacity: 0, duration: 0.6 })
      .from('.hero-pill', { scale: 0.85, opacity: 0, duration: 0.4 }, '-=0.2')
      .from('.hero-h1', { y: 25, opacity: 0, duration: 0.7 }, '-=0.3')
      .from('.hero-desc', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.hero-btns .btn', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.4')
      .from('.hero-stats .stat-pill', { scale: 0.9, opacity: 0, stagger: 0.08, duration: 0.5 }, '-=0.3');

    gsap.to('.glow-blue', { x: 30, y: 25, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.glow-purple', { x: -30, y: -30, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });

    const reveal = (elem, y = 30, stagger = 0.1) => gsap.from(elem, { scrollTrigger: { trigger: elem, start: 'top 85%' }, y, opacity: 0, stagger, duration: 0.75, ease: 'power2.out' });
    reveal('.sec-head'); reveal('.about-main, .feature-card', 25); reveal('.edu-card', 30);
    reveal('.svc-card', 30, 0.1); reveal('.proj-card', 35, 0.12); reveal('.resume-box'); reveal('.contact-wrap');
  }

  // Resume Downloader
  const downloadResume = () => {
    const cv = `HIMANSHI - CURRICULUM VITAE (2026)\nUndergraduate: B.Tech Computer Science & AI (2025 - 2029)\nEmail: himanshi@example.com | Focus: AI Agents, Computer Vision & Minimalist UI\n\nCORE SKILLS:\n• AI & Agents: Multimodal Systems, Agentic Workflows, Gamma Decks\n• Computer Vision: OpenCV, Pose Estimation, Real-time Anomaly Detection\n• Web Engineering: HTML5, Modern CSS (15-shade palette), Vanilla JS, GSAP\n• Visual Design: ATS-Optimized Resumes, Figma, Event Collateral\n\nPROJECT HIGHLIGHTS:\n1. Doraemon vs AI Agents - Comparative multimodal study on Gamma\n2. Women Safety Analytics - OpenCV vision pipeline for distress recognition\n3. Fluid GSAP Portfolio - Ultra-responsive lightweight web engine (<500 lines)\n\nEDUCATION: B.Tech CS & AI (2025-2029) | XII Science & Mathematics (Distinction)`;
    const blob = new Blob([cv], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'Himanshi_AI_Resume_2026.txt';
    a.click(); URL.revokeObjectURL(a.href);
  };
  const resumeBtn = document.getElementById('downloadResumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      downloadResume(); resumeBtn.textContent = '✓ Downloaded Successfully! 📥';
      setTimeout(() => { resumeBtn.textContent = '📥 Download Resume (CV)'; }, 3000);
    });
  }

  // Autonomous Chatbot Knowledge Base & Logic
  const panel = document.getElementById('chatPanel'), chatMsgs = document.getElementById('chatMsgs'), chatInput = document.getElementById('chatInput');
  const togglePanel = (show) => panel && panel.classList.toggle('active', show);
  document.getElementById('chatToggle')?.addEventListener('click', () => togglePanel());
  document.getElementById('chatClose')?.addEventListener('click', () => togglePanel(false));
  document.getElementById('chatHeroBtn')?.addEventListener('click', () => { togglePanel(true); chatInput?.focus(); });

  const answers = {
    bio: "👩‍💻 Himanshi is a First-Year B.Tech CS & AI scholar exploring computer vision, autonomous agents, and refined minimalist UI design.",
    services: "🛠️ Services: 1) ATS Resume & CV Architecture (95%+ pass), 2) Event Pamphlets & Flyers, 3) Fast GSAP Web Systems, 4) AI Research Decks.",
    projects: "🚀 Featured: 🔮 Doraemon vs AI Agents, 🛡️ Women Safety Analytics, ⚡ Fluid GSAP Portfolio Engine, and 📑 Collegiate Event Suites.",
    resume: "📄 Himanshi's ATS resume is ready! Downloading a copy for you now...",
    contact: "📬 Email Himanshi directly at himanshi@example.com, or submit the contact form below!"
  };
  const sendMsg = (txt, isBot = true) => {
    if (!chatMsgs) return;
    const b = document.createElement('div'); b.className = isBot ? 'bot-bubble' : 'user-bubble';
    b.textContent = txt; chatMsgs.appendChild(b); chatMsgs.scrollTop = chatMsgs.scrollHeight;
  };
  const reply = (q) => {
    sendMsg(q, false); const s = q.toLowerCase();
    setTimeout(() => {
      if (s.includes('who') || s.includes('himanshi') || s.includes('about')) sendMsg(answers.bio);
      else if (s.includes('service') || s.includes('offer') || s.includes('hire')) sendMsg(answers.services);
      else if (s.includes('project') || s.includes('work') || s.includes('build')) sendMsg(answers.projects);
      else if (s.includes('resume') || s.includes('cv') || s.includes('download')) { sendMsg(answers.resume); downloadResume(); }
      else if (s.includes('contact') || s.includes('email') || s.includes('reach')) sendMsg(answers.contact);
      else sendMsg(`🤖 I analyzed "${q}". Himanshi specializes in AI, Computer Vision, and UI UX design. Would you like to check her projects or download her resume?`);
    }, 320);
  };
  document.getElementById('chatForm')?.addEventListener('submit', (e) => {
    e.preventDefault(); if (!chatInput?.value.trim()) return;
    reply(chatInput.value.trim()); chatInput.value = '';
  });
  document.querySelectorAll('.chip-btn').forEach(btn => btn.addEventListener('click', () => reply(btn.dataset.q)));

  // Contact Form Feedback
  const cForm = document.getElementById('contactForm'), fMsg = document.getElementById('formMsg');
  if (cForm && fMsg) {
    cForm.addEventListener('submit', (e) => {
      e.preventDefault(); fMsg.innerHTML = '✨ Message sent successfully! Himanshi will get back to you shortly.';
      fMsg.style.color = 'var(--a2)'; cForm.reset(); setTimeout(() => { fMsg.innerHTML = ''; }, 4500);
    });
  }
});
