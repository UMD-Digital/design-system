/**
 * Bundle export that includes all components and external library resources.
 * Includes all dependencies from web-elements-library, web-styles-library, web-feeds-library, web-utilities-library, web-icons-library, web-model-library, and web-token-library.
 */
import * as Components from '../web-components';
import { loadComponentClass } from './loader';
import * as Utilities from '@universityofmaryland/web-utilities-library';
import * as Icons from '@universityofmaryland/web-icons-library';
import * as Elements from '@universityofmaryland/web-elements-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import * as Feeds from '@universityofmaryland/web-feeds-library';
import * as Model from '@universityofmaryland/web-model-library';
import * as Tokens from '@universityofmaryland/web-token-library';

/**
 * Initializes all UMD web components and sets up utilities.
 */
export const initializeBundle = () => {
  loadComponentClass(Components as any);
  Utilities.observeGridAnimations();
};

/**
 * Complete UMD Bundle with all libraries and components.
 */
export const UmdBundle = {
  init: initializeBundle,
  Components,
  Utilities,
  Icons,
  Elements,
  Styles,
  Tokens,
  Model,
  Feeds,
  libraries: {
    components: Components,
    elements: Elements,
    styles: Styles,
    tokens: Tokens,
    model: Model,
    feeds: Feeds,
    utilities: Utilities,
    icons: Icons,
  },
};

export {
  Components,
  Utilities,
  Icons,
  Elements,
  Styles,
  Tokens,
  Model,
  Feeds,
};
