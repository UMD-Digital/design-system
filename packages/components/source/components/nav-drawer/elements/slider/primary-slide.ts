import { UMDNavDrawer } from 'components/nav-drawer/component';
import { SLOTS, VARIABLES } from 'components/nav-drawer/globals';
import { CreateSlideAction, slideActionStyles } from './slide-action';
import { MakeSlot } from 'helpers/ui';

const DRAWER_SLIDER_PRIMARY_CONTAINER = 'umd-element-drawer-primary-slider';

// prettier-ignore
export const primarySliderStyles = `
  .${DRAWER_SLIDER_PRIMARY_CONTAINER} {
    
  }

  ${slideActionStyles}
`;

export const CreatePrimarySlide = ({ element }: { element: UMDNavDrawer }) => {
  const sliderContainer = document.createElement('div');
  const linksSlot = element.querySelector(
    `[slot="${SLOTS.PRIMARY_SLIDE_LINKS}"]`,
  ) as HTMLSlotElement;
  const contentSlot = MakeSlot({ type: SLOTS.PRIMARY_SLIDE_CONTENT });
  const primarySlideLinks = Array.from(
    linksSlot.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  sliderContainer.classList.add(DRAWER_SLIDER_PRIMARY_CONTAINER);
  sliderContainer.setAttribute(`${VARIABLES.ATTRIBUTE_DATA_SLIDE}`, '');

  if (!element._currentSlide) {
    sliderContainer.setAttribute(`${VARIABLES.ATTRIBUTE_ACTIVE_SLIDE}`, '');
    element._currentSlide = sliderContainer;
  }

  if (primarySlideLinks.length > 0) {
    primarySlideLinks.forEach((link) => {
      const slideAction = CreateSlideAction({ element, link });
      sliderContainer.appendChild(slideAction);
    });
  }

  sliderContainer.appendChild(contentSlot);

  return sliderContainer;
};
