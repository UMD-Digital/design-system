import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { warning as iconWarning } from '@universityofmaryland/web-icons-library/indicators';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { CreateAlertText as AlertText, AlertTextProps } from './elements/text';
import { CreateCloseButton } from './elements/closeButton';
import { BREAKPOINTS } from './globals';
import { type ElementModel } from '../../_types';

export interface AlertPageProps extends AlertTextProps {
  isThemeLight?: boolean;
  isShowIcon?: boolean;
}

const { MEDIUM } = BREAKPOINTS;

const createIcon = (iconMarkup: string) =>
  new ElementBuilder()
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
) => {
  const { isShowIcon = true, isThemeDark } = props;

  const textModel = AlertText(props);
  const iconModel = isShowIcon ? createIcon(iconWarning) : null;
  const closeButtonModel = CreateCloseButton({
    isThemeDark: !!isThemeDark,
    targetSelector: '.alert-page-declaration',
  });

  const children = [iconModel, textModel, closeButtonModel].filter(
    Boolean,
  ) as ElementModel[];

  return new ElementBuilder()
    .withClassName('alert-page-container')
    .withChildren(...children)
    .withStyles({
      element: {
        color: theme.foreground(isThemeDark),
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
};

export default (props: AlertPageProps) =>
  new ElementBuilder()
    .withClassName('alert-page-declaration')
    .withChild(createContainer(props))
    .withStyles({
      element: {
        containerType: 'inline-size',
      },
    })
    .build();
