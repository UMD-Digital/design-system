import { type ElementVisual } from '_types';

export interface PathwayThemeProps {
  isThemeDark?: boolean;
  isThemeLight?: boolean;
  isThemeMaryland?: boolean;
}

export interface PathwayTextLockupProps extends PathwayThemeProps {
  actions?: HTMLElement | null;
  eventDetails?: ElementVisual;
  eyebrow?: HTMLElement | null;
  headline?: HTMLElement | null;
  stats?: HTMLElement | null;
  text?: HTMLElement | null;
}

export interface PathwayAssetProps {
  dateSign?: ElementVisual;
  image?: HTMLImageElement | null;
  isImagePositionLeft?: boolean;
  isImageScaled?: boolean;
  video?: HTMLVideoElement | null;
}

export interface PathwayBaseProps
  extends PathwayTextLockupProps,
    PathwayAssetProps {}

export interface PathwayHighlightProps extends PathwayTextLockupProps {
  attribution?: HTMLElement | null;
  quote?: HTMLElement | null;
}

export interface PathwayOverlayProps extends PathwayBaseProps {
  includesAnimation?: boolean;
}

export interface PathwayStandardProps extends PathwayBaseProps {
  includesAnimation?: boolean;
}

export interface PathwayStickyProps extends PathwayBaseProps {}
