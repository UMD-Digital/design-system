import { CardBlock, CardList, CardOverlayImage } from 'elements';

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
  ${CardBlock.Styles}
  ${CardList.Styles}
  ${CardOverlayImage.Styles}
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
  theme,
}: {
  entry: ArticleType;
  theme?: string | null;
}) => ({
  id: entry.id.toString(),
  image: CreateImage({ images: entry.image }),
  headline: CreateHeadline({ text: entry.title, url: entry.url }),
  text: CreateText({ text: entry.summary }),
  date: CreateDate({
    date: entry.date,
    dateFormatted: entry.dateFormatted,
  }),
  theme,
});

const CreateNewsFeedDisplay = ({
  entries,
  isTypeGrid,
  isTypeOverlay,
  isTypeFeatured,
  theme,
  isTransparent,
}: {
  entries: ArticleType[];
  isTypeGrid?: boolean;
  isTypeOverlay?: boolean;
  isTypeFeatured?: boolean;
  theme?: string | null;
  isTransparent?: boolean;
}) => {
  if (isTypeFeatured) {
    if (entries.length >= 3) {
      const entriesCopy = entries.slice(0, 3);

      const overlayCard = CardOverlayImage.CreateElement({
        ...CommonDisplay({ entry: entriesCopy[0], theme }),
      });

      if (overlayCard) {
        overlayCard.classList.add('umd-grid-column-double');
        overlayCard.classList.add('size-large');
      }

      entriesCopy.shift();

      const standardCards = entriesCopy.map((entry) =>
        CardBlock.CreateElement({
          ...CommonDisplay({ entry, theme }),
          isAligned: false,
          isTransparent,
        }),
      );

      return [overlayCard, ...standardCards];
    } else {
      return entries.map((entry) =>
        CardBlock.CreateElement({
          ...CommonDisplay({ entry, theme }),
          isAligned: false,
          isTransparent,
        }),
      );
    }
  }

  if (isTypeGrid) {
    return entries.map((entry) =>
      CardBlock.CreateElement({
        ...CommonDisplay({ entry, theme }),
        isAligned: false,
        isTransparent,
      }),
    );
  }

  if (isTypeOverlay) {
    return entries
      .map((entry) =>
        CardOverlayImage.CreateElement({
          ...CommonDisplay({ entry, theme }),
        }),
      )
      .filter((entry) => entry);
  }

  return entries.map((entry) =>
    CardList.CreateElement({
      ...CommonDisplay({ entry, theme }),
    }),
  );
};

export default {
  CreateElement: CreateNewsFeedDisplay,
  Styles: STYLES_NEWS_FEED,
};
