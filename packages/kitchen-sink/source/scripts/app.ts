require('styles/kitchen-sink.css');

import LoadUmdComponents from '@universityofmaryland/web-components-library';
import Dropdown from './components/dropdown';
import LoadBackButton from './components/back-button';

document.addEventListener('DOMContentLoaded', () => {
  LoadUmdComponents();
  Dropdown();
  LoadBackButton();
});
