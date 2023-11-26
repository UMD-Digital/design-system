import { colors } from '@universityofmaryland/umd-web-configuration';
import { SizeDatesElements } from '../services/helpers';
import { CreateCoverElement, CoverStyles } from './cover';
import { CreateScrollerWrapper, ScrollerStyles } from './scroller';
import { ELEMENT_TYPE } from '../component';
import { BREAKPOINTS, ELEMENTS, SLOTS } from '../globals';

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

  :host .${ELEMENTS.CONTAINER_DARK_CLASS} {
    background-color: ${colors.gray.darker};
  }

  :host .${ELEMENTS.CONTAINER_DARK_CLASS} ::slotted(*) {
    color: #fff !important;
  }

  ${CoverStyles}
  ${ScrollerStyles}
`;

export const ComponentStyles = `
    :host {
      display: block;
      position: relative !important;
      container: dates-slider / inline-size; 
    }

    :host * {
      box-sizing: border-box;
      text-wrap: pretty;
    }
  
    ${ContainerStyles}
`;

export const OnLoadStyles = ({ element }: { element: ELEMENT_TYPE }) => {
  const slider = element.querySelector(
    `[slot=${SLOTS.DATE_SLOT_NAME}]`,
  ) as HTMLDivElement;

  slider.style.display = 'flex';
  slider.style.position = 'absolute';
  slider.style.top = '0';
  slider.style.left = '0';

  SizeDatesElements({ element });

  setTimeout(() => {
    SizeDatesElements({ element });
  }, 1000);
};

export const CreateContainer = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const coverElement = CreateCoverElement();
  const containerWrapper = CreateScrollerWrapper({ element });

  container.classList.add(CONTAINER_CLASS);

  container.appendChild(containerWrapper);
  container.appendChild(coverElement);

  return container;
};
