import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import {
  animation,
  token,
  typography,
} from '@universityofmaryland/web-styles-library';
import { wrapLinkForAnimation } from '@universityofmaryland/web-utilities-library/animation';
import createSocialCampaignColumns from '../social';
import { BREAKPOINTS } from '../../../globals';
import { ContactProps } from '../../../_types';
import { type UMDElement } from '../../../../../_types';

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
  props: Pick<ContactProps, 'isThemeLight'>;
  element?: HTMLElement;
  children?: UMDElement[];
}) => {
  const { isThemeLight } = props;

  const builder = new ElementBuilder(
    element ?? document.createElement('p'),
  ).withClassName('umd-footer-contact-list-headline');

  if (children) {
    builder.withChildren(...children);
  }

  return builder
    .withStyles({
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
    })
    .build();
};

const createDefaultHeadline = (props: ContactProps): UMDElement => {
  const headlineLink = linkWithSpan(props, DEFAULT_HEADLINE_LINK);

  return createContactListHeadline({ props: props, children: [headlineLink] });
};

const createAddress = (address: HTMLElement) => {
  return new ElementBuilder(address)
    .withClassName('umd-footer-contact-list-address')
    .withStyles({
      element: {
        [`& *`]: {
          display: 'block',
          ...typography.sans.small,
        },

        ['& + *']: {
          marginTop: '2px',
        },
      },
    })
    .build();
};

const createDefaultAddress = (): UMDElement => {
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
  props: Pick<ContactProps, 'isThemeLight'>,
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

  return new ElementBuilder(link)
    .withClassName('umd-element-footer-contact-link')
    .withStyles({
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
    })
    .build();
};

const createContactLinksList = ({ children }: { children?: UMDElement[] }) => {
  const builder = new ElementBuilder(document.createElement('p')).withClassName(
    'umd-footer-contact-links-list',
  );

  if (children) {
    builder.withChildren(...children);
  }

  return builder
    .withStyles({
      element: {
        display: 'flex',
        [`& *`]: {
          ...typography.sans.small,
        },
      },
    })
    .build();
};

const createDefaultLinks = (props: ContactProps): UMDElement => {
  const email = linkWithSpan(props, DEFAULT_EMAIL);
  const phone = linkWithSpan(props, DEFAULT_PHONE);

  return createContactLinksList({ children: [email, phone] });
};

export default (props: ContactProps): UMDElement => {
  const { slotAddress, slotHeadline, slotContentLinks } = props;
  const socialContainer = createSocialCampaignColumns(props);
  const hasSlot = slotAddress || slotHeadline || slotContentLinks;

  const contactChildren: UMDElement[] = [];

  if (hasSlot) {
    if (slotHeadline) {
      wrapLinkForAnimation({ element: slotHeadline });
      contactChildren.push(
        createContactListHeadline({ props: props, element: slotHeadline }),
      );
    }
    if (slotAddress) {
      contactChildren.push(createAddress(slotAddress));
    }
    if (slotContentLinks) {
      const contactLinksList: UMDElement[] = [];
      const contactLinksElements = slotContentLinks.querySelectorAll('a');

      contactLinksElements.forEach((link: HTMLAnchorElement) => {
        const linkElement = linkWithSpan(props, {
          url: link.href,
          title: link.textContent,
          label: link.ariaLabel ?? undefined,
        });

        contactLinksList.push(linkElement);
      });

      contactChildren.push(
        createContactLinksList({ children: contactLinksList }),
      );
    }
  } else {
    contactChildren.push(createDefaultHeadline(props));
    contactChildren.push(createDefaultAddress());
    contactChildren.push(createDefaultLinks(props));
  }

  contactChildren.push(socialContainer);

  return new ElementBuilder()
    .withClassName('umd-footer-contact-container')
    .withChildren(...contactChildren)
    .withStyles({
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
    })
    .build();
};
