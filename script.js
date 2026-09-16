// Ambient Mouse Glow Tracker
const glow = document.getElementById('cursor-glow');
window.addEventListener('pointermove', (e) => {
  if (!glow) return;
  glow.style.opacity = '1';
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});
document.addEventListener('mouseleave', () => {
  if (glow) glow.style.opacity = '0';
});

// Copy Email Interaction with Visual Feedback
const copyBtn = document.getElementById('copy-email-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email || 'himanshu@example.com';
    try {
      await navigator.clipboard.writeText(email);
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied to Clipboard! ✨';
      copyBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
      }, 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
}

// Active Nav Link Observer on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { threshold: 0.4 }
);
sections.forEach((sec) => observer.observe(sec));
