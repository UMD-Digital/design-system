export interface BaseProps {
  token: string;
  numberOfRowsToStart: number;
  isThemeDark?: boolean;
  isLazyLoad: boolean;
  entriesToRemove?: string[];
}

export interface GridProps extends BaseProps {
  numberOfColumnsToShow?: number;
  isTransparent?: boolean;
}

export interface ListProps extends BaseProps {}
