import { colors, spacing } from '@universityofmaryland/umd-web-configuration';
import { UMDNavDrawer } from 'components/nav-drawer/component';

const DRAWER_SLIDER_CHILD_CONTAINER = 'umd-element-drawer-child-slider';

export const CreateChildSlide = ({ element }: { element: UMDNavDrawer }) => {
  const sliderContainer = document.createElement('div');

  sliderContainer.classList.add(DRAWER_SLIDER_CHILD_CONTAINER);

  return sliderContainer;
};
