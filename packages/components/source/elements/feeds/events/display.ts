import { EventBlock, EventList, EventElements } from 'elements';
import { DateUtility } from 'utilities';

type ImageType = {
  url: string;
  altText: string;
}[];

type LocationType = {
  title: string;
}[];

type DateInformaitonType = {
  startDayOfWeek: string;
  startStamp: string;
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

const STYLES_EVENT_FEED = `
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

const CommonDisplay = ({ entry }: { entry: EventType }) => ({
  image: CreateImage({ images: entry.image }),
  headline: CreateHeadline({ text: entry.title, url: entry.url }),
  text: CreateText({ text: entry.summary }),
  eventDetails: EventElements.Meta.CreateElement({
    ...entry,
  }),
});

const CreateEventsGrouped = ({ entries }: { entries: EventType[] }) => {
  const currentDateStamp = new Date();
  const weekFromDateStamp = new Date(
    new Date().setDate(new Date().getDate() + 7),
  );
  const currentDate =
    DateUtility.CreateDateCompareString(currentDateStamp).palindromeTruncated;
  const weekDate =
    DateUtility.CreateDateCompareString(weekFromDateStamp).palindromeTruncated;

  const getDateBanner = (entry: EventType) => {
    const entryDate = new Date(entry.startStamp);
    const entryDatePalindrom =
      DateUtility.CreateDateCompareString(entryDate).palindromeTruncated;
    const formattedDate = DateUtility.CreateVisualFormattedDate(
      new Date(entry.startStamp),
    );

    if (entryDatePalindrom === currentDate) {
      return 'Today';
    }

    if (weekDate > entryDatePalindrom) {
      return formattedDate.dayOfWeekLong;
    }

    return `${formattedDate.dayOfWeek}, ${formattedDate.month} ${formattedDate.day}`;
  };
  const entriesMapping = entries.map((entry) => ({
    dateBanner: getDateBanner(entry),
    timeStamp: entry.startStamp,
    html: EventList.CreateElement({
      ...CommonDisplay({ entry }),
      dateSign: EventElements.Sign.CreateElement(entry),
    }),
  }));
  const groupTypes: Array<string> = entriesMapping
    .reduce(
      (acc, entry) => {
        const banner: string = entry.dateBanner;
        if (acc.indexOf(banner) < 0) acc.push(banner);

        return acc;
      },
      [''],
    )
    .filter((banner) => banner !== '');
  const groupEntriesMapping = groupTypes.map((groupType) => {
    const groupEntries = entriesMapping.filter(
      (entry) => entry.dateBanner === groupType,
    );

    return {
      dateBanner: groupType,
      timestamp: groupEntries[0].timeStamp,
      entries: groupEntries.map((entry) => entry.html),
    };
  });

  return groupEntriesMapping;
};

const CreateEventFeedDisplay = ({
  entries,
  isTypeGrid,
}: {
  entries: EventType[];
  isTypeGrid?: boolean;
}) => {
  if (isTypeGrid) {
    return entries.map((entry) =>
      EventBlock.CreateElement({
        ...CommonDisplay({ entry }),
      }),
    );
  }

  return entries.map((entry) =>
    EventList.CreateElement({
      ...CommonDisplay({ entry }),
      dateSign: EventElements.Sign.CreateElement(entry),
    }),
  );
};

export default {
  CreateElement: CreateEventFeedDisplay,
  CreateGroupedElement: CreateEventsGrouped,
  Styles: STYLES_EVENT_FEED,
};
