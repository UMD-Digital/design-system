import * as Styles from '@universityofmaryland/web-styles-library';
import { createStyledElement } from '../modifiers';
import { type ElementProps } from '../modifiers/_types';

interface styleObject {
  className: string | string[];
  [key: string]: any;
}

const createElement = (stylesObj: styleObject, isTypeHeadline = true) => {
  return (props: ElementProps) => {
    if (isTypeHeadline) {
      return createStyledElement.animationLine(props, stylesObj);
    }

    return createStyledElement.childLink(props, stylesObj);
  };
};

// Sans Fonts

export const sansExtraLarge = createElement(
  Styles.typography.sans.fonts.extraLarge,
);

export const sansLarger = createElement(Styles.typography.sans.fonts.larger);

export const sansLarge = createElement(Styles.typography.sans.fonts.large);

export const sansMedium = createElement(Styles.typography.sans.fonts.medium);

export const sansSmall = createElement(
  Styles.typography.sans.fonts.small,
  true,
);

export const sansMin = createElement(Styles.typography.sans.fonts.min, true);

// Sans Scaling Fonts

export const sansScalingLarge = createElement(
  Styles.typography.sans.scalingFonts.larger,
);

export const sansScalingMin = createElement(
  Styles.typography.sans.scalingFonts.min,
);

// Campaign Fonts

export const campaignLarge = createElement(
  Styles.typography.campaign.fonts.large,
);
