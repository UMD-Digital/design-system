import { Tokens } from '@universityofmaryland/variables';
import ListImageContainer from '../list/image';
import ListTextContainer, {
  TypeListText,
  ELEMENT_LIST_HEADLINE,
} from '../list/text';
import ListContainer, {
  ELEMENT_LIST_CONTAINER_WRAPPER,
} from '../list/container';
import text from 'elements/block/text';

type TypeListEventProps = TypeListText & {
  image?: HTMLImageElement | null;
  dateBlock: HTMLElement;
  eventDetails: HTMLElement;
};

const { Spacing } = Tokens;

const SMALL = 400;
const MEDIUM = 500;

const ELEMENT_NAME = 'umd-list-event';
const ELEMENT_EVENT_LIST_CONTAINER = 'event-list-container';
const ELEMENT_EVENT_LIST_DATE_BLOCK = 'event-list-date-block';
const ELEMENT_EVENT_LIST_DETAILS = 'event-list-details';

// prettier-ignore
const DateBlockContainerStyles = `
  .${ELEMENT_EVENT_LIST_DATE_BLOCK} {
    width: ${Spacing.xl};
  }

  @container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px) {
    .${ELEMENT_EVENT_LIST_DATE_BLOCK} {
      display: none;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${ELEMENT_EVENT_LIST_DATE_BLOCK} {
      width: ${Spacing['6xl']};
    }
  }
`;

// prettier-ignore
const DetailsRowStyles = `
  .${ELEMENT_EVENT_LIST_DETAILS} {
    display: block;
  }

  * + .${ELEMENT_EVENT_LIST_DETAILS} {
    margin-top: ${Spacing.min};
    display: block;
  }
`;

// prettier-ignore
const STYLES_EVENT_LIST_ELEMENT = `
  .${ELEMENT_EVENT_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_EVENT_LIST_CONTAINER} + * {
    margin-top: ${Spacing.md}; 
  }

  ${ListContainer.Styles}
  ${ListTextContainer.Styles}
  ${ListImageContainer.Styles}
  ${DateBlockContainerStyles}
  ${DetailsRowStyles}
`;

const CreateEventListElement = (element: TypeListEventProps) => {
  const { theme, image, dateBlock, eventDetails } = element;
  const elementContainer = document.createElement('div');
  const textContainer = ListTextContainer.CreateElement(element);
  const imageContainer = image
    ? ListImageContainer.CreateElement({ image })
    : null;
  const container = ListContainer.CreateElement({
    textContainer,
    imageContainer,
    theme,
  });

  if (dateBlock) {
    const containerWrapper = container.querySelector(
      `.${ELEMENT_LIST_CONTAINER_WRAPPER}`,
    ) as HTMLElement;
    if (containerWrapper) {
      const dateBlockContainer = document.createElement('div');

      dateBlockContainer.classList.add(ELEMENT_EVENT_LIST_DATE_BLOCK);
      dateBlockContainer.appendChild(dateBlock);
      containerWrapper.prepend(dateBlockContainer);
    }
  }

  if (eventDetails) {
    const headline = textContainer.querySelector(
      `.${ELEMENT_LIST_HEADLINE}`,
    ) as HTMLElement;
    eventDetails.classList.add(ELEMENT_EVENT_LIST_DETAILS);

    headline.insertAdjacentElement('afterend', eventDetails);
  }

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_EVENT_LIST_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreateEventListElement,
  Styles: STYLES_EVENT_LIST_ELEMENT,
};
