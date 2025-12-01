import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as Styles from '@universityofmaryland/web-styles-library';
import { BREAKPOINTS } from '../../globals';
import { CallToActionProps } from '../../_types';
import { type UMDElement } from '../../../../_types';

const { LARGE } = BREAKPOINTS;

const makeGivingLink = (): HTMLAnchorElement => {
  const defaultLink = document.createElement('a');
  defaultLink.textContent = 'Support UMD';
  defaultLink.href = 'https://giving.umd.edu/';
  defaultLink.target = '_blank';
  defaultLink.rel = 'noopener noreferrer';
  return defaultLink;
};

const createLinkElement = (link: HTMLAnchorElement): UMDElement => {
  const childLink = link.cloneNode(true) as HTMLAnchorElement;
  return new ElementBuilder('div')
    .withClassName('umd-action-primary')
    .styled(Styles.element.action.primary.normal)
    .withStyles({
      element: {
        ['& a']: {
          color: `${token.color.white} !important`,
        },
      },
    })
    .withChild(childLink)
    .build();
};

export default (
  props: Pick<CallToActionProps, 'isTypeSimple' | 'slotCta'>,
): UMDElement => {
  const { isTypeSimple, slotCta } = props;
  const baseLink = slotCta ?? makeGivingLink();
  const styledLink = createLinkElement(baseLink);

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
