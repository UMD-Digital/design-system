import * as token from '@universityofmaryland/web-token-library';
import * as animation from '@universityofmaryland/web-styles-library/animation';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
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

  return new ElementBuilder()
    .withClassName('umd-footer-element-wrapper')
    .withStyles({
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
    })
    .withChildren(main, utility)
    .build();
};
