import { navigation } from '@universityofmaryland/web-elements-library/composite';
import { Attributes, Model } from '@universityofmaryland/web-model-library';
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

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.rerender({
    callback: (element) => element.events?.rerender?.(),
  }),
);

const createComponent = (element: HTMLElement) => {
  const container = document.createElement('div');

  const build = () => {
    container.replaceChildren();
    const drawer = MakeNavDrawer({ element, ...SLOTS });
    if (!drawer) return;

    const button = navigation.elements.menuButton.CreateElement({
      eventOpen: drawer.events.eventOpen,
    });

    container.appendChild(drawer.element);
    container.appendChild(button);
  };

  build();

  return {
    element: container,
    styles,
    events: {
      rerender: build,
    },
  };
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
 * ## Observed Attributes
 * - `data-layout-rerender` - Set to `"true"` to rebuild the drawer after slot content
 *   changes. Dispatches a `component:layout-rerender` CustomEvent on completion with
 *   `detail.previousSize` and `detail.currentSize` so consumers can react to layout shifts.
 *
 * @example
 * ```js
 * // Trigger a rerender after dynamically updating slot content
 * const drawer = document.querySelector('umd-element-nav-drawer');
 * drawer.addEventListener('component:layout-rerender', (e) => {
 *   console.log('drawer rerendered', e.detail.previousSize, e.detail.currentSize);
 * });
 * drawer.setAttribute('data-layout-rerender', 'true');
 * ```
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
  attributes,
}, { eager: false });

/** Backwards compatibility alias for grouped exports */
export { NavigationDrawer as drawer };
