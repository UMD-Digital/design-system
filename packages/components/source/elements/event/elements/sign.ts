import { Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

const { SansLarger, Eyebrow } = Typography;

const ELEMENT_EVENT_DATE_WRAPPER = 'event-sign-wrapper';
const ELEMENT_EVENT_MONTH = 'event-sign-date-month';
const ELEMENT_EVENT_DAY = 'event-sign-date-day';

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const IS_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

// prettier-ignore
const dateWrapperStyles = `
  .${ELEMENT_EVENT_DATE_WRAPPER} {
    display: flex;
    align-items: center;
  }

  .${ELEMENT_EVENT_DATE_WRAPPER} * {
    display: block;
    text-transform: uppercase;
    text-align: center;
    max-width: 200px;
    font-weight: 700;
    color: currentColor;
  }

  .${ELEMENT_EVENT_DATE_WRAPPER}${IS_DARK} * {
    color: white !important;
  }
`;

// prettier-ignore
const monthStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EVENT_MONTH}`]: Eyebrow,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EVENT_MONTH} *`]: Eyebrow,
    },
  })}
`;

const dayStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EVENT_DAY}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EVENT_DAY} *`]: SansLarger,
    },
  })}
`;

// prettier-ignore
const STYLES_EVENT_SIGN = `
  ${dateWrapperStyles}
  ${monthStyles}
  ${dayStyles}
`;

const makeDateElement = ({
  element,
  style,
}: {
  element: string | HTMLElement;
  style: string;
}) => {
  const dateElement = document.createElement('span');
  if (typeof element === 'string') {
    dateElement.innerHTML = element;
  } else {
    dateElement.appendChild(element);
  }

  dateElement.classList.add(style);
  return dateElement;
};

const makeStartDateBlock = ({
  container,
  startMonth,
  startDay,
}: {
  container: HTMLElement;
  startMonth: string | HTMLElement;
  startDay: string | HTMLElement;
}) => {
  const startWrapper = document.createElement('p');
  const startMonthWrapper = makeDateElement({
    element: startMonth,
    style: ELEMENT_EVENT_MONTH,
  });
  const startDayWrapper = makeDateElement({
    element: startDay,
    style: ELEMENT_EVENT_DAY,
  });

  startWrapper.appendChild(startMonthWrapper);
  startWrapper.appendChild(startDayWrapper);
  container.appendChild(startWrapper);
};

const makeEndDateBlock = ({
  container,
  startMonth,
  startDay,
  endMonth,
  endDay,
}: {
  container: HTMLElement;
  startMonth: string | HTMLElement;
  startDay: string | HTMLElement;
  endDay: string | HTMLElement;
  endMonth: string | HTMLElement;
}) => {
  const endWrapper = document.createElement('p');
  const isTheSameMonth = endMonth === startMonth;
  const isTheSameDay = endDay === startDay;

  if (!isTheSameMonth || !isTheSameDay) {
    const srOnly = document.createElement('span');
    const dash = document.createElement('span');
    const endMonthWrapper = makeDateElement({
      element: endMonth,
      style: ELEMENT_EVENT_MONTH,
    });
    const endDayWrapper = makeDateElement({
      element: endDay,
      style: ELEMENT_EVENT_DAY,
    });

    endWrapper.appendChild(endMonthWrapper);
    endWrapper.appendChild(endDayWrapper);

    srOnly.classList.add('sr-only');
    srOnly.innerHTML = 'to';

    dash.style.width = '11px';
    dash.style.height = '4px';
    dash.style.margin = '0 5px';
    dash.style.display = 'block';
    dash.style.backgroundColor = 'black';

    container.appendChild(srOnly);
    container.appendChild(dash);
    container.appendChild(endWrapper);
  }
};

const CreateEventSignElement = ({
  startMonth,
  startDay,
  endDay,
  endMonth,
  theme = THEME_LIGHT,
}: {
  startMonth: string | HTMLElement;
  startDay: string | HTMLElement;
  endDay?: string | HTMLElement;
  endMonth?: string | HTMLElement;
  theme?: string;
}) => {
  const container = document.createElement('div');
  const hasEnd = endDay && endMonth;

  container.classList.add(ELEMENT_EVENT_DATE_WRAPPER);
  container.setAttribute(ATTRIBUTE_THEME, theme);

  makeStartDateBlock({ container, startMonth, startDay });

  if (hasEnd) {
    makeEndDateBlock({ container, startMonth, startDay, endDay, endMonth });
  }

  return container;
};

export default {
  CreateElement: CreateEventSignElement,
  Styles: STYLES_EVENT_SIGN,
};
