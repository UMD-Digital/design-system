declare global {
  interface Window {
    UMDBreadcrumbElement: typeof UMDBreadcrumbElement;
  }
}

import { Tokens, Animations } from '@universityofmaryland/variables';
import { MarkupCreate, MarkupModify, Styles, WebComponents } from 'utilities';

const { Colors } = Tokens;
const { ConvertJSSObjectToStyles } = Styles;
const { Node, SlotWithDefaultStyling } = MarkupCreate;
const { AttributesNames, AttributesValues, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-breadcrumb';

const IS_THEME_DARK = `[${AttributesNames.THEME}=${AttributesValues.THEME_DARK}]`;

const ELEMENT_CONTAINER = 'breadcrumb-container';
const ELEMENT_PATH = 'breadcrumb-path';

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_PATH = `${OVERWRITE_THEME_DARK_CONTAINER} .${ELEMENT_PATH}`;

const OverwriteThemeStyles = `
  ${OVERWRITE_THEME_DARK_CONTAINER} * {
    color: ${Colors.white};
  }

  ${OVERWRITE_THEME_DARK_PATH} + *::before {
    background-color: ${Colors.gray.dark};
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_THEME_DARK_PATH}:not(:last-child)`]:
        Animations.Link.LineSlideUnder.grayDark,
    },
  })}
`;

const PathStyles = `
  .${ELEMENT_PATH}::-webkit-scrollbar { 
    display: none;
  }

  .${ELEMENT_PATH}:last-child {
    color: ${Colors.black};
  }

  .${ELEMENT_PATH}:not(:last-child) {
    margin-right: 14px;
  }

  .${ELEMENT_PATH} + *::before {
    content: '';
    display: inline-block;
    height: 14px;
    background-color: ${Colors.gray.dark};
    left: -8px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(15deg);
    width: 1px;
  }
`;

const ContainerStyles = `
  .${ELEMENT_CONTAINER} {
    display: flex;
    padding-right: 24px;
    font-size: 12px;
    padding-bottom: 1px;
    overflow-x: auto;
    scrollbar-width: none;
    white-space: nowrap;
    mask-image: linear-gradient(90deg, ${
      Colors.white
    } calc(100% - 24px), transparent);
  }

  .${ELEMENT_CONTAINER} * {
    color: ${Colors.gray.mediumAA};
    position: relative;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_CONTAINER} a:not(:last-child)`]:
        Animations.Link.LineSlideUnder.gray,
    },
  })}
`;

const styles = `
  ${Styles.ResetString}

  :host {
    display: block;
  }

  ${ContainerStyles}
  ${PathStyles}
  ${OverwriteThemeStyles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const CreatePaths = ({ element }: { element: UMDBreadcrumbElement }) => {
  const theme =
    element.getAttribute(AttributesNames.THEME) || AttributesValues.THEME_LIGHT;
  const pathsSlot = SlotWithDefaultStyling({
    element,
    slotRef: Slots.PATHS,
  });

  if (pathsSlot) {
    const links = pathsSlot.querySelectorAll('a') as NodeListOf<HTMLElement>;

    pathsSlot.setAttribute(AttributesNames.THEME, theme);
    pathsSlot.classList.add(ELEMENT_CONTAINER);

    for (const linkElement of links) {
      linkElement.classList.add(ELEMENT_PATH);
      MarkupModify.AnimationLinkSpan({
        element: linkElement,
      });
    }

    return pathsSlot;
  }

  return null;
};

export const CreateShadowDom = ({
  element,
}: {
  element: UMDBreadcrumbElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const breadcrumbPaths = CreatePaths({ element: element });

  if (!breadcrumbPaths) {
    throw new Error('Paths slot not found.');
  }

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(breadcrumbPaths);
};

class UMDBreadcrumbElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    CreateShadowDom({ element: this });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDBreadcrumbElement = UMDBreadcrumbElement;
    window.customElements.define(ELEMENT_NAME, UMDBreadcrumbElement);
  }
};

export default {
  Load,
};
