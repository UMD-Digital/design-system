import { token } from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../../../_types';
import { VARIABLES, BREAKPOINTS } from 'composite/footer/globals';

const { ELEMENT_NAME } = VARIABLES;
const { MEDIUM, LARGE } = BREAKPOINTS;

const makeGivingLink = (): HTMLAnchorElement => {
  const defaultLink = document.createElement('a');
  defaultLink.textContent = 'Support UMD';
  defaultLink.href = 'https://giving.umd.edu/';
  defaultLink.target = '_blank';
  defaultLink.rel = 'noopener noreferrer';
  return defaultLink;
};

const createLinkElement = (link: HTMLAnchorElement): ElementVisual => {
  return ElementModel.create({
    element: link,
    className: 'umd-footer-call-to-action-link',
    elementStyles: {
      element: {
        display: 'inline-block',
        padding: `${token.spacing.xs} ${token.spacing.lg}`,
        backgroundColor: token.color.red,
        color: `${token.color.white} !important`,
        transition: 'background-color 0.3s ease-in-out',
        fontWeight: 700,

        [`&:hover, &:focus`]: {
          backgroundColor: token.color.redDark,
        },
        [`& *`]: {
          color: `${token.color.white} !important`,
        },
      },
    },
  });
};

export interface CallToActionProps {
  slotCta?: HTMLAnchorElement;
}

export default ({ slotCta }: CallToActionProps): ElementVisual => {
  const baseLink = slotCta ?? makeGivingLink();
  const styledLink = createLinkElement(baseLink);

  return ElementModel.createDiv({
    className: 'umd-footer-call-to-action-container',
    children: [styledLink],
    elementStyles: {
      element: {
        marginLeft: 'auto',

        // Overwrites that used to be in row-logo.ts
        [`@container ${ELEMENT_NAME} (max-width: ${BREAKPOINTS.LARGE - 1}px)`]:
          {
            display: 'none',
          },
      },
    },
  });
};
