require('styles/kitchen-sink.css');

import LoadUmdComponents from '@universityofmaryland/web-components-library';
import Dropdown from './components/dropdown';

document.addEventListener('DOMContentLoaded', () => {
  LoadUmdComponents();
  Dropdown();
});
