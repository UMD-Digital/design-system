import * as token from '@universityofmaryland/web-token-library';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { combineStyles } from '@universityofmaryland/web-utilities-library/styles';
import * as carouselElements from '../elements';
import { buttons } from 'atomic';
import { Image as LayoutImage } from 'layout';

type TypeCarouselMultipleProps = {
  images: HTMLImageElement[];
  isThemeDark?: boolean;
  isFullScreenOption?: boolean;
};

const fullScreenClassName = elementStyles.action.button.fullScreen.className;

export const createCompositeCarouselImageMultiple = (props: TypeCarouselMultipleProps) =>
  (() => {
    const { images, isThemeDark, isFullScreenOption = false } = props;
    const clonedImages = images.map((image) => image.cloneNode(true)) as HTMLImageElement[];
    const slide = new ElementBuilder().build().element;
    const overlayCarousel = carouselElements.overlay({ images });

    let buttonStyles = '';

    const blocks = clonedImages.map((image, index) => {
      const block = LayoutImage.CreateElement({ image, showCaption: true });

      if (isFullScreenOption) {
        const button = buttons.fullscreen.create({
          callback: overlayCarousel.events.setFullScreen,
          index,
        });

        block.appendChild(button.element);
        buttonStyles += button.styles;
      }

      return block;
    });

    const carousel = carouselElements.blocks.CreateElement({
      blocks,
      slide,
      mobileBreakpoint: token.media.breakpointValues.medium.max,
      tabletBreakpoint: token.media.breakpointValues.desktop.min,
      desktopBreakpoint: token.media.breakpointValues.highDef.max,
      desktopCount: 3,
      maxCount: 4,
      showHint: false,
      fullScreenCallback: overlayCarousel.events.setFullScreen,
      button: {
        ...carouselElements.buttonColorsOnWhite(isThemeDark),
      },
    });

    const containerModel = new ElementBuilder()
      .withClassName('carousel-image-multiple-container')
      .withStyles({
        element: {
          overflow: 'hidden',
          ...(isThemeDark && { backgroundColor: token.color.black }),
        },
      })
      .withChild(carousel)
      .build();

    const declarationModel = new ElementBuilder()
      .withClassName('carousel-image-multiple-declaration')
      .withStyles({
        element: {
          containerType: 'inline-size',
          [`& .${LayoutImage.Elements.container} img`]: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
        },
      })
      .withStylesIf(isFullScreenOption, {
        element: {
          [`& .${fullScreenClassName}`]: {
            visibility: 'hidden',
            opacity: 0,
            transition: 'visibility 0s, opacity 0.5s linear',
            '&:focus': { visibility: 'visible', opacity: 1 },
          },
          [`& .${LayoutImage.Elements.container}:focus-within .${fullScreenClassName}`]: {
            visibility: 'visible',
            opacity: 1,
          },
          [`& .${LayoutImage.Elements.container}:hover .${fullScreenClassName}`]: {
            visibility: 'visible',
            opacity: 1,
          },
        },
      })
      .withChild(containerModel)
      .withEvents({ SetEventReize: carousel.events.resize })
      .build();

    declarationModel.styles = combineStyles(
      declarationModel.styles,
      LayoutImage.Styles,
      overlayCarousel.styles,
      buttonStyles,
    );

    images[images.length - 1].addEventListener('load', () => {
      carousel.events.load();

      setTimeout(() => {
        const maxHeight = clonedImages.reduce(
          (accumulator, image) => Math.max(image.offsetHeight, accumulator),
          300,
        );

        slide.style.minHeight = `${maxHeight}px`;
      }, 100);
    });

    if (isFullScreenOption) {
      const wrapperModel = new ElementBuilder()
        .withChild(declarationModel)
        .withModifier((element) => {
          element.insertAdjacentElement('afterbegin', overlayCarousel.element);
        })
        .withEvents({ SetEventReize: carousel.events.resize })
        .build();

      return wrapperModel;
    }

    return declarationModel;
  })();
