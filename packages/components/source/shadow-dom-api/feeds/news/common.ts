import { Attributes } from 'shadow-dom-model';
import { TypeNewsFeedRequirements } from 'elements/feeds/news';

export const CommonFeedNewsData = ({
  element,
  numberOfColumnsToShowDefault = 1,
  numberOfRowsToStartDefault = 5,
}: {
  element: HTMLElement;
  numberOfColumnsToShowDefault?: number;
  numberOfRowsToStartDefault?: number;
}) => {
  const token = element.getAttribute(Attributes.names.FEED_TOKEN);
  const isThemeDark = Attributes.isTheme.dark({ element });
  const categoriesAttribute = element.getAttribute(
    Attributes.names.FEED_CATEGORIES,
  );
  const entriesToRemove = element.getAttribute(
    Attributes.names.FEED_NOT_ENTRIES,
  );

  if (!token) {
    console.error(`Feed events requires a token to be set`);
    return;
  }

  const numberOfRowsToStart =
    Number(element.getAttribute(Attributes.names.FEED_ROW_COUNT)) ||
    numberOfRowsToStartDefault;
  const numberOfColumnsToShow =
    Number(element.getAttribute(Attributes.names.FEED_COLUMN_COUNT)) ||
    numberOfColumnsToShowDefault;

  const data: TypeNewsFeedRequirements = {
    token,
    isThemeDark,
    numberOfRowsToStart,
    numberOfColumnsToShow,
    isLazyLoad: Attributes.includesFeature.lazyLoad({ element }),
    isUnion: Attributes.isData.union({ element }),
  };

  if (categoriesAttribute) {
    data.categories = categoriesAttribute.split(',');
  }

  if (entriesToRemove) {
    data.entriesToRemove = entriesToRemove.split(',');
  }

  return data;
};
