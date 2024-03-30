import { Typography, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  CALENDAR_ICON,
  CLOCK_ICON,
  PIN_ICON,
  MULTI_DAY_ICON,
} from 'assets/icons';

type LocationType = {
  title: string;
}[];

type DateInformaitonType = {
  startDayOfWeek: string;
  startMonth: string;
  startDay: string;
  startTime: string;
  endDayOfWeek: string;
  endMonth: string;
  endDay: string;
  endTime: string;
};

type DateDisplayType = DateInformaitonType & {
  isMultiDay?: boolean;
};

type EventType = DateInformaitonType & {
  location: LocationType;
};

type TypeDetailDisplay = EventType & {
  isLayoutVeritcal?: boolean;
};

const { SansSmaller } = Typography;
const { Colors, Spacing } = Tokens;

const BREAKPOINTS = {
  MOBILE: 400,
};

const ELEMENT_NAME = 'umd-event-details';
const ELEMENT_EVENTS_DATE_ROW = 'event-date-row';
const ELEMENT_EVENTS_DATE_ROW_WRAPPER = 'event-date-row-wrapper';
const ELEMENT_EVENTS_DATE_ROW_ICON = 'event-date-row-icon';
const ELEMENT_EVENTS_DATE_ROW_TEXT = 'event-date-row-text';
const ELEMENT_EVENTS_DATE_ROW_DATE = 'event-date-row-date';
const ELEMENT_EVENTS_DATE_ROW_LOCATION = 'event-date-row-location';

// prettier-ignore
const VariationLayoutHorizontal = `
  .${ELEMENT_EVENTS_DATE_ROW}[layout="horizontal"] .${ELEMENT_EVENTS_DATE_ROW_DATE} {
    flex-direction: column;
    align-items: flex-start;
  }

  .${ELEMENT_EVENTS_DATE_ROW}[layout="horizontal"] .${ELEMENT_EVENTS_DATE_ROW_DATE} > *:not(:first-child) {
    margin-top: 3px;
    margin-left: 0;
  }
`

// prettier-ignore
const DateRow = `
  @container ${ELEMENT_NAME} (min-width: ${BREAKPOINTS.MOBILE}px) {
    .${ELEMENT_EVENTS_DATE_ROW_DATE} {
      display: flex;
      align-items: center;
    }
  }

  .${ELEMENT_EVENTS_DATE_ROW_DATE} > * {
    display: flex;
    align-items: center;
  }

  @container ${ELEMENT_NAME} (min-width: ${BREAKPOINTS.MOBILE}px) {
    .${ELEMENT_EVENTS_DATE_ROW_DATE} > *:not(:first-child) {
      margin-left: ${Spacing.xs};
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${BREAKPOINTS.MOBILE - 1}px) {
    .${ELEMENT_EVENTS_DATE_ROW_DATE} > *:not(:first-child) {
      margin-top: 3px;
    }
  }
`;

// prettier-ignore
const LocationRow = `
  .${ELEMENT_EVENTS_DATE_ROW_LOCATION} {
    display: flex;
    align-items: center;
  }
`;

// prettier-ignore
const STYLES_EVENT_DETAILS = `
  .${ELEMENT_EVENTS_DATE_ROW} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_EVENTS_DATE_ROW} + * {
    margin-top: ${Spacing.sm};
  }

  .${ELEMENT_EVENTS_DATE_ROW_WRAPPER} {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 5px 0;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_EVENTS_DATE_ROW_TEXT}`]: SansSmaller,
    },
  })}

  .${ELEMENT_EVENTS_DATE_ROW_TEXT} {
    color: ${Colors.gray.darker};
    font-weight: 400;
  }

  .${ELEMENT_EVENTS_DATE_ROW_ICON} {
    width: 18px;
    display: flex;
    align-items: center;
  }

  @container ${ELEMENT_NAME} (min-width: ${BREAKPOINTS.MOBILE}px) {
    .${ELEMENT_EVENTS_DATE_ROW_ICON} {
      width: 20px;
    }
  }

  .${ELEMENT_EVENTS_DATE_ROW_ICON} svg {
    width: 12px;
    height: 12px;
  }

  @container ${ELEMENT_NAME} (min-width: ${BREAKPOINTS.MOBILE}px) {
    .${ELEMENT_EVENTS_DATE_ROW_ICON} svg {
      width: 14px;
      height: 14px;
    }
  }

  ${DateRow}
  ${LocationRow}
  ${VariationLayoutHorizontal}
`;

const MakeDetailItem = ({
  icon,
  text,
  style,
}: {
  icon: string;
  text: string;
  style?: string;
}) => {
  const container = document.createElement('p');
  const iconElement = document.createElement('span');
  const textElement = document.createElement('span');

  iconElement.innerHTML = icon;
  iconElement.classList.add(ELEMENT_EVENTS_DATE_ROW_ICON);
  textElement.innerHTML = text;
  textElement.classList.add(ELEMENT_EVENTS_DATE_ROW_TEXT);

  if (style) container.classList.add(style);
  container.appendChild(iconElement);
  container.appendChild(textElement);

  return container;
};

const DateText = ({
  startDayOfWeek,
  startMonth,
  startDay,
  endDayOfWeek,
  endDay,
  endMonth,
  isMultiDay = false,
}: DateDisplayType) => {
  let text = `${startDayOfWeek}. ${startMonth} ${startDay}`;

  if (isMultiDay) {
    text = `${text} - ${endDayOfWeek}. ${endMonth} ${endDay}`;
  }

  return MakeDetailItem({
    icon: CALENDAR_ICON,
    text,
  });
};

const TimeText = ({ startTime, endTime }: DateDisplayType) => {
  let text = startTime;

  if (startTime != endTime) {
    text = `${text} - ${endTime}`;
  }

  return MakeDetailItem({
    icon: CLOCK_ICON,
    text,
  });
};

const RowDateInfo = (info: TypeDetailDisplay) => {
  const container = document.createElement('div');
  const { startMonth, startDay, endDay, endMonth } = info;
  const isMultiDay = startDay != endDay || startMonth != endMonth;
  const dateElement = DateText({ ...info, isMultiDay });
  const timeElement = TimeText({ ...info, isMultiDay });

  container.classList.add(ELEMENT_EVENTS_DATE_ROW_DATE);
  container.appendChild(dateElement);
  container.appendChild(timeElement);

  if (isMultiDay) {
    container.appendChild(
      MakeDetailItem({
        icon: MULTI_DAY_ICON,
        text: 'Multi-day',
      }),
    );
  }

  return container;
};

const CreateEventDetailsElement = (info: TypeDetailDisplay) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const { location, isLayoutVeritcal = true } = info;
  const dateRow = RowDateInfo(info);

  wrapper.classList.add(ELEMENT_EVENTS_DATE_ROW_WRAPPER);
  wrapper.appendChild(dateRow);

  if (location && location.length > 0) {
    wrapper.appendChild(
      MakeDetailItem({
        icon: PIN_ICON,
        text: location[0].title,
        style: ELEMENT_EVENTS_DATE_ROW_LOCATION,
      }),
    );
  }

  container.appendChild(wrapper);
  container.classList.add(ELEMENT_EVENTS_DATE_ROW);

  if (isLayoutVeritcal) container.setAttribute('layout', 'horizontal');

  return container;
};

export default {
  CreateElement: CreateEventDetailsElement,
  Styles: STYLES_EVENT_DETAILS,
};
