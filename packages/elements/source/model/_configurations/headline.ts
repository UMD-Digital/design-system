import * as Utility from 'utilities';
import { createHeadlineElement, createTextElement } from './constructor';
import { type ElementProps } from '../_types';

type FontStyleFunction = (
  props: ElementProps,
) => ReturnType<typeof createHeadlineElement>;
type FontGetter = typeof Utility.styles.fonts.getSansLargeFont;

const createElement = (
  getFontStyle: FontGetter,
  isTypeHeadline = true,
): FontStyleFunction => {
  return (props: ElementProps) => {
    const fontProps = {
      ...props,
      isColorBlack: !props.isThemeDark,
      isColorWhite: props.isThemeDark,
    };

    if (isTypeHeadline) {
      return createTextElement(
        {
          ...fontProps,
        },
        getFontStyle,
      );
    }

    return createHeadlineElement(
      {
        ...fontProps,
      },
      getFontStyle,
    );
  };
};

export const sansLarge = createElement(Utility.styles.fonts.getSansLargeFont);

export const sansMedium = createElement(Utility.styles.fonts.getSansMediumFont);

export const sansMin = createElement(Utility.styles.fonts.getSansMinFont, true);

export const campaignLarge = createElement(
  Utility.styles.fonts.getCampaignLargeFont,
);
