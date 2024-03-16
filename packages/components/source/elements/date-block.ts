import { Typography } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

const { SansLarger, Eyebrow } = Typography;

const EVENT_DATE_WRAPPER = 'umd-event-date-wrapper';
const EVENT_MONTH = 'umd-event-date-month';
const EVENT_DAY = 'umd-event-date-day';

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';
const IS_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

// prettier-ignore
const dateWrapperStyles = `
  .${EVENT_DATE_WRAPPER} * {
    display: block;
    text-transform: uppercase;
    text-align: center;
    max-width: 200px;
    font-weight: 700;
  }

  .${EVENT_DATE_WRAPPER}${IS_DARK} * {
    color: white !important;
  }
`;

// prettier-ignore
const monthStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_MONTH} *`]: Eyebrow,
    },
  })}
`;

const dayStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENT_DAY} *`]: SansLarger,
    },
  })}
`;

// prettier-ignore
export const STYLES_DATE_BLOCK = `
  ${dateWrapperStyles}
  ${monthStyles}
  ${dayStyles}
`;

export const CreateDateBlockElement = ({
  startMonth,
  startDay,
  endMonth,
  endDay,
  theme = THEME_LIGHT,
}: {
  startMonth: string | HTMLElement;
  startDay: string | HTMLElement;
  endDay?: string | HTMLElement;
  endMonth?: string | HTMLElement;
  theme?: string;
}) => {
  const container = document.createElement('div');
  const startWrapper = document.createElement('p');
  const endWrapper = document.createElement('p');
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
  const startMonthWrapper = makeDateElement({
    element: startMonth,
    style: EVENT_MONTH,
  });
  const startDayWrapper = makeDateElement({
    element: startDay,
    style: EVENT_DAY,
  });

  startWrapper.appendChild(startMonthWrapper);
  startWrapper.appendChild(startDayWrapper);

  container.appendChild(startWrapper);

  if (endDay && endMonth) {
    const srOnly = document.createElement('span');
    const dash = document.createElement('span');
    const endMonthWrapper = makeDateElement({
      element: endMonth,
      style: EVENT_MONTH,
    });
    const endDayWrapper = makeDateElement({
      element: endDay,
      style: EVENT_DAY,
    });

    endWrapper.appendChild(endMonthWrapper);
    endWrapper.appendChild(endDayWrapper);

    srOnly.classList.add('sr-only');
    srOnly.innerHTML = 'to';

    dash.style.width = '11px';
    dash.style.width = '4px';
    dash.style.backgroundColor = 'black';

    container.appendChild(srOnly);
    container.appendChild(dash);
    container.appendChild(endWrapper);
  }

  container.classList.add(EVENT_DATE_WRAPPER);
  container.setAttribute(ATTRIBUTE_THEME, theme);
  return container;
};
