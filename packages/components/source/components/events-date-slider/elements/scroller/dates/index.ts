import { MakeSlot } from 'helpers/ui';
import { CreateBackButton, CreateForwardButton, ButtonStyles } from './button';
import { ELEMENT_TYPE } from '../../../component';
import { BREAKPOINTS, ELEMENTS, SLOTS } from '../../../globals';

export const DatesStyles = `
  :host .${ELEMENTS.DATES_CONTAINER_CLASS} {
    display: flex;
    position: relative;
    padding: 0 36px;
  }
  
  @container dates-slider (min-width: ${BREAKPOINTS.tablet}px) {
    :host .${ELEMENTS.DATES_CONTAINER_CLASS} {
      padding: 0 60px;
      width: calc(100% - 96px);
    }
  }
  
  :host .${ELEMENTS.DATES_WRAPPER_CONTAINER_CLASS} {
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: 44px;
  }

  :host .${ELEMENTS.DATES_WRAPPER_CONTAINER_CLASS} ::slotted(*) {
    margin-bottom: 0 !important;
  }

  ${ButtonStyles}
`;

export const CreateDatesContainer = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const datesSlot = MakeSlot({ type: SLOTS.DATE_SLOT_NAME });
  const container = document.createElement('div');
  const datesWrapper = document.createElement('div');
  const backButton = CreateBackButton({ element });
  const forwardButton = CreateForwardButton({ element });

  datesWrapper.classList.add(ELEMENTS.DATES_WRAPPER_CONTAINER_CLASS);
  datesSlot.style.display = 'block';
  datesWrapper.appendChild(datesSlot);

  container.classList.add(ELEMENTS.DATES_CONTAINER_CLASS);
  container.appendChild(backButton);
  container.appendChild(datesWrapper);
  container.appendChild(forwardButton);

  return container;
};
