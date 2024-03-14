import { Typography, Tokens } from '@universityofmaryland/variables';
import { CreateCardElement, STYLES_CARD } from 'elements/card';
import { CreateCallToActionElement } from 'elements/call-to-action';
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

type EventType = DateInformaitonType & {
  id: number;
  title: string;
  url: string;
  summary: string;
  image: ImageType;
  location: LocationType;
};

const { SansSmaller } = Typography;
const { Colors } = Tokens;

const EVENTS_DATE_ROW = 'events-date-row';

const DateRowStyles = `
  .${EVENTS_DATE_ROW} {
    display: flex;
    flex-direction: column;
  }

  .${EVENTS_DATE_ROW} > p:not(:last-child) {
    margin-top: 4px;
  }

  .${EVENTS_DATE_ROW} svg {
    max-width: 14px;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${EVENTS_DATE_ROW} span`]: SansSmaller,
    },
  })}

  .${EVENTS_DATE_ROW} span {
    margin-left: 4px;
    color: ${Colors.gray.darker};
  }
`;

export const STYLES_EVENTS = `
  ${STYLES_CARD}
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

const CreateDate = ({
  startDayOfWeek,
  startMonth,
  startDay,
  startTime,
  endDay,
  endMonth,
  location,
}: EventType) => {
  const container = document.createElement('div');
  const date = document.createElement('p');
  const time = document.createElement('p');

  date.innerHTML = `${CALENDAR_ICON} <span>${startDayOfWeek}. ${startMonth} ${startDay}</span>`;
  container.appendChild(date);
  time.innerHTML = `${CLOCK_ICON} <span>${startTime}</span>`;
  container.appendChild(time);

  if (location) {
    const locationText = document.createElement('p');
    locationText.innerHTML = `${PIN_ICON} <span>${location[0].title}</span>`;
    container.appendChild(locationText);
  }

  if (startDay != endDay && startMonth != endMonth) {
    const multiDay = document.createElement('p');
    multiDay.innerHTML = `${MULTI_DAY_ICON} <span>Multi-day</span>`;
    container.appendChild(multiDay);
  }

  container.classList.add(EVENTS_DATE_ROW);
  return container;
};

const CreateCTA = ({ url }: { url: string }) => {
  if (url) {
    const cta = document.createElement('a');

    cta.href = url;
    cta.innerHTML = 'Learn More';
    cta.setAttribute('target', '_blank');

    return CreateCallToActionElement({ cta, type: 'secondary' });
  }
  return null;
};

export const CreateEventCards = ({ entries }: { entries: EventType[] }) =>
  entries.map((entry) =>
    CreateCardElement({
      image: CreateImage({ images: entry.image }),
      headline: CreateHeadline({ text: entry.title, url: entry.url }),
      text: CreateText({ text: entry.summary }),
      date: CreateDate(entry),
      aligned: true,
    }),
  );
