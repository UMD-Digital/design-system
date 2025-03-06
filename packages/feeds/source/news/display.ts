import { Composite } from '@universityofmaryland/web-elements-library';

type ImageType = {
  url: string;
  altText: string;
}[];

export type ArticleType = {
  id: number;
  title: string;
  url: string;
  date: string;
  dateFormatted: string;
  summary: string;
  image: ImageType;
  categories: {
    title: string;
    url: string;
  }[];
};

const STYLES_NEWS_FEED = `
`;

const CreateImage = ({ images, url }: { images: ImageType; url?: string }) => {
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
      `Maryland Today Article with image ${image.altText}`,
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

const CreateDate = ({
  date,
  dateFormatted,
}: {
  date: string;
  dateFormatted: string;
}) => {
  if (date && dateFormatted) {
    const dateElement = document.createElement('time');
    dateElement.innerHTML = dateFormatted;
    dateElement.setAttribute('datetime', date);
    return dateElement;
  }

  return null;
};

const CommonDisplay = ({
  entry,
  isThemeDark,
}: {
  entry: ArticleType;
  isThemeDark?: boolean;
}) => ({
  newsId: entry.id.toString(),
  headline: CreateHeadline({ text: entry.title, url: entry.url }),
  text: CreateText({ text: entry.summary }),
  date: CreateDate({
    date: entry.date,
    dateFormatted: entry.dateFormatted,
  }),
  isThemeDark,
});

const CreateNewsFeedDisplay = ({
  entries,
  isTypeGrid,
  isTypeOverlay,
  isTypeFeatured,
  isThemeDark,
  isTransparent,
}: {
  entries: ArticleType[];
  isTypeGrid?: boolean;
  isTypeOverlay?: boolean;
  isTypeFeatured?: boolean;
  isThemeDark?: boolean;
  isTransparent?: boolean;
}) => {
  const standardCardType = ({ entry }: { entry: ArticleType }) => {
    return Composite.card.block({
      ...CommonDisplay({ entry, isThemeDark }),
      image: CreateImage({ images: entry.image, url: entry.url }),
      isAligned: false,
      isTransparent,
    }).element;
  };

  const overlayCardType = ({ entry }: { entry: ArticleType }) =>
    Composite.card.overlay.image({
      ...CommonDisplay({ entry, isThemeDark }),
      backgroundImage: CreateImage({ images: entry.image }),
    })?.element;

  const listCardType = ({ entry }: { entry: ArticleType }) => {
    return Composite.card.list({
      ...CommonDisplay({ entry, isThemeDark }),
      image: CreateImage({ images: entry.image, url: entry.url }),
    }).element;
  };

  if (isTypeFeatured) {
    if (entries.length >= 3) {
      const entriesCopy = entries.slice(0, 3);

      const overlayCard = Composite.card.overlay.image({
        ...CommonDisplay({ entry: entriesCopy[0], isThemeDark }),
        backgroundImage: CreateImage({ images: entriesCopy[0].image }),
      })?.element;

      if (overlayCard) {
        overlayCard.classList.add('umd-grid-column-double');
        overlayCard.classList.add('size-large');
      }

      entriesCopy.shift();

      const standardCards = entriesCopy.map((entry) =>
        standardCardType({ entry }),
      );

      return [overlayCard, ...standardCards];
    } else {
      return entries.map((entry) => standardCardType({ entry }));
    }
  }

  if (isTypeGrid) {
    return entries.map((entry) => standardCardType({ entry }));
  }

  if (isTypeOverlay) {
    return entries
      .map((entry) => overlayCardType({ entry }))
      .filter((entry) => entry);
  }

  return entries.map((entry) => listCardType({ entry }));
};

export default {
  CreateElement: CreateNewsFeedDisplay,
  Styles: STYLES_NEWS_FEED,
};
