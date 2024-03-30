import { Tokens } from '@universityofmaryland/variables';
import BlockContainer, { TypeBlockContainer } from '../block/container';
import BlockImageContainer from '../block/image';
import BlockTextContainer, {
  TypeBlockTextContainter,
  ELEMENT_BLOCK_TEXT_HEADLINE,
} from '../block/text';

type TypeBlockEventProps = TypeBlockTextContainter &
  TypeBlockContainer & {
    image?: HTMLImageElement | null;
    eventDetails: HTMLElement;
  };

const { Spacing } = Tokens;

const ELEMENT_NAME = 'umd-block-event';
const ELEMENT_BLOCK_CONTAINER = 'block-event-container';
const ELEMENT_BLOCK_DETAILS_WRAPPER = 'block-event-details-wrapper';

// prettier-ignore
const DetailsRowStyles = `
  .${ELEMENT_BLOCK_DETAILS_WRAPPER} {
    display: block;
  }

  * + .${ELEMENT_BLOCK_DETAILS_WRAPPER} {
    margin-top: ${Spacing.min};
    display: block;
  }
`;

// prettier-ignore
const STYLES_EVENT_BLOCK_ELEMENT = `
  .${ELEMENT_BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${BlockImageContainer.Styles}
  ${BlockTextContainer.Styles}
  ${BlockContainer.Styles}
  ${DetailsRowStyles}
`;

const CreateEventBlockElement = (element: TypeBlockEventProps) => {
  const {
    theme,
    image,
    isAligned = false,
    isBordered = false,
    eventDetails,
  } = element;
  const textContainer = BlockTextContainer.CreateElement(element);
  const elementContainer = document.createElement('div');
  const imageContainer = image
    ? BlockImageContainer.CreateElement({ image })
    : null;
  const container = BlockContainer.CreateElement({
    textContainer,
    imageContainer,
    theme,
    isAligned,
    isBordered,
  });

  if (eventDetails) {
    const headline = textContainer.querySelector(
      `.${ELEMENT_BLOCK_TEXT_HEADLINE}`,
    ) as HTMLElement;
    eventDetails.classList.add(ELEMENT_BLOCK_DETAILS_WRAPPER);
    headline.appendChild(eventDetails);
  }

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_BLOCK_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreateEventBlockElement,
  Styles: STYLES_EVENT_BLOCK_ELEMENT,
};
