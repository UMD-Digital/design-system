import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { createCompositeMediaCaption as CaptionContainer } from '../elements/caption';
import { Image as LayoutImage } from 'layout';

export type TypeMediaInlineWrappedRequirements = {
  image?: HTMLImageElement | null;
  caption?: HTMLElement | null;
  wrappingText?: HTMLElement | null;
  isAlignmentRight?: boolean;
  isThemeDark?: boolean;
};

const BREAKPOINT = 400;

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
    const hasWrappingText = wrappingText && wrappingText !== null;
    const hasCaption = caption && caption !== null;

    const createImage = () => {
      if (!image) {
        console.warn('CreateMediaInlineWrapped: No image provided');
        return null;
      }
      return LayoutImage.CreateElement({ image, showCaption: true });
    };

    const createCaption = () => {
      if (!hasCaption) {
        console.warn('CreateMediaInlineWrapped: No caption provided');
        return null;
      }
      const captionElement = CaptionContainer.CreateElement({ caption, isThemeDark });
      captionElement.style.opacity = '0';
      return captionElement;
    };

		const imageElement = createImage()
		const captionElement = createCaption()

    const objectModel = new ElementBuilder()
      .withClassName('element-object-wrapped-container')
      .withStyles({
        element: {
          display: 'inline-block',
          paddingBottom: token.spacing.sm,
          maxWidth: '100%',
        },
      })
      .withChild(imageElement)
      .withChild(captionElement)
      .build();

    const objectContainer = objectModel.element;

    const containerBuilder = new ElementBuilder()
      .withClassName('element-media-inline-wrapped-container')
      .withStyles({
        element: {
          display: 'inline-block',
          maxWidth: '100%',
        },
      });

    if (image || hasCaption) {
      containerBuilder.withChild(objectModel);
    }

    if (hasWrappingText && wrappingText) {
      containerBuilder.withChild(wrappingText).withAttribute('is-wrapping-text', '');
    }

    const containerModel = containerBuilder.build();
    const elementContainer = containerModel.element;

    const sizeCaption = () => {
      const imageContainer = elementContainer.querySelector(
        `.${LayoutImage.Elements.container}`,
      ) as HTMLElement;
      const captionContainer = elementContainer.querySelector(
        `.${CaptionContainer.Elements.container}`,
      ) as HTMLElement;

      if (captionContainer) {
        captionContainer.style.width = `${imageContainer.offsetWidth}px`;
      }
    };

    const sizeObject = () => {
      const isAboveBreakPoint = elementContainer.offsetWidth > BREAKPOINT;

      if (!image) return;

      if (isAboveBreakPoint) {
        const objectSize = GetObjectSize({
          elementContainer,
          image,
        });

        objectContainer.style.width = `${objectSize}px`;
        objectContainer.style.display = 'inline-block';
        objectContainer.style.textAlign = 'left';

        if (isAlignmentRight) {
          objectContainer.style.float = `right`;
          objectContainer.style.paddingLeft = `${token.spacing.md}`;
        } else {
          objectContainer.style.float = 'left';
          objectContainer.style.paddingRight = `${token.spacing.md}`;
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
      if (hasWrappingText) {
        sizeObject();
      }
      if (hasCaption) {
        sizeCaption();
      }
    };

    const load = () => {
      const checkSizing = () => {
        const captionContainer = objectContainer.querySelector(
          `.${CaptionContainer.Elements.container}`,
        ) as HTMLElement;

        if (captionContainer) {
          captionContainer.style.opacity = `1`;
        }
      };

			if (!image) {
        console.warn('load(): No image found');
        return null;
      }

      image.addEventListener('load', () => {
        eventResize();

        setTimeout(() => {
          checkSizing();
        }, 100);

        setTimeout(() => {
          checkSizing();
        }, 500);
      });
    };

    window.addEventListener(
      'resize',
      debounce(() => {
        eventResize();
      }, 20),
    );

    if (hasWrappingText) {
      setTimeout(() => {
        sizeObject();
      }, 100);
    }

    setTimeout(() => {
      eventResize();
    }, 200);

    containerModel.styles += LayoutImage.Styles;
    containerModel.styles += CaptionContainer.Styles;

    return {
      ...containerModel,
      events: {
        load,
      },
    };
  })();

export const createCompositeMediaInlineWrapped = CreateMediaInlineWrapped;
