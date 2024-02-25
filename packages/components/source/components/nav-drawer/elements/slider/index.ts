import { Tokens, Typography } from '@universityofmaryland/variables';
import { UMDNavDrawer } from 'components/nav-drawer';
import { ELEMENTS, VARIABLES } from 'components/nav-drawer/globals';
import { CreatePrimarySlide, primarySliderStyles } from './primary-slide';
import { CreateChildSlide, childSliderStyles } from './child-slides';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

const { Colors, Spacing } = Tokens;

const { ATTRIBUTE_ACTIVE_SLIDE, ATTRIBUTE_ACTIVE_SELECTED } = VARIABLES;
const { DRAWER_SLIDE_SECONDARY_ACTION } = ELEMENTS;

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
    background-color: ${Colors.red};
    display: block;
  }
`;

// prettier-ignore
const sliderStyles = `
  .${DRAWER_SLIDER} {
    position: relative;
    overflow: hidden;
    height: 100%;
    width: calc(100vw - ${Spacing['8xl']});
    max-width: 400px;
    min-width: 227px;
  }

  .${DRAWER_SLIDER} > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${Colors.white};
    overflow-y: auto;
    display: none;
  }

  .${DRAWER_SLIDER} > *[${ATTRIBUTE_ACTIVE_SLIDE}] {
    display: block;
  }
`;

const selectedLinkStyles = `
  .${DRAWER_SLIDER_CONTAINER} a[${ATTRIBUTE_ACTIVE_SELECTED}] {
    position: relative;
  }

  .${DRAWER_SLIDER_CONTAINER} a[${ATTRIBUTE_ACTIVE_SELECTED}]:before {
    content: '';
    position: absolute;
    bottom: 1px;
    height: 3px;
    left: -3px;
    right: -3px;
    background-color: ${Colors.gold};
    display: block;
  }
`;

// prettier-ignore
const secondaryLinkStyles = `
  .${DRAWER_SLIDE_SECONDARY_ACTION} {
    border-bottom: none;
    margin-bottom: ${Spacing.xs};
    padding-bottom: ${Spacing.xs};
  }

  .${DRAWER_SLIDE_SECONDARY_ACTION}:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${DRAWER_SLIDE_SECONDARY_ACTION} a`]: Typography.SansSmall,
    },
  })}
`;

// prettier-ignore
export const drawerSliderStyles = `
  .${DRAWER_SLIDER_CONTAINER} {
    position: relative;
    background-color: ${Colors.white};
    padding: ${Spacing['2xl']} ${Spacing.md};
    height: 100%;
    cursor: default;
  }

  ${decorativeLineStyles}
  ${sliderStyles}
  ${primarySliderStyles}
  ${childSliderStyles}
  ${selectedLinkStyles}
  ${secondaryLinkStyles}
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
