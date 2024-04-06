import { EventBlock, EventList, EventElements } from 'elements';

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
  ${EventBlock.Styles}
  ${EventList.Styles}
  ${EventElements.Sign.Styles}
  ${EventElements.Meta.Styles}
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
    EventBlock.CreateElement({
      image: CreateImage({ images: entry.image }),
      headline: CreateHeadline({ text: entry.title, url: entry.url }),
      text: CreateText({ text: entry.summary }),
      eventDetails: EventElements.Meta.CreateElement({
        ...entry,
      }),
      isAligned: false,
    }),
  );

export const CreateEventList = ({ entries }: { entries: EventType[] }) =>
  entries.map((entry) =>
    EventList.CreateElement({
      image: CreateImage({ images: entry.image }),
      headline: CreateHeadline({ text: entry.title, url: entry.url }),
      text: CreateText({ text: entry.summary }),
      eventDetails: EventElements.Meta.CreateElement({
        ...entry,
      }),
      dateBlock: EventElements.Sign.CreateElement(entry),
    }),
  );
