import * as token from '@universityofmaryland/web-token-library';
import { createCarouselIndicatorWrapper } from '../elements/indicator-wrapper';
import { createCarouselNavButton, buttonColorsOnWhite } from '../elements/nav-button';
import { type CarouselWideProps } from '../_types';

export const createControlButton = (
  type: 'prev' | 'next',
  isThemeDark?: boolean,
) => {
  const isPrev = type === 'prev';
  const buttonTabletPosition = `calc(10vw - (${token.spacing.md} + ${token.spacing.md}))`;
  const buttonDesktopPosition = `calc(15vw - (${token.spacing['xl']} + ${token.spacing.md}))`;
  const buttonHighPosition = `calc(20vw - (${token.spacing['xl']} + ${token.spacing.md}))`;
  return createCarouselNavButton({
    className: isPrev ? 'umd-carousel-wide__control--prev' : 'umd-carousel-wide__control--next',
    direction: type,
    label: isPrev ? 'Go to previous slide' : 'Go to next slide',
  })
    .withStyles({
      element: {
        padding: token.spacing.min,
        position: 'relative',
        top: 'auto',
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        zIndex: 3,
        transition: 'background 0.5s',
        ...buttonColorsOnWhite(isThemeDark),

        [`@media (${token.media.queries.desktop.min})`]: {
          position: 'absolute',
          boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.4)',
          padding: token.spacing.xs,
          left: isPrev ? buttonDesktopPosition : 'auto',
          right: isPrev ? 'auto' : buttonDesktopPosition,
          bottom: '35%',
        },

        [`@media (${token.media.queries.highDef.min})`]: {
          left: isPrev ? buttonHighPosition : 'auto',
          right: isPrev ? 'auto' : buttonHighPosition,
        },


      },
    })
    .build();
};

export const createIndicator = (
  slides: CarouselWideProps['slides'],
  isThemeDark?: boolean,
  callback?: (index: number) => void,
) => {
  return createCarouselIndicatorWrapper({
    count: slides.length,
    isThemeDark,
    isBackground: false,
    callback,
  });
};
