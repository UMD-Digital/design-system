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

const MakeDetailItem = (props: {
  icon: string;
  text: string;
  isThemeDark?: boolean;
}) => {
  const { icon, text } = props;
  const container = ElementModel.event.metaItem({
    element: document.createElement('p'),
    ...props,
  });

  const iconElement = document.createElement('span');
  const textElement = document.createElement('span');

  iconElement.innerHTML = icon;
  textElement.innerHTML = text;

  container.element.appendChild(iconElement);
  container.element.appendChild(textElement);

  return container;
};

const createDayText = ({
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

const createTimeText = ({ startTime, endTime }: DateDisplayType) => {
  let text = startTime;

  if (startTime != endTime) {
    text = `${text} - ${endTime}`;
  }

  return MakeDetailItem({
    icon: Utility.asset.icon.CLOCK,
    text,
  });
};

const createDateRow = (props: TypeMetaDisplay) => {
  const { showTime = true } = props;
  const container = document.createElement('div');
  const { startMonth, startDay, endDay, endMonth } = props;
  const isMultiDay = startDay != endDay || startMonth != endMonth;
  const dateElement = createDayText({ ...props, isMultiDay });

  let styles = '';

  container.appendChild(dateElement.element);
  styles += dateElement.styles;

  if (showTime) {
    const timeElement = createTimeText({ ...props, isMultiDay });
    container.appendChild(timeElement.element);
    styles += timeElement.styles;
  }

  return { element: container, styles };
};

export default (props: TypeMetaDisplay) => {
  const { location } = props;
  const composite = ElementModel.event.metaContainer({
    element: document.createElement('div'),
    ...props,
  });
  const wrapper = ElementModel.event.metaWrapper({
    element: document.createElement('div'),
    ...props,
  });
  const dateRow = createDateRow(props);
  let styles = '';

  wrapper.element.appendChild(dateRow.element);
  styles += dateRow.styles;

  if (location && location.length > 0) {
    const locationElm = MakeDetailItem({
      ...props,
      icon: Utility.asset.icon.PIN,
      text: location[0].title,
    });

    wrapper.element.appendChild(locationElm.element);
    styles += locationElm.styles;
  }

  styles += wrapper.styles;
  styles += composite.styles;
  composite.element.appendChild(wrapper.element);

  return { element: composite.element, styles };
};
