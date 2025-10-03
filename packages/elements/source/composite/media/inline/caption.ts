import { token } from '@universityofmaryland/web-styles-library';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { Image as LayoutImage } from 'layout';
import CaptionContainer from '../elements/caption';

export type TypeMediaInlineRequirements = {
  image?: HTMLImageElement | null;
  caption?: HTMLElement | null;
  isThemeDark?: boolean;
};

const { spacing } = token;

const ELEMENT_MEDIA_INLINE_CONTAINER = 'element-media-with-caption-container';
const ELEMENT_OBJECT_CAPTION_CONTAINER = 'element-media-caption-container';

// prettier-ignore
const ObjectContainer = `
  .${ELEMENT_OBJECT_CAPTION_CONTAINER} {
    display: flex;
    flex-direction: column;
    padding-bottom: ${token.spacing.sm};
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
    const { caption, image, isThemeDark } = props;
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

    const load = () => {
      const checkSizing = () => {
        const caption = objectContainer.querySelector(
          `.${CaptionContainer.Elements.container}`,
        ) as HTMLElement;

        if (caption) {
          caption.style.opacity = `1`;
        }
      };

      image?.addEventListener('load', () => {
        checkSizing();

        setTimeout(() => {
          checkSizing();
        }, 500);
      });
    };

    if (hasCaption) {
      const captionElement = CaptionContainer.CreateElement({
        caption,
        isThemeDark,
      });
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
      debounce(() => {
        eventResize();
      }, 20),
    );

    setTimeout(() => {
      eventResize();
    }, 100);

    return {
      element: elementContainer,
      events: {
        load,
      },
      styles: STYLES_MEDIA_INLINE_ELEMENT,
    };
  })();

export default CreateMediaWithCaption;
