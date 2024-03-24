import { Tokens } from '@universityofmaryland/variables';
import {
  CreatBlockContainer,
  TypeBlockContainerAttributes,
  STYLES_BLOCK_CONTAINER,
} from './container';
import { CreateImageBlockContainer, STYLES_BLOCK_COMMON_IMAGE } from './image';
import {
  CreateBlockTextContainer,
  TypeCommonTextAttributes,
  STYLES_LIST_COMMON_TEXT,
  BLOCK_TEXT_HEADLINE_WRAPPER,
} from './text';

export type TypeBlockEventProps = TypeCommonTextAttributes &
  TypeBlockContainerAttributes & {
    image?: HTMLImageElement | null;
    eventDetails: HTMLElement;
  };

const { Spacing } = Tokens;

const ELEMENT_NAME = 'umd-block-event';
const ELEMENT_BLOCK_CONTAINER = 'umd-block-event-container';
const ELEMENT_BLOCK_DETAILS_WRAPPER = 'umd-block-event-details-wrapper';

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
export const STYLES_BLOCK_EVENT = `
  .${ELEMENT_BLOCK_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${STYLES_BLOCK_COMMON_IMAGE}
  ${STYLES_LIST_COMMON_TEXT}
  ${STYLES_BLOCK_CONTAINER}
  ${DetailsRowStyles}
`;

export const CreateEventBlockElement = (element: TypeBlockEventProps) => {
  const {
    theme,
    image,
    isAligned = false,
    isBordered = false,
    eventDetails,
  } = element;
  const textContainer = CreateBlockTextContainer(element);
  const elementContainer = document.createElement('div');
  const imageContainer = image ? CreateImageBlockContainer({ image }) : null;
  const container = CreatBlockContainer({
    textContainer,
    imageContainer,
    theme,
    isAligned,
    isBordered,
  });

  if (eventDetails) {
    const headline = textContainer.querySelector(
      `.${BLOCK_TEXT_HEADLINE_WRAPPER}`,
    ) as HTMLElement;
    eventDetails.classList.add(ELEMENT_BLOCK_DETAILS_WRAPPER);
    headline.appendChild(eventDetails);
  }

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_BLOCK_CONTAINER);

  return elementContainer;
};
