interface CardProps {
  headline: HTMLElement | null;
  eyebrow?: HTMLElement | null;
  text?: HTMLElement | null;
  date?: HTMLElement | null;
  actions?: HTMLElement | null;
  image?: HTMLImageElement | HTMLAnchorElement | null;
  eventMeta?: { element: HTMLElement; styles: string };
  dateSign?: { element: HTMLElement; styles: string };
  isThemeDark?: boolean;
  isAligned?: boolean;
}

export interface CardBlockProps extends CardProps {
  newsId?: string;
  isBordered?: boolean;
  isTransparent?: boolean;
  isEyebrowRibbon?: boolean;
}

export interface CardListProps extends CardProps {}
