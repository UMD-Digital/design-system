import * as token from '@universityofmaryland/web-styles-library/token';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { actions } from '@universityofmaryland/web-builder-library/presets';
import { BREAKPOINTS } from '../../globals';
import { BaseProps } from '../../_types';
import { type UMDElement } from '../../../../_types';

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
): UMDElement => {
  const { isThemeLight } = props;

  return actions
    .primary()
    .withChild(link)
    .withStylesIf(!!isThemeLight, {
      element: {
        color: `${token.color.white} !important`,
      },
    })
    .build();
};

export default (props: CallToActionProps): UMDElement => {
  const { isTypeSimple, slotCta } = props;
  const baseLink = slotCta ?? makeGivingLink();
  const styledLink = createLinkElement(props, baseLink);

  return new ElementBuilder()
    .withClassName('umd-footer-call-to-action-container')
    .withChild(styledLink)
    .withStyles({
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
    })
    .build();
};
