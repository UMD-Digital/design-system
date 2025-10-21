import * as token from '@universityofmaryland/web-styles-library/token';
import * as animation from '@universityofmaryland/web-styles-library/animation';
import ElementBuilder from '@universityofmaryland/web-builder-library';
import createMain, { type MainSectionProps } from './elements/main-section';
import createUtility, { type UtilityProps } from './elements/utility-section';
import { BaseProps } from './_types';

export interface FooterProps
  extends BaseProps,
    UtilityProps,
    MainSectionProps {}

export default (props: FooterProps) => {
  const { isThemeLight } = props;

  const main = createMain(props);
  const utility = createUtility(props);

  const wrapper = ElementBuilder.create.div({
    className: 'umd-footer-element-wrapper',
    children: [main, utility],
    elementStyles: {
      element: {
        containerType: 'inline-size',
        overflow: 'hidden',

        ...(isThemeLight && {
          backgroundColor: token.color.gray.lightest,

          ['& a']: {
            ...animation.line.slideUnderBlack,

            ['&:not(:first-child)::before']: {
              backgroundColor: token.color.black,
            },
          },
        }),

        ['& p, & a, & span']: {
          color: token.color.white,

          ...(isThemeLight && {
            color: token.color.gray.dark,
          }),
        },
      },
    },
  });

  return {
    element: wrapper.element,
    styles: wrapper.styles,
  };
};
