import * as Styles from '@universityofmaryland/web-styles-library';
import { assets } from 'atomic';
import { ElementModel } from 'model';
import { createElementWithRefs } from './_elementModel';
import { createControlButton } from './controls';
import { type ElementVisual } from '_types';
import { type CarouselWideProps } from '../_types';

const ASPECT_RATIO = '16 / 9';

const createSlideContent = ({
  slide,
  isThemeDark,
}: {
  slide: CarouselWideProps['slides'][0];
  isThemeDark?: boolean;
}) => {
  const children: ElementVisual[] = [];

  // Create content container first to get reference
  let contentContainer: ElementVisual | null = null;

  const closeButton = ElementModel.create({
    element: document.createElement('button'),
    className: 'umd-carousel-wide__slide-content-close',
    attributes: [{ type: 'button' }, { 'aria-label': 'Close content' }],
    elementStyles: {
      element: {
        position: 'absolute',
        top: 0,
        right: 0,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontSize: '20px',
        fontWeight: 'bold',
        padding: Styles.token.spacing.min,
        lineHeight: 1,
        color: Styles.token.color.gray.dark,
        transition: 'color 0.2s ease',

        [`@media (${Styles.token.media.queries.large.max})`]: {
          display: 'none',
        },

        '&:hover, &:focus': {
          outline: `2px solid ${Styles.token.color.blue}`,
        },

        ...(isThemeDark && {
          color: Styles.token.color.gray.light,
          '&:hover': {
            color: Styles.token.color.white,
          },
        }),
      },
    },
  });

  closeButton.element.innerHTML = '×';

  closeButton.element.addEventListener('click', () => {
    if (contentContainer) contentContainer.element.style.display = 'none';
  });

  children.push(closeButton);

  if (slide.headline) {
    children.push(
      ElementModel.headline.sansLarge({
        element: slide.headline,
        elementStyles: {
          element: {
            color: `${Styles.token.color.black}`,
          },
          siblingAfter: {
            marginTop: Styles.token.spacing.sm,
          },
        },
        isThemeDark,
      }),
    );
  }

  if (slide.text) {
    children.push(
      ElementModel.richText.simple({
        element: slide.text,
        isThemeDark,
      }),
    );
  }

  if (children.length === 1) return null;

  contentContainer = ElementModel.createDiv({
    className: 'umd-carousel-wide__slide-content',
    children,
    elementStyles: {
      element: {
        backgroundColor: Styles.token.color.white,
        border: `1px solid ${Styles.token.color.gray.light}`,
        display: 'block',
        padding: Styles.token.spacing.md,
        width: '100%',
        position: 'relative',
        opacity: 0,
        transform: 'translateY(20px)',
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',

        ...(isThemeDark && {
          backgroundColor: Styles.token.color.black,
          border: `1px solid ${Styles.token.color.gray.dark}`,
        }),

        [`@media (${Styles.token.media.queries.large.max})`]: {
          borderTop: 'none',
        },

        [`@media (${Styles.token.media.queries.tablet.min})`]: {
          border: 'none',
          boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.4)',
          maxWidth: '50%',
          position: 'absolute',
          bottom: Styles.token.spacing.sm,
          left: Styles.token.spacing.sm,

          ...(isThemeDark && {
            border: 'none',
            boxShadow: 'none',
          }),
        },
      },
    },
  });

  return contentContainer;
};

const createMainFrameSlide = (
  slide: CarouselWideProps['slides'][0],
  index: number,
  isThemeDark?: boolean,
) => {
  const children: ElementVisual[] = [];
  const slideContentWrapper = createSlideContent({ slide, isThemeDark });

  children.push(
    assets.image.background({
      element: slide.image,
      isScaled: true,
    }),
  );

  if (slideContentWrapper) children.push(slideContentWrapper);

  return ElementModel.create({
    element: document.createElement('figure'),
    className: 'umd-carousel-wide__slide',
    children,
    attributes: [{ 'data-index': `${index}` }],
    elementStyles: {
      element: {
        display: 'none',
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out, transform 0.5s ease-in-out',
        transform: 'translateX(0)',
        aspectRatio: ASPECT_RATIO,

        [`@media (${Styles.token.media.queries.tablet.min})`]: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        },

        '&[data-active="true"]': {
          opacity: 1,
          transform: 'translateX(0)',
          zIndex: 2,
          display: 'block',
        },

        '&[data-animating="true"]': {
          zIndex: 1,
          display: 'block',
          opacity: 1,

          [`@media (${Styles.token.media.queries.large.max})`]: {
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0,
          },
        },

        '&[data-direction="left"]': {
          transform: 'translateX(-100%)',
        },

        '&[data-direction="right"]': {
          transform: 'translateX(100%)',
        },

        '&[data-content-visible="true"] .umd-carousel-wide__slide-content': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      },
    },
  });
};

const createPreviewContainer = (position: 'left' | 'right') => {
  const isPositionLeft = position === 'left';
  return ElementModel.createDiv({
    className: isPositionLeft
      ? 'umd-carousel-wide__preview--left'
      : 'umd-carousel-wide__preview--right',
    attributes: [{ 'aria-hidden': 'true' }, { role: 'presentation' }],
    elementStyles: {
      element: {
        display: 'none',
        overflow: 'hidden',
        position: 'relative',

        [`@media (${Styles.token.media.queries.tablet.min})`]: {
          display: 'flex',
          alignItems: 'flex-end',
          height: '100%',
        },

        ['& > * ']: {
          position: 'absolute !important',
          bottom: '0 !important',
          left: '0 !important',
          width: 'auto !important',
          height: '75% !important',
          display: 'block !important',
          aspectRatio: ASPECT_RATIO,

          ...(isPositionLeft && {
            right: '0 !important',
            left: 'auto !important',
          }),

          ['&:before ']: {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            background: Styles.token.color.gray.darker,
            opacity: 0.5,
            zIndex: 1,
          },
        },
      },
    },
  });
};

const createMainContainer = (
  slides: CarouselWideProps['slides'],
  isThemeDark?: boolean,
) => {
  const slideElements = slides.map((slide, index) => {
    return createMainFrameSlide(slide, index, isThemeDark);
  });

  // Set first slide as active and content visible
  if (slideElements.length > 0) {
    slideElements[0].element.setAttribute('data-active', 'true');
    slideElements[0].element.setAttribute('data-content-visible', 'true');
  }

  return {
    component: ElementModel.createDiv({
      className: 'umd-carousel-wide__main-container',
      children: slideElements,
      elementStyles: {
        element: {
          position: 'relative',
          overflow: 'hidden',
        },
      },
    }),
    refs: slideElements.map((el) => el.element),
  };
};

export const createFramesContainer = (
  slides: CarouselWideProps['slides'],
  isThemeDark?: boolean,
) => {
  const previewLeft = createPreviewContainer('left');
  const previewRight = createPreviewContainer('right');
  const previousButton = createControlButton('prev', isThemeDark);
  const nextButton = createControlButton('next', isThemeDark);
  const mainContainer = createMainContainer(slides, isThemeDark);

  return createElementWithRefs({
    className: 'umd-carousel-wide__frames-container',
    children: [
      previewLeft,
      mainContainer.component,
      previewRight,
      previousButton,
      nextButton,
    ],
    elementStyles: {
      element: {
        position: 'relative',

        [`@media (${Styles.token.media.queries.large.max})`]: {
          padding: `0 ${Styles.token.spacing.md}`,
        },

        [`@media (${Styles.token.media.queries.tablet.min})`]: {
          display: 'grid',
          gridTemplateColumns: '10vw 1fr 10vw',
          gridGap: Styles.token.spacing.md,
          height: '56vw',
          maxHeight: '60vh',
        },

        [`@media (${Styles.token.media.queries.desktop.min})`]: {
          gridTemplateColumns: '15vw 1fr 15vw',
          gridGap: Styles.token.spacing.lg,
        },

        [`@media (${Styles.token.media.queries.highDef.min})`]: {
          gridTemplateColumns: '20vw 1fr 20vw',
        },
      },
    },
    refs: {
      slidesContainer: mainContainer.component.element as HTMLDivElement,
      slides: mainContainer.refs,
      previews: {
        left: previewLeft.element as HTMLElement,
        right: previewRight.element as HTMLElement,
      },
      controls: {
        prev: previousButton.element as HTMLButtonElement,
        next: nextButton.element as HTMLButtonElement,
      },
    },
  });
};
