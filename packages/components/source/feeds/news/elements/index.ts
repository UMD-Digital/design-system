import { umdGrid } from '@universityofmaryland/variables';
import { ConvertJSSObjectToStyles, Reset } from 'helpers/styles';
import { FetchGraphQL } from 'helpers/xhr';
import { UMDNewsFeedType } from '../component';
import { CreateCardElement, STYLES_CARD } from 'elements/card';

type ImageType = {
  url: string;
  altText: string;
}[];

type ArticleType = {
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

type VariablesType = {
  related?: string[];
  limit?: number;
};

const LAYOUT_CONTAINER = 'umd-feeds-news-layout-container';

const TODAY_PRODUCTION_URL = 'https://today.umd.edu/graphql';
const ARTICLES_QUERY = `
  query getArticlesByCategories($related: [QueryArgument], $limit: Int) {
    entries(
      section: "articles",
      relatedTo: $related,
      limit: $limit
    ) {
      ... on articles_today_Entry {
        id
        title
        date: postDate
        dateFormatted: postDate @formatDateTime(format: "M d, Y")
        summary: genericText
        url
        image:articlesHeroImage {
          url
          ... on hero_Asset {
            id
            altText: genericText
          }
        }
        categories:categoryTodaySectionMultiple {
          title
          url
        }
      }
    }
  }
`;

const LayoutStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LAYOUT_CONTAINER}[grid-count="2"]`]: umdGrid['.umd-grid'],
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LAYOUT_CONTAINER}[grid-count="3"]`]: umdGrid['.umd-grid-three'],
    },
  })}


  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${LAYOUT_CONTAINER}[grid-count="4"]`]: umdGrid['.umd-grid-four'],
    },
  })}
`;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${LayoutStyles}
  ${STYLES_CARD}
`;

const CreateCallToAction = () => {
  const wrapper = document.createElement('umd-element-call-to-action');
  const link = document.createElement('a');

  link.setAttribute('href', 'https://google.com');
  link.setAttribute('target', '_blank');
  link.innerHTML = 'View Article';

  wrapper.setAttribute('size', 'large');
  wrapper.setAttribute('type', 'outline');

  wrapper.appendChild(link);

  return wrapper;
};

const CreateGridLayout = ({ element }: { element: UMDNewsFeedType }) => {
  const container = document.createElement('div');

  container.classList.add(LAYOUT_CONTAINER);
  container.setAttribute('grid-count', `${element._showCount}`);

  return container;
};

const CreateNoResults = () => {};

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

const CreateEntries = ({ entries }: { entries: ArticleType[] }) =>
  entries.map((entry) =>
    CreateCardElement({
      image: CreateImage({ images: entry.image }),
      headline: CreateHeadline({ text: entry.title, url: entry.url }),
      text: CreateText({ text: entry.summary }),
      date: CreateDate({
        date: entry.date,
        dateFormatted: entry.dateFormatted,
      }),
    }),
  );

const CreateFeed = async ({ element }: { element: UMDNewsFeedType }) => {
  if (!element._token) throw new Error('Token not found');

  const variables: VariablesType = {
    limit: element._showCount * element._showRows,
    related: element._categories,
  };

  const feedData = await FetchGraphQL({
    query: ARTICLES_QUERY,
    url: TODAY_PRODUCTION_URL,
    token: element._token,
    variables,
  });

  if (!feedData) throw new Error('Feed not found');
  if (feedData.message) {
    throw new Error(`Feed data errors: ${feedData.message}`);
  }
  if (!feedData.data) throw new Error('Feed data not found');
  if (!feedData.data.entries) throw new Error('Feed entries not found');

  if (feedData.data.entries) {
    return feedData.data.entries;
  }

  return null;
};

export const CreateShadowDom = async ({
  element,
}: {
  element: UMDNewsFeedType;
}) => {
  const feedData = await CreateFeed({ element });
  const container = document.createElement('div');
  const linkWrapper = CreateCallToAction();

  if (feedData.length === 0) {
    CreateNoResults();
    return;
  }

  const entries = CreateEntries({ entries: feedData });
  const grid = CreateGridLayout({ element });

  entries.forEach((entry) => {
    grid.appendChild(entry);
  });

  container.appendChild(grid);
  // container.appendChild(linkWrapper);

  return container;
};
