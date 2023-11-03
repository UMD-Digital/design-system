import { MakeSlot } from 'helpers/ui';
import { CreateBackButton, CreateForwardButton, ButtonStyles } from './button';
import {
  BREAKPOINTS,
  DATE_SLOT_NAME,
  DATES_CONTAINER_CLASS,
  DATES_WRAPPER_CONTAINER_CLASS,
  ELEMENT_TYPE,
} from '../../../variables';

export const DatesStyles = `
  :host .${DATES_CONTAINER_CLASS} {
    display: flex;
    position: relative;
    padding: 0 36px;
    width: calc(100% - 72px);
  }
  
  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${DATES_CONTAINER_CLASS} {
      padding: 0 48px;
      width: calc(100% - 236px);
    }
  }
  
  :host .${DATES_WRAPPER_CONTAINER_CLASS} {
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: 44px;
  }

  ${ButtonStyles}
`;

export const CreateDatesContainer = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const datesSlot = MakeSlot({ type: DATE_SLOT_NAME });
  const container = document.createElement('div');
  const datesWrapper = document.createElement('div');
  const backButton = CreateBackButton({ element });
  const forwardButton = CreateForwardButton({ element });

  datesWrapper.classList.add(DATES_WRAPPER_CONTAINER_CLASS);
  datesSlot.style.display = 'block';
  datesWrapper.appendChild(datesSlot);

  container.classList.add(DATES_CONTAINER_CLASS);
  container.appendChild(backButton);
  container.appendChild(datesWrapper);
  container.appendChild(forwardButton);

  return container;
};
