import { colors, spacing } from '@universityofmaryland/umd-web-configuration';
import { UMDNavDrawer } from 'components/nav-drawer/component';

const DRAWER_SLIDER_CONTAINER = 'umd-element-drawer-slider';
const DRAWER_DECORATIVE_LINE = 'umd-element-drawer-decorative-line';

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

export const drawerSliderStyles = `
  .${DRAWER_SLIDER_CONTAINER} {
    position: relative;
    background-color: ${colors.white};
    padding: ${spacing['2xl']} ${spacing.md};
    width: calc(100% - ${spacing['2xl']});
    max-width: 500px;
    min-width: 280px;
    height: 100%;
  }

  ${decorativeLineStyles}
`;

export const CreateSlider = ({ element }: { element: UMDNavDrawer }) => {
  const sliderContainer = document.createElement('div');
  const decorativeLine = document.createElement('div');

  sliderContainer.classList.add(DRAWER_SLIDER_CONTAINER);

  decorativeLine.classList.add(DRAWER_DECORATIVE_LINE);
  sliderContainer.appendChild(decorativeLine);

  return sliderContainer;
};
