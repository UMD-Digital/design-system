import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { createIndicator } from './controls';
import { createFramesContainer } from './frames';
import { type CarouselWideProps } from '../_types';

const createAriaLive = () => {
  const liveText = new ElementBuilder('p')
    .withClassName('umd-carousel-wide__aria-live')
    .withClassName('sr-only')
    .withAttribute('aria-live', 'polite')
    .withStyles({
      element: {
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      },
    })
    .withText('Slide 1 Selected')
    .build();

  return liveText;
};

export const createContainer = (
  props: CarouselWideProps,
  onIndicatorClick?: (index: number) => void,
) => {
  const info = createAriaLive();
  const framesContainer = createFramesContainer(
    props.slides,
    props.isThemeDark,
  );

  const indicatorWrapper = createIndicator(
    props.slides,
    props.isThemeDark,
    onIndicatorClick,
  );

  const buttonWrapperModel = new ElementBuilder()
    .withClassName('umd-carousel-wide__buttons')
    .withStyles({
      element: {
        display: 'flex',
        justifyContent: 'center',
        gap: token.spacing.min,
        width: '100%',
        marginTop: token.spacing.md,
        marginBottom: token.spacing.md,
        [`@media (${token.media.queries.desktop.min})`]: {
          width: 'auto',
          marginTop: 0,
          marginBottom: 0,
        },
      },
    })
    .withChildren(framesContainer.buttons.prev, framesContainer.buttons.next)
    .build();

  const indicatorModel = new ElementBuilder()
    .withClassName('umd-carousel-wide__indicator')
    .withStyles({
      element: {
        width: '100%',
      },
    })
    .withChild(indicatorWrapper)
    .build();

  const model = new ElementBuilder()
    .withClassName('umd-carousel-wide__container')
    .withStyles({
      element: {
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        [`@media (${token.media.queries.desktop.min})`]: {
          display: 'block',
        },
      },
    })
    .withChildren(info, framesContainer, indicatorModel, buttonWrapperModel)
    .build();

  return {
    element: model.element,
    styles: model.styles,
    refs: {
      info: info.element as HTMLParagraphElement,
      ...framesContainer.refs,
      indicator: indicatorWrapper,
    },
  };
};
