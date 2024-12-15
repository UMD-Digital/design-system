import { Tokens } from '@universityofmaryland/variables';
import { Performance } from 'utilities';
import { Image as LayoutImage } from 'layout';
import CaptionContainer from '../elements/caption';

export type TypeMediaInlineWrappedRequirements = {
  image?: HTMLImageElement | null;
  caption?: HTMLElement | null;
  wrappingText?: HTMLElement | null;
  isAlignmentRight?: boolean;
  isThemeDark?: boolean;
};

const { Spacing } = Tokens;

const BREAKPOINT = 400;

const ATTRIBUTE_IS_WRAPPING_TEXT = 'is-wrapping-text';

const ELEMENT_MEDIA_INLINE_CONTAINER = 'element-media-inline-wrapped-container';
const ELEMENT_OBJECT_WRAPPED_CONTAINER = 'element-object-wrapped-container';

// prettier-ignore
const ObjectContainer = `
  .${ELEMENT_OBJECT_WRAPPED_CONTAINER} {
    display: inline-block;
    padding-bottom: ${Spacing.sm};
    max-width: 100%;
  }
`;

// prettier-ignore
const STYLES_MEDIA_INLINE_WRAPPED_ELEMENT = `
  .${ELEMENT_MEDIA_INLINE_CONTAINER} {
    display: inline-block;
    max-width: 100%;
  }

  ${LayoutImage.Styles}
  ${CaptionContainer.Styles}
  ${ObjectContainer}
`;

const GetObjectSize = ({
  elementContainer,
  image,
}: {
  elementContainer: HTMLElement;
  image: HTMLImageElement;
}) => {
  const containerSize = elementContainer.offsetWidth;
  const imageWidth = image.naturalWidth;
  const isMediumView = containerSize > BREAKPOINT;
  let width = imageWidth;

  if (isMediumView) {
    const shouldMaxSized = imageWidth > containerSize / 2;
    if (shouldMaxSized) width = containerSize / 2;
  }

  return width;
};

const CreateMediaInlineWrapped = (props: TypeMediaInlineWrappedRequirements) =>
  (() => {
    const { image, isAlignmentRight, isThemeDark, caption, wrappingText } =
      props;

    const elementContainer = document.createElement('div');
    const objectContainer = document.createElement('div');
    const hasWrappingtext = wrappingText && wrappingText !== null;
    const hasCaption = caption && caption !== null;
    const sizeCaption = () => {
      const imageContainer = elementContainer.querySelector(
        `.${LayoutImage.Elements.container}`,
      ) as HTMLElement;
      const caption = elementContainer.querySelector(
        `.${CaptionContainer.Elements.container}`,
      ) as HTMLElement;

      if (caption) {
        caption.style.width = `${imageContainer.offsetWidth}px`;
      }
    };
    const sizeObject = () => {
      const isAboveBreakPoint = elementContainer.offsetWidth > BREAKPOINT;
      const objectContainer = elementContainer.querySelector(
        `.${ELEMENT_OBJECT_WRAPPED_CONTAINER}`,
      ) as HTMLElement;

      if (!image) return;

      if (isAboveBreakPoint) {
        const objectSize = GetObjectSize({ elementContainer, image });

        objectContainer.style.width = `${objectSize}px`;
        objectContainer.style.display = 'inline-block';
        objectContainer.style.textAlign = 'left';

        if (isAlignmentRight) {
          objectContainer.style.float = `right`;
          objectContainer.style.paddingLeft = `${Spacing.md}`;
        } else {
          objectContainer.style.float = 'left';
          objectContainer.style.paddingRight = `${Spacing.md}`;
        }
      } else {
        objectContainer.style.width = '100%';
        objectContainer.style.float = 'none';
        objectContainer.style.textAlign = 'center';
        objectContainer.style.paddingLeft = `0`;
        objectContainer.style.paddingRight = `0`;
      }

      setTimeout(() => {
        sizeCaption();
      }, 100);
    };
    const eventResize = () => {
      if (hasWrappingtext) {
        sizeObject();
      }
      if (hasCaption) {
        sizeCaption();
      }
    };

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
        eventResize();

        setTimeout(() => {
          checkSizing();
        }, 100);

        setTimeout(() => {
          checkSizing();
        }, 500);
      });
    };

    objectContainer.classList.add(ELEMENT_OBJECT_WRAPPED_CONTAINER);

    if (image) {
      objectContainer.appendChild(
        LayoutImage.CreateElement({
          image,
          showCaption: true,
        }),
      );
    }

    if (hasCaption) {
      const captionElement = CaptionContainer.CreateElement({
        caption,
        isThemeDark,
      });
      captionElement.style.opacity = `0`;
      objectContainer.appendChild(captionElement);
    }

    if (objectContainer.children.length > 0) {
      elementContainer.appendChild(objectContainer);
    }

    if (hasWrappingtext) {
      elementContainer.appendChild(wrappingText);
      elementContainer.setAttribute(ATTRIBUTE_IS_WRAPPING_TEXT, '');
      setTimeout(() => {
        sizeObject();
      }, 100);
    }

    elementContainer.classList.add(ELEMENT_MEDIA_INLINE_CONTAINER);

    window.addEventListener(
      'resize',
      Performance.debounce(() => {
        eventResize();
      }, 20),
    );

    setTimeout(() => {
      eventResize();
    }, 200);

    return {
      element: elementContainer,
      events: {
        load,
      },
      styles: STYLES_MEDIA_INLINE_WRAPPED_ELEMENT,
    };
  })();

export default CreateMediaInlineWrapped;
