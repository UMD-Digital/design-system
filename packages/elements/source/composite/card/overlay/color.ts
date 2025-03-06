import * as Styles from '@universityofmaryland/web-styles-library';
import { actions, textLockup } from 'atomic';
import { ElementModel } from 'model';
import { CardOverlayProps } from '../_types';

const elementStyles = {
  element: {
    className: 'card-overlay-color',
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

  const composite = ElementModel.composite.card.overlay.color({
    ...props,
    element: document.createElement('div'),
    elementStyles,
  });
  const scalingFontContainer = textLockup.smallScaling(props);

  if (ctaIcon && ctaIcon instanceof HTMLElement) {
    const actionIcon = actions.icon({
      ...props,
      ctaIcon,
      isThemeLight: !isThemeDark,
    });

    composite.element.appendChild(actionIcon.element);
    composite.styles += actionIcon.styles;
  }

  composite.element.appendChild(scalingFontContainer.element);
  composite.styles += scalingFontContainer.styles;

  return composite;
};
