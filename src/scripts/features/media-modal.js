export function initMediaModal() {
  const modal = document.querySelector('[data-media-modal]');
  const modalImage = modal?.querySelector('[data-modal-image]');
  const modalCaption = modal?.querySelector('[data-modal-caption]');
  const closeButton = modal?.querySelector('[data-modal-close]');
  const triggers = document.querySelectorAll('[data-modal-image]:not(img)');

  if (!modal || !modalImage || !modalCaption || !closeButton) return;

  const closeModal = () => {
    modal.close();
    document.body.classList.remove('page-body--modal-open');
    modalImage.removeAttribute('src');
    modalImage.alt = '';
    modalCaption.textContent = '';
  };

  const openModal = (trigger) => {
    const source = trigger.dataset.modalImage;
    const caption = trigger.dataset.modalCaption ?? 'Изображение проекта';
    if (!source) return;

    modalImage.src = source;
    modalImage.alt = caption;
    modalCaption.textContent = caption;
    modal.showModal();
    document.body.classList.add('page-body--modal-open');
  };

  triggers.forEach((trigger) => trigger.addEventListener('click', () => openModal(trigger)));
  closeButton.addEventListener('click', closeModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });
  modal.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeModal();
  });
}
