import {
  Animations,
  Tokens,
  Typography,
} from '@universityofmaryland/variables';
import { MarkupCreate, MarkupModify, Styles } from 'utilities';
import { CreateSocialCampaignColumns, SOCIAL_COLUMN_WRAPPER } from '../social';
import {
  BREAKPOINTS,
  ELEMENTS,
  SLOTS,
  VARIABLES,
  REFERENCES,
} from '../../../globals';
import { UMDFooterElement } from '../../../index';

const { Colors, Spacing } = Tokens;
const { Link } = Animations;
const { InterativeMedium, SansSmall } = Typography;

const { ConvertJSSObjectToStyles } = Styles;
const { Node, SlotWithDefaultStyling } = MarkupCreate;

const { MEDIUM, LARGE } = BREAKPOINTS;
const { ELEMENT_WRAPPER } = ELEMENTS;
const { CONTACT_HEADLINE, CONTACT_ADDRESS, CONTACT_LINKS } = SLOTS;
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
      margin-top: ${Spacing.md};
    }
  }
`;

// prettier-ignore
const HeadlineStyles = `
  .${CONTACT_LIST_HEADLINE} {
    margin-bottom: ${Spacing.min};
    color: ${Colors.white};
  }

  .${CONTACT_LIST_HEADLINE} * {
    font-weight: 700;
    color: ${Colors.white};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CONTACT_LIST_HEADLINE} a`]:
      Link.LineSlideUnder.white,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CONTACT_LIST_HEADLINE}`]: InterativeMedium,
    },
  })}

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${CONTACT_LIST_HEADLINE},
  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${CONTACT_LIST_HEADLINE} * {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${CONTACT_LIST_HEADLINE} a`]:
      Link.LineSlideUnder.black,
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

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CONTACT_LIST_ADDRESS} *`]: SansSmall,
    },
  })}
`;

// prettier-ignore
const LinkListStyles = `
  .${CONTACT_LINKS_LIST} {
    display: flex;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CONTACT_LINKS_LIST} *`]: SansSmall,
    },
  })}

  .${CONTACT_LINKS_LIST} a {
    display: block;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${CONTACT_LINKS_LIST} a`]:
      Link.LineSlideUnder.white,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_WRAPPER}${IS_THEME_LIGHT} .${CONTACT_LINKS_LIST} a`]:
      Link.LineSlideUnder.black,
    },
  })}

  .${CONTACT_LINKS_LIST} a:not(:first-child) {
    position: relative;
    margin-left: ${Spacing.min};
    padding-left: ${Spacing.min};
    position: relative;
    background-position: 10px 100%;
  }

  .${CONTACT_LINKS_LIST} a:not(:first-child):before {
    content: "";
    display: inline-block;
    height: 3px;
    width: 3px;
    background-color: ${Colors.white};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 0;
  }

  .${ELEMENT_WRAPPER}${IS_THEME_LIGHT} a:not(:first-child):before {
    background-color: ${Colors.black};
  }
`;

// prettier-ignore
export const ContactContainerStyles = `
  .${CONTACT_CONTAINER} {
    background-color: currnetColor;
  }

  @container ${ELEMENT_NAME} (max-width: ${MEDIUM - 1}px) {
    .${CONTACT_CONTAINER} {
      padding-top: ${Spacing['md']};
    }
  }

  @container ${ELEMENT_NAME} (min-width: ${LARGE}px) {
    .${CONTACT_CONTAINER} {
      padding-left: ${Spacing['2xl']};
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

const CreateDefaultHeadline = () => {
  const headline = document.createElement('p');
  const headlineLink = Node.linkWithSpan(DEFAULT_HEADLINE_LINK);

  headline.classList.add(CONTACT_LIST_HEADLINE);
  headline.appendChild(headlineLink);

  return headline;
};

const CreateSlotHeadline = ({
  element,
  slotRef,
}: {
  element: UMDFooterElement;
  slotRef: string;
}) => {
  const contactHeadlineElement = SlotWithDefaultStyling({
    element,
    slotRef,
  });

  if (contactHeadlineElement) {
    MarkupModify.AnimationLinkSpan({ element: contactHeadlineElement });
    contactHeadlineElement.classList.add(CONTACT_LIST_HEADLINE);

    return contactHeadlineElement;
  }

  return null;
};

const CreateDefaultContactAddress = () => {
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

const CreateSlotContactAddress = ({
  element,
  slotRef,
}: {
  element: UMDFooterElement;
  slotRef: string;
}) => {
  const contactAddressElement = SlotWithDefaultStyling({
    element,
    slotRef,
  });

  if (contactAddressElement) {
    contactAddressElement.classList.add(CONTACT_LIST_ADDRESS);
    return contactAddressElement;
  }

  return null;
};

const CreateDefaultContactLinks = () => {
  const contactList = document.createElement('p');

  contactList.classList.add(CONTACT_LINKS_LIST);
  contactList.appendChild(Node.linkWithSpan(DEFAULT_EMAIL));
  contactList.appendChild(Node.linkWithSpan(DEFAULT_PHONE));

  return contactList;
};

const CreateSlotContactLinks = ({
  element,
  slotRef,
}: {
  element: UMDFooterElement;
  slotRef: string;
}) => {
  const contactLinksElement = SlotWithDefaultStyling({ element, slotRef });

  if (contactLinksElement) {
    contactLinksElement.classList.add(CONTACT_LINKS_LIST);
    return contactLinksElement;
  }

  return null;
};

export const CreateContactContainer = ({
  element,
}: {
  element: UMDFooterElement;
}) => {
  const contactContainer = document.createElement('div');
  const socialContainer = CreateSocialCampaignColumns({ element });
  const slotList = [
    {
      slotRef: CONTACT_HEADLINE,
      create: CreateSlotHeadline,
    },
    { slotRef: CONTACT_ADDRESS, create: CreateSlotContactAddress },
    { slotRef: CONTACT_LINKS, create: CreateSlotContactLinks },
  ];
  const hasSlot = slotList.some(
    ({ slotRef }) =>
      element.querySelector(`[slot="${slotRef}"]`) as HTMLSlotElement,
  );

  const makeContactSlot = () => {
    slotList.forEach(({ create, slotRef }) => {
      const slotElement = create({ element, slotRef: slotRef });

      if (slotElement) contactContainer.appendChild(slotElement);
    });
  };

  const makeDefaultSlot = () => {
    const defaultContactWrapper = document.createElement('div');
    const headline = CreateDefaultHeadline();
    const address = CreateDefaultContactAddress();
    const contactList = CreateDefaultContactLinks();

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
