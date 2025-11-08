import * as token from '@universityofmaryland/web-styles-library/token';
import { warning as iconWarning } from '@universityofmaryland/web-icons-library/indicators';
import { CreateAlertText as AlertText, AlertTextProps } from './elements/text';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { type ElementVisual } from '../../_types';
import { BREAKPOINTS } from './globals';
import { CreateCloseButton } from './elements/closeButton';

export interface AlertPageProps extends AlertTextProps {
  isThemeLight?: boolean;
  isShowIcon?: boolean;
}

const { MEDIUM } = BREAKPOINTS;

const createIcon = (iconMarkup: string): ElementVisual => {
  const model = new ElementBuilder()
    .withClassName('alert-page-icon')
    .withHTML(iconMarkup)
    .withStyles({
      element: {
        display: 'block',
        fill: token.color.gold,

        [`@container (max-width: ${MEDIUM}px)`]: {
          position: 'absolute',
          top: '-20px',
        },
      },
    })
    .build();

  return {
    ...model,
    className: 'alert-page-icon',
  };
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

  const children = [iconModel, textModel, closeButtonModel].filter(
    Boolean,
  ) as ElementVisual[];

  const model = new ElementBuilder()
    .withClassName('alert-page-container')
    .withChildren(...children)
    .withThemeDark(isThemeDark)
    .withStyles({
      element: {
        ...(isThemeDark && { color: token.color.white }),
        display: 'flex',
        position: 'relative',
        padding: token.spacing.lg,
        paddingRight: token.spacing['2xl'],
        gap: token.spacing.lg,
        border: `solid 4px ${token.color.gold}`,

        [`@container (max-width: ${MEDIUM}px)`]: {
          paddingRight: token.spacing.lg,
        },
      },
    })
    .build();

  return {
    ...model,
    className: 'alert-page-container',
  };
};

const createWrapper = (containerElement: ElementVisual): ElementVisual => {
  const model = new ElementBuilder()
    .withClassName('alert-page-declaration')
    .withChild(containerElement)
    .withStyles({
      element: {
        containerType: 'inline-size',
      },
    })
    .build();

  return {
    ...model,
    className: 'alert-page-declaration',
  };
};

export default (props: AlertPageProps) => {
  const containerModel = createContainer(props);

  return createWrapper(containerModel);
};
