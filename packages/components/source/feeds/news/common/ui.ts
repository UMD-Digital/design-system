import { CardBlock, CardList } from 'elements';

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

export const STYLES_NEWS_FEED = `
  ${CardBlock.Styles}
  ${CardList.Styles}
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
    const dateElement = document.createElement('date');
    dateElement.innerHTML = dateFormatted;
    dateElement.setAttribute('datetime', date);
    return dateElement;
  }

  return null;
};

export const CreateNewsCard = ({ entries }: { entries: ArticleType[] }) =>
  entries.map((entry) =>
    CardBlock.CreateElement({
      image: CreateImage({ images: entry.image }),
      headline: CreateHeadline({ text: entry.title, url: entry.url }),
      text: CreateText({ text: entry.summary }),
      date: CreateDate({
        date: entry.date,
        dateFormatted: entry.dateFormatted,
      }),
      isAligned: true,
    }),
  );

export const CreateNewsList = ({ entries }: { entries: ArticleType[] }) =>
  entries.map((entry) =>
    CardList.CreateElement({
      image: CreateImage({ images: entry.image }),
      headline: CreateHeadline({ text: entry.title, url: entry.url }),
      text: CreateText({ text: entry.summary }),
      date: CreateDate({
        date: entry.date,
        dateFormatted: entry.dateFormatted,
      }),
    }),
  );
