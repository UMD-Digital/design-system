import { Tokens } from '@universityofmaryland/variables';
import { LayoutList, LayoutImage, TextLockupSmall } from 'macros';

type TypeEventListProps = {
  headline: HTMLElement | null;
  image: HTMLImageElement | HTMLAnchorElement | null;
  dateSign: HTMLElement;
  eventDetails: HTMLElement;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  theme?: string | null;
};

const { Spacing } = Tokens;

const MEDIUM = 500;

const ELEMENT_NAME = 'umd-event-list';
const ELEMENT_EVENT_LIST_CONTAINER = 'event-list-container';
const ELEMENT_EVENT_LIST_DATE_BLOCK = 'event-list-date-block';
const ELEMENT_EVENT_LIST_DETAILS = 'event-list-details';

// prettier-ignore
const DateBlockContainerStyles = `
  .${ELEMENT_EVENT_LIST_DATE_BLOCK} {
    width: ${Spacing.xl};
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${ELEMENT_EVENT_LIST_DATE_BLOCK} {
      display: none;
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${MEDIUM}px) {
    .${ELEMENT_EVENT_LIST_DATE_BLOCK} {
      width: ${Spacing['8xl']};
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

  ${TextLockupSmall.Styles}
  ${LayoutImage.Styles}
  ${LayoutList.Styles}
  ${DateBlockContainerStyles}
  ${DetailsRowStyles}
`;

const CreateEventListElement = (props: TypeEventListProps) => {
  const { theme, image, dateSign, eventDetails } = props;
  const elementContainer = document.createElement('div');
  const textContainer = TextLockupSmall.CreateElement(props);
  const imageContainer = image ? LayoutImage.CreateElement({ image }) : null;
  const container = LayoutList.CreateElement({
    textContainer,
    imageContainer,
    theme,
  });

  if (dateSign) {
    const containerWrapper = container.querySelector(
      `.${LayoutList.Elements.wrapper}`,
    ) as HTMLElement;
    if (containerWrapper) {
      const dateBlockContainer = document.createElement('div');

      dateBlockContainer.classList.add(ELEMENT_EVENT_LIST_DATE_BLOCK);
      dateBlockContainer.appendChild(dateSign);
      containerWrapper.prepend(dateBlockContainer);
    }
  }

  if (eventDetails) {
    const headline = textContainer.querySelector(
      `.${TextLockupSmall.Elements.headline}`,
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
