export function initRevealAnimation() {
  const elements = document.querySelectorAll('[data-reveal]');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('motion-reveal--visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('motion-reveal--visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });

  elements.forEach((element) => observer.observe(element));
}
