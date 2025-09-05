import {
  animation,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import createSocialCampaignColumns, {
  SOCIAL_COLUMN_WRAPPER,
  type SocialCampaignColumnsProps,
} from '../social';
import { BREAKPOINTS, VARIABLES, REFERENCES } from '../../../globals';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../../../../_types';
import { BaseProps } from '../../../_types';

const { MEDIUM, LARGE } = BREAKPOINTS;
const { ELEMENT_NAME } = VARIABLES;
const { IS_THEME_LIGHT } = REFERENCES;

const CONTACT_CONTAINER = 'umd-footer-contact-container';
const CONTACT_LIST_HEADLINE = 'umd-footer-contact-list-headline';
const CONTACT_LIST_ADDRESS = 'umd-footer-contact-list-address';
const CONTACT_LINKS_LIST = 'umd-footer-contact-links-list';

const DEFAULT_HEADLINE_LINK = {
  url: 'https://www.usmd.edu/',
  title: 'The Flagship Institution of the State of Maryland',
};
const DEFAULT_ADDRESS_TITLE = 'Office of Marketing and Communications';
const DEFAULT_ADDRESS_ONE = '2101 Turner Hall';
const DEFAULT_ADDRESS_TWO = 'College Park, MD 20742';
const DEFAULT_EMAIL = {
  url: 'mailto:omc@umd.edu',
  title: 'omc@umd.edu',
  label: 'Email: Office of the marketing and communications at omc@umd.edu',
};
const DEFAULT_PHONE = {
  url: 'tel:3014051000',
  title: '301.405.1000',
  label: 'Call: 301-405-1000',
};

// // prettier-ignore
// const socialOverwriteStyles = `
//   @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
//     .${CONTACT_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
//       display: none;
//     }
//   }

//   @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
//     .${CONTACT_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
//       margin-top: ${token.spacing.md};
//     }
//   }
// `;

// // prettier-ignore
// const HeadlineStyles = `
//   .${CONTACT_LIST_HEADLINE} {
//     margin-bottom: ${token.spacing.min};
//     color: ${token.color.white};
//   }

//   .${CONTACT_LIST_HEADLINE} * {
//     font-weight: 700;
//     color: ${token.color.white};
//   }

//   ${Utils.theme.convertJSSObjectToStyles({
//     styleObj: {
//       [`.${CONTACT_LIST_HEADLINE} a`]:
//       animation.line.slideUnderWhite,
//     },
//   })}

//   ${Utils.theme.convertJSSObjectToStyles({
//     styleObj: {
//       [`.${CONTACT_LIST_HEADLINE}`]: typography.elements.interativeMedium,
//     },
//   })}

//   .umd-footer-element-wrapper${IS_THEME_LIGHT} .${CONTACT_LIST_HEADLINE},
//   .umd-footer-element-wrapper${IS_THEME_LIGHT} .${CONTACT_LIST_HEADLINE} * {
//     color: ${token.color.black};
//   }

//   ${Utils.theme.convertJSSObjectToStyles({
//     styleObj: {
//       [`.umd-footer-element-wrapper${IS_THEME_LIGHT} .${CONTACT_LIST_HEADLINE} a`]:
//       animation.line.slideUnderBlack,
//     },
//   })}
// `;

// // prettier-ignore
// const AddressStyles = `
//   .${CONTACT_LIST_ADDRESS} + * {
//     margin-top: 2px;
//   }

//   .${CONTACT_LIST_ADDRESS} * {
//     display: block;
//   }

//   ${Utils.theme.convertJSSObjectToStyles({
//     styleObj: {
//       [`.${CONTACT_LIST_ADDRESS} *`]: typography.sans.small,
//     },
//   })}
// `;

// // prettier-ignore
// const LinkListStyles = `
//   .${CONTACT_LINKS_LIST} {
//     display: flex;
//   }

//   ${Utils.theme.convertJSSObjectToStyles({
//     styleObj: {
//       [`.${CONTACT_LINKS_LIST} *`]: typography.sans.small,
//     },
//   })}

//   .${CONTACT_LINKS_LIST} a {
//     display: block;
//   }

//   ${Utils.theme.convertJSSObjectToStyles({
//     styleObj: {
//       [`.${CONTACT_LINKS_LIST} a`]:
//       animation.line.slideUnderWhite,
//     },
//   })}

//   ${Utils.theme.convertJSSObjectToStyles({
//     styleObj: {
//       [`.umd-footer-element-wrapper${IS_THEME_LIGHT} .${CONTACT_LINKS_LIST} a`]:
//       animation.line.slideUnderBlack,
//     },
//   })}

//   .${CONTACT_LINKS_LIST} a:not(:first-child) {
//     position: relative;
//     margin-left: ${token.spacing.min};
//     padding-left: ${token.spacing.min};
//     position: relative;
//     background-position: 10px 100%;
//   }

//   .${CONTACT_LINKS_LIST} a:not(:first-child):before {
//     content: "";
//     display: inline-block;
//     height: 3px;
//     width: 3px;
//     background-color: ${token.color.white};
//     border-radius: 50%;
//     position: absolute;
//     top: 50%;
//     left: 0;
//   }

//   .umd-footer-element-wrapper${IS_THEME_LIGHT} a:not(:first-child):before {
//     background-color: ${token.color.black};
//   }
// `;

// // prettier-ignore
// export const ContactContainerStyles = `
//   .${CONTACT_CONTAINER} {
//     background-color: currnetColor;
//   }

//   @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
//     .${CONTACT_CONTAINER} {
//       padding-top: ${token.spacing['md']};
//     }
//   }

//   @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
//     .${CONTACT_CONTAINER} {
//       padding-left: ${token.spacing['2xl']};
//     }
//   }

//   .${CONTACT_CONTAINER} p {
//     line-height: 1.4em;
//   }

//   ${HeadlineStyles}
//   ${AddressStyles}
//   ${LinkListStyles}
//   ${socialOverwriteStyles}
// `;

const createDefaultHeadline = (): ElementVisual => {
  const headlineLink = linkWithSpan(DEFAULT_HEADLINE_LINK);
  return ElementModel.create({
    element: document.createElement('p'),
    className: CONTACT_LIST_HEADLINE,
    children: [headlineLink],
    elementStyles: {
      element: {
        marginBottom: token.spacing.min,
        color: token.color.white,
        fontWeight: 700,

        [`.${CONTACT_LIST_HEADLINE} a`]: animation.line.slideUnderWhite,
        [`.${CONTACT_LIST_HEADLINE}`]: typography.elements.interativeMedium,

        [`.${CONTACT_CONTAINER}`]: {
          backgroundColor: 'currentColor',
        },

        // base styles
        [`& p`]: {
          lineHeight: '1.4em',
        },

        // container query: max-width MEDIUM - 1
        [`@container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px)`]: {
          paddingTop: token.spacing.md,
        },
      },
    },
  });
};

const createDefaultAddress = (): ElementVisual => {
  const address = document.createElement('address');
  const addressParagraphOne = document.createElement('p');
  const addressParagraphTwo = document.createElement('p');

  addressParagraphOne.innerHTML = DEFAULT_ADDRESS_TITLE;
  addressParagraphTwo.innerHTML = `${DEFAULT_ADDRESS_ONE} ${DEFAULT_ADDRESS_TWO}`;

  address.appendChild(addressParagraphOne);
  address.appendChild(addressParagraphTwo);

  return ElementModel.create({
    element: address,
    className: CONTACT_LIST_ADDRESS,
    elementStyles: {
      element: {
        [`& *`]: {
          display: 'block',
          [`.${CONTACT_LIST_ADDRESS} *`]: typography.sans.small,
        },
      },
    },
  });
};

const linkWithSpan = ({
  url,
  title,
  label,
}: {
  url: string;
  title: string;
  label?: string;
}) => {
  const link = document.createElement('a');
  const span = document.createElement('span');

  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  if (label) link.setAttribute('aria-label', label);

  span.innerText = title;
  link.appendChild(span);

  return ElementModel.create({
    className: 'umd-element-footer-contact-link',
    element: link,
  });
};

const createDefaultLinks = (): ElementVisual => {
  const email = linkWithSpan(DEFAULT_EMAIL);
  const phone = linkWithSpan(DEFAULT_PHONE);

  return ElementModel.create({
    element: document.createElement('p'),
    className: CONTACT_LINKS_LIST,
    children: [email, phone],
    elementStyles: {
      element: {
        display: 'flex',
        [`.${CONTACT_LINKS_LIST} *`]: typography.sans.small,
      },
    },
  });
};

interface HeadlineProps {
  slotHeadline: HTMLSlotElement;
}

interface AddressProps {
  slotAddress: HTMLSlotElement;
}

interface LinksProps {
  slotContentLinks: HTMLSlotElement;
}

export interface ContactProps
  extends BaseProps,
    SocialCampaignColumnsProps,
    AddressProps,
    HeadlineProps,
    LinksProps {}

export default (props: ContactProps): ElementVisual => {
  const { slotAddress, slotHeadline, slotContentLinks } = props;
  const socialContainer = createSocialCampaignColumns(props);
  const hasSlot = slotAddress || slotHeadline || slotContentLinks;

  const contactChildren: ElementVisual[] = [];

  if (hasSlot) {
    if (slotHeadline) {
      Utils.markup.modify.animationLinkSpan({ element: slotHeadline });
      contactChildren.push(
        ElementModel.create({
          element: slotHeadline,
          className: CONTACT_LIST_HEADLINE,
        }),
      );
    }
    if (slotAddress) {
      contactChildren.push(
        ElementModel.create({
          element: slotAddress,
          className: CONTACT_LIST_ADDRESS,
        }),
      );
    }
    if (slotContentLinks) {
      contactChildren.push(
        ElementModel.create({
          element: slotContentLinks,
          className: CONTACT_LINKS_LIST,
        }),
      );
    }
  } else {
    contactChildren.push(createDefaultHeadline());
    contactChildren.push(createDefaultAddress());
    contactChildren.push(createDefaultLinks());
  }

  contactChildren.push(socialContainer);

  return ElementModel.createDiv({
    className: CONTACT_CONTAINER,
    children: contactChildren,
    elementStyles: {
      element: {
        p: { lineHeight: '1.4em' },
        [`@container umd-element-footer (max-width: 649px)`]: {
          paddingTop: token.spacing.md,
        },
        [`@container umd-element-footer (min-width: 1000px)`]: {
          paddingLeft: token.spacing['2xl'],
        },
      },
    },
  });
};
