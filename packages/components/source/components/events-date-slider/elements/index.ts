import { Tokens } from '@universityofmaryland/variables';
import { Reset } from 'helpers/styles';
import { ELEMENT_TYPE } from 'components/events-date-slider';
import {
  BREAKPOINTS,
  ELEMENTS,
  SLOTS,
  VARIABLES,
  NAMING,
} from 'components/events-date-slider/globals';
import { SizeDatesElements } from '../services/helpers';
import { CreateCoverElement, CoverStyles } from './cover';
import { CreateScrollerWrapper, ScrollerStyles } from './scroller';

const { Colors } = Tokens;

const { tablet } = BREAKPOINTS;
const { CONTAINER_CLASS } = ELEMENTS;
const { DATE_SLOT_NAME } = SLOTS;
const { ATTRIBUTE_THEME } = VARIABLES;
const { THEME_DARK } = NAMING;

const CONTAINER_WRAPPER_CLASS = 'umd-element-date-slider-container-wrapper';

// prettier-ignore
const VariationThemeDark = `
  .${CONTAINER_CLASS}${THEME_DARK} .${CONTAINER_WRAPPER_CLASS} {
    background-color: ${Colors.gray.darker};
  }

  .${CONTAINER_CLASS}${THEME_DARK}  * {
    color: #fff !important;
  }
`

// prettier-ignore
export const ContainerStyles = `
  .${CONTAINER_CLASS} {
    container: dates-slider / inline-size;
  }

  .${CONTAINER_WRAPPER_CLASS} {
    padding: 24px 0;
    background-color: ${Colors.gray.lighter};
    position: relative;
    z-index: 99;
  }

  @container dates-slider (max-width: 260px) {
    .${CONTAINER_WRAPPER_CLASS} {
      display: none
    }
  }

  @container dates-slider (min-width: ${tablet}px) {
    .${CONTAINER_WRAPPER_CLASS} {
      padding: 40px;
    }
  }

  ${CoverStyles}
  ${ScrollerStyles}
  ${VariationThemeDark}
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
    `[slot=${DATE_SLOT_NAME}]`,
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
  const theme = element._theme;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const coverElement = CreateCoverElement();
  const containerWrapper = CreateScrollerWrapper({ element });

  wrapper.classList.add(CONTAINER_WRAPPER_CLASS);

  wrapper.appendChild(containerWrapper);
  wrapper.appendChild(coverElement);

  container.setAttribute(ATTRIBUTE_THEME, theme);
  container.classList.add(CONTAINER_CLASS);
  container.appendChild(wrapper);

  return container;
};
