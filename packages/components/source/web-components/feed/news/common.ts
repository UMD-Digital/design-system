import { Attributes } from '@universityofmaryland/web-model-library';
import { newsProps } from '../_types';

export const CommonFeedNewsData = ({ element }: { element: HTMLElement }) => {
  const token = Attributes.getValue.feedToken({ element });

  if (!token) {
    console.error(`Feed news requires a token to be set`);
    return;
  }

  const categoriesAttribute = Attributes.getValue.feedFilterIds({ element });
  const entriesToRemove = Attributes.getValue.feedEntryRemoveIds({ element });

  return {
    token,
    isThemeDark: Attributes.isTheme.dark({ element }),
    isLazyLoad: Attributes.includesFeature.lazyLoad({ element }),
    isUnion: Attributes.isData.union({ element }),
    ...(categoriesAttribute && { categories: categoriesAttribute.split(',') }),
    ...(entriesToRemove && { entriesToRemove: entriesToRemove.split(',') }),
  } as newsProps;
};
