import * as Utility from 'utilities';
import { createFontStyleElement } from './_base';
import { type ElementProps } from '../_types';

type FontStyleFunction = (
  props: ElementProps,
) => ReturnType<typeof createFontStyleElement>;
type FontGetter = typeof Utility.styles.fonts.getSansLargeFont;

const createFontStyle = (getFontStyle: FontGetter): FontStyleFunction => {
  return (props: ElementProps) =>
    createFontStyleElement(
      {
        ...props,
        isColorBlack: !props.isThemeDark,
        isColorWhite: props.isThemeDark,
      },
      getFontStyle,
    );
};

export const sansLarge = createFontStyle(Utility.styles.fonts.getSansLargeFont);

export const sansMedium = createFontStyle(
  Utility.styles.fonts.getSansMediumFont,
);

export const campaignLarge = createFontStyle(
  Utility.styles.fonts.getCampaignLargeFont,
);
