declare global {
  interface Window {
    UMDBreadcrumbElement: typeof UMDBreadcrumbElement;
  }
}

import { animation, token } from '@universityofmaryland/web-styles-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';

const { convertJSSObjectToStyles } = Styles;
const { Node, SlotWithDefaultStyling } = Markup.create;

const ELEMENT_NAME = 'umd-element-breadcrumb';

const IS_THEME_DARK = `[${Attributes.names.theme}=${Attributes.values.theme.DARK}]`;

const ELEMENT_CONTAINER = 'breadcrumb-container';
const ELEMENT_PATH = 'breadcrumb-path';

const OVERWRITE_THEME_DARK_CONTAINER = `.${ELEMENT_CONTAINER}${IS_THEME_DARK}`;
const OVERWRITE_THEME_DARK_PATH = `${OVERWRITE_THEME_DARK_CONTAINER} .${ELEMENT_PATH}`;

const OverwriteThemeStyles = `
  ${OVERWRITE_THEME_DARK_CONTAINER} * {
    color: ${token.color.white};
  }

  ${OVERWRITE_THEME_DARK_PATH} + *::before {
    background-color: ${token.color.gray.dark};
  }
  
  ${convertJSSObjectToStyles({
    styleObj: {
      [`${OVERWRITE_THEME_DARK_PATH}:not(:last-child)`]:
        animation.line.slideUnderGrayDarkRed,
    },
  })}
`;

const PathStyles = `
  .${ELEMENT_PATH}::-webkit-scrollbar { 
    display: none;
  }

  .${ELEMENT_PATH}:last-child {
    color: ${token.color.black};
  }

  .${ELEMENT_PATH}:not(:last-child) {
    margin-right: 14px;
  }

  .${ELEMENT_PATH} + *::before {
    content: '';
    display: inline-block;
    height: 14px;
    background-color: ${token.color.gray.dark};
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
      token.color.white
    } calc(100% - 24px), transparent);
  }

  .${ELEMENT_CONTAINER} * {
    color: ${token.color.gray.mediumAA};
    position: relative;
  }

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_CONTAINER} a:not(:last-child)`]:
        animation.line.slideUnderGrayRed,
    },
  })}
`;

const styles = `
  ${Styles.reset}

  :host {
    display: block;
  }

  ${ContainerStyles}
  ${PathStyles}
  ${OverwriteThemeStyles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const CreatePaths = ({ element }: { element: UMDBreadcrumbElement }) => {
  const isThemeDark = Attributes.isTheme.dark({ element });

  const pathsSlot = SlotWithDefaultStyling({
    element,
    slotRef: Slots.name.PATHS,
  });

  if (pathsSlot) {
    const links = pathsSlot.querySelectorAll('a') as NodeListOf<HTMLElement>;

    if (isThemeDark)
      pathsSlot.setAttribute(
        Attributes.names.theme,
        Attributes.values.theme.DARK,
      );
    pathsSlot.classList.add(ELEMENT_CONTAINER);

    for (const linkElement of links) {
      linkElement.classList.add(ELEMENT_PATH);
      Markup.modify.AnimationLinkSpan({
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

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDBreadcrumbElement = UMDBreadcrumbElement;
    window.customElements.define(ELEMENT_NAME, UMDBreadcrumbElement);
  }
};
