import { Reset } from 'helpers/styles';
import { MakeLoader } from 'elements/loader';
import {
  AppendGridEntries,
  DisplayLazyLoad,
  DisplayNoResults,
  DisplayLoader,
  DisplayGrid,
  RemoveLazyLoad,
  RemoveLoader,
  STYLES_FEEDS_COMMON,
  TypeLazyLoad,
} from 'feeds/common/ui';
import { FetchFeedEntries, TypeAPIFeedVariables } from '../common/api';
import {
  CreateNewsCard,
  CreateNewsList,
  STYLES_NEWS_FEED,
  ArticleType,
} from '../common/ui';
import {
  UMDFeedNewsList,
  ELEMENT_NAME as ELEMENT_NAME_LIST,
} from '../list/index';
import {
  UMDFeedNewsGrid,
  ELEMENT_NAME as ELEMENT_NAME_GRID,
} from '../grid/index';

const FEEDS_NEWS_CONTAINER = 'umd-feeds-news-container';

type TypeElements = UMDFeedNewsList | UMDFeedNewsGrid;

export const ComponentStyles = `
  :host {
    display: block;
  }

  ${Reset}
  ${STYLES_FEEDS_COMMON}
  ${STYLES_NEWS_FEED}
`;

const NoResultsContent = {
  message: 'No results found',
  linkUrl: 'https://today.umd.edu',
  linkText: 'View All Articles',
};

const isListType = ({ element }: { element: TypeElements }) =>
  element.nodeName.toLowerCase() === ELEMENT_NAME_LIST;

const isGridType = ({ element }: { element: TypeElements }) =>
  element.nodeName.toLowerCase() === ELEMENT_NAME_GRID;

const MakeApiVariables = ({
  element,
}: {
  element: TypeElements;
}): TypeAPIFeedVariables => {
  const related = element._categories;
  const offset = element._offset;
  const token = element._token;
  let limit = element._showRows;

  if ('_showCount' in element) {
    limit = element._showCount * element._showRows;
  }

  return {
    container: GetContainer({ element }),
    limit,
    related,
    offset,
    token,
  };
};

const MakeLazyLoadVariables = ({
  element,
}: {
  element: TypeElements;
}): TypeLazyLoad => ({
  container: GetContainer({ element }),
  isLazyLoad: element._lazyLoad,
  totalEntries: element._totalEntries,
  offset: element._offset,
  lazyLoadCallback: { callback: () => LoadMoreEntries({ element }) },
});

const GetContainer = ({ element }: { element: TypeElements }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const container = shadowRoot.querySelector(
    `.${FEEDS_NEWS_CONTAINER}`,
  ) as HTMLDivElement;

  return container;
};

const DisplayEntries = ({
  element,
  entries,
}: {
  element: TypeElements;
  entries: ArticleType[];
}) => {
  const isGrid = isGridType({ element });
  const container = GetContainer({ element });
  const displayEntries = isGrid
    ? CreateNewsCard({ entries })
    : CreateNewsList({ entries });

  element._offset += entries.length;

  RemoveLoader({ container });
  RemoveLazyLoad({ container });
  AppendGridEntries({ container, entries: displayEntries });
  DisplayLazyLoad(MakeLazyLoadVariables({ element }));
};

const LoadMoreEntries = async ({ element }: { element: TypeElements }) => {
  const container = GetContainer({ element });
  RemoveLazyLoad({ container });
  DisplayLoader({ container });
  FetchFeedEntries({
    variables: MakeApiVariables({ element }),
  }).then((feedData) => {
    DisplayEntries({ element, entries: feedData.entries });
  });
};

export const CreateFeed = async ({ element }: { element: TypeElements }) => {
  const container = GetContainer({ element });

  FetchFeedEntries({
    variables: MakeApiVariables({ element }),
  }).then((feedData) => {
    const totalEntries = feedData.count;

    if (totalEntries === 0) {
      DisplayNoResults({ container, NoResultsContent });
      return;
    }

    if (totalEntries > 0) {
      const count = '_showCount' in element ? element._showCount : 1;
      element._totalEntries = totalEntries;

      DisplayGrid({ container, count });
      DisplayEntries({ element, entries: feedData.entries });
    }
  });
};

export const CreateShadowDom = ({ element }: { element: TypeElements }) => {
  const loader = MakeLoader();
  const container = document.createElement('div');

  container.classList.add(FEEDS_NEWS_CONTAINER);
  container.appendChild(loader);

  return container;
};
