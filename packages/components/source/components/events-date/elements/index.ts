import {
  Animations,
  Tokens,
  typography,
} from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { CheckForAnimationLinkSpan, SlotDefaultStyling } from 'helpers/ui';
import { ELEMENT_TYPE } from 'components/events-date/component';
import { ELEMENTS, SLOTS } from 'components/events-date/globals';

const { fontSize, fontWeight, spacing } = Tokens;
const { LinkLineSlide } = Animations;

const EVENT_DATE_CONTAINER = 'umd-event-date-container';
const EVENT_DATE_WRAPPER = 'umd-event-date-wrapper';
const EVENT_MONTH = 'umd-event-date-month';
const EVENT_DAY = 'umd-event-date-day';
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
const dateWrapperStyles = `
  .${EVENT_DATE_WRAPPER} * {
    display: block;
    text-transform: uppercase;
    text-align: center;
    max-width: 200px;
    font-weight: ${fontWeight.bold}
  }
`;

// prettier-ignore
const monthStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_MONTH}`]: typography['.umd-interactive-sans-small'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_MONTH} *`]: typography['.umd-interactive-sans-small'],
    },
  })}
`;

const dayStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_DAY}`]: typography['.umd-sans-larger'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_DAY} *`]: typography['.umd-sans-larger'],
    },
  })}
`;

// prettier-ignore
const headlineStyles = `
  .${EVENT_HEADLINE} {
    margin-left: ${spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_HEADLINE}`]: typography['.umd-sans-large'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_HEADLINE} *`]: typography['.umd-sans-large'],
    },
  })}

  @media (max-width: 767px) {
    .${EVENT_HEADLINE},
    .${EVENT_HEADLINE} * {
      font-size: ${fontSize.sm};
      font-weight: ${fontWeight.semiBold};
    }
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_HEADLINE} a`]: LinkLineSlide['.slidein-underline-black'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENTS.CONTAINER_DARK_CLASS} .${EVENT_HEADLINE} a`]: LinkLineSlide['.slidein-underline-white'],
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
  ${dateWrapperStyles}
  ${monthStyles}
  ${dayStyles}
  ${headlineStyles}
`;

export const CreateShadowDom = ({ element }: { element: ELEMENT_TYPE }) => {
  const container = document.createElement('div');
  const dateWrapper = document.createElement('div');
  const headlineSlot = SlotDefaultStyling({ element, slotRef: SLOTS.HEADLINE });
  const monthSlot = SlotDefaultStyling({ element, slotRef: SLOTS.MONTH });
  const daySlot = SlotDefaultStyling({ element, slotRef: SLOTS.DAY });

  container.classList.add(EVENT_DATE_CONTAINER);

  if (monthSlot && daySlot) {
    monthSlot.classList.add(EVENT_MONTH);
    daySlot.classList.add(EVENT_DAY);
    dateWrapper.classList.add(EVENT_DATE_WRAPPER);

    dateWrapper.appendChild(monthSlot);
    dateWrapper.appendChild(daySlot);
    container.appendChild(dateWrapper);
  }

  if (headlineSlot) {
    headlineSlot.classList.add(EVENT_HEADLINE);
    CheckForAnimationLinkSpan({ element: headlineSlot });
    container.appendChild(headlineSlot);
  }

  return container;
};
