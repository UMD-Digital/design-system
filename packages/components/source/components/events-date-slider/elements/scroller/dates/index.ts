import { MarkupCreate } from 'utilities';
import { ELEMENT_TYPE } from 'components/events-date-slider';
import {
  BREAKPOINTS,
  ELEMENTS,
  SLOTS,
} from 'components/events-date-slider/globals';
import { CreateBackButton, CreateForwardButton, ButtonStyles } from './button';

const { Node } = MarkupCreate;

const { TABLET } = BREAKPOINTS;
const { DATE_SLOT_NAME } = SLOTS;
const { DATES_CONTAINER_CLASS, DATES_WRAPPER_CONTAINER_CLASS } = ELEMENTS;

export const DatesStyles = `
  .${DATES_CONTAINER_CLASS} {
    display: flex;
    position: relative;
    padding: 0 36px;
  }
  
  @container dates-slider (min-width: ${TABLET}px) {
    .${DATES_CONTAINER_CLASS} {
      padding: 0 60px;
      width: calc(100% - 96px);
    }
  }
  
  .${DATES_WRAPPER_CONTAINER_CLASS} {
    position: relative;
    width: 100%;
    overflow: hidden;
    min-height: 44px;
  }

  .${DATES_WRAPPER_CONTAINER_CLASS} ::slotted(*) {
    margin-bottom: 0 !important;
  }

  ${ButtonStyles}
`;

export const CreateDatesContainer = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const datesSlot = Node.slot({ type: DATE_SLOT_NAME });
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
