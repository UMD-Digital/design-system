import * as token from '@universityofmaryland/web-styles-library/token';
import { ElementModel } from 'model';
import { BREAKPOINTS } from '../../globals';
import { BaseProps } from '../../_types';
import { type ElementVisual } from '../../../../_types';

export interface CallToActionProps extends BaseProps {
  slotCta?: HTMLAnchorElement;
}

const { LARGE } = BREAKPOINTS;

const makeGivingLink = (): HTMLAnchorElement => {
  const defaultLink = document.createElement('a');
  defaultLink.textContent = 'Support UMD';
  defaultLink.href = 'https://giving.umd.edu/';
  defaultLink.target = '_blank';
  defaultLink.rel = 'noopener noreferrer';
  return defaultLink;
};

const createLinkElement = (
  props: CallToActionProps,
  link: HTMLAnchorElement,
): ElementVisual => {
  const { isThemeLight } = props;

  return ElementModel.actions.primary({
    element: link,
    elementStyles: {
      element: {
        ...(isThemeLight && {
          color: `${token.color.white} !important`,
        }),
      },
    },
  });
};

export default (props: CallToActionProps): ElementVisual => {
  const { isTypeSimple, slotCta } = props;
  const baseLink = slotCta ?? makeGivingLink();
  const styledLink = createLinkElement(props, baseLink);

  return ElementModel.createDiv({
    className: 'umd-footer-call-to-action-container',
    children: [styledLink],
    elementStyles: {
      element: {
        marginLeft: 'auto',

        ...(isTypeSimple && {
          display: 'none',
        }),

        [`@container (min-width: ${LARGE}px)`]: {
          [`& .umd-footer-logo-container`]: {
            display: 'none',
          },
        },
      },
    },
  });
};
