import * as Styles from '@universityofmaryland/web-styles-library';
import { actions, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { CardOverlayProps } from '../_types';

const containerClassName = 'card-overlay-default-container';
const elementStyles = {
  element: {
    className: containerClassName,
    containerType: 'inline-size',

    [`& .${Styles.layout.grid.inline.tabletRows.className}`]: {
      [`@media (${Styles.token.media.queries.tablet.min})`]: {
        marginTop: 'auto !important',
      },
    },
  },
};

export default (props: CardOverlayProps) => {
  const { isThemeDark, ctaIcon } = props;

  if (ctaIcon) {
    elementStyles.element.paddingRight = `${Styles.token.spacing['2xl']}`;
  }

  const elementContainer = ElementModel.composite.cardOverlay({
    ...props,
    element: document.createElement('div'),
    elementStyles,
  });
  const scalingFontContainer = textLockup.smallScaling(props);
  const actionIcon = actions.icon({
    ...props,
    isThemeLight: !isThemeDark,
  });

  elementContainer.element.appendChild(scalingFontContainer.element);
  elementContainer.styles += scalingFontContainer.styles;

  if (actionIcon) {
    elementContainer.element.appendChild(actionIcon.element);
    elementContainer.styles += actionIcon.styles;
  }

  return elementContainer;
};
