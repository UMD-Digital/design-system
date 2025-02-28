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
  container.appendChild(dateElement);

  if (showTime) {
    const timeElement = createTimeText({ ...props, isMultiDay });
    container.appendChild(timeElement);
  }

  return ElementModel.event.metaItem({
    element: container,
    ...props,
  });
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
    const locationElm = ElementModel.event.metaItem({
      element: MakeDetailItem({
        icon: Utility.asset.icon.PIN,
        text: location[0].title,
      }),
      ...props,
    });

    wrapper.element.appendChild(locationElm.element);
    styles += locationElm.styles;
  }

  styles += wrapper.styles;
  styles += composite.styles;
  composite.element.appendChild(wrapper.element);

  return { element: composite.element, styles };
};
