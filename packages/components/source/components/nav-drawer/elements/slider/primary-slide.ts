import { Tokens } from '@universityofmaryland/variables';
import { MarkupCreate } from 'utilities';
import { CreateSlideAction, slideActionStyles } from './slide-action';
import { ELEMENTS, SLOTS, VARIABLES } from '../../globals';
import { UMDNavDrawer } from '../../index';

const { Colors, Spacing, FontSize } = Tokens;

const {
  PRIMARY_SLIDE_LINKS,
  PRIMARY_SLIDE_CONTENT,
  PRIMARY_SLIDE_SECONDARY_LINKS,
} = SLOTS;
const { ATTRIBUTE_DATA_SLIDE, ATTRIBUTE_ACTIVE_SLIDE } = VARIABLES;
const { DRAWER_SLIDE_SECONDARY_ACTION } = ELEMENTS;

const DRAWER_SLIDER_PRIMARY_CONTAINER = 'umd-element-drawer-primary-container';
const DRAWER_SLIDER_PRIMARY_LINKS_CONTAINER =
  'umd-element-drawer-primary-links';
const DRAWER_SLIDER_SECONDARY_LINKS_CONTAINER =
  'umd-element-drawer-secondary-links';

// prettier-ignore
export const primarySliderStyles = `
  .${DRAWER_SLIDER_SECONDARY_LINKS_CONTAINER} {
    padding-bottom: ${Spacing.xs};
    margin-bottom: ${Spacing.xs};
    border-bottom: 1px solid ${Colors.gray.light};
  }

  @media (min-width: 480px) {
    .${DRAWER_SLIDER_SECONDARY_LINKS_CONTAINER} {
      padding-bottom: ${Spacing.sm};
      margin-bottom: ${Spacing.sm};
    }
  }

  .${DRAWER_SLIDER_SECONDARY_LINKS_CONTAINER} a {
    font-weight: 400;
    font-size: ${FontSize.base};
  }

  ${slideActionStyles}
`;

const createPrimaryLinks = ({ element }: { element: UMDNavDrawer }) => {
  const container = document.createElement('div');
  const slotContent = element.querySelector(
    `[slot="${PRIMARY_SLIDE_LINKS}"]`,
  ) as HTMLSlotElement;

  if (!slotContent) return null;

  const links = Array.from(
    slotContent.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  if (links.length > 0) {
    container.classList.add(DRAWER_SLIDER_PRIMARY_LINKS_CONTAINER);

    links.forEach((link) => {
      const slideAction = CreateSlideAction({ element, link });
      container.appendChild(slideAction);
    });

    return container;
  }

  return null;
};

const createSecondaryLinks = ({ element }: { element: UMDNavDrawer }) => {
  const container = document.createElement('div');
  const slotContent = element.querySelector(
    `[slot="${PRIMARY_SLIDE_SECONDARY_LINKS}"]`,
  ) as HTMLSlotElement;

  if (!slotContent) return null;

  const links = Array.from(
    slotContent.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  if (links.length > 0) {
    container.classList.add(DRAWER_SLIDER_SECONDARY_LINKS_CONTAINER);

    links.forEach((link) => {
      const slideAction = CreateSlideAction({ element, link });
      slideAction.classList.add(DRAWER_SLIDE_SECONDARY_ACTION);
      container.appendChild(slideAction);
    });

    return container;
  }

  return null;
};

const createAdditonalContent = () => {
  const contentSlot = MarkupCreate.Node.slot({ type: PRIMARY_SLIDE_CONTENT });

  if (contentSlot) return contentSlot;

  return null;
};

export const CreatePrimarySlide = ({ element }: { element: UMDNavDrawer }) => {
  const sliderContainer = document.createElement('div');
  const primarlyLinkContent = createPrimaryLinks({ element });
  const secondaryLinkContent = createSecondaryLinks({ element });
  const additionalContent = createAdditonalContent();

  sliderContainer.classList.add(DRAWER_SLIDER_PRIMARY_CONTAINER);
  sliderContainer.setAttribute(`${ATTRIBUTE_DATA_SLIDE}`, '');

  if (!element._currentSlide) {
    sliderContainer.setAttribute(`${ATTRIBUTE_ACTIVE_SLIDE}`, '');
    element._currentSlide = sliderContainer;
  }

  if (primarlyLinkContent) sliderContainer.appendChild(primarlyLinkContent);
  if (secondaryLinkContent) sliderContainer.appendChild(secondaryLinkContent);
  if (additionalContent) sliderContainer.appendChild(additionalContent);

  return sliderContainer;
};
