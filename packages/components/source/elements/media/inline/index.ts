import { Tokens } from '@universityofmaryland/variables';

export type TypeMediaInlineRequirements = {
  image?: HTMLElement | null;
};

const { Colors, Spacing } = Tokens;

const ELEMENT_NAME = 'umd-media-inline';

const ELEMENT_MEDIA_INLINE_CONTAINER = 'element-media-inline-container';

// prettier-ignore
const STYLES_MEDIA_INLINE_ELEMENT = `
  .${ELEMENT_MEDIA_INLINE_CONTAINER} {
    container: ${ELEMENT_NAME} / inline-size;
  }

`;

const CreateMediaInline = (element: TypeMediaInlineRequirements) => {
  const { image } = element;
  const elementContainer = document.createElement('div');

  elementContainer.classList.add(ELEMENT_MEDIA_INLINE_CONTAINER);

  return elementContainer;
};

export default {
  CreateElement: CreateMediaInline,
  Styles: STYLES_MEDIA_INLINE_ELEMENT,
};
