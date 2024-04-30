import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles, Performance } from 'utilities';
import { LayoutImage } from 'macros';

export type TypeMediaInlineRequirements = {
  image?: HTMLImageElement | null;
  caption?: HTMLElement | null;
  wrappingText?: HTMLElement | null;
  isAlignmentRight?: boolean;
};

const { Colors, Spacing } = Tokens;
const { SansSmall } = Typography;
const { ConvertJSSObjectToStyles } = Styles;
const { Debounce } = Performance;

const BREAKPOINT = 400;

const ATTRIBUTE_IS_WRAPPING_TEXT = 'is-wrapping-text';

const ELEMENT_MEDIA_INLINE_CONTAINER = 'element-media-inline-container';
const ELEMENT_MEDIA_OBJECT_CONTAINER = 'element-media-object-container';
const ELEMENT_MEDIA_OJBECT_CAPTION = 'element-media-object-caption';

// prettier-ignore
const CaptionStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_MEDIA_OJBECT_CAPTION}`]: SansSmall,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${ELEMENT_MEDIA_OJBECT_CAPTION} *`]: SansSmall,
    },
  })}

  .${ELEMENT_MEDIA_OJBECT_CAPTION} {
    margin-top: ${Spacing.sm};
    color: ${Colors.gray.mediumAA};
    display: inline-block;
    text-align: left;
  }
`;

// prettier-ignore
const ObjectContainer = `
  .${ELEMENT_MEDIA_OBJECT_CONTAINER} {
    display: inline-block;
    padding-bottom: ${Spacing.sm};
  }
`;

// prettier-ignore
const STYLES_MEDIA_INLINE_ELEMENT = `
  .${ELEMENT_MEDIA_INLINE_CONTAINER} {
    display: inline-block;
    max-width: 100%;
  }

  ${LayoutImage.Styles}
  ${ObjectContainer}
  ${CaptionStyles}
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

const CreateMediaInline = ({
  image,
  caption,
  wrappingText,
  isAlignmentRight,
}: TypeMediaInlineRequirements) =>
  (() => {
    const elementContainer = document.createElement('div');
    const objectContainer = document.createElement('div');
    const hasCaption = caption && caption !== null;
    const sizeCaption = () => {
      const imageContainer = elementContainer.querySelector(
        `.${LayoutImage.Elements.container}`,
      ) as HTMLElement;
      const caption = elementContainer.querySelector(
        `.${ELEMENT_MEDIA_OJBECT_CAPTION}`,
      ) as HTMLElement;

      if (caption) {
        caption.style.width = `${imageContainer.offsetWidth}px`;
        caption.style.opacity = `1`;
      }
    };
    const sizeObject = () => {
      const isAboveBreakPoint = elementContainer.offsetWidth > BREAKPOINT;
      const objectContainer = elementContainer.querySelector(
        `.${ELEMENT_MEDIA_OBJECT_CONTAINER}`,
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
      if (hasCaption) {
        sizeCaption();
        sizeObject();
      }
    };

    objectContainer.classList.add(ELEMENT_MEDIA_OBJECT_CONTAINER);

    if (image) {
      objectContainer.appendChild(
        LayoutImage.CreateElement({
          image,
          showCaption: true,
        }),
      );
    }

    if (hasCaption) {
      caption.classList.add(ELEMENT_MEDIA_OJBECT_CAPTION);
      caption.style.opacity = `0`;
      objectContainer.appendChild(caption);
    }

    if (objectContainer.children.length > 0) {
      elementContainer.appendChild(objectContainer);
    }

    if (wrappingText) {
      elementContainer.appendChild(wrappingText);
      elementContainer.setAttribute(ATTRIBUTE_IS_WRAPPING_TEXT, '');
      setTimeout(() => {
        sizeObject();
      }, 100);
    }

    elementContainer.classList.add(ELEMENT_MEDIA_INLINE_CONTAINER);

    window.addEventListener(
      'resize',
      Debounce(() => {
        eventResize();
      }, 20),
    );

    return elementContainer;
  })();

export default {
  CreateElement: CreateMediaInline,
  Styles: STYLES_MEDIA_INLINE_ELEMENT,
};
