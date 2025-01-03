import { tokens } from '@universityofmaryland/web-elements-styles';
import AnimationCarouselImage from '../macros/animations/carousel-image';
import LayoutImage from './image';
import FixedFullScreen from './carousel-full-screen';

const { colors } = tokens;

const ELEMENT_CAROUSEL_OVERLAY_COINTAINER = 'carousel-overlay-container';

// prettier-ignore
const OverlayImageContainerStyles = `
  .${ELEMENT_CAROUSEL_OVERLAY_COINTAINER} {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.gray.dark};
  }

  .${ELEMENT_CAROUSEL_OVERLAY_COINTAINER} img {
    object-fit: contain;
    max-height: 100%;
  }
`;

// prettier-ignore
const STYLES_CAROUSEL_OVERLAY_ELEMENT = `
  ${LayoutImage.Styles}
  ${FixedFullScreen.Styles}
  ${AnimationCarouselImage.Styles}
  ${OverlayImageContainerStyles}
`;

const CreateOverlaySlide = ({ images }: { images: HTMLImageElement[] }) =>
  images.map((image) => {
    const slide = document.createElement('div');
    const imageContainer = document.createElement('div');
    const imageBlock = LayoutImage.CreateElement({
      image,
      showCaption: true,
    });

    imageContainer.classList.add(ELEMENT_CAROUSEL_OVERLAY_COINTAINER);
    imageContainer.appendChild(imageBlock);

    slide.appendChild(imageContainer);

    return slide;
  });

const CreateCarouselOverlayElement = ({
  images,
}: {
  images: HTMLImageElement[];
}) =>
  (() => {
    const setFullScreen = (index: number) => {
      let canMove = true;

      const checkKeyEvents = (event: KeyboardEvent) => {
        if (!canMove) return;
        canMove = false;
        if (event.key == 'ArrowLeft') overlayCarousel.events.EventSlideLeft();
        if (event.key == 'ArrowRight') overlayCarousel.events.EventSlideRight();

        setTimeout(() => {
          canMove = true;
        }, 700);
      };

      overlayCarousel.events.EventMoveTo(index);
      setTimeout(() => fixedFullScreen.events.show(), 100);

      setTimeout(() => {
        overlayCarousel.events.EventResize();
      }, 100);

      isFullScreenEvents = window.addEventListener('keyup', checkKeyEvents);
    };

    const overlaySlides = CreateOverlaySlide({ images });

    const overlayCarousel = AnimationCarouselImage.CreateElement({
      slides: overlaySlides,
      maxHeight: (window.innerHeight / 10) * 8,
    });

    const fixedFullScreen = FixedFullScreen.CreateElement({
      content: overlayCarousel.element,
      callback: () => {
        if (isFullScreenEvents)
          window.removeEventListener('keyup', isFullScreenEvents);
      },
    });

    let isFullScreenEvents: any = null;

    return {
      element: fixedFullScreen.element,
      events: {
        setFullScreen,
      },
    };
  })();

export default {
  CreateElement: CreateCarouselOverlayElement,
  Styles: STYLES_CAROUSEL_OVERLAY_ELEMENT,
};
