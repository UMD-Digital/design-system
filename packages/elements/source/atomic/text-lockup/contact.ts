import * as token from '@universityofmaryland/web-styles-library/token';
import * as Styles from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import {
  email as iconEmail,
  phone as iconPhone,
} from '@universityofmaryland/web-icons-library/communication';
import { pin as iconPin } from '@universityofmaryland/web-icons-library/location';
import { linkedin as iconLinkedIn } from '@universityofmaryland/web-icons-library/social';
import { type PersonContactProps } from '../_types';

const makeIcon = ({
  icon,
  isThemeDark,
}: {
  icon: string;
  isThemeDark?: boolean;
}) => {
  return new ElementBuilder('span')
    .withHTML(icon)
    .styled(Styles.element.action.icon.small)
    .withThemeDark(isThemeDark)
    .build();
};

const makeText = ({
  text,
  isThemeDark,
}: {
  text: string;
  isThemeDark?: boolean;
}) => {
  return new ElementBuilder('span')
    .withHTML(text)
    .styled(Styles.typography.sans.fonts.smaller)
    .withStyles({
      element: {
        color: `${token.color.gray.dark}`,
      },
    })
    .withThemeDark(isThemeDark)
    .build();
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
  const isLink = element.getAttribute('href') && icon !== iconPin;
  const textSpan = makeText({ text: element.innerHTML, isThemeDark });
  const iconSpan = makeIcon({ icon, isThemeDark });
  const containerStyles = {
    element: {
      marginTop: '4px',
      lineHeight: '1.2em',

      [`&a:hover, &a:focus`]: {
        textDecoration: 'underline',
      },
    },
  };

  if (isLink) {
    const ariaLabel = element.getAttribute('aria-label');
    const href = element.getAttribute('href') || '';

    return new ElementBuilder('a')
      .styled(Styles.layout.grid.inline.row)
      .withStyles(containerStyles)
      .withThemeDark(isThemeDark)
      .withChildren(iconSpan.element, textSpan.element)
      .withAttribute('href', href)
      .withAttributeIf(!!ariaLabel, 'aria-label', ariaLabel || '')
      .build();
  }

  return new ElementBuilder()
    .styled(Styles.layout.grid.inline.row)
    .withStyles(containerStyles)
    .withThemeDark(isThemeDark)
    .withChildren(iconSpan.element, textSpan.element)
    .build();
};

export default ({
  actions,
  address,
  email,
  isThemeDark,
  linkendIn,
  phone,
}: PersonContactProps) => {
  const container = new ElementBuilder()
    .withClassName('text-lockup-contact')
    .withStyles({
      element: {
        marginTop: `${token.spacing.sm}`,
      },
    })
    .withThemeDark(isThemeDark);

  if (phone) {
    const phoneElement = new ElementBuilder()
      .withClassName('text-lockup-contact-phone')
      .withChild(
        makeContactLink({ element: phone, icon: iconPhone, isThemeDark })
          .element,
      )
      .build();

    container.withChild(phoneElement);
  }

  if (email) {
    const emailElement = new ElementBuilder()
      .withClassName('text-lockup-contact-email')
      .withChild(
        makeContactLink({ element: email, icon: iconEmail, isThemeDark })
          .element,
      )
      .build();

    container.withChild(emailElement);
  }

  if (linkendIn) {
    const linkedInElement = new ElementBuilder()
      .withClassName('text-lockup-contact-linkedin')
      .withChild(
        makeContactLink({ element: linkendIn, icon: iconLinkedIn, isThemeDark })
          .element,
      )
      .build();

    container.withChild(linkedInElement);
  }

  if (address) {
    const addressElement = new ElementBuilder()
      .withClassName('text-lockup-contact-address')
      .withChild(
        makeContactLink({ element: address, icon: iconPin, isThemeDark })
          .element,
      )
      .build();

    container.withChild(addressElement);
  }

  if (actions) {
    const actionsElement = new ElementBuilder(actions)
      .styled(Styles.layout.grid.inline.tabletRows)
      .withStyles({
        element: {
          marginTop: token.spacing.sm,
        },
      })
      .build();

    container.withChild(actionsElement);
  }

  return container.build();
};
