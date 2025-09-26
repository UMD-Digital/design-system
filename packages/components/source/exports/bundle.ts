/**
 * Bundle export that includes all components and external library resources.
 * Includes all dependencies from web-elements-library, web-styles-library, and web-feeds-library.
 */
import * as Components from '../api';
import { loadComponentClass } from './loader';
import * as Utilities from '../utilities';
import * as Elements from '@universityofmaryland/web-elements-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import * as Feeds from '@universityofmaryland/web-feeds-library';

/**
 * Initializes all UMD web components and sets up utilities.
 */
const initializeBundle = () => {
  loadComponentClass(Components as any);
  Utilities.Animations.loadIntersectionObserver();
};

const UmdBundle = {
  init: initializeBundle,
  Components,
  Utilities,
  Elements,
  Styles,
  Feeds,
  libraries: {
    components: Components,
    elements: Elements,
    styles: Styles,
    feeds: Feeds,
    utilities: Utilities,
  },
};

export {
  initializeBundle,
  Components,
  Utilities,
  Elements,
  Styles,
  Feeds,
};

export default UmdBundle;