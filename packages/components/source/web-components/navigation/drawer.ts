import { navigation } from '@universityofmaryland/web-elements-library/composite';
import { Model } from '@universityofmaryland/web-model-library';
import { reset } from '../../helpers/styles';
import { SLOTS, MakeNavDrawer } from './common';
import { ComponentRegistration } from '../../_types';

const tagName = 'umd-element-nav-drawer';

export const styles = `
  :host {
    display: block;
  }

  ${reset}
  ${navigation.elements.drawer.Styles}
  ${navigation.elements.menuButton.Styles}
`;

const createComponent = (element: HTMLElement) => {
  const container = document.createElement('div');
  const drawer = MakeNavDrawer({ element, ...SLOTS });
  if (!drawer) return { element: container, styles };

  const button = navigation.elements.menuButton.CreateElement({
    eventOpen: drawer.events.eventOpen,
  });

  container.appendChild(drawer.element);
  container.appendChild(button);

  return { element: container, styles };
};

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
export const NavigationDrawer: ComponentRegistration = Model.defineComponent({
  tagName,
  createComponent,
}, { eager: false });

/** Backwards compatibility alias for grouped exports */
export { NavigationDrawer as drawer };
