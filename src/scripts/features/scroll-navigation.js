export function initScrollNavigation() {
  const progress = document.querySelector('[data-scroll-progress]');
  const scrollTopButton = document.querySelector('[data-scroll-top]');
  const navigationLinks = [...document.querySelectorAll('.site-navigation__link[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];

  if (!progress || !scrollTopButton) return;

  const updateScrollState = () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress.value = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    scrollTopButton.classList.toggle('scroll-top--visible', window.scrollY > 600);

    let activeSectionId = '';
    for (const section of sections) {
      if (window.scrollY >= section.offsetTop - 160) activeSectionId = section.id;
    }

    for (const link of navigationLinks) {
      const isActive = link.hash === `#${activeSectionId}`;
      link.classList.toggle('site-navigation__link--active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };

  window.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('resize', updateScrollState, { passive: true });
  scrollTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  updateScrollState();
}
