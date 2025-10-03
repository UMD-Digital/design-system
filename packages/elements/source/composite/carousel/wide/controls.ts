import * as Styles from '@universityofmaryland/web-styles-library';
import * as asset from 'helpers/assets';
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

  const buttonTabletPosition = `calc(10vw - (${Styles.token.spacing.md} + ${Styles.token.spacing.md}))`;
  const buttonDesktopPosition = `calc(15vw - (${Styles.token.spacing['xl']} + ${Styles.token.spacing.md}))`;
  const buttonHighPosition = `calc(20vw - (${Styles.token.spacing['xl']} + ${Styles.token.spacing.md}))`;

  const button = ElementModel.create({
    element: document.createElement('button'),
    className: isPrev
      ? 'umd-carousel-wide__control--prev'
      : 'umd-carousel-wide__control--next',
    elementStyles: {
      element: {
        backgroundColor: isThemeDark
          ? Styles.token.color.red
          : Styles.token.color.white,
        height: Styles.token.spacing.lg,
        padding: Styles.token.spacing.min,
        position: 'absolute',
        transform: `${isPrev ? ' rotate(180deg)' : ''}`,
        zIndex: 3,
        transition: 'background 0.5s',
        width: Styles.token.spacing.lg,

        [`@media (${Styles.token.media.queries.large.max})`]: {
          top: `calc(22vw + ${Styles.token.spacing.sm})`,
          left: isPrev ? 'auto' : `${Styles.token.spacing['xl']}`,
          right: isPrev ? `${Styles.token.spacing['xl']}` : 'auto',
        },

        [`@media (${Styles.token.media.queries.tablet.min})`]: {
          boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.4)',
          left: isPrev ? 'auto' : buttonTabletPosition,
          right: isPrev ? buttonTabletPosition : 'auto',
          bottom: '35%',
        },

        [`@media (${Styles.token.media.queries.desktop.min})`]: {
          width: Styles.token.spacing['2xl'],
          height: Styles.token.spacing['2xl'],
          padding: Styles.token.spacing.xs,
          left: isPrev ? 'auto' : buttonDesktopPosition,
          right: isPrev ? buttonDesktopPosition : 'auto',
        },

        [`@media (${Styles.token.media.queries.highDef.min})`]: {
          left: isPrev ? 'auto' : buttonHighPosition,
          right: isPrev ? buttonHighPosition : 'auto',
        },

        '& svg': {
          height: '100%',
          width: '100%',
          fill: isThemeDark
            ? Styles.token.color.white
            : Styles.token.color.black,
          transition: 'fill 0.5s',
        },

        '&:hover, &:focus': {
          backgroundColor: isThemeDark
            ? Styles.token.color.redDark
            : Styles.token.color.red,

          '& svg': {
            fill: Styles.token.color.white,
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
  button.element.insertAdjacentHTML('afterbegin', asset.icon.BACK_ARROW);

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
        padding: Styles.token.spacing.md,

        [`@media (${Styles.token.media.queries.tablet.min})`]: {
          padding: 0,
          paddingTop: Styles.token.spacing.lg,
        },
      },
    },
    refs: {
      indicator,
    },
  });
};
