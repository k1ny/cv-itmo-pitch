export function initClipboard() {
  const buttons = document.querySelectorAll('[data-copy-value]');

  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copyValue;
      if (!value) return;

      const initialText = button.textContent;
      try {
        await navigator.clipboard.writeText(value);
        button.textContent = 'Скопировано';
        window.setTimeout(() => { button.textContent = initialText; }, 1400);
      } catch {
        window.location.href = `mailto:${value}`;
      }
    });
  });
}
