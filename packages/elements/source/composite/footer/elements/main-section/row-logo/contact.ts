import {
  animation,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import * as Utils from 'utilities';
import createSocialCampaignColumns, {
  type SocialCampaignColumnsProps,
} from '../social';
import { BREAKPOINTS } from '../../../globals';
import { ElementModel } from 'model';
import { type ElementVisual } from '../../../../../_types';
import { BaseProps } from '../../../_types';

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

const { MEDIUM, LARGE } = BREAKPOINTS;

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

const createContactListHeadline = ({
  props,
  element,
  children,
}: {
  props: ContactProps;
  element?: HTMLElement;
  children?: ElementVisual[];
}) => {
  const { isThemeLight } = props;

  return ElementModel.create({
    element: element ?? document.createElement('p'),
    className: 'umd-footer-contact-list-headline',
    children: children ?? [],
    elementStyles: {
      element: {
        marginBottom: token.spacing.min,
        color: token.color.white,
        fontWeight: 700,
        ...typography.elements.interativeMedium,

        ['& span']: {
          ...(isThemeLight && {
            color: token.color.black,
          }),
        },

        [`& a`]: {
          ...animation.line.slideUnderWhite,

          ...(isThemeLight && {
            ...animation.line.slideUnderBlack,
          }),
        },

        [`& p`]: {
          lineHeight: '1.4em',
        },

        [`@container (max-width: ${MEDIUM - 1}px)`]: {
          paddingTop: token.spacing.md,
        },
      },
    },
  });
};

const createDefaultHeadline = (props: ContactProps): ElementVisual => {
  const headlineLink = linkWithSpan(props, DEFAULT_HEADLINE_LINK);

  return createContactListHeadline({ props: props, children: [headlineLink] });
};

const createAddress = (address: HTMLElement) => {
  return ElementModel.create({
    element: address,
    className: 'umd-footer-contact-list-address',
    elementStyles: {
      element: {
        [`& *`]: {
          display: 'block',
          ...typography.sans.small,
        },

        ['& + *']: {
          marginTop: '2px',
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

  return createAddress(address);
};

const linkWithSpan = (
  props: ContactProps,
  {
    url,
    title,
    label,
  }: {
    url: string;
    title: string;
    label?: string;
  },
) => {
  const link = document.createElement('a');
  const span = document.createElement('span');
  const { isThemeLight } = props;

  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');

  if (label) link.setAttribute('aria-label', label);

  span.innerText = title;
  link.appendChild(span);

  return ElementModel.create({
    className: 'umd-element-footer-contact-link',
    element: link,
    elementStyles: {
      element: {
        display: 'block',
        ...animation.line.slideUnderWhite,

        ...(isThemeLight && {
          ...animation.line.slideUnderBlack,
        }),

        [`&:not(:first-child)`]: {
          position: 'relative',
          marginLeft: token.spacing.min,
          paddingLeft: token.spacing.min,
          backgroundPosition: '10px 100%',
        },

        [`&:not(:first-child)::before`]: {
          content: '""',
          display: 'inline-block',
          height: '3px',
          width: '3px',
          backgroundColor: token.color.white,
          borderRadius: '50%',
          position: 'absolute',
          top: '50%',
          left: 0,
        },
      },
    },
  });
};

const createContactLinksList = ({
  element,
  children,
}: {
  element?: HTMLElement;
  children?: ElementVisual[];
}) => {
  return ElementModel.create({
    element: element ?? document.createElement('p'),
    className: 'umd-footer-contact-links-list',
    children: children ?? [],
    elementStyles: {
      element: {
        display: 'flex',
        [`& *`]: {
          ...typography.sans.small,
        },
      },
    },
  });
};

const createDefaultLinks = (props: ContactProps): ElementVisual => {
  const email = linkWithSpan(props, DEFAULT_EMAIL);
  const phone = linkWithSpan(props, DEFAULT_PHONE);

  return createContactLinksList({ children: [email, phone] });
};

export default (props: ContactProps): ElementVisual => {
  const { slotAddress, slotHeadline, slotContentLinks } = props;
  const socialContainer = createSocialCampaignColumns(props);
  const hasSlot = slotAddress || slotHeadline || slotContentLinks;

  const contactChildren: ElementVisual[] = [];

  if (hasSlot) {
    if (slotHeadline) {
      Utils.markup.modify.animationLinkSpan({ element: slotHeadline });
      contactChildren.push(
        createContactListHeadline({ props: props, element: slotHeadline }),
      );
    }
    if (slotAddress) {
      contactChildren.push(createAddress(slotAddress));
    }
    if (slotContentLinks) {
      contactChildren.push(
        createContactLinksList({ element: slotContentLinks }),
      );
    }
  } else {
    contactChildren.push(createDefaultHeadline(props));
    contactChildren.push(createDefaultAddress());
    contactChildren.push(createDefaultLinks(props));
  }

  contactChildren.push(socialContainer);

  return ElementModel.createDiv({
    className: 'umd-footer-contact-container',
    children: contactChildren,
    elementStyles: {
      element: {
        ['& p']: {
          lineHeight: '1.4em',
        },

        ['& > .umd-footer-social-column_wrapper']: {
          display: 'block',
        },

        [`@container (max-width: ${MEDIUM - 1})`]: {
          paddingTop: token.spacing.md,
        },

        [`@container (min-width: ${LARGE}px)`]: {
          paddingLeft: token.spacing['xl'],
        },
      },
    },
  });
};
