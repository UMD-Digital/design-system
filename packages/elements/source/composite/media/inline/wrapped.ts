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

    const createImageChild = () => {
      if (!image) {
        console.warn('CreateMediaInlineWrapped: No image provided');
        return null;
      }
      return LayoutImage.CreateElement({ image, showCaption: true });
    };

    const createCaptionChild = () => {
      if (!hasCaption) {
        console.warn('CreateMediaInlineWrapped: No caption provided');
        return null;
      }
      const el = CaptionContainer.CreateElement({ caption, isThemeDark });
      el.style.opacity = '0';
      return el;
    };

    const objectModel = new ElementBuilder()
      .withClassName('element-object-wrapped-container')
      .withStyles({
        element: {
          display: 'inline-block',
          paddingBottom: token.spacing.sm,
          maxWidth: '100%',
        },
      })
      .withChild(createImageChild())
      .withChild(createCaptionChild())
      .build();

    const objectContainerElement = objectModel.element;

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
    const elementContainerElement = containerModel.element;

    const sizeCaption = () => {
      const imageContainer = elementContainerElement.querySelector(
        `.${LayoutImage.Elements.container}`,
      ) as HTMLElement;
      const captionEl = elementContainerElement.querySelector(
        `.${CaptionContainer.Elements.container}`,
      ) as HTMLElement;

      if (captionEl) {
        captionEl.style.width = `${imageContainer.offsetWidth}px`;
      }
    };

    const sizeObject = () => {
      const isAboveBreakPoint = elementContainerElement.offsetWidth > BREAKPOINT;
      const objectContainerEl = elementContainerElement.querySelector(
        '.element-object-wrapped-container',
      ) as HTMLElement;

      if (!image) return;

      if (isAboveBreakPoint) {
        const objectSize = GetObjectSize({
          elementContainer: elementContainerElement,
          image,
        });

        objectContainerEl.style.width = `${objectSize}px`;
        objectContainerEl.style.display = 'inline-block';
        objectContainerEl.style.textAlign = 'left';

        if (isAlignmentRight) {
          objectContainerEl.style.float = `right`;
          objectContainerEl.style.paddingLeft = `${token.spacing.md}`;
        } else {
          objectContainerEl.style.float = 'left';
          objectContainerEl.style.paddingRight = `${token.spacing.md}`;
        }
      } else {
        objectContainerEl.style.width = '100%';
        objectContainerEl.style.float = 'none';
        objectContainerEl.style.textAlign = 'center';
        objectContainerEl.style.paddingLeft = `0`;
        objectContainerEl.style.paddingRight = `0`;
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
        const captionEl = objectContainerElement.querySelector(
          `.${CaptionContainer.Elements.container}`,
        ) as HTMLElement;

        if (captionEl) {
          captionEl.style.opacity = `1`;
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
