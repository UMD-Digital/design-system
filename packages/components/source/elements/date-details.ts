import { Typography, Tokens } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles } from 'helpers/styles';
import {
  CALENDAR_ICON,
  CLOCK_ICON,
  PIN_ICON,
  MULTI_DAY_ICON,
} from 'assets/icons';

type ImageType = {
  url: string;
  altText: string;
}[];

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
  id: number;
  title: string;
  url: string;
  summary: string;
  image: ImageType;
  location: LocationType;
};

type TypeDetailDisplay = EventType & {
  isLayoutVeritcal?: boolean;
};

const { SansSmaller } = Typography;
const { Colors, Spacing } = Tokens;

const EVENTS_DATE_ROW = 'events-date-row';
const EVENTS_DATE_ROW_WRAPPER = 'events-date-row-wrapper';
const EVENTS_DATE_ROW_ICON = 'events-date-row-icon';
const EVENTS_DATE_ROW_TEXT = 'events-date-row-text';
const EVENTS_DATE_ROW_DATE = 'events-date-row-date';
const EVENTS_DATE_ROW_LOCATION = 'events-date-row-location';

// prettier-ignore
const VariationLayoutHorizontal = `
  .${EVENTS_DATE_ROW}[layout="horizontal"] .${EVENTS_DATE_ROW_DATE} {
    flex-direction: column;
    align-items: flex-start;
  }

  .${EVENTS_DATE_ROW}[layout="horizontal"] .${EVENTS_DATE_ROW_DATE} > *:not(:first-child) {
    margin-top: 3px;
    margin-left: 0;
  }
`

// prettier-ignore
const DateRow = `
  .${EVENTS_DATE_ROW_DATE} {
    display: flex;
    align-items: center;
  }

  .${EVENTS_DATE_ROW_DATE} > * {
    display: flex;
    align-items: center;
  }

  .${EVENTS_DATE_ROW_DATE} > *:not(:first-child) {
    margin-left: ${Spacing.xs};
  }

  .${EVENTS_DATE_ROW} svg#calendar-icon {
    width: 14px;
    height: 15px;
  }

  .${EVENTS_DATE_ROW} svg#clock-icon {
    width: 17px;
    height: 17px;
    margin-left: -2px; 
  }

  .${EVENTS_DATE_ROW} svg#multi-day-icon {
    width: 17px;
    height: 17px;
  }
`;

// prettier-ignore
const LocationRow = `
  .${EVENTS_DATE_ROW_LOCATION} {
    display: flex;
    align-items: center;
  }

  .${EVENTS_DATE_ROW_LOCATION} svg#pin-icon {
    width: 15px;
    height: 18px;
  }
`;

// prettier-ignore
export const STYLES_DATE_DETAILS = `
  .${EVENTS_DATE_ROW} {
    container: umd-event-details / inline-size;
  }

  .${EVENTS_DATE_ROW} + * {
    margin-top: ${Spacing.sm};
  }

  .${EVENTS_DATE_ROW_WRAPPER} {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 3px 0;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENTS_DATE_ROW_TEXT}`]: SansSmaller,
    },
  })}

  .${EVENTS_DATE_ROW_TEXT} {
    color: ${Colors.gray.darker};
  }

  .${EVENTS_DATE_ROW_ICON} {
    width: 20px;
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
  iconElement.classList.add(EVENTS_DATE_ROW_ICON);
  textElement.innerHTML = text;
  textElement.classList.add(EVENTS_DATE_ROW_TEXT);

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

  container.classList.add(EVENTS_DATE_ROW_DATE);
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

export const CreateDateDetailsElement = (info: TypeDetailDisplay) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const { location, isLayoutVeritcal = true } = info;
  const dateRow = RowDateInfo(info);

  wrapper.classList.add(EVENTS_DATE_ROW_WRAPPER);
  wrapper.appendChild(dateRow);

  if (location && location.length > 0) {
    wrapper.appendChild(
      MakeDetailItem({
        icon: PIN_ICON,
        text: location[0].title,
        style: EVENTS_DATE_ROW_LOCATION,
      }),
    );
  }

  container.appendChild(wrapper);
  container.classList.add(EVENTS_DATE_ROW);

  if (isLayoutVeritcal) container.setAttribute('layout', 'horizontal');

  return container;
};
