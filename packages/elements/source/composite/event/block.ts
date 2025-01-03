import { tokens } from '@universityofmaryland/web-elements-styles';
import { Block as LayoutBlock, Image as LayoutImage } from 'layout';
import { TextLockupSmall, TextLockupSmallScaling } from 'macros';

type TypeEventBlockProps = {
  headline: HTMLElement | null;
  eventDetails: HTMLElement;
  image: HTMLImageElement | HTMLAnchorElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
};

const { spacing } = tokens;
const MEDIUM = 650;

const ELEMENT_NAME = 'umd-event-block';
const ELEMENT_EVENT_BLOCK_CONTAINER = 'event-block-container';
const ELEMENT_EVENT_BLOCK_DETAILS = 'event-block-details-wrapper';

const OVERWRITE_IMAGE_CONTIANER = `.${ELEMENT_EVENT_BLOCK_CONTAINER} .${LayoutImage.Elements.container}`;

// prettier-ignore
const OverwriteImageContainer = `
  ${OVERWRITE_IMAGE_CONTIANER} {
    display: flex;
    justify-content: center;
  }

  @media (min-width: ${MEDIUM}px) {
    ${OVERWRITE_IMAGE_CONTIANER} img {
      aspect-ratio: inherit;
      max-height: 500px;
    }
  }
`;

// prettier-ignore
const DetailsRowStyles = `
  * + .${ELEMENT_EVENT_BLOCK_DETAILS} {
    margin-top: ${spacing.min};
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
  ${OverwriteImageContainer}
`;

const CreateEventBlockElement = (props: TypeEventBlockProps) => {
  const { isThemeDark, image, eventDetails } = props;
  const textContainer = TextLockupSmallScaling.CreateElement(props);
  const elementContainer = document.createElement('div');
  const imageContainer = image ? LayoutImage.CreateElement({ image }) : null;
  const container = LayoutBlock.CreateElement({
    textContainer,
    imageContainer,
    isThemeDark,
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
