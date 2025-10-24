import * as token from '@universityofmaryland/web-styles-library/token';
import { warning as iconWarning } from '@universityofmaryland/web-icons-library/indicators';
import { CreateAlertText as AlertText, AlertTextProps } from './elements/text';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { type ElementVisual } from '../../_types';
import { BREAKPOINTS } from './globals';
import { CreateCloseButton } from './elements/closeButton';

export interface AlertPageProps extends AlertTextProps {
  isThemeLight?: boolean;
  isShowIcon?: boolean;
}

const { MEDIUM } = BREAKPOINTS;

const createIcon = (iconMarkup: string): ElementVisual => {
  const iconWrapper = ElementBuilder.create.div({
    className: 'alert-page-icon',
    elementStyles: {
      element: {
        display: 'block',
        fill: token.color.gold,
        [`@container (max-width: ${MEDIUM}px)`]: {
          position: 'absolute',
          top: '-20px',
        },
      },
    },
  });
  iconWrapper.element.innerHTML = iconMarkup;
  return iconWrapper as ElementVisual;
};

const createContainer = (
  props: Pick<
    AlertPageProps,
    | 'isShowIcon'
    | 'isThemeDark'
    | 'isThemeLight'
    | 'headline'
    | 'text'
    | 'actions'
  >,
): ElementVisual => {
  const { isShowIcon = true, isThemeDark } = props;

  const textModel = AlertText(props);
  const iconModel = isShowIcon ? createIcon(iconWarning) : null;

  const closeButtonModel = CreateCloseButton({
    isThemeDark: !!isThemeDark,
    targetSelector: '.alert-page-declaration',
  });

  return ElementBuilder.create.div({
    className: 'alert-page-container',
    children: [iconModel, textModel, closeButtonModel].filter(
      Boolean,
    ) as ElementVisual[],
    elementStyles: {
      element: {
        display: 'flex',
        position: 'relative',
        padding: token.spacing.lg,
        paddingRight: token.spacing['2xl'],
        gap: token.spacing.lg,
        border: `solid 4px ${token.color.gold}`,

        ['&[theme="dark"] *']: {
          color: token.color.white,
        },

        ['&[theme="dark"] .alert-page-close-button rect']: {
          fill: token.color.white,
        },

        [`@container (max-width: ${MEDIUM}px)`]: {
          paddingRight: token.spacing.lg,
        },
      },
    },
    isThemeDark: isThemeDark || false,
  });
};

const createWrapper = (containerElement: ElementVisual): ElementVisual => {
  return ElementBuilder.create.div({
    className: 'alert-page-declaration',
    children: [containerElement],
    elementStyles: {
      element: {
        containerType: 'inline-size',
      },
    },
  });
};

export default (props: AlertPageProps) => {
  const containerModel = createContainer(props);
  const declarationModel = createWrapper(containerModel);

  return declarationModel;
};
