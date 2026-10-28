import { Attributes } from '@universityofmaryland/web-model-library';

export interface InTheNewsProps {
  token: string;
  apiUrl?: string;
  isThemeDark?: boolean;
  isLazyLoad: boolean;
  entriesToRemove?: string[];
}

export const CommonFeedInTheNewsData = ({
  element,
}: {
  element: HTMLElement;
}): InTheNewsProps | undefined => {
  const token = Attributes.getValue.feedToken({ element });
  const apiUrl = Attributes.getValue.url({ element });

  if (!token) {
    console.error('Feed in-the-news requires a token to be set');
    return;
  }

  const entriesToRemove = Attributes.getValue.feedEntryRemoveIds({ element });

  return {
    token,
    ...(apiUrl && { apiUrl }),
    isThemeDark: Attributes.isTheme.dark({ element }),
    isLazyLoad: Attributes.includesFeature.lazyLoad({ element }),
    ...(entriesToRemove && { entriesToRemove: entriesToRemove.split(',') }),
  };
};
