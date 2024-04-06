import { Tokens } from '@universityofmaryland/variables';
import BlockContainer, { TypeBlockContainer } from '../block/container';
import BlockImageContainer from '../block/image';
import LockupTextContainer, {
  TypeTextLockupSmall,
  ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE,
} from '../lockup/text-small';

type TypeEventBlockProps = TypeTextLockupSmall &
  TypeBlockContainer & {
    image?: HTMLImageElement | null;
    eventDetails: HTMLElement;
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

  ${BlockImageContainer.Styles}
  ${LockupTextContainer.Styles}
  ${BlockContainer.Styles}
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
  const textContainer = LockupTextContainer.CreateElement(element);
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
      `.${ELEMENT_TEXT_LOCKUP_SMALL_HEADLINE}`,
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
