import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { combineStyles } from '@universityofmaryland/web-utilities-library/styles';
import * as carouselElements from '../elements';
import { Image as LayoutImage } from 'layout';

const CreateOverlaySlide = ({ images }: { images: HTMLImageElement[] }) =>
  images.map((image) => {
    const imageBlock = LayoutImage.CreateElement({ image, showCaption: true });

    const imageContainerModel = new ElementBuilder()
      .withClassName('carousel-overlay-container')
      .withStyles({
        element: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: token.color.gray.dark,

          '& > *': {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },

          '& img': {
            objectFit: 'contain',
            maxHeight: '100%',
            maxWidth: '100%',
          },
        },
      })
      .withChild(imageBlock)
      .build();

    return imageContainerModel;
  });

export const createCompositeCarouselOverlay = ({
  images,
}: {
  images: HTMLImageElement[];
}) =>
  (() => {
    let isFullScreenEvents: any = null;

    const setFullScreen = (index: number) => {
      let canMove = true;

      overlayCarousel.events.EventMoveTo(index);

      setTimeout(() => fixedFullScreen.events.show(), 100);

      setTimeout(() => {
        overlayCarousel.events.EventResize();
      }, 100);

      isFullScreenEvents = window.addEventListener(
        'keyup',
        (event: KeyboardEvent) => {
          if (!canMove) return;

          canMove = false;
          if (event.key === 'ArrowLeft') {
            overlayCarousel.events.EventSlideLeft();
          } else if (event.key === 'ArrowRight') {
            overlayCarousel.events.EventSlideRight();
          }

          setTimeout(() => {
            canMove = true;
          }, 700);
        },
      );
    };

    const overlaySlideModels = CreateOverlaySlide({ images });
    const overlaySlides = overlaySlideModels.map((model) => model.element);
    const firstSlide = overlaySlideModels[0];
    const slideStyles = firstSlide ? firstSlide.styles : '';

    const overlayCarousel = carouselElements.image({
      slides: overlaySlides,
      maxHeight: (window.innerHeight / 10) * 8,
    });

    const fixedFullScreen = carouselElements.fullScreen({
      content: overlayCarousel.element,
      callback: () => {
        if (isFullScreenEvents) {
          window.removeEventListener('keyup', isFullScreenEvents);
        }
      },
    });

    return {
      element: fixedFullScreen.element,
      styles: combineStyles(
        LayoutImage.Styles,
        slideStyles,
        overlayCarousel.styles,
        fixedFullScreen.styles,
      ),
      events: {
        setFullScreen,
      },
    };
  })();
