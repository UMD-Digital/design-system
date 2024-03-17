import { Typography, Tokens } from '@universityofmaryland/variables';
import { CreateCardElement, STYLES_CARD } from 'elements/card';
import { CreateListElement, STYLES_LIST } from 'elements/list';
import { CreateDateBlockElement, STYLES_DATE_BLOCK } from 'elements/date-block';
import {
  CALENDAR_ICON,
  CLOCK_ICON,
  PIN_ICON,
  MULTI_DAY_ICON,
} from 'assets/icons';
import { ConvertJSSObjectToStyles } from 'helpers/styles';

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

export type EventType = DateInformaitonType & {
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
const { Colors } = Tokens;

const EVENTS_DATE_ROW = 'events-date-row';
const EVENTS_DATE_ROW_WRAPPER = 'events-date-row-wrapper';

const DateRowStyles = `
  .${EVENTS_DATE_ROW} {
    container: umd-event-details / inline-size;
  }

  .${EVENTS_DATE_ROW} + * {
    margin-top: ${Tokens.Spacing.sm};
  }

  .${EVENTS_DATE_ROW_WRAPPER} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3px 8px;
  }

  @container umd-event-details (min-width: 500px) {
    .${EVENTS_DATE_ROW_WRAPPER} {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .${EVENTS_DATE_ROW}[layout="horizontal"] .${EVENTS_DATE_ROW_WRAPPER} {
    grid-template-columns: 1fr;
    grid-gap: 3px;
  }

  .${EVENTS_DATE_ROW_WRAPPER} > p {
    display: flex;
    align-items: center;
  }

  @container umd-event-details (max-width: 499px) {
    .${EVENTS_DATE_ROW_WRAPPER} > p:nth-child(3) {
      grid-column: 1 / -1;
    }
  }

  .${EVENTS_DATE_ROW} svg#calendar-icon {
    width: 14px;
    height: 15px;
  }

  .${EVENTS_DATE_ROW} svg#clock-icon {
    width: 17px;
    height: 17px;
  }

  .${EVENTS_DATE_ROW} svg#pin-icon {
    width: 15px;
    height: 18px;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENTS_DATE_ROW} span`]: SansSmaller,
    },
  })}

  .${EVENTS_DATE_ROW} span {
    color: ${Colors.gray.darker};
  }

  .${EVENTS_DATE_ROW} span:first-child {
    width: 25px;
  }
`;

export const STYLES_EVENT_FEED = `
  ${STYLES_CARD}
  ${STYLES_LIST}
  ${STYLES_DATE_BLOCK}
  ${DateRowStyles}
`;

const CreateImage = ({ images }: { images: ImageType }) => {
  if (images.length > 0) {
    const image = document.createElement('img');
    image.src = images[0].url;
    image.alt = images[0].altText;
    return image;
  }

  return null;
};

const CreateText = ({ text }: { text: string }) => {
  if (text) {
    const textElement = document.createElement('div');
    const textNode = document.createElement('p');
    textNode.innerHTML = text;
    textElement.appendChild(textNode);
    return textElement;
  }

  return null;
};

const CreateHeadline = ({ text, url }: { text: string; url: string }) => {
  if (text && url) {
    const headline = document.createElement('p');
    const headlineLink = document.createElement('a');

    headlineLink.href = url;
    headlineLink.innerHTML = text;
    headlineLink.target = '_blank';
    headlineLink.rel = 'noopener noreferrer';
    headline.appendChild(headlineLink);

    return headline;
  }

  return null;
};

const CreateDetails = ({
  startDayOfWeek,
  startMonth,
  startDay,
  startTime,
  endDay,
  endMonth,
  location,
  isLayoutVeritcal = true,
}: TypeDetailDisplay) => {
  const container = document.createElement('div');
  const wrapper = document.createElement('div');
  const date = document.createElement('p');
  const time = document.createElement('p');

  wrapper.classList.add(EVENTS_DATE_ROW_WRAPPER);

  date.innerHTML = `<span>${CALENDAR_ICON}</span> <span>${startDayOfWeek}. ${startMonth} ${startDay}</span>`;
  wrapper.appendChild(date);

  time.innerHTML = `<span style="margin-left: -2px; width: 27px;">${CLOCK_ICON}</span> <span>${startTime}</span>`;
  wrapper.appendChild(time);

  if (location) {
    const locationText = document.createElement('p');
    locationText.innerHTML = `<span>${PIN_ICON}</span> <span>${location[0].title}</span>`;
    wrapper.appendChild(locationText);
  }

  if (startDay != endDay && startMonth != endMonth) {
    const multiDay = document.createElement('p');
    multiDay.innerHTML = `${MULTI_DAY_ICON} <span>Multi-day</span>`;
    wrapper.appendChild(multiDay);
  }

  container.appendChild(wrapper);
  container.classList.add(EVENTS_DATE_ROW);
  if (isLayoutVeritcal) container.setAttribute('layout', 'horizontal');
  return container;
};

export const CreateEventCard = ({ entries }: { entries: EventType[] }) =>
  entries.map((entry) =>
    CreateCardElement({
      image: CreateImage({ images: entry.image }),
      headline: CreateHeadline({ text: entry.title, url: entry.url }),
      text: CreateText({ text: entry.summary }),
      date: CreateDetails(entry),
      aligned: true,
    }),
  );

export const CreateEventList = ({ entries }: { entries: EventType[] }) =>
  entries.map((entry) =>
    CreateListElement({
      image: CreateImage({ images: entry.image }),
      headline: CreateHeadline({ text: entry.title, url: entry.url }),
      text: CreateText({ text: entry.summary }),
      details: CreateDetails({ ...entry, isLayoutVeritcal: false }),
      date: CreateDateBlockElement(entry),
    }),
  );
