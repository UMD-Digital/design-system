import { UMDNavDrawer } from 'components/nav-drawer/component';
import { VARIABLES } from 'components/nav-drawer/globals';
import { CreateSlideAction } from './slide-action';

const DRAWER_SLIDER_CHILD_CONTAINER = 'umd-element-drawer-child-slider';

export const childSliderStyles = ``;

export const CreateChildSlide = ({ element }: { element: UMDNavDrawer }) => {
  const slides = Array.from(
    element.querySelectorAll(`[${VARIABLES.ATTRIBUTE_PARENT_REF}]`),
  ) as HTMLDivElement[];

  return slides.map((slide) => {
    const sliderContainer = document.createElement('div');
    const links = Array.from(
      slide.querySelectorAll('a'),
    ) as HTMLAnchorElement[];

    sliderContainer.classList.add(DRAWER_SLIDER_CHILD_CONTAINER);
    sliderContainer.setAttribute(
      `${VARIABLES.ATTRIBUTE_PARENT_REF}`,
      `${slide.getAttribute(`${VARIABLES.ATTRIBUTE_PARENT_REF}`)}`,
    );

    if (links.length > 0) {
      links.forEach((link) => {
        const slideAction = CreateSlideAction({ element, link });
        sliderContainer.appendChild(slideAction);
      });
    }

    return sliderContainer;
  });
};