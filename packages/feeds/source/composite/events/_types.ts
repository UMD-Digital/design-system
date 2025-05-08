interface ImageType {
  url: string;
  altText: string;
}

type LocationType = {
  title: string;
}[];

interface DateInformaitonType {
  startDayOfWeek: string;
  startStamp: string;
  startMonth: string;
  startDay: string;
  startTime: string;
  endDayOfWeek: string;
  endMonth: string;
  endDay: string;
  endTime: string;
  allDay: boolean;
}

export interface EventType extends DateInformaitonType {
  id: number;
  title: string;
  url: string;
  summary: string;
  image: ImageType[];
  location: LocationType;
}

export interface FeedDisplay {
  feedData: EventType[];
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

export interface NoResultsProps extends HelperFunctionProps {
  message?: string;
  linkUrl?: string;
  linkText?: string;
  isThemeDark?: boolean;
}

export interface BaseProps {
  token: string;
  numberOfRowsToStart: number;
  categories?: string[];
  isThemeDark?: boolean;
  isLazyLoad: boolean;
  styleCallback?: (cssString: string) => void;
}

export interface BlockProps extends BaseProps {
  numberOfColumnsToShow?: number;
  isTransparent?: boolean;
  isShowTime?: boolean;
}

export interface ListProps extends BaseProps {}

export interface SliderProps {
  token: string;
  categories?: string | null;
  isThemeDark?: boolean;
}
