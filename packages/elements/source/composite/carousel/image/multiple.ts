import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { combineStyles } from '@universityofmaryland/web-utilities-library/styles';
import * as carouselElements from '../elements';
import { buttons } from 'atomic';
import { createLayoutImageContainer } from 'layout';
import { type ThemeProps } from '_types';

type TypeCarouselMultipleProps = Pick<ThemeProps, 'isThemeDark'> & {
  images: HTMLImageElement[];
  isFullScreenOption?: boolean;
  isToggleCaption?: boolean;
};

const fullScreenClassName = buttons.fullscreen.className;

export const createCompositeCarouselImageMultiple = (props: TypeCarouselMultipleProps) =>
  (() => {
    const { images, isThemeDark, isFullScreenOption = false, isToggleCaption = true } = props;
    const clonedImages = images.map((image) => image.cloneNode(true)) as HTMLImageElement[];
    const slide = new ElementBuilder().build().element;
    const overlayCarousel = carouselElements.overlay({ images, isToggleCaption });

    let buttonStyles = '';
    let blockStyles = '';
    let containerClass = '';

    const blockModels = clonedImages.map((image, index) => {
      const block = createLayoutImageContainer({ image, showCaption: true, isToggleCaption });
      containerClass = block.element.className;

      if (isFullScreenOption) {
        const button = buttons.fullscreen.create({
          callback: overlayCarousel.events.setFullScreen,
          index,
        });

        block.element.appendChild(button.element);
        buttonStyles += button.styles;
      }

      blockStyles += block.styles;
      return block.element;
    });

    const carousel = carouselElements.blocks.CreateElement({
      blocks: blockModels,
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
          [`& .${containerClass} img`]: { objectFit: 'cover' },
        },
      })
      .withStylesIf(isFullScreenOption, {
        element: {
          // Only hide/reveal the Full Screen button on devices that actually
          // hover. On touch (hover: none) the button stays visible by default —
          // and, crucially, no `:hover` rule exists on this container, so iOS
          // Safari does not swallow the first tap as a hover. A hover-reveal on
          // the container would make iOS treat the first tap on the caption
          // toggle (a child of this container) as a hover instead of a click.
          '@media (hover: hover)': {
            [`& .${fullScreenClassName}`]: {
              visibility: 'hidden',
              opacity: 0,
              transition: 'visibility 0s, opacity 0.5s linear',
              '&:focus': { visibility: 'visible', opacity: 1 },
            },
            [`& .${containerClass}:focus-within .${fullScreenClassName}`]: {
              visibility: 'visible',
              opacity: 1,
            },
            [`& .${containerClass}:hover .${fullScreenClassName}`]: {
              visibility: 'visible',
              opacity: 1,
            },
          },
        },
      })
      .withChild(containerModel)
      .withEvents({ SetEventReize: carousel.events.resize })
      .build();

    declarationModel.styles = combineStyles(
      declarationModel.styles,
      blockStyles,
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
