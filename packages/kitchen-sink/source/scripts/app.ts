require('styles/index.css');
import LoadUmdComponents from '@universityofmaryland/umd-web-components';
import { AlertsTest } from './elements/alerts';

document.addEventListener('DOMContentLoaded', () => {
  LoadUmdComponents();
  AlertsTest();
});
