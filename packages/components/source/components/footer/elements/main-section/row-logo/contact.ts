import {
  colors,
  spacing,
  typography,
} from '@universityofmaryland/umd-web-configuration';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import { MakeSpan, SlotDefaultStyling } from 'helpers/ui';
import { ELEMENT_TYPE } from 'components/footer/component';
import { BREAKPOINTS, SLOTS } from 'components/footer/globals';
import { CreateSocialCampaignColumns, SOCIAL_COLUMN_WRAPPER } from '../social';

const CONTACT_CONTAINER = 'umd-footer-contact-container';
const CONTACT_LIST_CONTAINER = 'umd-footer-contact-contact-list';
const CONTACT_LIST_HEADLINE = 'umd-footer-contact-list-headline';

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

const socialOverwriteStyles = `
  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${CONTACT_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
      display: none;
    }
  }

  @container umd-footer (max-width: ${BREAKPOINTS.large - 1}px) {
    .${CONTACT_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
      margin-top: ${spacing.md};
    }
  }
`;

export const ContactContainerStyles = `
  .${CONTACT_CONTAINER} {
    background-color: currnetColor;
  }

  @container umd-footer (max-width: ${BREAKPOINTS.medium - 1}px) {
    .${CONTACT_CONTAINER} {
      padding-top: ${spacing['md']};
    }
  }

  @container umd-footer (min-width: ${BREAKPOINTS.large}px) {
    .${CONTACT_CONTAINER} {
      padding-left: ${spacing['2xl']};
    }
  }

  .${CONTACT_CONTAINER} a:hover,
  .${CONTACT_CONTAINER} a:focus {
    background-size: 100% 1px;
    color: ${colors.white};
  }
  
  .${CONTACT_CONTAINER} p {
    line-height: 1.4em;
  }

  .${CONTACT_CONTAINER} address {
    font-style: normal;
  }

  .${CONTACT_CONTAINER} address * {
    font-size: 14px;
  }
  
  .${CONTACT_CONTAINER} span {
    display: block;
  }
  
  .${CONTACT_CONTAINER} .umd-interactive-sans-medium {
    margin-bottom: ${spacing.min};
  }

  .${CONTACT_CONTAINER} .umd-interactive-sans-medium a {
    font-weight: 900;
  }
  
  .${CONTACT_CONTAINER} .${CONTACT_LIST_CONTAINER} {
    display: flex;
  }
  
  .${CONTACT_CONTAINER} .${CONTACT_LIST_CONTAINER} a:not(:first-child) {
    position: relative;
    margin-left: ${spacing.min};
    padding-left: ${spacing.min};
    position: relative;
    background-position: 10px 100%;
  }
  
  .${CONTACT_CONTAINER} .${CONTACT_LIST_CONTAINER} a:not(:first-child) > span {
    display: inline-block;
    height: 3px;
    width: 3px;
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 0;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CONTACT_LIST_HEADLINE}`]: typography['.umd-interactive-sans-medium'],
    },
  })}

  ${socialOverwriteStyles}
`;

const makeLink = ({
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
  link.innerText = title;
  if (label) link.setAttribute('aria-label', label);
  link.appendChild(span);
  return link;
};

export const CreateContactContainer = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const contactSlot = element.querySelector(
    `[slot="${SLOTS.CONTACT}"]`,
  ) as HTMLSlotElement;
  const contactContainer = document.createElement('div');
  const socialContainer = CreateSocialCampaignColumns({ element });

  contactContainer.classList.add(CONTACT_CONTAINER);

  const makeContactSlot = () => {
    const contactSlot = SlotDefaultStyling({ element, slotRef: SLOTS.CONTACT });
    if (contactSlot) contactContainer.appendChild(contactSlot);
  };

  const makeDefaultSlot = () => {
    const defaultContactWrapper = document.createElement('div');
    const headline = document.createElement('p');
    const address = document.createElement('address');
    const addressParagraph = document.createElement('p');
    const contactList = document.createElement('p');

    const headlineLink = makeLink(DEFAULT_HEADLINE_LINK);

    headline.classList.add(CONTACT_LIST_HEADLINE);
    headline.appendChild(headlineLink);

    addressParagraph.appendChild(MakeSpan({ text: DEFAULT_ADDRESS_TITLE }));
    addressParagraph.appendChild(MakeSpan({ text: DEFAULT_ADDRESS_ONE }));
    addressParagraph.appendChild(MakeSpan({ text: DEFAULT_ADDRESS_TWO }));

    contactList.classList.add(CONTACT_LIST_CONTAINER);
    contactList.appendChild(makeLink(DEFAULT_EMAIL));
    contactList.appendChild(makeLink(DEFAULT_PHONE));

    address.appendChild(addressParagraph);
    address.appendChild(contactList);

    contactContainer.appendChild(headline);
    contactContainer.appendChild(address);
    contactContainer.appendChild(defaultContactWrapper);
  };

  contactSlot ? makeContactSlot() : makeDefaultSlot();

  contactContainer.appendChild(socialContainer);

  return contactContainer;
};
