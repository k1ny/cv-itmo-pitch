import '../styles/index.css';
import { initClipboard } from './features/clipboard.js';
import { initMediaModal } from './features/media-modal.js';
import { initPrint } from './features/print.js';
import { initRevealAnimation } from './features/reveal.js';
import { initScrollNavigation } from './features/scroll-navigation.js';

initScrollNavigation();
initRevealAnimation();
initMediaModal();
initClipboard();
initPrint();
