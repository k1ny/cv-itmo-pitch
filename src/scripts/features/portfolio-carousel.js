const AUTO_SCROLL_DELAY = 4000;
const USER_PAUSE_DURATION = 10000;

export function initPortfolioCarousel() {
  const carousel = document.querySelector('[data-portfolio-carousel]');
  const cards = carousel ? [...carousel.querySelectorAll('.portfolio-card')] : [];
  const mobileViewport = window.matchMedia('(max-width: 980px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!carousel || cards.length < 2 || reducedMotion.matches) return;

  let isVisible = false;
  let isPointerDown = false;
  let autoScrollTimer;

  const scheduleAutoScroll = (delay = AUTO_SCROLL_DELAY) => {
    window.clearTimeout(autoScrollTimer);
    autoScrollTimer = window.setTimeout(() => {
      advanceCarousel();
      scheduleAutoScroll();
    }, delay);
  };

  const pauseAutoScroll = () => {
    scheduleAutoScroll(USER_PAUSE_DURATION);
  };

  const getCardLeft = (card) => {
    const carouselRect = carousel.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const paddingLeft = Number.parseFloat(getComputedStyle(carousel).paddingLeft) || 0;
    return carousel.scrollLeft + cardRect.left - carouselRect.left - paddingLeft;
  };

  const getCurrentIndex = () => {
    let currentIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, index) => {
      const distance = Math.abs(getCardLeft(card) - carousel.scrollLeft);
      if (distance >= closestDistance) return;
      closestDistance = distance;
      currentIndex = index;
    });

    return currentIndex;
  };

  const advanceCarousel = () => {
    if (!mobileViewport.matches || !isVisible || isPointerDown || document.hidden) return;

    const nextIndex = (getCurrentIndex() + 1) % cards.length;
    carousel.scrollTo({ left: getCardLeft(cards[nextIndex]), behavior: 'smooth' });
  };

  carousel.addEventListener('pointerdown', () => {
    isPointerDown = true;
    pauseAutoScroll();
  }, { passive: true });

  const finishPointerInteraction = () => {
    if (!isPointerDown) return;
    isPointerDown = false;
    pauseAutoScroll();
  };

  window.addEventListener('pointerup', finishPointerInteraction, { passive: true });
  window.addEventListener('pointercancel', finishPointerInteraction, { passive: true });
  carousel.addEventListener('wheel', pauseAutoScroll, { passive: true });
  carousel.addEventListener('focusin', pauseAutoScroll);
  carousel.addEventListener('keydown', pauseAutoScroll);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.2 });
    observer.observe(carousel);
  } else {
    isVisible = true;
  }

  scheduleAutoScroll();
}
