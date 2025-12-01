import * as token from '@universityofmaryland/web-token-library';
import * as animation from '@universityofmaryland/web-styles-library/animation';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { FooterProps } from './_types';
import { ElementModel } from '_types';

export default (props: FooterProps, childElements: Array<ElementModel>) => {
  const { isThemeLight } = props;

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
    .withChildren(...childElements)
    .build();
};
