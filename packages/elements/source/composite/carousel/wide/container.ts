import { ElementModel } from 'model';
import { createIndicator } from './controls';
import { createFramesContainer } from './frames';
import { createElementWithRefs } from './_elementModel';
import { type CarouselWideProps } from '../_types';

const createAriaLive = () => {
  const liveText = ElementModel.create({
    element: document.createElement('p'),
    className: 'umd-carousel-wide__aria-live',
    attributes: [{ 'aria-live': 'polite' }],
    elementStyles: {
      element: {
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      },
    },
  });

  liveText.element.textContent = 'Slide 1 Selected';
  liveText.element.classList.add('sr-only');

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

  return createElementWithRefs({
    className: 'umd-carousel-wide__container',
    children: [info, framesContainer, indicatorWrapper],
    elementStyles: {
      element: {
        position: 'relative',
      },
    },
    refs: {
      info: info.element as HTMLParagraphElement,
      ...framesContainer.refs,
      indicator: indicatorWrapper.refs.indicator,
    },
  });
};
