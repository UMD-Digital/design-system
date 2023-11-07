import { ELEMENT_TYPE } from '../../component';
import { BREAKPOINTS } from '../../globals';
import { CreateIntroWrapper, IntroStyles } from './intro';
import { CreateDatesContainer, DatesStyles } from './dates';

const CONTAINER_SCROLL_WRAPPER_CLASS = 'umd-element-container-wrapper';

export const ScrollerStyles = `
  :host .${CONTAINER_SCROLL_WRAPPER_CLASS} {
    position: relative;
    z-index: 99;
  }
  
  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${CONTAINER_SCROLL_WRAPPER_CLASS} {
      display: flex;
      align-items: center;
    }
  }

  ${IntroStyles}
  ${DatesStyles}
`;

export const CreateScrollerWrapper = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const container = document.createElement('div');
  const introductionWrapper = CreateIntroWrapper();
  const datesContainer = CreateDatesContainer({ element });

  container.classList.add(CONTAINER_SCROLL_WRAPPER_CLASS);

  container.appendChild(introductionWrapper);
  container.appendChild(datesContainer);

  return container;
};
