import {
  Animations,
  Tokens,
  Typography,
} from '@universityofmaryland/variables';
import { EventElements } from 'elements';
import { MarkupModify, Styles } from 'utilities';

type TypeEventLockupDate = {
  headline: HTMLElement | null;
  dateSign?: HTMLElement | null;
  theme?: string;
};

const { FontSize, Spacing } = Tokens;
const { Link } = Animations;
const { SansLarge } = Typography;
const { ConvertJSSObjectToStyles } = Styles;

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

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_HEADLINE}`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
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

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_HEADLINE} a`]: Link.LineSlideUnder.black,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_DATE_CONTAINER}${IS_THEME_DARK} .${EVENT_HEADLINE} a`]: Link.LineSlideUnder.white, 
    },
  })}
`;

// prettier-ignore
export const ComponentStyles = `
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
  const { headline, dateSign, theme } = props;
  const container = document.createElement('div');

  container.classList.add(EVENT_DATE_CONTAINER);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  if (dateSign) {
    container.appendChild(dateSign);
  }

  if (headline) {
    headline.classList.add(EVENT_HEADLINE);
    MarkupModify.AnimationLinkSpan({ element: headline });
    container.appendChild(headline);
  }

  return container;
};

export default {
  CreateElement: CreateEventLockupDate,
  Styles: ComponentStyles,
};
