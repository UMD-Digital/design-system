import * as token from '@universityofmaryland/web-styles-library/token';
import { BACK_ARROW } from '@universityofmaryland/web-icons-library/navigation';
import { animations } from 'atomic';
import { ElementModel } from 'model';
import { createElementWithRefs } from './_elementModel';
import { type CarouselWideProps } from '../_types';

export const createControlButton = (
  type: 'prev' | 'next',
  isThemeDark?: boolean,
) => {
  const isPrev = type === 'prev';
  const altText = isPrev
    ? 'Reverse to the previous Slide'
    : 'Advanced to the Next Slide';

  const buttonTabletPosition = `calc(10vw - (${token.spacing.md} + ${token.spacing.md}))`;
  const buttonDesktopPosition = `calc(15vw - (${token.spacing['xl']} + ${token.spacing.md}))`;
  const buttonHighPosition = `calc(20vw - (${token.spacing['xl']} + ${token.spacing.md}))`;

  const button = ElementModel.create({
    element: document.createElement('button'),
    className: isPrev
      ? 'umd-carousel-wide__control--prev'
      : 'umd-carousel-wide__control--next',
    elementStyles: {
      element: {
        backgroundColor: isThemeDark ? token.color.red : token.color.white,
        height: token.spacing.lg,
        padding: token.spacing.min,
        position: 'absolute',
        transform: `${isPrev ? ' rotate(180deg)' : ''}`,
        zIndex: 3,
        transition: 'background 0.5s',
        width: token.spacing.lg,

        [`@media (${token.media.queries.large.max})`]: {
          top: `calc(22vw + ${token.spacing.sm})`,
          left: isPrev ? 'auto' : `${token.spacing['xl']}`,
          right: isPrev ? `${token.spacing['xl']}` : 'auto',
        },

        [`@media (${token.media.queries.tablet.min})`]: {
          boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.4)',
          left: isPrev ? 'auto' : buttonTabletPosition,
          right: isPrev ? buttonTabletPosition : 'auto',
          bottom: '35%',
        },

        [`@media (${token.media.queries.desktop.min})`]: {
          width: token.spacing['2xl'],
          height: token.spacing['2xl'],
          padding: token.spacing.xs,
          left: isPrev ? 'auto' : buttonDesktopPosition,
          right: isPrev ? buttonDesktopPosition : 'auto',
        },

        [`@media (${token.media.queries.highDef.min})`]: {
          left: isPrev ? 'auto' : buttonHighPosition,
          right: isPrev ? buttonHighPosition : 'auto',
        },

        '& svg': {
          height: '100%',
          width: '100%',
          fill: isThemeDark ? token.color.white : token.color.black,
          transition: 'fill 0.5s',
        },

        '&:hover, &:focus': {
          backgroundColor: isThemeDark ? token.color.redDark : token.color.red,

          '& svg': {
            fill: token.color.white,
          },
        },
      },
    },
  });

  const srText = ElementModel.create({
    element: document.createElement('span'),
    className: 'sr-only',
  });
  srText.element.textContent = altText;

  button.element.append(srText.element);
  button.element.insertAdjacentHTML('afterbegin', BACK_ARROW);

  return button;
};

export const createIndicator = (
  slides: CarouselWideProps['slides'],
  isThemeDark?: boolean,
  callback?: (index: number) => void,
) => {
  const indicator = animations.actions.indicator({
    count: slides.length,
    isThemeDark,
    callback: callback || (() => {}),
  });

  return createElementWithRefs({
    className: 'umd-carousel-wide__drawer',
    children: [indicator],
    elementStyles: {
      element: {
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
        padding: token.spacing.md,

        [`@media (${token.media.queries.tablet.min})`]: {
          padding: 0,
          paddingTop: token.spacing.lg,
        },
      },
    },
    refs: {
      indicator,
    },
  });
};
