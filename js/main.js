const currentPath = window.location.pathname;

const normalize = (path) => (path.endsWith("/") ? path.slice(0, -1) : path);
const pagePath = normalize(currentPath);

document.querySelectorAll(".nav-links a").forEach((link) => {
  const linkPath = normalize(new URL(link.href).pathname);
  if (linkPath === pagePath) {
    link.setAttribute("aria-current", "page");
  }
});

const focusSkip = document.querySelector(".skip-link");
if (focusSkip) {
  focusSkip.addEventListener("click", (event) => {
    const targetId = focusSkip.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });
}

// Scroll-triggered animations using Intersection Observer
const observerOptions = {
  root: null,
  rootMargin: "0px 0px -50px 0px",
  threshold: 0.1,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
  revealObserver.observe(el);
});

// Add reveal class to elements dynamically
document.addEventListener("DOMContentLoaded", () => {
  // Add reveal animations to panels and sections
  document.querySelectorAll(".panel, section h2, .card-grid").forEach((el, index) => {
    if (!el.classList.contains("reveal") && 
        !el.classList.contains("reveal-left") && 
        !el.classList.contains("reveal-right")) {
      el.classList.add("reveal");
      el.style.animationDelay = `${index * 0.1}s`;
      revealObserver.observe(el);
    }
  });
});

// Smooth reveal for dynamically loaded content
window.revealElements = (container) => {
  container.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
    revealObserver.observe(el);
  });
};
