import {
  Atomic,
  Composite,
  Utilities,
} from '@universityofmaryland/web-elements-library';

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

`;

const CreateImage = ({
  images,
  title,
  url,
}: {
  images: ImageType;
  title: string;
  url?: string;
}) => {
  if (!images || !Array.isArray(images) || images.length === 0) return null;

  const image = images[0];
  const imageElement = document.createElement('img');
  imageElement.src = image.url;
  imageElement.alt = image.altText || title;

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
  isThemeDark,
  showTime,
}: {
  entry: EventType;
  isThemeDark?: boolean;
  showTime?: boolean;
}) => ({
  image: CreateImage({
    images: entry.image,
    title: entry.title,
    url: entry.url,
  }),
  headline: CreateHeadline({ text: entry.title, url: entry.url }),
  text: CreateText({ text: entry.summary }),
  eventDetails: Atomic.events.meta({
    ...entry,
    isThemeDark: !isThemeDark,
    showTime,
  }),
  isThemeDark,
});

const CreateEventsGrouped = ({
  entries,
  isThemeDark,
}: {
  entries: EventType[];
  isThemeDark?: boolean;
}) => {
  const currentDateStamp = new Date();
  const weekFromDateStamp = new Date(
    new Date().setDate(new Date().getDate() + 7),
  );
  const currentDate =
    Utilities.date.createDateCompareString(
      currentDateStamp,
    ).palindromeTruncated;
  const weekDate =
    Utilities.date.createDateCompareString(
      weekFromDateStamp,
    ).palindromeTruncated;

  const getDateBanner = (entry: EventType) => {
    const entryDate = new Date(entry.startStamp);
    const entryDatePalindrom =
      Utilities.date.createDateCompareString(entryDate).palindromeTruncated;
    const formattedDate = Utilities.date.createVisualFormattedDate(
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
    html: Composite.card.list({
      ...CommonDisplay({
        entry,
        isThemeDark,
        showTime: entry.allDay ? false : true,
      }),
      dateSign: Atomic.events.sign({
        ...entry,
        isThemeDark,
      }),
      isThemeDark,
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
  isThemeDark,
}: {
  entries: EventType[];
  isTypeGrid?: boolean;
  isThemeDark?: boolean;
}) => {
  if (isTypeGrid) {
    return entries.map((entry) =>
      Composite.card.block({
        ...CommonDisplay({
          entry,
          isThemeDark,
          showTime: entry.allDay ? false : true,
        }),
      }),
    );
  }

  return entries.map((entry) =>
    Composite.card.list({
      ...CommonDisplay({
        entry,
        isThemeDark,
        showTime: entry.allDay ? false : true,
      }),
      dateSign: Atomic.events.sign({
        ...entry,
        isThemeDark,
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
