import { Tokens, Animations } from '@universityofmaryland/variables';
import { Styles, MarkupCreate, MarkupModify } from 'utilities';
const { Colors } = Tokens;
const { ConvertJSSObjectToStyles } = Styles;

declare global {
  interface Window {
    UMDBreadcrumbElement: typeof UMDBreadcrumbElement;
  }
}

const { Link } = Animations;
const { SlotOberserver, SlotWithDefaultStyling, Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-breadcrumb';
const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_DARK_ATTR = `[${ATTRIBUTE_THEME}=${THEME_DARK}]`;
const BREADCRUMB_CONTAINER = 'breadcrumb-container';
const BREADCRUMB_PATH = 'breadcrumb-path';

const SLOTS = {
  PATHS: 'paths',
};
const styles = `
  ${Styles.ResetString}

  :host {
    display: block;
  }

  .${BREADCRUMB_CONTAINER} {
    display: flex;
    mask-image: linear-gradient(90deg, ${
      Colors.white
    } calc(100% - 24px), transparent);
    overflow-x: auto;
    scrollbar-width: none;
    white-space: nowrap;
    padding-right: 24px;
    font-size: 12px;
    padding-bottom: 1px;
  }

  .${BREADCRUMB_PATH}::-webkit-scrollbar { 
    display: none;
  }

  .${BREADCRUMB_PATH} {
    color: ${Colors.gray.medium};
    position: relative;
  }

  .${BREADCRUMB_PATH}:last-of-type {
    color: ${Colors.black};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`a:not(:last-of-type)`]: Animations.Link.LineSlideUnder.gray,
    },
  })}

  .${BREADCRUMB_PATH}:not(:last-of-type) {
    margin-right: 14px;
  }

  .${BREADCRUMB_PATH} + .${BREADCRUMB_PATH}::before {
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

  ${THEME_DARK_ATTR} .${BREADCRUMB_PATH} {
    color: ${Colors.gray.light};
  }

  ${THEME_DARK_ATTR} .${BREADCRUMB_PATH} + .${BREADCRUMB_PATH}::before {
    background-color: ${Colors.gray.dark};
  }
  
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`${THEME_DARK_ATTR} .${BREADCRUMB_PATH}:not(:last-of-type)`]:
        Animations.Link.LineSlideUnder.grayDark,
    },
  })}`;

const CreatePaths = ({ element }: { element: UMDBreadcrumbElement }) => {
  const { PATHS } = element._slots;
  const theme = element._theme;
  const pathsSlot = SlotWithDefaultStyling({
    element,
    slotRef: PATHS,
  });

  if (pathsSlot) {
    const links = pathsSlot.querySelectorAll('a') as NodeListOf<HTMLElement>;

    pathsSlot.setAttribute(ATTRIBUTE_THEME, theme);
    pathsSlot.classList.add(BREADCRUMB_CONTAINER);

    for (const linkElement of links) {
      linkElement.classList.add(BREADCRUMB_PATH);
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
  const breadcrumbPaths = CreatePaths({ element: element });

  if (!breadcrumbPaths) {
    throw new Error('Paths slot not found.');
  }

  return breadcrumbPaths;
};

export class UMDBreadcrumbElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;
  _theme = THEME_LIGHT;

  constructor() {
    const template = Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const shadowDom = this._shadow;
    const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;

    element._theme = theme || element._theme;

    shadowDom.appendChild(CreateShadowDom({ element }));

    SlotOberserver({
      element,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDBreadcrumbElement = UMDBreadcrumbElement;
    window.customElements.define(ELEMENT_NAME, UMDBreadcrumbElement);
  }
};
