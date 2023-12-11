import { colors, spacing } from '@universityofmaryland/umd-web-configuration';
import { UMDNavDrawer } from 'components/nav-drawer/component';
import { VARIABLES } from 'components/nav-drawer/globals';
import { CreatePrimarySlide, primarySliderStyles } from './primary-slide';
import { CreateChildSlide, childSliderStyles } from './child-slides';

const DRAWER_SLIDER_CONTAINER = 'umd-element-drawer-slider-container';
const DRAWER_SLIDER = 'umd-element-drawer-slider';
const DRAWER_DECORATIVE_LINE = 'umd-element-drawer-decorative-line';

// prettier-ignore
const decorativeLineStyles = `
  .${DRAWER_DECORATIVE_LINE} {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 8px;
    background-color: ${colors.red};
    display: block;
  }
`;

// prettier-ignore
const sliderStyles = `
  .${DRAWER_SLIDER} {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: calc(100vw - ${spacing['8xl']});
    max-width: 440px;
    min-width: 227px;
  }

  .${DRAWER_SLIDER} > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${colors.white};
    overflow-y: auto;
    display: none;
  }

  .${DRAWER_SLIDER} > *[${VARIABLES.ATTRIBUTE_ACTIVE_SLIDE}] {
    display: block;
  }
`;

// prettier-ignore
export const drawerSliderStyles = `
  .${DRAWER_SLIDER_CONTAINER} {
    position: relative;
    background-color: ${colors.white};
    padding: ${spacing['2xl']} ${spacing.md};
    height: 100%;
    cursor: default;
  }

  ${decorativeLineStyles}
  ${sliderStyles}
  ${primarySliderStyles}
  ${childSliderStyles}
`;

export const CreateSlider = ({ element }: { element: UMDNavDrawer }) => {
  const sliderContainer = document.createElement('div');
  const slider = document.createElement('div');
  const decorativeLine = document.createElement('div');
  const childSlides = CreateChildSlide({ element });
  const primarySlide = CreatePrimarySlide({ element });

  sliderContainer.classList.add(DRAWER_SLIDER_CONTAINER);

  decorativeLine.classList.add(DRAWER_DECORATIVE_LINE);
  sliderContainer.appendChild(decorativeLine);

  slider.classList.add(DRAWER_SLIDER);
  slider.appendChild(primarySlide);
  sliderContainer.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  childSlides.forEach((childSlide) => {
    if (childSlide) slider.appendChild(childSlide);
  });

  sliderContainer.appendChild(slider);

  return sliderContainer;
};
