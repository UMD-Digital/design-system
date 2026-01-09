import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import { card } from '@universityofmaryland/web-elements-library/composite';
import { gridOffset, stacked } from '@universityofmaryland/web-elements-library/layout';
import {
  LoadingState,
  PaginationState,
  EmptyState,
  Announcer,
} from '../../states';
import { expertsFetchStrategy } from '../../strategies/fetch/experts';
import { inTheNewsFetchStrategy } from '../../strategies/fetch/inTheNews';
import { expertsDisplayStrategy } from '../../strategies/display/experts';
import { inTheNewsDisplayStrategy } from '../../strategies/display/inTheNews';
import {
  events as eventUtilities,
  styles as styleUtilities,
} from '../../helpers';
import { type InTheNewsProps } from './_types';
import { type ElementModel } from '../../_types';
import { type ExpertEntry, type InTheNewsEntry } from 'types/data';

const DEFAULT_ROWS_TO_START = 5;
const MIN_ROWS_TO_START = 2;
const MAX_ROWS_TO_START = 10;
const LOAD_MORE_ITEMS = 5;

const normalizeRowCount = (rows?: number): number => {
  if (rows === undefined) return DEFAULT_ROWS_TO_START;
  return Math.max(MIN_ROWS_TO_START, Math.min(MAX_ROWS_TO_START, rows));
};

const createExpertFetchProps = (token: string, expertId: string) => ({
  token,
  limit: 1,
  offset: 0,
  ids: [expertId],
});

const createNewsFetchProps = (
  token: string,
  expertId: string,
  numberOfRowsToStart: number,
  offset: number,
) => ({
  token,
  expertId,
  numberOfRowsToStart,
  getOffset: () => offset,
});

const createAnnouncerMessage = (
  showing: number,
  total: number,
  isLazyLoad: boolean,
): string =>
  isLazyLoad
    ? `Showing ${showing} of ${total} news articles`
    : `Showing ${showing} news articles`;

class InTheNewsFeedState {
  private stylesArray: string[] = [];
  private shadowRoot: ShadowRoot | null = null;
  private totalEntries: number = 0;
  private offset: number = 0;
  private pagination: PaginationState | null = null;

  constructor(initialStyles: string) {
    this.stylesArray.push(initialStyles);
  }

  addStyles(styles: string): void {
    this.stylesArray.push(styles);
  }

  setShadowRoot(shadow: ShadowRoot): void {
    this.shadowRoot = shadow;
  }

  async updateShadowStyles(): Promise<void> {
    if (!this.shadowRoot) return;
    await styleUtilities.setShadowStyles({
      shadowRoot: this.shadowRoot,
      styles: this.getStyles(),
    });
  }

  getStyles(): string {
    return this.stylesArray.join('\n');
  }

  getShadowCallback(): (shadow: ShadowRoot) => void {
    return (shadow) => this.setShadowRoot(shadow);
  }

  getOffset(): number {
    return this.offset;
  }

  setOffset(value: number): void {
    this.offset = value;
  }

  incrementOffset(count: number): void {
    this.offset += count;
  }

  getTotalEntries(): number {
    return this.totalEntries;
  }

  setTotalEntries(total: number): void {
    this.totalEntries = total;
  }

  getPagination(): PaginationState | null {
    return this.pagination;
  }

  setPagination(pagination: PaginationState | null): void {
    this.pagination = pagination;
  }
}

const createExpertOverlayCard = (
  expert: ExpertEntry,
  isThemeDark: boolean,
): ElementModel =>
  expertsDisplayStrategy.mapEntryToCard(expert, {
    isOverlay: true,
    isThemeDark,
  });

const createNewsListContainer = (
  entries: InTheNewsEntry[],
  state: InTheNewsFeedState,
  isThemeDark: boolean,
): HTMLElement => {
  const stackedLayout = stacked({ isThemeDark, showDividers: true, gap: '0' });
  stackedLayout.element.id = 'umd-expert-in-the-news-list';
  state.addStyles(stackedLayout.styles);

  entries.forEach((entry) => {
    const newsCard = inTheNewsDisplayStrategy.mapEntryToCard(entry, {
      isThemeDark,
      cardType: 'list',
    });
    stackedLayout.element.appendChild(newsCard.element);
    state.addStyles(newsCard.styles);
  });

  return stackedLayout.element;
};

const appendNewsEntries = (
  container: HTMLElement,
  entries: InTheNewsEntry[],
  state: InTheNewsFeedState,
  isThemeDark: boolean,
): void => {
  const listContainer = container.querySelector(
    '#umd-expert-in-the-news-list',
  ) as HTMLElement;

  if (!listContainer) return;

  entries.forEach((entry) => {
    const newsCard = inTheNewsDisplayStrategy.mapEntryToCard(entry, {
      isThemeDark,
      cardType: 'list',
    });
    listContainer.appendChild(newsCard.element);
    state.addStyles(newsCard.styles);
  });
};

const renderLayout = async (
  container: HTMLElement,
  expert: ExpertEntry,
  newsEntries: InTheNewsEntry[],
  state: InTheNewsFeedState,
  props: InTheNewsProps,
  loadMore: () => Promise<void>,
): Promise<void> => {
  const { isThemeDark = false, isLazyLoad = false } = props;

  const offsetLayout = gridOffset({
    columns: 2,
    isLayoutReversed: false,
  });

  const expertCard = createExpertOverlayCard(expert, isThemeDark);
  state.addStyles(expertCard.styles);

  state.addStyles(`
    .${card.overlay.imageClassRef} {
      height: inherit;
    }

    @media (${token.media.queries.tablet.min}) {
      .${card.overlay.imageClassRef} .card-overlay-image-container {
        min-height: 560px;
      }
    }

    .${card.overlay.imageClassRef} .umd-asset-image-wrapper-scaled {
      position: absolute;
    }
  `);

  const rightColumn = document.createElement('div');
  rightColumn.className = 'expert-in-the-news-right-column';

  const newsList = createNewsListContainer(newsEntries, state, isThemeDark);
  rightColumn.appendChild(newsList);

  offsetLayout.element.appendChild(expertCard.element);
  offsetLayout.element.appendChild(rightColumn);
  container.appendChild(offsetLayout.element);

  state.addStyles(offsetLayout.styles);
  state.setOffset(newsEntries.length);

  if (isLazyLoad && state.getTotalEntries() > state.getOffset()) {
    const pagination = new PaginationState({
      totalEntries: state.getTotalEntries(),
      offset: state.getOffset(),
      isLazyLoad: true,
      callback: loadMore,
    });

    const paginationElement = pagination.render(rightColumn);
    if (paginationElement) state.addStyles(paginationElement.styles);
    state.setPagination(pagination);
  }

  const announcer = new Announcer({
    message: createAnnouncerMessage(
      state.getOffset(),
      state.getTotalEntries(),
      isLazyLoad,
    ),
  });
  container.appendChild(announcer.getElement());

  await state.updateShadowStyles();
};

const renderError = async (
  container: HTMLElement,
  message: string,
  state: InTheNewsFeedState,
  isThemeDark: boolean,
): Promise<void> => {
  const emptyState = new EmptyState({ message, isThemeDark });
  emptyState.render(container);
  state.addStyles(emptyState.styles);
  await state.updateShadowStyles();
};

const renderLayoutWithNoNews = async (
  container: HTMLElement,
  expert: ExpertEntry,
  state: InTheNewsFeedState,
  isThemeDark: boolean,
): Promise<void> => {
  const offsetLayout = gridOffset({
    columns: 2,
    isLayoutReversed: false,
  });

  const expertCard = createExpertOverlayCard(expert, isThemeDark);
  state.addStyles(expertCard.styles);

  state.addStyles(`
    .${card.overlay.imageClassRef} {
      height: inherit;
    }

    @media (${token.media.queries.tablet.min}) {
      .${card.overlay.imageClassRef} .card-overlay-image-container {
        min-height: 560px;
      }
    }

    .${card.overlay.imageClassRef} .umd-asset-image-wrapper-scaled {
      position: absolute;
    }
  `);

  const rightColumn = document.createElement('div');
  rightColumn.className = 'expert-in-the-news-right-column';

  const emptyState = new EmptyState({
    message: 'No news articles found for this expert',
    isThemeDark,
  });
  emptyState.render(rightColumn);
  state.addStyles(emptyState.styles);

  offsetLayout.element.appendChild(expertCard.element);
  offsetLayout.element.appendChild(rightColumn);
  container.appendChild(offsetLayout.element);

  state.addStyles(offsetLayout.styles);
  await state.updateShadowStyles();
};

const logError = (
  errorType: 'expert_not_found' | 'no_news' | 'graphql_error',
  expertId: string,
  error?: unknown,
): void => {
  const messages = {
    expert_not_found: `No expert found with ID "${expertId}". Verify the expert ID is correct.`,
    no_news: `No news articles found for expert "${expertId}".`,
    graphql_error: `GraphQL error occurred for expert "${expertId}".`,
  };
  console.warn(`[Expert In The News Feed] ${messages[errorType]}`, error || '');
};

export const expertsInTheNews = (props: InTheNewsProps): ElementModel => {
  const { token, expertId, isThemeDark = false, isLazyLoad = false } = props;
  const numberOfRowsToStart = normalizeRowCount(props.numberOfRowsToStart);

  const containerBuilder = new ElementBuilder('div').withClassName(
    'expert-in-the-news-feed',
  );
  const container = containerBuilder.getElement();

  const loading = new LoadingState({ isThemeDark });
  const state = new InTheNewsFeedState(loading.styles);

  const loadMore = async (): Promise<void> => {
    const pagination = state.getPagination();
    if (pagination) pagination.remove();

    loading.show(container);

    const fetchProps = createNewsFetchProps(
      token,
      expertId,
      LOAD_MORE_ITEMS,
      state.getOffset(),
    );
    const variables = inTheNewsFetchStrategy.composeApiVariables(fetchProps);
    const entries = await inTheNewsFetchStrategy.fetchEntries(variables);

    loading.hide();

    if (!entries || entries.length === 0) return;

    appendNewsEntries(container, entries, state, isThemeDark);
    state.incrementOffset(entries.length);

    if (pagination) {
      pagination.updateState(state.getOffset(), state.getTotalEntries());
      if (pagination.styles) state.addStyles(pagination.styles);
      await state.updateShadowStyles();
    }

    const existingAnnouncer = container.querySelector(
      '[role="status"]',
    ) as HTMLElement;
    if (existingAnnouncer) {
      existingAnnouncer.textContent = createAnnouncerMessage(
        state.getOffset(),
        state.getTotalEntries(),
        isLazyLoad,
      );
    }

    eventUtilities.dispatch(
      container,
      eventUtilities.eventNames.FEED_LOADED_MORE,
      { items: entries, count: entries.length, total: state.getTotalEntries() },
    );
  };

  const initialize = async (): Promise<void> => {
    if (!expertId) {
      await renderError(container, 'Expert ID is required', state, isThemeDark);
      return;
    }

    loading.show(container);

    try {
      const expertFetchProps = createExpertFetchProps(token, expertId);
      const expertVariables =
        expertsFetchStrategy.composeApiVariables(expertFetchProps);

      const newsFetchProps = createNewsFetchProps(
        token,
        expertId,
        numberOfRowsToStart,
        0,
      );
      const newsVariables =
        inTheNewsFetchStrategy.composeApiVariables(newsFetchProps);

      const [expertEntries, newsCount, newsEntries] = await Promise.all([
        expertsFetchStrategy.fetchEntries(expertVariables),
        inTheNewsFetchStrategy.fetchCount(newsVariables),
        inTheNewsFetchStrategy.fetchEntries(newsVariables),
      ]);

      loading.hide();

      if (!expertEntries || expertEntries.length === 0) {
        logError('expert_not_found', expertId);
        await renderError(container, 'Expert not found', state, isThemeDark);
        return;
      }

      if (!newsEntries || newsEntries.length === 0) {
        logError('no_news', expertId);
        await renderLayoutWithNoNews(
          container,
          expertEntries[0],
          state,
          isThemeDark,
        );
        return;
      }

      state.setTotalEntries(newsCount || newsEntries.length);

      eventUtilities.dispatch(
        container,
        eventUtilities.eventNames.FEED_LOADED,
        {
          expert: expertEntries[0],
          newsItems: newsEntries,
          newsCount: newsEntries.length,
          total: state.getTotalEntries(),
        },
      );

      await renderLayout(
        container,
        expertEntries[0],
        newsEntries,
        state,
        props,
        loadMore,
      );
    } catch (error) {
      loading.hide();
      logError('graphql_error', expertId, error);
      await renderError(
        container,
        'Failed to load content',
        state,
        isThemeDark,
      );
    }
  };

  initialize();

  return {
    element: containerBuilder.build().element,
    get styles() {
      return state.getStyles();
    },
    events: {
      callback: state.getShadowCallback(),
    },
  };
};
