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

  const composite = ElementModel.composite.card.overlay.color({
    ...props,
    element: document.createElement('div'),
    elementStyles,
  });
  const wrapper = ElementModel.create({
    element: document.createElement('div'),
    className: 'card-overlay-color-wrapper',
    elementStyles: {
      element: {
        paddingRight: `${ctaIcon ? Styles.token.spacing['2xl'] : 0}`,
        height: '100%',

        [`& > *`]: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9,
          position: 'relative',
        },
      },
    },
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

  wrapper.element.appendChild(scalingFontContainer.element);
  wrapper.styles += scalingFontContainer.styles;

  composite.element.appendChild(wrapper.element);
  composite.styles += wrapper.styles;

  return composite;
};
