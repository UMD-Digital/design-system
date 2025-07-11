import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';

type TypeEventLockupDate = {
  headline: HTMLElement | null;
  dateSign?: { element: HTMLElement; styles: string };
  isThemeDark?: boolean;
};

// To Do - Refactor to use element model

const { animation, token, typography } = Styles;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const EVENT_DATE_CONTAINER = 'event-lockup-container';
const EVENT_HEADLINE = 'event-lockup-headline';

// prettier-ignore
const HeadlineStyles = `
  .${EVENT_HEADLINE} {
    margin-left: ${token.spacing.sm};
  }

  ${Utility.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_HEADLINE}`]: typography.sans.large,
    },
  })}

  ${Utility.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_HEADLINE} *`]: typography.sans.large,
    },
  })}

  @media (max-width: 767px) {
    .${EVENT_HEADLINE},
    .${EVENT_HEADLINE} * {
      font-size: ${token.font.size.sm};
      font-weight: 600;
    }
  }

  ${Utility.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_HEADLINE} a`]: animation.line.slideUnderBlack,
    },
  })}

  ${Utility.theme.convertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_DATE_CONTAINER}${IS_THEME_DARK} .${EVENT_HEADLINE} a`]: animation.line.slideUnderWhite, 
    },
  })}
`;

// prettier-ignore
const ComponentStyles = `
  .${EVENT_DATE_CONTAINER} {
    display: flex;
    align-items: center;
    text-align: left;
  }
  
  .${EVENT_DATE_CONTAINER} * {
    color: currentColor;
  }


  ${HeadlineStyles}
`;

export default (props: TypeEventLockupDate) => {
  const { headline, dateSign, isThemeDark } = props;
  const container = document.createElement('div');
  let styles = ComponentStyles;

  container.classList.add(EVENT_DATE_CONTAINER);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

  if (dateSign) {
    container.appendChild(dateSign.element);
    styles += dateSign.styles;
  }

  if (headline) {
    const modifiedText = Utility.markup.modify.truncateText({
      text: headline.innerHTML,
      maxTextSize: 50,
    });

    headline.innerHTML = modifiedText;
    headline.classList.add(EVENT_HEADLINE);
    Utility.markup.modify.animationLinkSpan({ element: headline });
    container.appendChild(headline);
  }

  return { element: container, styles };
};
