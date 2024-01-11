import { colors, spacing } from '@universityofmaryland/variables';
import { MakeSlot } from 'helpers/ui';
import { UMDNavDrawer } from 'components/nav-drawer/component';
import { ELEMENTS, SLOTS, VARIABLES } from 'components/nav-drawer/globals';
import { CreateSlideAction, slideActionStyles } from './slide-action';

const DRAWER_SLIDER_PRIMARY_CONTAINER = 'umd-element-drawer-primary-container';
const DRAWER_SLIDER_PRIMARY_LINKS_CONTAINER =
  'umd-element-drawer-primary-links';
const DRAWER_SLIDER_SECONDARY_LINKS_CONTAINER =
  'umd-element-drawer-secondary-links';

// prettier-ignore
export const primarySliderStyles = `
  .${DRAWER_SLIDER_SECONDARY_LINKS_CONTAINER} {
    padding-bottom: ${spacing.xs};
    margin-bottom: ${spacing.xs};
    border-bottom: 1px solid ${colors.gray.light};
  }

  @media (min-width: 480px) {
    .${DRAWER_SLIDER_SECONDARY_LINKS_CONTAINER} {
      padding-bottom: ${spacing.sm};
      margin-bottom: ${spacing.sm};
    }
  }

  ${slideActionStyles}
`;

const createPrimaryLinks = ({ element }: { element: UMDNavDrawer }) => {
  const container = document.createElement('div');
  const slotContent = element.querySelector(
    `[slot="${SLOTS.PRIMARY_SLIDE_LINKS}"]`,
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
    `[slot="${SLOTS.PRIMARY_SLIDE_SECONDARY_LINKS}"]`,
  ) as HTMLSlotElement;

  if (!slotContent) return null;

  const links = Array.from(
    slotContent.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  if (links.length > 0) {
    container.classList.add(DRAWER_SLIDER_SECONDARY_LINKS_CONTAINER);

    links.forEach((link) => {
      const slideAction = CreateSlideAction({ element, link });
      slideAction.classList.add(ELEMENTS.DRAWER_SLIDE_SECONDARY_ACTION);
      container.appendChild(slideAction);
    });

    return container;
  }

  return null;
};

const createAdditonalContent = () => {
  const contentSlot = MakeSlot({ type: SLOTS.PRIMARY_SLIDE_CONTENT });

  if (contentSlot) return contentSlot;

  return null;
};

export const CreatePrimarySlide = ({ element }: { element: UMDNavDrawer }) => {
  const sliderContainer = document.createElement('div');
  const primarlyLinkContent = createPrimaryLinks({ element });
  const secondaryLinkContent = createSecondaryLinks({ element });
  const additionalContent = createAdditonalContent();

  sliderContainer.classList.add(DRAWER_SLIDER_PRIMARY_CONTAINER);
  sliderContainer.setAttribute(`${VARIABLES.ATTRIBUTE_DATA_SLIDE}`, '');

  if (!element._currentSlide) {
    sliderContainer.setAttribute(`${VARIABLES.ATTRIBUTE_ACTIVE_SLIDE}`, '');
    element._currentSlide = sliderContainer;
  }

  if (primarlyLinkContent) sliderContainer.appendChild(primarlyLinkContent);
  if (secondaryLinkContent) sliderContainer.appendChild(secondaryLinkContent);
  if (additionalContent) sliderContainer.appendChild(additionalContent);

  return sliderContainer;
};
