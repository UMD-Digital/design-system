import { Tokens, Typography } from '@universityofmaryland/variables';
import { Performance, Styles } from 'utilities';

type TypeTabsProps = { tabs: HTMLElement[]; theme?: string };

const { Spacing, Colors } = Tokens;
const { Debounce } = Performance;
const { SansLarge } = Typography;
const { ConvertJSSObjectToStyles } = Styles;

const ATTRIBUTE_BUTTON_TITLE = 'data-title';
const ATTRIBUTE_INDEX = 'data-index';
const ATTRIBUTE_ACTIVE = 'data-active';
const ATTRIBUTE_LAYOUT_HORIZONTAL = 'data-layout-horizontal';
const ATTRIBUTE_ARIA_EXPANDED = 'aria-expanded';
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';
const ANIMATION_TIME = 500;

const ELEMENT_NAME = 'umd-element-tabs';
const ELEMENT_DECLARATION = 'tabs-declaration';
const ELEMENT_CONTAINER = 'tabs-container';
const ELEMENT_WRAPPER = 'tabs-container-wrapper';
const ELEMENT_CONTENT_STRIP = 'tabs-container-content-strip';
const ELEMENT_BUTTON_WRAPPER = 'tab-button-wrapper';
const ELEMENT_BUTTON = `.${ELEMENT_BUTTON_WRAPPER} > button`;
const ELEMENT_CONTENT = 'tab-content';
const ELEMENT_CONTENT_WRAPPER = 'tab-content-wrapper';

const IS_THEME_DARK = `[${ATTRIBUTE_THEME}='${THEME_DARK}']`;
const IS_ACTIVE = `[${ATTRIBUTE_ACTIVE}]`;
const IS_LAYOUT_HORIZONTAL = `[${ATTRIBUTE_LAYOUT_HORIZONTAL}]`;
const IS_EXPANDED = `[${ATTRIBUTE_ARIA_EXPANDED}='true']`;

const OVERWRITE_ACTION_BUTTON = `${ELEMENT_BUTTON}${IS_EXPANDED}`;

const OVERWRITE_VERTICAL_LAYOUT_CONTAINER = `.${ELEMENT_CONTAINER}${IS_LAYOUT_HORIZONTAL}`;
const OVERWRITE_VERTICAL_LAYOUT_BUTTON = `${OVERWRITE_VERTICAL_LAYOUT_CONTAINER} ${ELEMENT_BUTTON}`;
const OVERWRITE_VERTICAL_LAYOUT_ACTIVE_BUTTON = `${OVERWRITE_VERTICAL_LAYOUT_CONTAINER} ${OVERWRITE_ACTION_BUTTON}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CONTAINER}${IS_THEME_DARK}`;

// prettier-ignore
const OverwriteDarkTheme = `
  ${OVERWRITE_THEME_DARK_CONTAINER} * {
    color: ${Colors.white};
  }
`;

// prettier-ignore
const ContentStyles = `
  .${ELEMENT_CONTENT} {
    display: none;
  }

  .${ELEMENT_CONTENT_WRAPPER} {

  }
`;

// prettier-ignore
const ButtonStyles = `
  .${ELEMENT_BUTTON_WRAPPER} {

  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${ELEMENT_BUTTON}`]: SansLarge,
    },
  })}

  ${ELEMENT_BUTTON} {
    position: relative;
    text-align: left;
    display: inline-block;
    border-left: 2px solid transparent;
    padding: ${Spacing.sm} 0 ${Spacing.sm} ${Spacing.xl};
    transition: border-left-color 0.5s, color 0.5s;
  }

  ${ELEMENT_BUTTON}:before {
    content: '';
    background-color: ${Colors.gray.light};
    position: absolute;
    z-index: -1;
    height: 100%;
    left: -2px;
    top: 0;
    width: 2px;
  }

  ${OVERWRITE_ACTION_BUTTON} {
    border-left-color: ${Colors.red};
  }

  ${OVERWRITE_VERTICAL_LAYOUT_BUTTON} {
    border-left: none;
    border-bottom: 2px solid transparent;
    padding: ${Spacing.md};
  }

  ${OVERWRITE_VERTICAL_LAYOUT_BUTTON}:before {
    height: 2px;
    bottom: -2px;
    left: 0;
    top: inherit;
    width: 100%;
  }

  ${OVERWRITE_VERTICAL_LAYOUT_ACTIVE_BUTTON} {
    border-bottom-color: ${Colors.red};
  }
`;

// prettier-ignore
const ContainerStyles = `
  .${ELEMENT_CONTAINER} {
   
  }

  ${OVERWRITE_VERTICAL_LAYOUT_CONTAINER} {
    display: flex;
  }
`;

// prettier-ignore
const STYLES_TABS_ELEMENT = `
  .${ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
  }

  ${ContainerStyles}
  ${ButtonStyles}
  ${ContentStyles}
  ${OverwriteDarkTheme}
`;

const CreateDomStrcuture = ({
  tabs,
  SetActiveTab,
}: {
  tabs: HTMLElement[];
  SetActiveTab: (index: number) => void;
}) =>
  tabs
    .map((tab, index) => {
      const title = tab.getAttribute(ATTRIBUTE_BUTTON_TITLE);
      const content = tab.innerHTML;

      if (!title || !content) return;

      const tabButtonWrapper = document.createElement('div');
      const tabButton = document.createElement('button');
      const tabContent = document.createElement('div');
      const tabContentWrapper = document.createElement('div');

      tabButton.setAttribute(ATTRIBUTE_INDEX, index.toString());
      tabButton.setAttribute(ATTRIBUTE_ARIA_EXPANDED, 'false');
      tabButton.innerHTML = title;
      tabButton.addEventListener('click', () => SetActiveTab(index));
      tabButtonWrapper.classList.add(ELEMENT_BUTTON_WRAPPER);
      tabButtonWrapper.appendChild(tabButton);

      tabContentWrapper.innerHTML = content;
      tabContentWrapper.classList.add(ELEMENT_CONTENT_WRAPPER);
      tabContent.classList.add(ELEMENT_CONTENT);
      tabContent.setAttribute(ATTRIBUTE_INDEX, index.toString());
      tabContent.appendChild(tabContentWrapper);

      return { buttonWrapper: tabButtonWrapper, content: tabContent };
    })
    .filter((tab) => tab);

const CreateTabsElement = (props: TypeTabsProps) =>
  (() => {
    const { theme, tabs } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const wrapper = document.createElement('div');
    const contentStrip = document.createElement('div');
    let buttons: HTMLButtonElement[] = [];
    let contents = [];
    let activeTab = 0;

    const SetActiveContent = () => {
      const activeContent = tabs[activeTab];
    };

    const SetActiveButton = () =>
      buttons.map((button, index) => {
        if (index === activeTab) {
          button.setAttribute(ATTRIBUTE_ARIA_EXPANDED, 'true');
        } else {
          button.setAttribute(ATTRIBUTE_ARIA_EXPANDED, 'false');
        }
      });

    const SetActiveTab = (index: number) => {
      activeTab = index;
      SetActiveContent();
      SetActiveButton();
    };

    const SetDisplay = () => {
      const buttonWidths = buttons.reduce((acc, button) => {
        return acc + button.offsetWidth;
      }, 50);

      if (buttonWidths < container.offsetWidth) {
        container.setAttribute(ATTRIBUTE_LAYOUT_HORIZONTAL, '');
      } else {
        container.removeAttribute(ATTRIBUTE_LAYOUT_HORIZONTAL);
      }
    };

    const EventResize = () => {
      SetDisplay();
    };
    const EventLoad = () => {
      SetDisplay();
      SetActiveContent();
      SetActiveButton();
    };

    wrapper.classList.add(ELEMENT_WRAPPER);
    CreateDomStrcuture({ tabs, SetActiveTab }).forEach((element) => {
      if (!element) return;
      const { buttonWrapper, content } = element;
      const button = buttonWrapper.querySelector('button') as HTMLButtonElement;
      container.appendChild(buttonWrapper);
      buttons.push(button);
      wrapper.appendChild(content);
    });

    contentStrip.classList.add(ELEMENT_CONTENT_STRIP);

    container.appendChild(wrapper);
    container.appendChild(contentStrip);
    container.classList.add(ELEMENT_CONTAINER);
    if (theme) container.setAttribute(ATTRIBUTE_THEME, theme);

    declaration.classList.add(ELEMENT_DECLARATION);
    declaration.appendChild(container);

    window.addEventListener('resize', Debounce(EventResize, 20));
    EventLoad();

    return {
      element: declaration,
      events: {
        resize: EventResize,
        load: EventLoad,
      },
    };
  })();

export default {
  CreateElement: CreateTabsElement,
  Styles: STYLES_TABS_ELEMENT,
};
