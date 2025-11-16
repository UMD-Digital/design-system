import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-styles-library/token';
import * as Styles from '@universityofmaryland/web-styles-library';
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
): UMDElement =>
  new ElementBuilder('slot')
    .withClassName('umd-action-primary')
    .styled(Styles.element.action.primary.normal)
    .withStyles({
      element: {
        ['& a']: {
          color: `${token.color.white} !important`,
        },
      },
    })
    .withChild(link)
    .build();

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
