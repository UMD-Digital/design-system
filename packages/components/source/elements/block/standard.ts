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
} from './text';

export type TypeBlockStandardProps = TypeCommonTextAttributes &
  TypeBlockContainerAttributes & {
    image?: HTMLImageElement | null;
  };

const ELEMENT_NAME = 'umd-block-standard';
const ELEMENT_LIST_CONTAINER = 'umd-block-standard-container';

// prettier-ignore
export const STYLES_BLOCK_STANDARD = `
  .${ELEMENT_LIST_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${STYLES_BLOCK_COMMON_IMAGE}
  ${STYLES_LIST_COMMON_TEXT}
  ${STYLES_BLOCK_CONTAINER}
`;

export const CreatStandardBlockElement = (element: TypeBlockStandardProps) => {
  const { theme, image, isAligned = false, isBordered = false } = element;
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

  elementContainer.appendChild(container);
  elementContainer.classList.add(ELEMENT_LIST_CONTAINER);

  return elementContainer;
};
