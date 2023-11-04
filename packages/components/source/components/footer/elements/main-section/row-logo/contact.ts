import { colors } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/colors.js';
import { spacing } from '@universityofmaryland/design-system-configuration/dist/configuration/tokens/layout.js';
import { CreateSocialCampaignColumns, SOCIAL_COLUMN_WRAPPER } from '../social';
import { MakeSlot, MakeSpan } from 'helpers/ui';
import { ELEMENT_TYPE, BREAKPOINTS } from '../../../variables';

const SLOT_CONTACT_NAME = 'contact';
const CONTACT_CONTAINER = 'umd-footer-contact-container';
const CONTACT_LIST_CONTAINER = 'umd-footer-contact-contact-list';

const socialOverwriteStyles = `
  .${CONTACT_CONTAINER} .${SOCIAL_COLUMN_WRAPPER} {
    margin-top: ${spacing.md};
  }
`;

export const ContactContainerStyles = `
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
    line-height: 1.2em;
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
    margin-top: ${spacing.min};
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

  ${socialOverwriteStyles}
`;

const makeLink = ({ url, title }: { url: string; title: string }) => {
  const link = document.createElement('a');
  const span = document.createElement('span');
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.innerText = title;
  link.appendChild(span);
  return link;
};

export const CreateContactContainer = ({
  element,
}: {
  element: ELEMENT_TYPE;
}) => {
  const contactNode = element.querySelector(`[slot="${SLOT_CONTACT_NAME}"]`);
  const contactContainer = document.createElement('div');
  const socialContainer = CreateSocialCampaignColumns({ element });
  const hasChildren = contactNode ? contactNode.children.length > 0 : false;

  contactContainer.classList.add(CONTACT_CONTAINER);

  const makeContactSlot = () => {
    const contactSlot = MakeSlot({ type: SLOT_CONTACT_NAME });
    contactContainer.appendChild(contactSlot);
  };

  const makeDefaultSlot = () => {
    const defaultContactWrapper = document.createElement('div');
    const headline = document.createElement('p');
    const address = document.createElement('address');
    const addressParagraph = document.createElement('p');
    const contactList = document.createElement('p');

    const headlineLink = makeLink({
      url: 'https://www.usmd.edu/',
      title: 'The Flagship Institution of the State of Maryland',
    });

    headline.classList.add('umd-interactive-sans-medium');
    headline.appendChild(headlineLink);

    addressParagraph.appendChild(
      MakeSpan({ text: 'Office of Marketing and Communications' }),
    );
    addressParagraph.appendChild(MakeSpan({ text: '2101 Turner Hall' }));
    addressParagraph.appendChild(MakeSpan({ text: 'College Park, MD 20742' }));

    contactList.classList.add(CONTACT_LIST_CONTAINER);
    contactList.appendChild(
      makeLink({ url: 'mailto:omc@umd.edu', title: 'omc@umd.edu' }),
    );
    contactList.appendChild(
      makeLink({ url: 'tel:3014051000', title: '301.405.1000' }),
    );

    address.appendChild(addressParagraph);
    address.appendChild(contactList);

    contactContainer.appendChild(headline);
    contactContainer.appendChild(address);
    contactContainer.appendChild(defaultContactWrapper);
  };

  hasChildren ? makeContactSlot() : makeDefaultSlot();

  contactContainer.appendChild(socialContainer);

  return contactContainer;
};
