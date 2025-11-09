import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { pin as iconPin } from '@universityofmaryland/web-icons-library/location';
import {
  calendar as iconCalendar,
  clock as iconClock,
} from '@universityofmaryland/web-icons-library/calendar';

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
  isThemeDark?: boolean;
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
  const { icon, text, isThemeDark } = props;

  const iconElement = new ElementBuilder('span').withHTML(icon).build();
  const textElement = new ElementBuilder('span').withHTML(text).build();

  return new ElementBuilder('p')
    .styled(
      elementStyles.event.meta.composeItem({
        theme: isThemeDark ? 'dark' : 'light',
      }),
    )
    .withChildren(iconElement, textElement)
    .build();
};

const createDayText = ({
  startDayOfWeek,
  startMonth,
  startDay,
  endDayOfWeek,
  endDay,
  endMonth,
  isMultiDay = false,
  isThemeDark,
}: DateDisplayType) => {
  let text = `${startDayOfWeek}. ${startMonth} ${startDay}`;

  if (isMultiDay) {
    text = `${text} - ${endDayOfWeek}. ${endMonth} ${endDay}`;
  }

  return MakeDetailItem({
    icon: iconCalendar,
    text,
    isThemeDark,
  });
};

const createTimeText = ({
  startTime,
  endTime,
  isThemeDark,
}: DateDisplayType) => {
  let text = startTime;

  if (startTime != endTime) {
    text = `${text} - ${endTime}`;
  }

  return MakeDetailItem({
    icon: iconClock,
    text,
    isThemeDark,
  });
};

const createDateRow = (props: TypeMetaDisplay) => {
  const { showTime = true, startMonth, startDay, endDay, endMonth } = props;
  const isMultiDay = startDay != endDay || startMonth != endMonth;
  const dateElement = createDayText({ ...props, isMultiDay });
  const element = new ElementBuilder()
    .withClassName('event-meta-date-row')
    .withChild(dateElement);

  if (showTime) {
    element.withChild(createTimeText({ ...props, isMultiDay }));
  }

  return element.build();
};

export default (props: TypeMetaDisplay) => {
  const { location, isThemeDark } = props;
  const dateRow = createDateRow(props);

  const wrapper = new ElementBuilder()
    .styled(elementStyles.event.meta.wrapper)
    .withChild(dateRow);

  if (location && location.length > 0) {
    wrapper.withChild(
      MakeDetailItem({ ...props, icon: iconPin, text: location[0].title }),
    );
  }

  const wrapperModel = wrapper.build();

  return new ElementBuilder()
    .styled(elementStyles.event.meta.container)
    .withChild(wrapperModel)
    .build();
};
