interface ImageType {
  url: string;
  altText: string;
}

export interface EntryType {
  id: number;
  title: string;
  url: string;
  date: string;
  dateFormatted: string;
  summary: string;
  image: ImageType[];
  categories: {
    title: string;
    url: string;
  }[];
}

export interface FeedDisplay {
  feedData: EntryType[];
}

interface HelperFunctionProps {
  getContainer: () => HTMLElement;
  getOffset: () => number;
  getStyles: () => string;
  getShadowRoot: () => ShadowRoot | null;
  getTotalEntries: () => number | null;
  setTotalEntries: (count: number) => void;
  setOffset: (count: number) => void;
  setStyles: (styles: string) => void;
}

export interface DisplayResultsProps {
  displayResults: (props: FeedDisplay) => void;
}

export interface NoResultsProps extends HelperFunctionProps {
  message?: string;
  linkUrl?: string;
  linkText?: string;
  isThemeDark?: boolean;
}

export interface CommonProps
  extends HelperFunctionProps,
    BlockProps,
    ListProps {}

export interface DisplayProps extends CommonProps, DisplayResultsProps {}

export interface DisplayStartProps extends DisplayProps {
  layoutElement: { element: HTMLElement; styles: string };
}

export interface DisplayStartResultsProps
  extends DisplayStartProps,
    FeedDisplay {
  layoutElement: { element: HTMLElement; styles: string };
}

export interface BaseProps {
  token: string;
  numberOfRowsToStart: number;
  categories?: string[];
  isThemeDark?: boolean;
  isLazyLoad: boolean;
  isUnion: boolean;
  entriesToRemove?: string[];
  styleCallback?: (cssString: string) => void;
}

export interface BlockProps extends BaseProps {
  numberOfColumnsToShow?: number;
  isTransparent?: boolean;
  isTypeOverlay?: boolean;
}

export interface FeaturedProps extends BaseProps {
  isTransparent?: boolean;
  isLayoutReversed?: boolean;
  overwriteStickyPosition?: number;
}

export interface ListProps extends BaseProps {}
