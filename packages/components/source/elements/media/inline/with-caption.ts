import { Tokens } from '@universityofmaryland/variables';
import { Performance } from 'utilities';
import { LayoutImage } from 'macros';
import CaptionContainer from '../elements/caption';

export type TypeMediaInlineRequirements = {
  image?: HTMLImageElement | null;
  caption?: HTMLElement | null;
};

const { Spacing } = Tokens;
const { Debounce } = Performance;

const ELEMENT_MEDIA_INLINE_CONTAINER = 'element-media-with-caption-container';
const ELEMENT_OBJECT_CAPTION_CONTAINER = 'element-media-caption-container';

// prettier-ignore
const ObjectContainer = `
  .${ELEMENT_OBJECT_CAPTION_CONTAINER} {
    display: flex;
    flex-direction: column;
    padding-bottom: ${Spacing.sm};
    max-width: 100%;
  }
`;

// prettier-ignore
const STYLES_MEDIA_INLINE_ELEMENT = `
  .${ELEMENT_MEDIA_INLINE_CONTAINER} {
    display: inline-block;
    max-width: 100%;
  }

  ${LayoutImage.Styles}
  ${CaptionContainer.Styles}
  ${ObjectContainer}
`;

const CreateMediaWithCaption = (props: TypeMediaInlineRequirements) =>
  (() => {
    const { caption, image } = props;
    const hasCaption = caption && caption !== null;
    const elementContainer = document.createElement('div');
    const objectContainer = document.createElement('div');
    const sizeCaption = () => {
      const imageContainer = elementContainer.querySelector(
        `.${LayoutImage.Elements.container}`,
      ) as HTMLElement;
      const caption = elementContainer.querySelector(
        `.${CaptionContainer.Elements.container}`,
      ) as HTMLElement;

      if (caption) {
        caption.style.width = `${imageContainer.offsetWidth}px`;
        caption.style.display = `block`;
      }
    };
    const eventResize = () => {
      sizeCaption();
    };

    if (image) {
      objectContainer.appendChild(
        LayoutImage.CreateElement({
          image,
          showCaption: true,
        }),
      );
    }

    if (hasCaption) {
      const captionElement = CaptionContainer.CreateElement({ caption });
      captionElement.style.display = `none`;
      objectContainer.appendChild(captionElement);
    }

    if (objectContainer.children.length > 0) {
      elementContainer.appendChild(objectContainer);
    }

    objectContainer.classList.add(ELEMENT_OBJECT_CAPTION_CONTAINER);
    elementContainer.classList.add(ELEMENT_MEDIA_INLINE_CONTAINER);

    window.addEventListener(
      'resize',
      Debounce(() => {
        eventResize();
      }, 20),
    );

    setTimeout(() => {
      eventResize();
    }, 100);
    return elementContainer;
  })();

export default {
  CreateElement: CreateMediaWithCaption,
  Styles: STYLES_MEDIA_INLINE_ELEMENT,
};
