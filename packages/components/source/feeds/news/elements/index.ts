import { Reset } from 'helpers/styles';
import { FetchGraphQL } from 'helpers/xhr';
import { UMDNewsFeedType } from '../component';

type ArticleType = {
  id: number;
  title: string;
  url: string;
  summary: string;
  image: {
    url: string;
    altText: string;
  }[];
  categories: {
    title: string;
    url: string;
  }[];
};

type VariablesType = {
  related?: string[];
};

const TODAY_PRODUCTION_URL = 'https://today.umd.edu/graphql';
const ARTICLES_QUERY = `
  query getArticlesByCategories($related: [QueryArgument]) {
    entries(
      section: "articles",
      relatedTo: $related,
      limit: 3
    ) {
      ... on articles_today_Entry {
        id
        title
        postDate
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

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
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

const CreateFeed = async ({ element }: { element: UMDNewsFeedType }) => {
  if (!element._token) throw new Error('Token not found');

  const feedData = await FetchGraphQL({
    query: ARTICLES_QUERY,
    url: TODAY_PRODUCTION_URL,
    token: element._token,
  });

  console.log(feedData);
};

export const CreateShadowDom = ({ element }: { element: UMDNewsFeedType }) => {
  const feedData = CreateFeed({ element });
  const container = document.createElement('div');
  const linkWrapper = CreateCallToAction();

  container.appendChild(linkWrapper);

  return container;
};
