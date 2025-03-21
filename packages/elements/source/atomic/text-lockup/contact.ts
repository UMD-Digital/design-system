import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import { ElementModel } from 'model';

interface PersonContact {
  phone?: HTMLElement | null;
  email?: HTMLElement | null;
  linkendIn?: HTMLElement | null;
  address?: HTMLElement | null;
  additionalContact?: HTMLElement | null;
  isThemeDark?: boolean;
}

const containerStyles = {
  element: {
    marginTop: '4px',
    lineHeight: '1.2em',

    [`&a:hover, &a:focus`]: {
      textDecoration: 'underline',
    },
  },
};

const makeIcon = ({
  icon,
  isThemeDark,
}: {
  icon: string;
  isThemeDark?: boolean;
}) => {
  const iconElement = ElementModel.actions.iconSmall({
    element: document.createElement('span'),
    isThemeDark,
  });

  iconElement.element.innerHTML = icon;

  return iconElement;
};

const makeContactLink = ({
  element,
  icon,
  isThemeDark,
}: {
  element: HTMLElement | HTMLAnchorElement;
  icon: string;
  isThemeDark?: boolean;
}) => {
  const isLink =
    element.getAttribute('href') && icon !== Utility.asset.icon.PIN;
  const textSpan = document.createElement('span');
  const iconSpan = makeIcon({ icon, isThemeDark });

  textSpan.innerHTML = element.innerHTML;

  if (isLink) {
    const link = ElementModel.layout.gridInlineRow({
      element: document.createElement('a'),
      elementStyles: containerStyles,
      isThemeDark,
    });

    const ariaLabel = element.getAttribute('aria-label');

    link.element.setAttribute('href', element.getAttribute('href') || '');
    if (ariaLabel) link.element.setAttribute('aria-label', ariaLabel);

    link.element.appendChild(iconSpan.element);
    link.element.appendChild(textSpan);
    link.styles += iconSpan.styles;

    return link;
  }

  const container = ElementModel.layout.gridInlineRow({
    element: document.createElement('div'),
    elementStyles: containerStyles,
    isThemeDark,
  });

  container.element.appendChild(iconSpan.element);
  container.element.appendChild(textSpan);
  container.styles += iconSpan.styles;

  return container;
};

export default ({
  phone,
  email,
  linkendIn,
  address,
  additionalContact,
  isThemeDark,
}: PersonContact) => {
  const className = 'text-lockup-contact';
  const container = document.createElement('div');
  let styles = `
    .${className} {
      margin-top: ${Styles.token.spacing.sm};
    }
  `;

  container.classList.add(className);

  if (phone) {
    const phoneElement = document.createElement('div');
    const styledPhone = makeContactLink({
      element: phone,
      icon: Utility.asset.icon.PHONE,
      isThemeDark,
    });

    phoneElement.appendChild(styledPhone.element);
    styles += styledPhone.styles;

    container.appendChild(phoneElement);
  }

  if (email) {
    const emailElement = document.createElement('div');
    const styledEmail = makeContactLink({
      element: email,
      icon: Utility.asset.icon.EMAIL,
      isThemeDark,
    });

    emailElement.appendChild(styledEmail.element);
    styles += styledEmail.styles;

    container.appendChild(emailElement);
  }

  if (linkendIn) {
    const linkedinElement = document.createElement('div');
    const styledLinkedin = makeContactLink({
      element: linkendIn,
      icon: Utility.asset.social.LINKEDIN,
      isThemeDark,
    });

    linkedinElement.appendChild(styledLinkedin.element);
    styles += styledLinkedin.styles;

    container.appendChild(linkedinElement);
  }

  if (address) {
    const addressElement = document.createElement('div');
    const styledAddress = makeContactLink({
      element: address,
      icon: Utility.asset.icon.PIN,
      isThemeDark,
    });

    addressElement.appendChild(styledAddress.element);
    styles += styledAddress.styles;

    container.appendChild(addressElement);
  }

  // if (additionalContact) {
  //   additionalContact.classList.add(ELEMENT_PERSON_ADDITONAL_CONTACT);
  //   container.appendChild(additionalContact);
  // }

  return { element: container, styles };
};
