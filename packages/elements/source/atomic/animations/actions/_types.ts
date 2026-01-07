import { type ThemeProps } from '_types';

export interface AnimationIndicatorProps
  extends Pick<ThemeProps, 'isThemeDark'> {
  count: number;
  overlayColor?: string;
  callback: (index: number) => void;
}
