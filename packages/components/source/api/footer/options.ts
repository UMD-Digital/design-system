import { footer } from '@universityofmaryland/web-elements-library/composite';
import { Attributes, Register } from 'model';
import type {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-footer';

/**
 * Available slot names for the footer component
 * @internal
 */
export const SLOTS = {
  BACKGROUND_IMAGE: 'background-image',
  CONTACT_HEADLINE: 'contact-headline',
  CONTACT_LINKS: 'contact-links',
  CONTACT_ADDRESS: 'contact-address',
  CTA: 'call-to-action',
  SOCIAL: 'social-links',
  UTILITY: 'utility-links',
  LINK_COLUMN_ONE: 'link-column-one',
  LINK_COLUMN_TWO: 'link-column-two',
  LINK_COLUMN_THREE: 'link-column-three',
  LOGO: 'logo',
};

/**
 * Slot configuration for the footer component
 * @internal
 */
const slots: SlotConfiguration = {
  [`${SLOTS.BACKGROUND_IMAGE}`]: {
    allowedElements: ['img'],
  },
};

/**
 * Creates a footer component based on type and populated slots
 * @param element - The host HTML element
 * @returns Configured footer component
 * @internal
 */
const createComponent: CreateComponentFunction = (element) => {
  const isTypeMega = element.getAttribute('type') === 'mega';
  const isTypeVisual = element.getAttribute('type') === 'visual';
  const isCampaignForward = Attributes.isVisual.campaign({ element });
  const columnOne = element.querySelector(
    `[slot="${SLOTS.LINK_COLUMN_ONE}"]`,
  ) as HTMLSlotElement;
  const columnTwo = element.querySelector(
    `[slot="${SLOTS.LINK_COLUMN_TWO}"]`,
  ) as HTMLSlotElement;
  const columnThree = element.querySelector(
    `[slot="${SLOTS.LINK_COLUMN_THREE}"]`,
  ) as HTMLSlotElement;
  const hasLandmark = element.hasAttribute('role');
  const hasLabel = element.hasAttribute('aria-label');
  const columns = [];
  let isTypeSimple = element.getAttribute('type') === 'simple';

  const logoElement = element.querySelector(`[slot="${SLOTS.LOGO}"]`) as
    | HTMLImageElement
    | HTMLAnchorElement;

  if (logoElement && logoElement instanceof HTMLAnchorElement) {
    const logoImage = logoElement.querySelector('img');

    if (!logoImage) {
      console.error('No logo element found in logo slot');
    }
  }

  if (columnOne && columnOne.hasChildNodes()) {
    columns.push(columnOne);
  }
  if (columnTwo && columnTwo.hasChildNodes()) {
    columns.push(columnTwo);
  }
  if (columnThree && columnThree.hasChildNodes()) {
    columns.push(columnThree);
  }

  if (!isTypeMega && !isTypeVisual) {
    isTypeSimple = true;
  }

  if (!hasLandmark) {
    element.setAttribute('role', 'contentinfo');
  }

  if (!hasLabel) {
    element.setAttribute('aria-label', 'site footer');
  }

  return footer.options({
    isThemeLight: Attributes.isTheme.light({ element }),
    isTypeSimple,
    isTypeVisual,
    isTypeMega,
    isCampaignForward,
    slotVisualImage: element.querySelector(
      `[slot="${SLOTS.BACKGROUND_IMAGE}"]`,
    ) as HTMLImageElement,
    slotUtilityLinks: element.querySelector(
      `[slot="${SLOTS.UTILITY}"]`,
    ) as HTMLElement,
    slotCta: element.querySelector(
      `[slot="${SLOTS.CTA}"]`,
    ) as HTMLAnchorElement,
    slotLogo: element.querySelector(`[slot="${SLOTS.LOGO}"]`) as
      | HTMLImageElement
      | HTMLAnchorElement,
    slotAddress: element.querySelector(
      `[slot="${SLOTS.CONTACT_ADDRESS}"]`,
    ) as HTMLSlotElement,
    slotContentLinks: element.querySelector(
      `[slot="${SLOTS.CONTACT_LINKS}"]`,
    ) as HTMLSlotElement,
    slotHeadline: element.querySelector(
      `[slot="${SLOTS.CONTACT_HEADLINE}"]`,
    ) as HTMLSlotElement,
    slotSocialLinks: element.querySelector(
      `[slot="${SLOTS.SOCIAL}"]`,
    ) as HTMLSlotElement,
    slotColumns: columns.length > 0 ? columns : undefined,
  });
};

/**
 * Footer Component
 *
 * A versatile footer component with three layout options for different site needs.
 * Automatically adds accessibility attributes if not provided.
 *
 * ## Custom Element
 * `<umd-element-footer>`
 *
 * ## Slots
 * - `contact-headline` - Contact section header
 * - `contact-links` - Contact links section
 * - `contact-address` - Address information
 * - `call-to-action` - Primary CTA button/link
 * - `social-links` - Social media links
 * - `utility-links` - Utility navigation links
 * - `link-column-one` - First link column (mega footer only)
 * - `link-column-two` - Second link column (mega footer only)
 * - `link-column-three` - Third link column (mega footer only)
 * - `background-image` - Background image (visual footer only, accepts: img)
 *
 * ## Attributes
 * - `type` - Footer layout options:
 *   - `simple` - Basic footer layout (default)
 *   - `mega` - Large footer with link columns
 *   - `visual` - Footer with background image
 * - `data-theme` - Theme options:
 *   - `light` - Light theme styling
 *
 * @example
 * ```html
 * <!-- Simple footer -->
 * <umd-element-footer type="simple">
 *   <h2 slot="contact-headline">Contact Us</h2>
 *   <div slot="contact-links">
 *     <a href="tel:3014050100">301.405.0100</a>
 *     <a href="mailto:info@umd.edu">info@umd.edu</a>
 *   </div>
 *   <address slot="contact-address">
 *     University of Maryland<br>
 *     College Park, MD 20742
 *   </address>
 *   <div slot="social-links">
 *     <a href="#">Facebook</a>
 *     <a href="#">Twitter</a>
 *   </div>
 * </umd-element-footer>
 * ```
 *
 * @example
 * ```html
 * <!-- Mega footer with columns -->
 * <umd-element-footer type="mega" data-theme="light">
 *   <div slot="link-column-one">
 *     <h3>Academics</h3>
 *     <ul>
 *       <li><a href="#">Programs</a></li>
 *       <li><a href="#">Courses</a></li>
 *     </ul>
 *   </div>
 *   <div slot="link-column-two">
 *     <h3>Resources</h3>
 *     <ul>
 *       <li><a href="#">Libraries</a></li>
 *       <li><a href="#">Technology</a></li>
 *     </ul>
 *   </div>
 *   <a slot="call-to-action" href="/apply">Apply Now</a>
 *   <div slot="utility-links">
 *     <a href="/privacy">Privacy</a>
 *     <a href="/accessibility">Accessibility</a>
 *   </div>
 * </umd-element-footer>
 * ```
 *
 * @example
 * ```html
 * <!-- Visual footer with background -->
 * <umd-element-footer type="visual">
 *   <img slot="background-image" src="campus.jpg" alt="Campus view">
 *   <h2 slot="contact-headline">Visit Campus</h2>
 *   <a slot="call-to-action" href="/visit">Schedule a Tour</a>
 * </umd-element-footer>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const FooterOptions: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
});

export default FooterOptions;
