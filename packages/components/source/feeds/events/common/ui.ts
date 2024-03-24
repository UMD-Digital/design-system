import {
  CreateEventBlockElement,
  STYLES_BLOCK_EVENT,
} from 'elements/block/event';
import { CreateListEventElement, STYLES_LIST_EVENT } from 'elements/list/event';
import {
  CreateDateBlockElement,
  STYLES_DATE_BLOCK,
} from 'elements/common/date-block';
import {
  CreateDateDetailsElement,
  STYLES_DATE_DETAILS,
} from 'elements/common/date-details';

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

export const STYLES_EVENT_FEED = `
  ${STYLES_BLOCK_EVENT}
  ${STYLES_LIST_EVENT}
  ${STYLES_DATE_BLOCK}
  ${STYLES_DATE_DETAILS}
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

export const CreateEventCard = ({ entries }: { entries: EventType[] }) =>
  entries.map((entry) =>
    CreateEventBlockElement({
      image: CreateImage({ images: entry.image }),
      headline: CreateHeadline({ text: entry.title, url: entry.url }),
      text: CreateText({ text: entry.summary }),
      eventDetails: CreateDateDetailsElement({
        ...entry,
        isLayoutVeritcal: false,
      }),
      isAligned: false,
    }),
  );

export const CreateEventList = ({ entries }: { entries: EventType[] }) =>
  entries.map((entry) =>
    CreateListEventElement({
      image: CreateImage({ images: entry.image }),
      headline: CreateHeadline({ text: entry.title, url: entry.url }),
      text: CreateText({ text: entry.summary }),
      eventDetails: CreateDateDetailsElement({
        ...entry,
        isLayoutVeritcal: false,
      }),
      dateBlock: CreateDateBlockElement(entry),
    }),
  );
