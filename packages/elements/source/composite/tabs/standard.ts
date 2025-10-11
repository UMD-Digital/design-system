import * as token from '@universityofmaryland/web-styles-library/token';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { scrollTo } from '@universityofmaryland/web-utilities-library/animation';
import { debounce } from '@universityofmaryland/web-utilities-library/performance';
import { convertPixelStringToNumber } from '@universityofmaryland/web-utilities-library/string';

type TypeTabsProps = {
  tabsContainer: HTMLElement;
  isThemeDark?: boolean;
  shadowContent?: HTMLSlotElement;
  topPosition?: string | null;
};

type TypeGetElements = {
  getContainer: () => HTMLElement;
  getTabsContainer: () => HTMLElement;
  getDisplayLineStrip: () => HTMLElement;
  getDisplayLine: () => HTMLElement;
  getContentStrip: () => HTMLElement;
  getButtons: () => HTMLElement[];
  getContents: () => HTMLElement[];
};

type TypeGetState = {
  getActiveTab: () => number;
  getIsFlexLayout: () => boolean;
  getButtonWidths: () => number;
  getButtonHeights: () => number;
  getIsThemeDark: boolean;
};

const ATTRIBUTE_LAYOUT_HORIZONTAL = 'data-layout-horizontal';
const ATTRIBUTE_ARIA_EXPANDED = 'aria-expanded';
const ATTRIBUTE_THEME = 'theme';
const THEME_DARK = 'dark';

const ELEMENT_NAME = 'umd-element-tabs';
const ELEMENT_DECLARATION = 'tabs-declaration';
const ELEMENT_CONTAINER = 'tabs-container';
const ELEMENT_CONTENT_STRIP = 'tabs-content-strip';
const ELEMENT_ACTIVE_LINE_STRIP = 'tab-active-line-strip';
const ELEMENT_ACTIVE_LINE = 'tab-active-line';

const IS_LAYOUT_HORIZONTAL = `[${ATTRIBUTE_LAYOUT_HORIZONTAL}]`;
const IS_THEME_DARK = `[${ATTRIBUTE_THEME}="${THEME_DARK}"]`;

const OVERWRITE_VERTICAL_LAYOUT_CONTAINER = `.${ELEMENT_CONTAINER}${IS_LAYOUT_HORIZONTAL}`;
const OVERWRITE_VERTICAL_LAYOUT_LINE = `${OVERWRITE_VERTICAL_LAYOUT_CONTAINER} .${ELEMENT_ACTIVE_LINE_STRIP}`;

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_LINE = `${OVERWRITE_THEME_DARK_CONTAINER} .${ELEMENT_ACTIVE_LINE_STRIP}`;

// prettier-ignore
const OverwriteThemeStyles = `
  ${OVERWRITE_THEME_DARK_LINE} {
    background-color: ${token.color.gray.dark};
  }
`;

// prettier-ignore
const DisplayLineStyles = `
  .${ELEMENT_ACTIVE_LINE_STRIP} {
    position: absolute;
    height: 100%;
    top: 0;
    left: -2px;
    width: 2px;
    background-color: ${token.color.gray.light};
    z-index: -1;
  }

  ${OVERWRITE_VERTICAL_LAYOUT_LINE} {
    height: 2px;
    left: 0;
    top: inherit;
  }

  .${ELEMENT_ACTIVE_LINE} {
    position: absolute;
    width: 0;
    height: 0;
    display: block;
    background-color: ${token.color.red};
    transform: translate(0);
  }
`;

// prettier-ignore
const STYLES_TABS_ELEMENT = `
  .${ELEMENT_DECLARATION} {
    container: ${ELEMENT_NAME} / inline-size;
    position: relative;
  }

  ${DisplayLineStyles}
  ${OverwriteThemeStyles}
`;

const SetDisplay = ({
  GetElements,
  GetState,
  transition = true,
  additionalSpread,
}: {
  GetElements: TypeGetElements;
  GetState: TypeGetState;
  transition?: boolean;
  additionalSpread?: number | null;
}) => {
  const {
    getContainer,
    getTabsContainer,
    getDisplayLineStrip,
    getDisplayLine,
    getContentStrip,
    getButtons,
    getContents,
  } = GetElements;
  const {
    getActiveTab,
    getIsFlexLayout,
    getButtonWidths,
    getButtonHeights,
    getIsThemeDark,
  } = GetState;

  const container = getContainer();
  const tabsContainer = getTabsContainer();
  const displayLineStrip = getDisplayLineStrip();
  const displayLine = getDisplayLine();
  const strip = getContentStrip();
  const buttons = getButtons();
  const contents = getContents();
  const isFlexLayout = getIsFlexLayout();
  const activeTab = getActiveTab();
  const buttonWidths = getButtonWidths();
  const buttonHeights = getButtonHeights();

  const SetActiveContent = () =>
    contents.map((content, index) => {
      if (!content) return;

      if (index === activeTab) {
        content.style.display = 'block';
      } else {
        content.style.display = 'none';
      }
    });

  const SetActiveButton = () =>
    buttons.map((button, index) => {
      if (index === activeTab) {
        button.setAttribute(ATTRIBUTE_ARIA_EXPANDED, 'true');
        if (getIsThemeDark) button.style.color = `${token.color.white}`;
      } else {
        button.setAttribute(ATTRIBUTE_ARIA_EXPANDED, 'false');
        if (getIsThemeDark) button.style.color = `${token.color.gray.light}`;
      }
    });

  const SetContentPosition = () => {
    const activeContent = contents[activeTab];
    const space = isFlexLayout
      ? convertPixelStringToNumber(token.spacing.xl)
      : convertPixelStringToNumber(token.spacing.md);

    if (activeContent) {
      if (transition) {
        strip.style.transition = 'height 0.5s';
      } else {
        strip.style.transition = 'none';
      }

      strip.style.height = `${activeContent.offsetHeight + space}px`;
      activeContent.style.top = `${tabsContainer.offsetHeight + space}px`;
      activeContent.style.width = '100%';

      if (!isFlexLayout && transition) {
        const convertedSpace = convertPixelStringToNumber(token.spacing.md);
        const spread = additionalSpread
          ? convertedSpace + additionalSpread
          : convertedSpace;

        scrollTo({
          element: activeContent,
          spread,
        });
      }
    }
  };

  const SetContainerStyles = () => {
    if (isFlexLayout) {
      container.setAttribute(ATTRIBUTE_LAYOUT_HORIZONTAL, '');
    } else {
      container.removeAttribute(ATTRIBUTE_LAYOUT_HORIZONTAL);
    }
  };

  const StyleWrapperStyles = () => {
    if (isFlexLayout) {
      tabsContainer.style.display = 'flex';
    } else {
      tabsContainer.style.display = 'block';
    }
  };

  const SetLineStyles = () => {
    const activeButton = buttons[activeTab];

    if (transition) {
      displayLine.style.transition =
        'width 0.5s ease-in-out, height 0.5s ease-in-out, transform 0.5s ease-in-out';
    } else {
      displayLine.style.transition = 'none';
    }

    if (isFlexLayout) {
      let offset = 0;

      if (activeTab > 0) {
        for (let i = 0; i < activeTab; i++) {
          offset += buttons[i].offsetWidth;
        }
      }

      displayLineStrip.style.width = `${buttonWidths}px`;
      displayLineStrip.style.height = `2px`;
      displayLine.style.top = `inherit`;
      displayLine.style.left = `0`;
      displayLine.style.width = `${activeButton.offsetWidth}px`;
      displayLine.style.height = `2px`;
      displayLine.style.transform = `translate(${offset}px, 0)`;
    } else {
      let offset = 0;

      if (activeTab > 0) {
        for (let i = 0; i < activeTab; i++) {
          offset += buttons[i].offsetHeight;
        }
      }

      displayLineStrip.style.width = `2px`;
      displayLineStrip.style.height = `${buttonHeights}px`;
      displayLine.style.top = `0`;
      displayLine.style.left = `-2px`;
      displayLine.style.width = `2px`;
      displayLine.style.height = `${activeButton.offsetHeight}px`;
      displayLine.style.transform = `translate(0, ${offset}px)`;
    }
  };

  SetActiveContent();
  SetActiveButton();
  SetContainerStyles();
  StyleWrapperStyles();
  SetLineStyles();
  SetContentPosition();
};

export default (props: TypeTabsProps) =>
  (() => {
    const { isThemeDark, tabsContainer, shadowContent, topPosition } = props;
    const declaration = document.createElement('div');
    const container = document.createElement('div');
    const contentStrip = document.createElement('div');
    const displayLineStrip = document.createElement('div');
    const displayLine = document.createElement('span');
    const children = Array.from(tabsContainer.children);
    const buttons = Array.from(tabsContainer.querySelectorAll('button'));
    const additionalSpread = topPosition ? parseInt(topPosition) : null;
    const contents = children.filter((child) =>
      buttons.find(
        (button) =>
          button.getAttribute('aria-controls') === child.getAttribute('id'),
      ),
    ) as HTMLElement[];
    const GetElements = {
      getContainer: () => container,
      getTabsContainer: () => tabsContainer,
      getDisplayLineStrip: () => displayLineStrip,
      getDisplayLine: () => displayLine,
      getContentStrip: () => contentStrip,
      getButtons: () => buttons,
      getContents: () => contents,
    };
    const GetState = {
      getActiveTab: () => activeTab,
      getIsFlexLayout: () => isFlexLayout,
      getButtonWidths: () => buttonWidths,
      getButtonHeights: () => buttonHeights,
      getIsThemeDark: isThemeDark || false,
    };
    const GetContext = { GetElements, GetState };
    const SetActiveTab = (index: number) => {
      activeTab = index;
      SetDisplay({ ...GetContext, additionalSpread });
    };
    const SetDisplayLayout = () => {
      buttonWidths = buttons.reduce(
        (acc, button) => acc + button.offsetWidth,
        0,
      );

      buttonHeights = buttons.reduce(
        (acc, button) => acc + button.offsetHeight,
        0,
      );

      isFlexLayout = buttonWidths < container.offsetWidth;
    };
    const SetLoadStyles = () => {
      buttons.forEach((button, index) => {
        button.addEventListener('click', () => SetActiveTab(index));
        button.style.position = 'relative';
        button.style.textAlign = 'left';
        button.style.display = 'inline-block';
        button.style.padding = `${token.spacing.sm} ${token.spacing.md}`;
        button.style.border = 'none';
        button.style.background = 'transparent';

        Object.keys(typography.sans.large).forEach((key) => {
          const keyRef = key as keyof typeof typography.sans.large;
          (button.style as any)[keyRef] = typography.sans.large[keyRef];
        });

        if (isThemeDark) {
          button.style.color = token.color.white;
        }
      });

      contents.forEach((content) => {
        if (!content) return;
        content.style.display = 'none';
        content.style.position = 'absolute';
        content.style.top = '0';
        content.style.left = '0';
      });
    };
    let activeTab = 0;
    let isFlexLayout = false;
    let buttonWidths = 0;
    let buttonHeights = 0;

    const EventResize = () => {
      SetDisplayLayout();
      SetDisplay({ ...GetContext, transition: false });
    };
    const EventLoad = () => {
      SetLoadStyles();
      SetDisplay({ ...GetContext, transition: false });
      SetDisplayLayout();
      SetDisplay({ ...GetContext, transition: false });
    };

    contentStrip.classList.add(ELEMENT_CONTENT_STRIP);

    if (shadowContent) {
      container.appendChild(shadowContent);
    } else {
      container.appendChild(tabsContainer);
    }

    displayLineStrip.classList.add(ELEMENT_ACTIVE_LINE_STRIP);
    container.appendChild(displayLineStrip);
    displayLine.classList.add(ELEMENT_ACTIVE_LINE);
    container.appendChild(displayLine);

    container.appendChild(contentStrip);
    container.classList.add(ELEMENT_CONTAINER);
    if (isThemeDark) container.setAttribute(ATTRIBUTE_THEME, THEME_DARK);

    declaration.classList.add(ELEMENT_DECLARATION);
    declaration.appendChild(container);

    window.addEventListener('resize', debounce(EventResize, 10));

    return {
      element: declaration,
      styles: STYLES_TABS_ELEMENT,
      events: {
        resize: EventResize,
        load: EventLoad,
      },
    };
  })();
