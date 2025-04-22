import createMain, {
  MainContainerStyles,
  type MainSectionProps,
} from './elements/main-section';
import createUtility, {
  UtilityContainerStyles,
  type UtilityProps,
} from './elements/utility-section';
import { ELEMENTS, VARIABLES } from './globals';
import { BaseProps } from './_types';

export interface FooterProps
  extends BaseProps,
    UtilityProps,
    MainSectionProps {}

const { ELEMENT_WRAPPER } = ELEMENTS;
const { ELEMENT_NAME, ATTRIBUTE_THEME, ATTRIBUTE_TYPE } = VARIABLES;

let styles = `
  .${ELEMENT_WRAPPER} {
    container: ${ELEMENT_NAME} / inline-size;
    overflow: hidden;
  }
    
  ${MainContainerStyles}
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

  wrapper.classList.add(ELEMENT_WRAPPER);

  wrapper.appendChild(main);
  wrapper.appendChild(utility);

  return { element: wrapper, styles };
};
