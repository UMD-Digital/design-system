/**
 * Bundle export that includes all components and external library resources.
 * Includes all dependencies from web-elements-library, web-styles-library, web-feeds-library, web-utilities-library, and web-icons-library.
 */
import * as Components from '../api';
import { loadComponentClass } from './loader';
import * as Utilities from '@universityofmaryland/web-utilities-library';
import * as Icons from '@universityofmaryland/web-icons-library';
import * as Elements from '@universityofmaryland/web-elements-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import * as Feeds from '@universityofmaryland/web-feeds-library';

/**
 * Initializes all UMD web components and sets up utilities.
 */
const initializeBundle = () => {
  loadComponentClass(Components as any);
  Utilities.observeGridAnimations();
};

const UmdBundle = {
  init: initializeBundle,
  Components,
  Utilities,
  Icons,
  Elements,
  Styles,
  Feeds,
  libraries: {
    components: Components,
    elements: Elements,
    styles: Styles,
    feeds: Feeds,
    utilities: Utilities,
    icons: Icons,
  },
};

export {
  initializeBundle,
  Components,
  Utilities,
  Icons,
  Elements,
  Styles,
  Feeds,
};

export default UmdBundle;
