import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Model, Register, Slots } from 'model';
import { Markup } from 'utilities';

const tagName = 'umd-element-footer';

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
};

const slots = {
  [`${SLOTS.BACKGROUND_IMAGE}`]: {
    allowedElements: ['img'],
  },
};

const createComponent = (element: HTMLElement) => {
  const isTypeMega = element.getAttribute('type') === 'mega';
  const isTypeVisual = element.getAttribute('type') === 'visual';
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

  return Composite.footer.options({
    isThemeLight: Attributes.isTheme.light({ element }),
    isTypeSimple,
    isTypeVisual,
    isTypeMega,
    slotVisualImage: element.querySelector(
      `[slot="${SLOTS.BACKGROUND_IMAGE}"]`,
    ) as HTMLImageElement,
    slotUtilityLinks: element.querySelector(
      `[slot="${SLOTS.UTILITY}"]`,
    ) as HTMLElement,
    slotCta: element.querySelector(
      `[slot="${SLOTS.CTA}"]`,
    ) as HTMLAnchorElement,
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

export default () => {
  Register.registerWebComponent({
    name: tagName,
    element: Model.createCustomElement({
      tagName,
      slots,
      createComponent,
    }),
  });
};
