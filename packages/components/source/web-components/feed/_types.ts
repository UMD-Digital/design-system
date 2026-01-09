interface baseFeedProps {
  token: string;
  categories?: string[];
  isThemeDark?: boolean;
  isLazyLoad: boolean;
}

export interface eventProps extends baseFeedProps {
  isTypeGrouped?: boolean;
}

export interface newsProps extends baseFeedProps {
  isTransparent?: boolean;
  isUnion: boolean;
  isLayoutReversed?: boolean;
  entriesToRemove?: string[];
}

export interface inTheNewsProps {
  token: string;
  isThemeDark?: boolean;
  isLazyLoad: boolean;
  entriesToRemove?: string[];
}
