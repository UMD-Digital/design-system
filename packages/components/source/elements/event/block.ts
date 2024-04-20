import { Tokens } from '@universityofmaryland/variables';
import {
  LayoutBlockContainer,
  LayoutBlockImage,
  TextLockupSmall,
} from 'macros';

type TypeEventBlockProps = {
  eventDetails: HTMLElement;
  headline?: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  image?: HTMLImageElement | null;
  isAligned?: boolean;
  isBordered?: boolean;
  theme?: string;
};

const { Spacing } = Tokens;

const ELEMENT_NAME = 'umd-event-block';
const ELEMENT_EVENT_BLOCK_CONTAINER = 'event-block-container';
const ELEMENT_EVENT_BLOCK_DETAILS = 'event-block-details-wrapper';

// prettier-ignore
const DetailsRowStyles = `
  * + .${ELEMENT_EVENT_BLOCK_DETAILS} {
    margin-top: ${Spacing.min};
    display: block;
  }
`;

// prettier-ignore
const STYLES_EVENT_BLOCK_ELEMENT = `
  .${ELEMENT_EVENT_BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${LayoutBlockImage.Styles}
  ${TextLockupSmall.Styles}
  ${LayoutBlockContainer.Styles}
  ${DetailsRowStyles}
`;

const CreateEventBlockElement = (element: TypeEventBlockProps) => {
  const {
    theme,
    image,
    isAligned = false,
    isBordered = false,
    eventDetails,
  } = element;
  const textContainer = TextLockupSmall.CreateElement(element);
  const elementContainer = document.createElement('div');
  const imageContainer = image
    ? LayoutBlockImage.CreateElement({ image })
    : null;
  const container = LayoutBlockContainer.CreateElement({
    textContainer,
    imageContainer,
    theme,
    isAligned,
    isBordered,
  });

  if (eventDetails) {
    const headline = textContainer.querySelector(
      `.${TextLockupSmall.Elements.headline}`,
    ) as HTMLElement;
    eventDetails.classList.add(ELEMENT_EVENT_BLOCK_DETAILS);
    headline.insertAdjacentElement('afterend', eventDetails);
  }

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_EVENT_BLOCK_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreateEventBlockElement,
  Styles: STYLES_EVENT_BLOCK_ELEMENT,
};
