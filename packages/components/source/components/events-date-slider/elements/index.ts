import { Tokens } from '@universityofmaryland/variables';
import { Reset } from 'helpers/styles';
import { ELEMENT_TYPE } from 'components/events-date-slider/component';
import {
  BREAKPOINTS,
  ELEMENTS,
  SLOTS,
} from 'components/events-date-slider/globals';
import { SizeDatesElements } from '../services/helpers';
import { CreateCoverElement, CoverStyles } from './cover';
import { CreateScrollerWrapper, ScrollerStyles } from './scroller';

const { colors } = Tokens;

const CONTAINER_CLASS = 'umd-element-date-slider-container';
const CONTAINER_WRAPPER_CLASS = 'umd-element-date-slider-container-wrapper';

export const ContainerStyles = `
  .${CONTAINER_CLASS} {
    container: dates-slider / inline-size;
  }

  .${CONTAINER_WRAPPER_CLASS} {
    padding: 24px 0;
    background-color: ${colors.gray.lighter};
    position: relative;
    z-index: 99;
  }

  @container dates-slider (max-width: 260px) {
    .${CONTAINER_WRAPPER_CLASS} {
      display: none
    }
  }

  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    .${CONTAINER_WRAPPER_CLASS} {
      padding: 40px;
    }
  }

  .${ELEMENTS.CONTAINER_DARK_CLASS} .${CONTAINER_WRAPPER_CLASS} {
    background-color: ${colors.gray.darker};
  }

  .${ELEMENTS.CONTAINER_DARK_CLASS} * {
    color: #fff;
  }

  ${CoverStyles}
  ${ScrollerStyles}
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
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
  const wrapper = document.createElement('div');
  const coverElement = CreateCoverElement();
  const containerWrapper = CreateScrollerWrapper({ element });

  wrapper.classList.add(CONTAINER_WRAPPER_CLASS);

  wrapper.appendChild(containerWrapper);
  wrapper.appendChild(coverElement);

  container.classList.add(CONTAINER_CLASS);
  container.appendChild(wrapper);

  return container;
};
