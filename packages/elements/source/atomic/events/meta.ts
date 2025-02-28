import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import { ElementModel } from 'model';

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
  isThemeDark?: boolean;
  showTime?: boolean;
};

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
  textElement.innerHTML = text;

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
    icon: Utility.asset.icon.CALENDAR,
    text,
  });
};

const TimeText = ({ startTime, endTime }: DateDisplayType) => {
  let text = startTime;

  if (startTime != endTime) {
    text = `${text} - ${endTime}`;
  }

  return MakeDetailItem({
    icon: Utility.asset.icon.CLOCK,
    text,
  });
};

const RowDateInfo = (info: TypeMetaDisplay) => {
  const { showTime = true } = info;
  const container = document.createElement('div');
  const { startMonth, startDay, endDay, endMonth } = info;
  const isMultiDay = startDay != endDay || startMonth != endMonth;
  const dateElement = DateText({ ...info, isMultiDay });
  container.appendChild(dateElement);

  if (showTime) {
    const timeElement = TimeText({ ...info, isMultiDay });
    container.appendChild(timeElement);
  }

  return container;
};

export default (props: TypeMetaDisplay) => {
  const { location } = props;
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const composite = ElementModel.event.metaContainer({
    element: container,
    isThemeDark: props.isThemeDark,
  });
  const dateRow = RowDateInfo(props);
  let styles = '';

  wrapper.appendChild(dateRow);

  if (location && location.length > 0) {
    wrapper.appendChild(
      MakeDetailItem({
        icon: Utility.asset.icon.PIN,
        text: location[0].title,
      }),
    );
  }

  container.appendChild(wrapper);

  return { element: container, styles };
};
