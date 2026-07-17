import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { createCompositeMediaCaption as CaptionContainer } from '../elements/caption';
import { createLayoutImageContainer } from 'layout';
import { type ThemeProps } from '_types';

export type TypeMediaInlineRequirements = Pick<ThemeProps, 'isThemeDark'> & {
  image?: HTMLImageElement | null;
  caption?: HTMLElement | null;
};

const CreateMediaWithCaption = (props: TypeMediaInlineRequirements) =>
  {
    const { caption, image, isThemeDark } = props;
    const hasCaption = caption && caption !== null;

    const createImage = () => {
      if (!image) {
        console.warn('CreateMediaWithCaption: No image provided');
        return null;
      }
      return createLayoutImageContainer({ image, showCaption: true });
    };

    const createCaption = () => {
      if (!hasCaption) {
        console.warn('CreateMediaWithCaption: No caption provided');
        return null;
      }
      const captionContainer = CaptionContainer.CreateElement({ caption, isThemeDark });
      captionContainer.style.display = 'none';
      return captionContainer;
    };

    const imageElement = createImage();
    const captionElement = createCaption();
    const children = [imageElement, captionElement].filter((child) => child != null);

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
      .withChildren(...children)
      .build();

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
    const objectContainer = objectModel.element;

    const sizeCaption = () => {
      if (!imageElement || !captionElement) return;
      captionElement.style.width = `${imageElement.element.offsetWidth}px`;
      captionElement.style.display = `block`;
    };

    const load = () => {
      const checkSizing = () => {
        const captionElement = objectContainer.querySelector(
          `.${CaptionContainer.Elements.container}`,
        ) as HTMLElement;

        if (captionElement) {
          captionElement.style.opacity = `1`;
        }
      };

      if (!image) {
        console.warn('CreateMediaWithCaption: No image provided');
        return null;
      }

      image.addEventListener('load', () => {
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

    containerModel.styles += CaptionContainer.Styles;

    return {
      ...containerModel,
      events: {
        load,
      },
    };
  };

export const createCompositeMediaInlineCaption = CreateMediaWithCaption;
