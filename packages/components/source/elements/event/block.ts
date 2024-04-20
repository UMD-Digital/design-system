import { Tokens } from '@universityofmaryland/variables';
import {
  LayoutBlock,
  LayoutImage,
  TextLockupSmall,
  TextLockupSmallScaling,
} from 'macros';

type TypeEventBlockProps = {
  headline: HTMLElement | null;
  eventDetails: HTMLElement;
  image: HTMLImageElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
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

  ${TextLockupSmallScaling.Styles}
  ${LayoutImage.Styles}
  ${LayoutBlock.Styles}
  ${DetailsRowStyles}
`;

const CreateEventBlockElement = (props: TypeEventBlockProps) => {
  const { theme, image, eventDetails } = props;
  const textContainer = TextLockupSmallScaling.CreateElement(props);
  const elementContainer = document.createElement('div');
  const imageContainer = image ? LayoutImage.CreateElement({ image }) : null;
  const container = LayoutBlock.CreateElement({
    textContainer,
    imageContainer,
    theme,
    isAligned: false,
    isBordered: false,
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
