export function initPrint() {
  const button = document.querySelector('[data-print-button]');
  button?.addEventListener('click', () => window.print());
}
