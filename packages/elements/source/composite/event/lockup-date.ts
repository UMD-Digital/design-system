import {
  Animations,
  Tokens,
  Typography,
} from '@universityofmaryland/variables';
import EventElements from './elements';
import { Markup, Styles } from 'utilities';

type TypeEventLockupDate = {
  headline: HTMLElement | null;
  dateSign?: HTMLElement | null;
  isThemeDark?: boolean;
};

const { FontSize, Spacing } = Tokens;
const { Link } = Animations;
const { SansLarge } = Typography;
const { convertJSSObjectToStyles } = Styles;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const EVENT_DATE_CONTAINER = 'event-lockup-container';
const EVENT_HEADLINE = 'event-lockup-headline';

// prettier-ignore
const HeadlineStyles = `
  .${EVENT_HEADLINE} {
    margin-left: ${Spacing.sm};
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_HEADLINE}`]: SansLarge,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_HEADLINE} *`]: SansLarge,
    },
  })}

  @media (max-width: 767px) {
    .${EVENT_HEADLINE},
    .${EVENT_HEADLINE} * {
      font-size: ${FontSize.sm};
      font-weight: 600;
    }
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_HEADLINE} a`]: Link.LineSlideUnder.black,
    },
  })}

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_DATE_CONTAINER}${IS_THEME_DARK} .${EVENT_HEADLINE} a`]: Link.LineSlideUnder.white, 
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
  ${EventElements.Sign.Styles}
`;

const CreateEventLockupDate = (props: TypeEventLockupDate) => {
  const { headline, dateSign, isThemeDark } = props;
  const container = document.createElement('div');

  container.classList.add(EVENT_DATE_CONTAINER);
  if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

  if (dateSign) {
    container.appendChild(dateSign);
  }

  if (headline) {
    const modifiedText = Markup.modify.truncateText({
      text: headline.innerHTML,
      maxTextSize: 50,
    });

    headline.innerHTML = modifiedText;
    headline.classList.add(EVENT_HEADLINE);
    Markup.modify.animationLinkSpan({ element: headline });
    container.appendChild(headline);
  }

  return container;
};

export default {
  CreateElement: CreateEventLockupDate,
  Styles: ComponentStyles,
};
