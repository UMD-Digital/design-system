interface baseFeedProps {
  token: string;
  categories?: string[];
  isThemeDark?: boolean;
  isLazyLoad: boolean;
  isUnion: boolean;
}

export interface eventProps extends baseFeedProps {
  isTypeGrouped?: boolean;
}

export interface newsProps extends baseFeedProps {
  isTransparent?: boolean;
  isLayoutReversed?: boolean;
  entriesToRemove?: string[];
}
