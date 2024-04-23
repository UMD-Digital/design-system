import { Tokens, Typography } from '@universityofmaryland/variables';
import { Styles, Performance } from 'utilities';
import { LayoutImage } from 'macros';

export type TypeMediaInlineRequirements = {
  image?: HTMLElement | null;
  caption?: HTMLElement | null;
  wrappingText?: HTMLElement | null;
  isAlignmentRight?: boolean;
};

const { Colors, Spacing } = Tokens;
const { SansSmall } = Typography;
const { ConvertJSSObjectToStyles } = Styles;
const { Debounce } = Performance;

const ATTRIBUTE_IS_WRAPPING_TEXT = 'is-wrapping-text';
const ATTRIBUTE_ALIGNMENT = 'alignment';
const ALIGNMENT_RIGHT = 'right';

const ELEMENT_MEDIA_INLINE_CONTAINER = 'element-media-inline-container';
const ELEMENT_MEDIA_OBJECT_CONTAINER = 'element-media-object-container';
const ELEMENT_MEDIA_OJBECT_CAPTION = 'element-media-object-caption';

const IS_WRAPPING = `[${ATTRIBUTE_IS_WRAPPING_TEXT}]`;
const IS_ALIGNMENT_RIGHT = `[${ATTRIBUTE_ALIGNMENT}="${ALIGNMENT_RIGHT}"]`;

const OVERWRITE_WRAPPING_TEXT_OBJECT = `.${ELEMENT_MEDIA_INLINE_CONTAINER}${IS_WRAPPING} .${ELEMENT_MEDIA_OBJECT_CONTAINER}`;
const OVERWRITE_ALIGNMENT_RIGHT = `.${ELEMENT_MEDIA_INLINE_CONTAINER}${IS_ALIGNMENT_RIGHT} .${ELEMENT_MEDIA_OBJECT_CONTAINER}`;

// prettier-ignore
const OverwriteWrapping = `
  ${OVERWRITE_WRAPPING_TEXT_OBJECT} {
    float: left;
    padding-right: ${Spacing.md};
  }

  ${OVERWRITE_ALIGNMENT_RIGHT} {
    float: right;
    padding-right: 0;
    padding-left: ${Spacing.md};
  }
`

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
  ${OverwriteWrapping}
`;

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
      }
    };
    const sizeObject = () => {
      const elementSize = elementContainer.offsetWidth;
      const objectContainer = elementContainer.querySelector(
        `.${ELEMENT_MEDIA_OBJECT_CONTAINER}`,
      ) as HTMLElement;
      const objectSize = objectContainer.offsetWidth;

      if (objectSize > elementSize / 2) {
        objectContainer.style.float = `none`;
      } else {
        objectContainer.style.float = isAlignmentRight ? `right` : 'left';
      }
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
      objectContainer.appendChild(caption);
      setTimeout(() => {
        sizeCaption();
      }, 100);
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
    if (isAlignmentRight) elementContainer.setAttribute('alignment', 'right');

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
