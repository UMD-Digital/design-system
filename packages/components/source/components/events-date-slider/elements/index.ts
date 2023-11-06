import { colors } from '@universityofmaryland/umd-web-configuration/dist/tokens/colors.js';
import { CreateCoverElement, CoverStyles } from './cover';
import { CreateScrollerWrapper, ScrollerStyles } from './scroller';
import { BREAKPOINTS, CONTAINER_DARK_CLASS, ELEMENT_TYPE } from '../variables';

const CONTAINER_CLASS = 'umd-element-date-slider-container';

export const ContainerStyles = `
  :host .${CONTAINER_CLASS} {
    padding: 24px 0;
    background-color: ${colors.gray.lighter};
    position: relative;
    z-index: 99;
  }

  @container dates-slider (max-width: 260px) {
    :host .${CONTAINER_CLASS} {
      display: none
    }
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${CONTAINER_CLASS} {
      padding: 40px;
    }
  }

  :host .${CONTAINER_DARK_CLASS} {
    background-color: ${colors.gray.darker};
  }

  :host .${CONTAINER_DARK_CLASS} ::slotted(*) {
    color: #fff !important;
  }

  ${CoverStyles}
  ${ScrollerStyles}
`;

export const CreateContainer = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const coverElement = CreateCoverElement();
  const containerWrapper = CreateScrollerWrapper({ element });

  container.classList.add(CONTAINER_CLASS);

  container.appendChild(containerWrapper);
  container.appendChild(coverElement);

  return container;
};
