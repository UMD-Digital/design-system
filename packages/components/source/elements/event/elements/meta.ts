import { Typography, Tokens } from '@universityofmaryland/variables';
import { Styles, AssetIcon } from 'utilities';

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

export type TypeMetaDisplay = EventType & {
  theme?: string | null;
};

const { SansSmaller } = Typography;
const { Colors, Spacing } = Tokens;

const { ConvertJSSObjectToStyles } = Styles;

const MOBILE = 400;
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-event-meta';
const ELEMENT_EVENTS_DATE_ROW = 'event-date-row';
const ELEMENT_EVENTS_DATE_ROW_WRAPPER = 'event-date-row-wrapper';
const ELEMENT_EVENTS_DATE_ROW_ICON = 'event-date-row-icon';
const ELEMENT_EVENTS_DATE_ROW_TEXT = 'event-date-row-text';
const ELEMENT_EVENTS_DATE_ROW_DATE = 'event-date-row-date';
const ELEMENT_EVENTS_DATE_ROW_LOCATION = 'event-date-row-location';

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_EVENTS_DATE_ROW}[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

// prettier-ignore
const OverwriteThemeDark = `
  ${OVERWRITE_THEME_DARK_CONTAINER} svg path {
     fill: ${Colors.white};
  }

  ${OVERWRITE_THEME_DARK_CONTAINER} * {
    color: ${Colors.white};
 }
`;

// prettier-ignore
const DateRow = `
  @container ${ELEMENT_NAME} (min-width: ${MOBILE}px) {
    .${ELEMENT_EVENTS_DATE_ROW_DATE} {
      display: flex;
      align-items: center;
    }
  }

  .${ELEMENT_EVENTS_DATE_ROW_DATE} > * {
    display: flex;
    align-items: center;
  }

  @container ${ELEMENT_NAME} (min-width: ${MOBILE}px) {
    .${ELEMENT_EVENTS_DATE_ROW_DATE} > *:not(:first-child) {
      margin-left: ${Spacing.xs};
    }
  }

  @container ${ELEMENT_NAME} (max-width: ${MOBILE - 1}px) {
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
const STYLES_EVENT_META = `
  .${ELEMENT_EVENTS_DATE_ROW} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  .${ELEMENT_EVENTS_DATE_ROW} + * {
    margin-top: ${Spacing.sm};
  }

  .${ELEMENT_EVENTS_DATE_ROW_WRAPPER} {
    display: flex;
    flex-wrap: wrap;
  }

  .${ELEMENT_EVENTS_DATE_ROW_WRAPPER} > * {
    margin-right: 5px;
    margin-top: 5px;
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

  @container ${ELEMENT_NAME} (min-width: ${MOBILE}px) {
    .${ELEMENT_EVENTS_DATE_ROW_ICON} {
      width: 20px;
    }
  }

  .${ELEMENT_EVENTS_DATE_ROW_ICON} svg {
    width: 12px;
    height: 12px;
  }

  @container ${ELEMENT_NAME} (min-width: ${MOBILE}px) {
    .${ELEMENT_EVENTS_DATE_ROW_ICON} svg {
      width: 14px;
      height: 14px;
    }
  }

  ${DateRow}
  ${LocationRow}
  ${OverwriteThemeDark}
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
    icon: AssetIcon.CALENDAR,
    text,
  });
};

const TimeText = ({ startTime, endTime }: DateDisplayType) => {
  let text = startTime;

  if (startTime != endTime) {
    text = `${text} - ${endTime}`;
  }

  return MakeDetailItem({
    icon: AssetIcon.CLOCK,
    text,
  });
};

const RowDateInfo = (info: TypeMetaDisplay) => {
  const container = document.createElement('div');
  const { startMonth, startDay, endDay, endMonth } = info;
  const isMultiDay = startDay != endDay || startMonth != endMonth;
  const dateElement = DateText({ ...info, isMultiDay });
  const timeElement = TimeText({ ...info, isMultiDay });

  container.classList.add(ELEMENT_EVENTS_DATE_ROW_DATE);
  container.appendChild(dateElement);
  container.appendChild(timeElement);

  return container;
};

const CreateEventMetaElement = (info: TypeMetaDisplay) => {
  const { location, theme } = info;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const dateRow = RowDateInfo(info);

  wrapper.classList.add(ELEMENT_EVENTS_DATE_ROW_WRAPPER);
  wrapper.appendChild(dateRow);

  if (location && location.length > 0) {
    wrapper.appendChild(
      MakeDetailItem({
        icon: AssetIcon.PIN,
        text: location[0].title,
        style: ELEMENT_EVENTS_DATE_ROW_LOCATION,
      }),
    );
  }

  container.appendChild(wrapper);
  container.classList.add(ELEMENT_EVENTS_DATE_ROW);
  if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

  return container;
};

export default {
  CreateElement: CreateEventMetaElement,
  Styles: STYLES_EVENT_META,
};
