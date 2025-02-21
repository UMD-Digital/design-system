import * as Styles from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import { createHeadlineElement, createTextElement } from './constructor';
import { type ElementProps } from '../_types';

interface styleObject {
  className: string | string[];
  [key: string]: any;
}

const createElement = (stylesObj: styleObject, isTypeHeadline = true) => {
  return (props: ElementProps) => {
    const fontProps = {
      ...props,
      isColorBlack: !props.isThemeDark,
      isColorWhite: props.isThemeDark,
    };

    if (isTypeHeadline) {
      return createHeadlineElement(fontProps, stylesObj);
    }

    return createTextElement(fontProps, stylesObj);
  };
};

// export const sansScalingLarge = createElement(
//   Styles.typography.sans.scalingFonts.larger,
// );

export const sansLarger = createElement(Styles.typography.sans.fonts.larger);

export const sansLarge = createElement(Styles.typography.sans.fonts.large);

export const sansMedium = createElement(Styles.typography.sans.fonts.medium);

export const sansMin = createElement(Styles.typography.sans.fonts.medium, true);

export const campaignLarge = createElement(
  Styles.typography.campaign.fonts.large,
);
