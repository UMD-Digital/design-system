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
  allDay: boolean;
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

const CreateImage = ({ images, url }: { images: ImageType; url?: string }) => {
  if (!images || !Array.isArray(images) || images.length === 0) return null;

  const image = images[0];
  const imageElement = document.createElement('img');
  imageElement.src = image.url;
  imageElement.alt = image.altText;

  if (url) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
    link.setAttribute(
      'aria-label',
      `Maryland Event with image ${image.altText}`,
    );

    link.appendChild(imageElement);

    return link;
  }

  return imageElement;
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

const CommonDisplay = ({
  entry,
  theme,
  showTime,
}: {
  entry: EventType;
  theme?: string | null;
  showTime?: boolean;
}) => ({
  image: CreateImage({ images: entry.image, url: entry.url }),
  headline: CreateHeadline({ text: entry.title, url: entry.url }),
  text: CreateText({ text: entry.summary }),
  eventDetails: EventElements.Meta.CreateElement({
    ...entry,
    theme,
    showTime,
  }),
  theme,
});

const CreateEventsGrouped = ({
  entries,
  theme,
}: {
  entries: EventType[];
  theme?: string | null;
}) => {
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
      ...CommonDisplay({ entry, theme, showTime: entry.allDay ? false : true }),
      dateSign: EventElements.Sign.CreateElement({ ...entry, theme }),
      theme,
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
  theme,
}: {
  entries: EventType[];
  isTypeGrid?: boolean;
  theme?: string | null;
}) => {
  if (isTypeGrid) {
    return entries.map((entry) =>
      EventBlock.CreateElement({
        ...CommonDisplay({
          entry,
          theme,
          showTime: entry.allDay ? false : true,
        }),
      }),
    );
  }

  return entries.map((entry) =>
    EventList.CreateElement({
      ...CommonDisplay({ entry, theme, showTime: entry.allDay ? false : true }),
      dateSign: EventElements.Sign.CreateElement({
        ...entry,
        theme,
        isLargeSize: true,
      }),
    }),
  );
};

export default {
  CreateElement: CreateEventFeedDisplay,
  CreateGroupedElement: CreateEventsGrouped,
  Styles: STYLES_EVENT_FEED,
};
