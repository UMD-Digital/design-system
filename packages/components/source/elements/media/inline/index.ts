import { LayoutImage } from 'macros';

export type TypeMediaInlineRequirements = {
  image?: HTMLImageElement | null;
};

const ELEMENT_MEDIA_INLINE_CONTAINER = 'element-media-inline-container';

// prettier-ignore
const STYLES_MEDIA_INLINE_ELEMENT = `
  .${ELEMENT_MEDIA_INLINE_CONTAINER} {
    display: block;
    max-width: 100%;
  }

  ${LayoutImage.Styles}
`;

const CreateMediaInline = (props: TypeMediaInlineRequirements) =>
  (() => {
    const elementContainer = document.createElement('div');
    const { image } = props;

    if (image) {
      elementContainer.appendChild(
        LayoutImage.CreateElement({
          image,
          showCaption: true,
        }),
      );
    }

    elementContainer.classList.add(ELEMENT_MEDIA_INLINE_CONTAINER);

    return {
      element: elementContainer,
    };
  })();

export default {
  CreateElement: CreateMediaInline,
  Styles: STYLES_MEDIA_INLINE_ELEMENT,
};
