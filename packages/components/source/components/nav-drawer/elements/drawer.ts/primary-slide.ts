import { colors, spacing } from '@universityofmaryland/umd-web-configuration';
import { UMDNavDrawer } from 'components/nav-drawer/component';

const DRAWER_SLIDER_PRIMARY_CONTAINER = 'umd-element-drawer-primary-slider';

export const CreatePrimarySlide = ({ element }: { element: UMDNavDrawer }) => {
  const sliderContainer = document.createElement('div');

  sliderContainer.classList.add(DRAWER_SLIDER_PRIMARY_CONTAINER);

  return sliderContainer;
};
