import { Typography, Tokens } from '@universityofmaryland/variables';
import { Styles } from 'utilities';

const { SansExtraLarge, SansMin, SansLarger, SansSmall } = Typography;
const { Colors } = Tokens;
const { ConvertJSSObjectToStyles } = Styles;

const ELEMENT_EVENT_DATE_WRAPPER = 'event-sign-wrapper';
const ELEMENT_EVENT_MONTH = 'event-sign-date-month';
const ELEMENT_EVENT_DAY = 'event-sign-date-day';

const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_MULTI_DAY = 'multi-day';
const ATTRIBUTE_SIZE_LARGE = 'large';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const IS_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;
const IS_MULTI_DAY = `[${ATTRIBUTE_MULTI_DAY}]`;
const IS_SIZE_LARGE = `[${ATTRIBUTE_SIZE_LARGE}]`;

const OVERWRITE_SIZE_LARGE_MONTH = `.${ELEMENT_EVENT_DATE_WRAPPER}${IS_SIZE_LARGE} .${ELEMENT_EVENT_MONTH}`;
const OVERWRITE_SIZE_LARGE_DAY = `.${ELEMENT_EVENT_DATE_WRAPPER}${IS_SIZE_LARGE} .${ELEMENT_EVENT_DAY}`;

const OVERWRITE_SIZE_LARGE_MULTI_DAY_MONTH = `.${ELEMENT_EVENT_DATE_WRAPPER}${IS_MULTI_DAY}${IS_SIZE_LARGE} .${ELEMENT_EVENT_MONTH}`;
const OVERWRITE_SIZE_LARGE_MULTI_DAY_DAY = `.${ELEMENT_EVENT_DATE_WRAPPER}${IS_MULTI_DAY}${IS_SIZE_LARGE} .${ELEMENT_EVENT_DAY}`;

// prettier-ignore
const OverwriteLargeSize = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_MONTH}`]: SansSmall,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_MONTH} *`]: SansSmall,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_MULTI_DAY_MONTH}`]: SansMin,
    },
  })}
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_MULTI_DAY_MONTH} *`]: SansMin,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_DAY}`]: SansExtraLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_DAY} *`]: SansExtraLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_MULTI_DAY_DAY}`]: SansLarger,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_SIZE_LARGE_MULTI_DAY_DAY} *`]: SansLarger,
    },
  })}
`;

// prettier-ignore
const MonthStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EVENT_MONTH}`]: SansMin,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EVENT_MONTH} *`]: SansMin,
    },
  })}
`;

const DayStyles = `
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
const WrapperStyles = `
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
    color: ${Colors.black} !important;
  }

  .${ELEMENT_EVENT_DATE_WRAPPER}${IS_DARK} * {
    color: ${Colors.white} !important;
  }
`;

// prettier-ignore
const STYLES_EVENT_SIGN = `
  ${WrapperStyles}
  ${MonthStyles}
  ${DayStyles}
  ${OverwriteLargeSize}
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

    dash.style.width = '10px';
    dash.style.height = '3px';
    dash.style.margin = '0 5px';
    dash.style.display = 'block';
    dash.style.backgroundColor = 'black';

    container.appendChild(srOnly);
    container.appendChild(dash);
    container.appendChild(endWrapper);
    container.setAttribute(ATTRIBUTE_MULTI_DAY, '');
  }
};

const CreateEventSignElement = ({
  startMonth,
  startDay,
  endDay,
  endMonth,
  theme = THEME_LIGHT,
  isLargeSize = false,
}: {
  startMonth: string | HTMLElement;
  startDay: string | HTMLElement;
  endDay?: string | HTMLElement;
  endMonth?: string | HTMLElement;
  theme?: string;
  isLargeSize?: boolean;
}) => {
  const container = document.createElement('div');
  const hasEnd = endDay && endMonth;

  container.classList.add(ELEMENT_EVENT_DATE_WRAPPER);
  container.setAttribute(ATTRIBUTE_THEME, theme);
  if (isLargeSize) container.setAttribute(ATTRIBUTE_SIZE_LARGE, '');

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
