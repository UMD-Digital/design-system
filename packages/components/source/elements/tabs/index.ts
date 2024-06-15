import { Tokens, Typography } from '@universityofmaryland/variables';
import { Performance, Styles } from 'utilities';

type TypeTabsProps = { tabs: HTMLElement[]; theme?: string };

const { Debounce } = Performance;

const SMALL = 480;

const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
const ANIMATION_TIME = 500;

const ELEMENT_NAME = 'umd-element-tabs';
const ELEMENT_DECLARATION = 'tabs-declaration';
const ELEMENT_CONTAINER = 'tabs-container';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}='${THEME_DARK}']`;

const STYLES_TABS_ELEMENT = `
  .${ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

`;

const CreateTabsElement = (props: TypeTabsProps) =>
  (() => {
    const { theme, tabs } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('div');

    const EventResize = () => {};

    container.classList.add(ELEMENT_CONTAINER);
    if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

    declaration.classList.add(ELEMENT_DECLARATION);
    declaration.appendChild(container);

    window.addEventListener('resize', Debounce(EventResize, 20));

    return {
      element: declaration,
      events: {
        resize: EventResize,
      },
    };
  })();

export default {
  CreateElement: CreateTabsElement,
  Styles: STYLES_TABS_ELEMENT,
};
