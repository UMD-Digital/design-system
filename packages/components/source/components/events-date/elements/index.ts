import {
  Animations,
  Tokens,
  Typography,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';
import {
  CreateDateBlockElement,
  STYLES_DATE_BLOCK,
} from 'elements/common/date-block';
import { ELEMENT_TYPE } from 'components/events-date';
import { SLOTS, VARIABLES, REFERENCES } from 'components/events-date/globals';

const { FontSize, Spacing } = Tokens;
const { LinkLineSlide } = Animations;
const { SansLarge } = Typography;

const { HEADLINE, MONTH, DAY } = SLOTS;
const { ATTRIBUTE_THEME } = VARIABLES;
const { IS_THEME_DARK } = REFERENCES;

const EVENT_DATE_CONTAINER = 'umd-event-date-container';
const EVENT_HEADLINE = 'umd-event-headline';

// prettier-ignore
const containerStyles = `
  .${EVENT_DATE_CONTAINER} {
    display: flex;
    align-items: center;
    text-align: left;
  }

  .${EVENT_DATE_CONTAINER} * {
    color: currentColor;
  }
`;

// prettier-ignore
const headlineStyles = `
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
      [`.${EVENT_HEADLINE} a`]: LinkLineSlide['.slidein-underline-black'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_DATE_CONTAINER}${IS_THEME_DARK} .${EVENT_HEADLINE} a`]: LinkLineSlide['.slidein-underline-white'],
    },
  })}
`;

// prettier-ignore
export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${containerStyles}
  ${headlineStyles}
  ${STYLES_DATE_BLOCK}
`;

export const CreateShadowDom = ({ element }: { element: ELEMENT_TYPE }) => {
  const theme = element._theme;
  const container = document.createElement('div');
  const headlineSlot = SlotDefaultStyling({ element, slotRef: HEADLINE });
  const monthSlot = SlotDefaultStyling({ element, slotRef: MONTH });
  const daySlot = SlotDefaultStyling({ element, slotRef: DAY });

  container.classList.add(EVENT_DATE_CONTAINER);
  container.setAttribute(ATTRIBUTE_THEME, theme);

  if (monthSlot && daySlot) {
    const dateBlock = CreateDateBlockElement({
      startMonth: monthSlot,
      startDay: daySlot,
      theme,
    });

    container.appendChild(dateBlock);
  }

  if (headlineSlot) {
    headlineSlot.classList.add(EVENT_HEADLINE);
    CheckForAnimationLinkSpan({ element: headlineSlot });
    container.appendChild(headlineSlot);
  }

  return container;
};
