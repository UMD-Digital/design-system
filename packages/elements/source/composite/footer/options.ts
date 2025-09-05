import { ElementModel } from 'model';
import createMain, { type MainSectionProps } from './elements/main-section';
import createUtility, { type UtilityProps } from './elements/utility-section';
import { VARIABLES, REFERENCES, BREAKPOINTS } from './globals';
import { BaseProps } from './_types';
import { token, layout } from '@universityofmaryland/web-styles-library';

// import { UtilityContainerStyles } from './elements/utility-section'; // no longer imported

export interface FooterProps
  extends BaseProps,
    UtilityProps,
    MainSectionProps {}

const { MEDIUM, LARGE } = BREAKPOINTS;
const { ELEMENT_NAME, ATTRIBUTE_THEME, ATTRIBUTE_TYPE } = VARIABLES;
const { IS_THEME_LIGHT, IS_VERSION_SIMPLE } = REFERENCES;

// let styles = `
//   .umd-footer-element-wrapper {
//     container: ${ELEMENT_NAME} / inline-size;
//     overflow: hidden;
//   }
//
//   ${UtilityContainerStyles}
// `; // old styles now inlined

export default (props: FooterProps) => {
  const {
    isThemeLight,
    isTypeSimple,
    isTypeVisual,
    isTypeMega,
    slotUtilityLinks,
  } = props;

  const main = createMain(props);
  const utility = createUtility({ slotUtilityLinks });
  const theme = isThemeLight ? 'light' : 'dark';

  const wrapper = ElementModel.createDiv({
    className: 'umd-footer-element-wrapper',
    children: [main, utility],
    elementStyles: {
      element: {
        container: `${ELEMENT_NAME} / inline-size`,
        overflow: 'hidden',

        ['& p, & a, & span']: {
          color: token.color.white,
        },

        // Theme overwrite
        [`.umd-footer-element-wrapper${IS_THEME_LIGHT} &`]: {
          backgroundColor: token.color.gray.lightest,
        },

        [`@container ${ELEMENT_NAME} (max-width: ${LARGE - 1}px)`]: {
          [`.umd-footer-element-wrapper${IS_VERSION_SIMPLE} .umd-footer-logo-container .umd-footer-call-to-action-container`]:
            {
              display: 'none',
            },
        },
      },
    },
  });

  wrapper.element.setAttribute(ATTRIBUTE_THEME, theme);
  if (isTypeSimple) wrapper.element.setAttribute(ATTRIBUTE_TYPE, 'simple');
  if (isTypeVisual) wrapper.element.setAttribute(ATTRIBUTE_TYPE, 'visual');
  if (isTypeMega) wrapper.element.setAttribute(ATTRIBUTE_TYPE, 'mega');

  return {
    element: wrapper.element,
    styles: wrapper.styles,
  };
};
