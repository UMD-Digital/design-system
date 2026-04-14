import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { createCompositeMediaCaption as CaptionContainer } from '../elements/caption';
import { Image as LayoutImage } from 'layout';

export type TypeMediaInlineRequirements = {
  image?: HTMLImageElement | null;
  caption?: HTMLElement | null;
  isThemeDark?: boolean;
};

const CreateMediaWithCaption = (props: TypeMediaInlineRequirements) =>
  (() => {
    const { caption, image, isThemeDark } = props;
    const hasCaption = caption && caption !== null;

    const createImageChild = () => {
      if (!image) {
        console.warn('CreateMediaWithCaption: No image provided');
        return null;
      }
      return LayoutImage.CreateElement({ image, showCaption: true });
    };

    const createCaptionChild = () => {
      if (!hasCaption) {
        console.warn('CreateMediaWithCaption: No caption provided');
        return null;
      }
      const el = CaptionContainer.CreateElement({ caption, isThemeDark });
      el.style.display = 'none';
      return el;
    };

    const objectModel = new ElementBuilder()
      .withClassName('element-media-caption-container')
      .withStyles({
        element: {
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: token.spacing.sm,
          maxWidth: '100%',
        },
      })
      .withChild(createImageChild())
      .withChild(createCaptionChild())
      .build();

    const objectContainerElement = objectModel.element;

    const containerBuilder = new ElementBuilder()
      .withClassName('element-media-with-caption-container')
      .withStyles({
        element: {
          display: 'inline-block',
          maxWidth: '100%',
        },
      });

    if (image || hasCaption) {
      containerBuilder.withChild(objectModel);
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
        captionEl.style.display = `block`;
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
        checkSizing();

        setTimeout(() => {
          checkSizing();
        }, 500);
      });
    };

    window.addEventListener(
      'resize',
      debounce(() => {
        sizeCaption();
      }, 20),
    );

    setTimeout(() => {
      sizeCaption();
    }, 100);

    containerModel.styles += LayoutImage.Styles;
    containerModel.styles += CaptionContainer.Styles;

    return {
      ...containerModel,
      events: {
        load,
      },
    };
  })();

export const createCompositeMediaInlineCaption = CreateMediaWithCaption;
