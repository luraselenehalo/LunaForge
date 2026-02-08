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
