import {
  type AnimationProps,
  type ContentElement,
  type ElementVisual,
  type StandaloneAssetProps,
  type ThemeProps,
} from '../../_types';

export interface PathwayTextLockupProps
  extends Pick<ThemeProps, 'isThemeDark' | 'isThemeLight' | 'isThemeMaryland'> {
  actions?: ContentElement;
  eventDetails?: ElementVisual;
  eyebrow?: ContentElement;
  headline?: ContentElement;
  stats?: ContentElement;
  text?: ContentElement;
}

export interface PathwayAssetProps extends StandaloneAssetProps {
  dateSign?: ElementVisual;
  isImagePositionLeft?: boolean;
  isImageScaled?: boolean;
}

export interface PathwayBaseProps
  extends PathwayTextLockupProps,
    PathwayAssetProps {}

export interface PathwayHighlightProps extends PathwayTextLockupProps {
  attribution?: ContentElement;
  quote?: ContentElement;
}

export interface PathwayOverlayProps
  extends PathwayBaseProps,
    Pick<AnimationProps, 'includesAnimation'> {}

export interface PathwayStandardProps
  extends PathwayBaseProps,
    Pick<AnimationProps, 'includesAnimation'> {}

export interface PathwayStickyProps extends PathwayBaseProps {}
