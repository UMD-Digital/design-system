import { Attributes } from 'model';
import { newsProps } from '../_types';

export const CommonFeedNewsData = ({ element }: { element: HTMLElement }) => {
  const token = element.getAttribute(Attributes.names.deprecated.feed.FEED_TOKEN);
  const isThemeDark = Attributes.isTheme.dark({ element });
  const categoriesAttribute = element.getAttribute(
    Attributes.names.deprecated.feed.FEED_CATEGORIES,
  );
  const entriesToRemove = element.getAttribute(
    Attributes.names.deprecated.feed.FEED_NOT_ENTRIES,
  );

  if (!token) {
    console.error(`Feed news requires a token to be set`);
    return;
  }

  const data: newsProps = {
    token,
    isThemeDark,
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
