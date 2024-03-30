import { Tokens } from '@universityofmaryland/variables';
import {
  CreatListContainer,
  STYLES_LIST_CONTAINER,
  LIST_CONTAINER_WRAPPER,
} from '../list/container';
import { CreateImageContainer, STYLES_LIST_COMMON_IMAGE } from '../list/image';
import {
  CreateTextContainer,
  TypeCommonTextAttributes,
  STYLES_LIST_COMMON_TEXT,
  LIST_HEADLINE_WRAPPER,
} from '../list/text';

type TypeListEventProps = TypeCommonTextAttributes & {
  image?: HTMLImageElement | null;
  theme?: string;
  dateBlock: HTMLElement;
  eventDetails: HTMLElement;
};

const { Spacing } = Tokens;

const ELEMENT_NAME = 'umd-list-event';

const SMALL = 400;
const MEDIUM = 500;

const ELEMENT_LIST_CONTAINER = 'umd-list-event-container';
const ELEMENT_LIST_DATE_BLOCK_CONTAINER = 'umd-list-event-date-block-container';
const ELEMENT_LIST_DETAILS_WRAPPER = 'umd-list-event-details-wrapper';

// prettier-ignore
const DateBlockContainerStyles = `
  .${ELEMENT_LIST_DATE_BLOCK_CONTAINER} {
    width: ${Spacing.xl};
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${ELEMENT_LIST_DATE_BLOCK_CONTAINER} {
      display: none;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${ELEMENT_LIST_DATE_BLOCK_CONTAINER} {
      width: ${Spacing['6xl']};
    }
  }
`;

// prettier-ignore
const DetailsRowStyles = `
  .${ELEMENT_LIST_DETAILS_WRAPPER} {
    display: block;
  }

  * + .${ELEMENT_LIST_DETAILS_WRAPPER} {
    margin-top: ${Spacing.min};
    display: block;
  }
`;

// prettier-ignore
const STYLES_EVENT_LIST_ELEMENT = `
  .${ELEMENT_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_LIST_CONTAINER} + * {
    margin-top: ${Spacing.md}; 
  }

  ${STYLES_LIST_CONTAINER}
  ${STYLES_LIST_COMMON_TEXT}
  ${STYLES_LIST_COMMON_IMAGE}
  ${DateBlockContainerStyles}
  ${DetailsRowStyles}
`;

const CreateEventListElement = (element: TypeListEventProps) => {
  const { theme, image, dateBlock, eventDetails } = element;
  const elementContainer = document.createElement('div');
  const textContainer = CreateTextContainer(element);
  const imageContainer = image ? CreateImageContainer({ image }) : null;
  const container = CreatListContainer({
    textContainer,
    imageContainer,
    theme,
  });

  if (dateBlock) {
    const containerWrapper = container.querySelector(
      `.${LIST_CONTAINER_WRAPPER}`,
    ) as HTMLElement;
    const dateBlockContainer = document.createElement('div');

    dateBlockContainer.classList.add(ELEMENT_LIST_DATE_BLOCK_CONTAINER);
    dateBlockContainer.appendChild(dateBlock);
    containerWrapper.prepend(dateBlockContainer);
  }

  if (eventDetails) {
    const headline = textContainer.querySelector(
      `.${LIST_HEADLINE_WRAPPER}`,
    ) as HTMLElement;
    eventDetails.classList.add(ELEMENT_LIST_DETAILS_WRAPPER);
    headline.appendChild(eventDetails);
  }

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_LIST_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreateEventListElement,
  Styles: STYLES_EVENT_LIST_ELEMENT,
};
