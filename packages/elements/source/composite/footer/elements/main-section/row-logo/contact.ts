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
import { BREAKPOINTS, ELEMENTS, VARIABLES, REFERENCES } from '../../../globals';

const { MEDIUM, LARGE } = BREAKPOINTS;
const { ELEMENT_WRAPPER } = ELEMENTS;
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

// prettier-ignore
const socialOverwriteStyles = `
  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${CONTACT_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
      display: none;
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px) {
    .${CONTACT_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
      margin-top: ${token.spacing.md};
    }
  }
`;

// prettier-ignore
const HeadlineStyles = `
  .${CONTACT_LIST_HEADLINE} {
    margin-bottom: ${token.spacing.min};
    color: ${token.color.white};
  }

  .${CONTACT_LIST_HEADLINE} * {
    font-weight: 700;
    color: ${token.color.white};
  }

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${CONTACT_LIST_HEADLINE} a`]:
      animation.line.slideUnderWhite,
    },
  })}

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${CONTACT_LIST_HEADLINE}`]: typography.elements.interativeMedium,
    },
  })}

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${CONTACT_LIST_HEADLINE},
  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${CONTACT_LIST_HEADLINE} * {
    color: ${token.color.black};
  }

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${CONTACT_LIST_HEADLINE} a`]:
      animation.line.slideUnderBlack,
    },
  })}
`;

// prettier-ignore
const AddressStyles = `
  .${CONTACT_LIST_ADDRESS} + * {
    margin-top: 2px;
  }

  .${CONTACT_LIST_ADDRESS} * {
    display: block;
  }

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${CONTACT_LIST_ADDRESS} *`]: typography.sans.small,
    },
  })}
`;

// prettier-ignore
const LinkListStyles = `
  .${CONTACT_LINKS_LIST} {
    display: flex;
  }

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${CONTACT_LINKS_LIST} *`]: typography.sans.small,
    },
  })}

  .${CONTACT_LINKS_LIST} a {
    display: block;
  }

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${CONTACT_LINKS_LIST} a`]:
      animation.line.slideUnderWhite,
    },
  })}

  ${Utils.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${CONTACT_LINKS_LIST} a`]:
      animation.line.slideUnderBlack,
    },
  })}

  .${CONTACT_LINKS_LIST} a:not(:first-child) {
    position: relative;
    margin-left: ${token.spacing.min};
    padding-left: ${token.spacing.min};
    position: relative;
    background-position: 10px 100%;
  }

  .${CONTACT_LINKS_LIST} a:not(:first-child):before {
    content: "";
    display: inline-block;
    height: 3px;
    width: 3px;
    background-color: ${token.color.white};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 0;
  }

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} a:not(:first-child):before {
    background-color: ${token.color.black};
  }
`;

// prettier-ignore
export const ContactContainerStyles = `
  .${CONTACT_CONTAINER} {
    background-color: currnetColor;
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${CONTACT_CONTAINER} {
      padding-top: ${token.spacing['md']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${CONTACT_CONTAINER} {
      padding-left: ${token.spacing['2xl']};
    }
  }

  .${CONTACT_CONTAINER} p {
    line-height: 1.4em;
  }

  ${HeadlineStyles}
  ${AddressStyles}
  ${LinkListStyles}
  ${socialOverwriteStyles}
`;

const createDefaultHeadline = () => {
  const headline = document.createElement('p');
  const headlineLink = Utils.markup.create.linkWithSpan(DEFAULT_HEADLINE_LINK);

  headline.classList.add(CONTACT_LIST_HEADLINE);
  headline.appendChild(headlineLink);

  return headline;
};

interface HeadlineProps {
  slotHeadline: HTMLSlotElement;
}

const createDefaultAddress = () => {
  const address = document.createElement('address');
  const addressParagraphOne = document.createElement('p');
  const addressParagraphTwo = document.createElement('p');

  address.classList.add(CONTACT_LIST_ADDRESS);

  addressParagraphOne.innerHTML = DEFAULT_ADDRESS_TITLE;
  addressParagraphTwo.innerHTML = `${DEFAULT_ADDRESS_ONE} ${DEFAULT_ADDRESS_TWO} `;

  address.appendChild(addressParagraphOne);
  address.appendChild(addressParagraphTwo);

  return address;
};

interface AddressProps {
  slotAddress: HTMLSlotElement;
}

const createAddress = ({ slotAddress }: AddressProps) => {
  if (slotAddress) {
    slotAddress.classList.add(CONTACT_LIST_ADDRESS);
  }
  return slotAddress;
};

const createDefaultLinks = () => {
  const contactList = document.createElement('p');

  contactList.classList.add(CONTACT_LINKS_LIST);
  contactList.appendChild(Utils.markup.create.linkWithSpan(DEFAULT_EMAIL));
  contactList.appendChild(Utils.markup.create.linkWithSpan(DEFAULT_PHONE));

  return contactList;
};

interface LinksProps {
  slotContentLinks: HTMLSlotElement;
}

export interface ContactProps
  extends SocialCampaignColumnsProps,
    AddressProps,
    HeadlineProps,
    LinksProps {}

export default (props: ContactProps) => {
  const { slotAddress, slotHeadline, slotContentLinks } = props;
  const contactContainer = document.createElement('div');
  const socialContainer = createSocialCampaignColumns(props);
  const hasSlot = slotAddress || slotHeadline || slotContentLinks;

  const makeContactSlot = () => {
    const address = createAddress({ slotAddress });

    if (slotHeadline) {
      Utils.markup.modify.animationLinkSpan({
        element: slotHeadline,
      });
      slotHeadline.classList.add(CONTACT_LIST_HEADLINE);
      contactContainer.appendChild(slotHeadline);
    }

    if (address) {
      contactContainer.appendChild(address);
    }

    if (slotContentLinks) {
      slotContentLinks.classList.add(CONTACT_LINKS_LIST);
      contactContainer.appendChild(slotContentLinks);
    }
  };

  const makeDefaultSlot = () => {
    const defaultContactWrapper = document.createElement('div');
    const headline = createDefaultHeadline();
    const address = createDefaultAddress();
    const contactList = createDefaultLinks();

    contactContainer.appendChild(headline);
    contactContainer.appendChild(address);
    contactContainer.appendChild(contactList);
    contactContainer.appendChild(defaultContactWrapper);
  };

  hasSlot ? makeContactSlot() : makeDefaultSlot();

  contactContainer.classList.add(CONTACT_CONTAINER);
  contactContainer.appendChild(socialContainer);

  return contactContainer;
};
