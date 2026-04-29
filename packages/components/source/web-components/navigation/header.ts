import { navigation } from '@universityofmaryland/web-elements-library/composite';
import {
  createSlot,
  createStyledSlotOrClone,
} from '@universityofmaryland/web-utilities-library/elements';
import { Attributes, Model } from '@universityofmaryland/web-model-library';
import { reset } from '../../helpers/styles';
import { SLOTS as GlobalSlots, MakeNavDrawer } from './common';
import { ComponentRegistration } from '../../_types';

const ELEMENT_NAME = 'umd-element-navigation-header';
const ATTRIBUTE_SEARCH_URL = 'search-url';
const ATTRIBUTE_CTA_URL = 'cta-url';
const ATTRIBUTE_CTA_TEXT = 'cta-text';
const SLOTS = {
  LOGO: 'logo',
  NAVIGATION: 'main-navigation',
  UTILITY: 'utility-navigation',
  ...GlobalSlots,
};

const styles = `
  :host {
    display: block;
  }

  ${reset}
  ${navigation.elements.drawer.Styles}
  ${navigation.header.Styles}
`;

/**
 * Navigation Header
 *
 * A comprehensive header navigation component that includes logo, main navigation,
 * utility navigation, search, and optional call-to-action. Supports sticky positioning
 * and responsive mobile drawer navigation.
 *
 * ## Custom Element
 * `<umd-element-navigation-header>`
 *
 * ## Slots
 * - `logo` - Site logo/branding (required)
 * - `main-navigation` - Container for umd-element-nav-item components
 * - `utility-navigation` - Utility/secondary navigation links
 *
 * ## Attributes
 * - `search-url` - URL for search functionality
 * - `cta-url` - URL for call-to-action button
 * - `cta-text` - Text for call-to-action button
 * - `sticky` - Enable sticky header behavior:
 *   - `true` - Header sticks to top on scroll
 *
 * ## Observed Attributes
 * - `sticky` - Dynamically toggle sticky behavior
 * - `data-layout-rerender` - Set to `"true"` to rebuild the header (and its
 *   internal mobile drawer) after slot content changes. Newly added
 *   `umd-element-nav-item` children — either as direct descendants with
 *   `slot="nav-item-N"` or wrapped inside a fresh `<div slot="main-navigation">`
 *   — are picked up on the next build. Dispatches a `component:layout-rerender`
 *   CustomEvent on completion with `detail.previousSize` and `detail.currentSize`.
 *
 * @example
 * ```js
 * // Trigger a rerender after dynamically updating slot content
 * const header = document.querySelector('umd-element-navigation-header');
 * header.addEventListener('component:layout-rerender', (e) => {
 *   console.log('header rerendered', e.detail.previousSize, e.detail.currentSize);
 * });
 * header.setAttribute('data-layout-rerender', 'true');
 * ```
 *
 * @example
 * ```html
 * <!-- Basic header -->
 * <umd-element-navigation-header>
 *   <a slot="logo" href="/">
 *     <img src="logo.svg" alt="University of Maryland">
 *   </a>
 *   <div slot="main-navigation">
 *     <umd-element-nav-item>
 *       <a slot="primary-link" href="/about">About</a>
 *     </umd-element-nav-item>
 *     <umd-element-nav-item>
 *       <a slot="primary-link" href="/academics">Academics</a>
 *     </umd-element-nav-item>
 *   </div>
 * </umd-element-navigation-header>
 * ```
 *
 * @example
 * ```html
 * <!-- Full header with search and CTA -->
 * <umd-element-navigation-header
 *   search-url="/search"
 *   cta-url="/apply"
 *   cta-text="Apply Now"
 *   sticky="true">
 *   <a slot="logo" href="/">Maryland</a>
 *   <div slot="main-navigation">
 *     <umd-element-nav-item>
 *       <a slot="primary-link" href="/academics">Academics</a>
 *       <nav slot="dropdown-links">
 *         <ul>
 *           <li><a href="/undergraduate">Undergraduate</a></li>
 *           <li><a href="/graduate">Graduate</a></li>
 *         </ul>
 *       </nav>
 *     </umd-element-nav-item>
 *   </div>
 *   <nav slot="utility-navigation">
 *     <ul>
 *       <li><a href="/news">News</a></li>
 *       <li><a href="/events">Events</a></li>
 *     </ul>
 *   </nav>
 * </umd-element-navigation-header>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const CreateNavItemSlots = ({ element }: { element: HTMLElement }) => {
  const { NAVIGATION } = SLOTS;

  const existingItems = Array.from(
    element.querySelectorAll(
      ':scope > umd-element-nav-item[slot^="nav-item-"]',
    ),
  ) as HTMLElement[];

  const navigationSlot = element.querySelector(
    `:scope > [slot="${NAVIGATION}"]`,
  ) as HTMLElement | null;

  const newItems = navigationSlot
    ? (Array.from(
        navigationSlot.querySelectorAll(':scope > umd-element-nav-item'),
      ) as HTMLElement[])
    : [];

  const allItems = [...existingItems, ...newItems];
  const navItems: HTMLElement[] = [];

  allItems.forEach((item, i) => {
    const slotAttr = `nav-item-${i}`;
    if (item.getAttribute('slot') !== slotAttr) {
      item.setAttribute('slot', slotAttr);
    }
    if (item.parentElement !== element) {
      element.appendChild(item);
    }
    navItems.push(createSlot(slotAttr));
  });

  if (navigationSlot) {
    navigationSlot.remove();
  }

  return navItems;
};

const CreateHeader = ({
  element,
  eventOpen,
}: {
  element: HTMLElement;
  eventOpen?: () => void;
}) => {
  const { LOGO, UTILITY } = SLOTS;
  const logoSlot = createStyledSlotOrClone({
    element,
    slotRef: LOGO,
  });

  const utilitySlotElement = element.querySelector(
    `[slot="${UTILITY}"]`,
  ) as HTMLElement;
  const utilityRow =
    utilitySlotElement?.childElementCount > 0 ? createSlot(UTILITY) : null;
  const searchUrl = element.getAttribute(ATTRIBUTE_SEARCH_URL);
  const ctaUrl = element.getAttribute(ATTRIBUTE_CTA_URL);
  const ctaText = element.getAttribute(ATTRIBUTE_CTA_TEXT);

  if (!logoSlot) {
    console.error('UMDHeaderElement: Logo slot is required');
  }

  const value = navigation.header.CreateElement({
    logo: logoSlot,
    utilityRow,
    navItems: CreateNavItemSlots({ element }),
    eventOpen,
    searchUrl,
    ctaUrl,
    ctaText,
  });

  return value;
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.rerender({
    callback: (element) => element.events?.rerender?.(),
  }),
  {
    name: 'sticky',
    handler: (ref: any, _oldValue: string | null, newValue: string | null) => {
      ref.events?.sticky?.({ isSticky: newValue === 'true' });
    },
  },
);

const createComponent = (element: HTMLElement) => {
  const container = document.createElement('div');
  let stickyEvent: ((args: { isSticky: boolean }) => void) | undefined;

  const build = () => {
    container.replaceChildren();

    const drawer = MakeNavDrawer({
      element,
      ...SLOTS,
      displayType: 'drawer-nav',
      excludeSlots: ['nav-item-'],
    });
    const headerProps: { element: HTMLElement; eventOpen?: () => void } = {
      element,
    };

    if (drawer) {
      container.appendChild(drawer.element);
      headerProps.eventOpen = drawer.events.eventOpen;
    }

    const headerRef = CreateHeader(headerProps);
    container.appendChild(headerRef.element);
    stickyEvent = headerRef.events.sticky;
  };

  build();

  return {
    element: container,
    styles,
    events: {
      sticky: (args: { isSticky: boolean }) => stickyEvent?.(args),
      rerender: build,
    },
  };
};

export const NavigationHeader: ComponentRegistration = Model.defineComponent({
  tagName: ELEMENT_NAME,
  createComponent,
  attributes,
}, { eager: false });

/** Backwards compatibility alias for grouped exports */
export { NavigationHeader as header };
