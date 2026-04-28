import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { animations } from 'atomic';

type TypeIndicatorWrapperProps = {
  count: number;
  isThemeDark?: boolean;
  isBackground?: boolean;
  callback?: (index: number) => void;
};

export const createCarouselIndicatorWrapper = ({
  count,
  isThemeDark,
  isBackground = true,
  callback,
}: TypeIndicatorWrapperProps) => {
  const overlayColor = isBackground && !isThemeDark ? token.color.gray.lightest : undefined;

  const indicator = animations.actions.indicator({
    count,
    isThemeDark,
    callback: callback || (() => {}),
    ...(overlayColor && { overlayColor }),
  });

  const model = new ElementBuilder()
    .withClassName('carousel-indicator-wrapper')
    .withStyles({
      element: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: `0 ${token.spacing.md}`,
        ...(isBackground && {
          backgroundColor: token.color.gray.lightest,
          ...(isThemeDark && { backgroundColor: token.color.black }),
        }),
        [`@media (${token.media.queries.tablet.min})`]: {
          padding: `0 ${token.spacing.lg}`,
        },
      },
    })
    .withChild(indicator)
    .build();

  return {
    element: model.element,
    styles: model.styles,
    position: indicator.position,
  };
};
