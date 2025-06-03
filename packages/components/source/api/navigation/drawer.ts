declare global {
  interface Window {
    UMDNavDrawerFeature: typeof UMDNavDrawerFeature;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Markup, Styles } from 'utilities';
import { SLOTS, MakeNavDrawer } from './common';
import {
  ComponentRegistration,
} from '../_types';

/**
 * Tag name for the navigation drawer web component
 */
const tagName = 'umd-element-nav-drawer';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.navigation.elements.drawer.Styles}
  ${Composite.navigation.elements.menuButton.Styles}
`;

const CreateNavigationDrawerElement = ({
  element,
}: {
  element: HTMLElement;
}) => {
  const container = document.createElement('div');
  const drawer = MakeNavDrawer({ element, ...SLOTS });
  if (!drawer) return null;
  const button = Composite.navigation.elements.menuButton.CreateElement({
    eventOpen: drawer.events.eventOpen,
  });

  container.appendChild(drawer.element);
  container.appendChild(button);

  return container;
};

class UMDNavDrawerFeature extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Markup.create.Node.stylesTemplate({ styles });
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const navDrawer = CreateNavigationDrawerElement({ element: this });
    if (!navDrawer) return;

    this._shadow.appendChild(navDrawer);
  }
}

/**
 * Navigation Drawer
 *
 * A mobile-friendly navigation drawer component that provides off-canvas navigation.
 * Includes a menu button trigger and sliding drawer panel for responsive navigation menus.
 *
 * ## Custom Element
 * `<umd-element-nav-drawer>`
 *
 * ## Slots
 * - `logo` - Site logo/branding
 * - `main-navigation` - Primary navigation links
 * - `utility-navigation` - Utility/secondary navigation links
 * - `footer-navigation` - Footer navigation links
 *
 * @example
 * ```html
 * <!-- Basic navigation drawer -->
 * <umd-element-nav-drawer>
 *   <a slot="logo" href="/">
 *     <img src="logo.svg" alt="Site Logo">
 *   </a>
 *   <nav slot="main-navigation">
 *     <ul>
 *       <li><a href="/about">About</a></li>
 *       <li><a href="/programs">Programs</a></li>
 *       <li><a href="/contact">Contact</a></li>
 *     </ul>
 *   </nav>
 * </umd-element-nav-drawer>
 * ```
 *
 * @example
 * ```html
 * <!-- Full navigation drawer -->
 * <umd-element-nav-drawer>
 *   <a slot="logo" href="/">Maryland</a>
 *   <nav slot="main-navigation">
 *     <ul>
 *       <li><a href="/academics">Academics</a></li>
 *       <li><a href="/research">Research</a></li>
 *       <li><a href="/campus">Campus Life</a></li>
 *     </ul>
 *   </nav>
 *   <nav slot="utility-navigation">
 *     <ul>
 *       <li><a href="/apply">Apply</a></li>
 *       <li><a href="/give">Give</a></li>
 *     </ul>
 *   </nav>
 *   <nav slot="footer-navigation">
 *     <ul>
 *       <li><a href="/privacy">Privacy</a></li>
 *       <li><a href="/accessibility">Accessibility</a></li>
 *     </ul>
 *   </nav>
 * </umd-element-nav-drawer>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const navDrawerRegistration: ComponentRegistration = () => {
  const hasElement =
    document.getElementsByTagName(tagName).length > 0;

  if (!window.customElements.get(tagName) && hasElement) {
    window.UMDNavDrawerFeature = UMDNavDrawerFeature;
    window.customElements.define(tagName, UMDNavDrawerFeature);
  }
};

export default navDrawerRegistration;
