interface baseFeedProps {
  token: string;
  numberOfRowsToStart: number;
  numberOfColumnsToShow?: number;
  categories?: string[];
  isThemeDark?: boolean;
  isLazyLoad: boolean;
  isUnion: boolean;
  isTypeGrid?: boolean;
  isTypeList?: boolean;
}

export interface eventProps extends baseFeedProps {
  isTypeGrouped?: boolean;
}

export interface newsProps extends baseFeedProps {
  isTransparent?: boolean;
  isLayoutReversed?: boolean;
  entriesToRemove?: string[];
  isTypeFeatured?: boolean;
  isTypeOverlay?: boolean;
}
