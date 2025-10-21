import * as token from '@universityofmaryland/web-styles-library/token';
import {
  email as iconEmail,
  phone as iconPhone,
} from '@universityofmaryland/web-icons-library/communication';
import { pin as iconPin } from '@universityofmaryland/web-icons-library/location';
import { linkedin as iconLinkedIn } from '@universityofmaryland/web-icons-library/social';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import { type ElementVisual } from '../../_types';
import { type PersonContactProps } from '../_types';

const makeIcon = ({
  icon,
  isThemeDark,
}: {
  icon: string;
  isThemeDark?: boolean;
}) => {
  const iconElement = ElementBuilder.styled.actions.iconSmall({
    element: document.createElement('span'),
    isThemeDark,
  });

  iconElement.element.innerHTML = icon;

  return iconElement;
};

const makeText = ({
  text,
  isThemeDark,
}: {
  text: string;
  isThemeDark?: boolean;
}) => {
  const textElement = ElementBuilder.styled.headline.sansSmaller({
    element: document.createElement('span'),
    isThemeDark,
    elementStyles: {
      element: {
        color: `${token.color.gray.dark}`,
      },
    },
  });

  textElement.element.innerHTML = text;

  return textElement;
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
    const link = ElementBuilder.styled.layout.gridInlineRow({
      element: document.createElement('a'),
      elementStyles: containerStyles,
      isThemeDark,
      children: [iconSpan, textSpan],
    });

    const ariaLabel = element.getAttribute('aria-label');

    link.element.setAttribute('href', element.getAttribute('href') || '');
    if (ariaLabel) link.element.setAttribute('aria-label', ariaLabel);

    return link;
  }

  return ElementBuilder.styled.layout.gridInlineRow({
    element: document.createElement('div'),
    elementStyles: containerStyles,
    isThemeDark,
    children: [iconSpan, textSpan],
  });
};

export default ({
  actions,
  address,
  email,
  isThemeDark,
  linkendIn,
  phone,
}: PersonContactProps) => {
  let children: ElementVisual[] = [];

  if (phone) {
    children.push(
      ElementBuilder.create.div({
        className: 'text-lockup-contact-phone',
        children: [
          makeContactLink({
            element: phone,
            icon: iconPhone,
            isThemeDark,
          }),
        ],
      }),
    );
  }

  if (email) {
    children.push(
      ElementBuilder.create.div({
        className: 'text-lockup-contact-email',
        children: [
          makeContactLink({
            element: email,
            icon: iconEmail,
            isThemeDark,
          }),
        ],
      }),
    );
  }

  if (linkendIn) {
    children.push(
      ElementBuilder.create.div({
        className: 'text-lockup-contact-linkedin',
        children: [
          makeContactLink({
            element: linkendIn,
            icon: iconLinkedIn,
            isThemeDark,
          }),
        ],
      }),
    );
  }

  if (address) {
    children.push(
      ElementBuilder.create.div({
        className: 'text-lockup-contact-address',
        children: [
          makeContactLink({
            element: address,
            icon: iconPin,
            isThemeDark,
          }),
        ],
      }),
    );
  }

  if (actions) {
    children.push(
      ElementBuilder.styled.layout.gridInlineTabletRows({
        element: actions,
        elementStyles: {
          element: {
            marginTop: token.spacing.sm,
          },
        },
      }),
    );
  }

  return ElementBuilder.create.div({
    className: 'text-lockup-contact',
    children,
    elementStyles: {
      element: {
        marginTop: `${token.spacing.sm}`,
      },
    },
  });
};
