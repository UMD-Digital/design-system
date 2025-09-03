import createMain, { type MainSectionProps } from './elements/main-section';
import createUtility, {
  UtilityContainerStyles,
  type UtilityProps,
} from './elements/utility-section';
import { VARIABLES } from './globals';
import { BaseProps } from './_types';

export interface FooterProps
  extends BaseProps,
    UtilityProps,
    MainSectionProps {}

const { ELEMENT_NAME, ATTRIBUTE_THEME, ATTRIBUTE_TYPE } = VARIABLES;

let styles = `
  .umd-footer-element-wrapper {
    container: ${ELEMENT_NAME} / inline-size;
    overflow: hidden;
  }

  ${UtilityContainerStyles}
`;

export default (props: FooterProps) => {
  const {
    isThemeLight,
    isTypeSimple,
    isTypeVisual,
    isTypeMega,
    slotUtilityLinks,
  } = props;

  const wrapper = document.createElement('div');
  const main = createMain(props);
  const utility = createUtility({ slotUtilityLinks });
  const theme = isThemeLight ? 'light' : 'dark';

  wrapper.setAttribute(ATTRIBUTE_THEME, theme);
  if (isTypeSimple) wrapper.setAttribute(ATTRIBUTE_TYPE, 'simple');
  if (isTypeVisual) wrapper.setAttribute(ATTRIBUTE_TYPE, 'visual');
  if (isTypeMega) wrapper.setAttribute(ATTRIBUTE_TYPE, 'mega');

  wrapper.classList.add('umd-footer-element-wrapper');

  wrapper.appendChild(main.element);
  wrapper.appendChild(utility);

  return { element: wrapper, styles };
};
