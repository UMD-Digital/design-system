import { Tokens, Animations } from '@universityofmaryland/variables';
import { Styles, MarkupCreate } from 'utilities';
const { Colors } = Tokens;
const { ConvertJSSObjectToStyles } = Styles;

declare global {
  interface Window {
    UMDBreadcrumbElement: typeof UMDBreadcrumbElement;
  }
}

const { Link } = Animations;
const { SlotOberserver, SlotWithDefaultStyling, Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-breadcrumb';
const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const THEME_DARK_ATTR = `[${ATTRIBUTE_THEME}=${THEME_DARK}]`;

const SLOTS = {
  PATHS: 'paths',
};
const styles = `
  ${Styles.ResetString}

  :host {
    display: block;
  }

  a {
    color: ${Colors.gray.medium} !important;
    position: relative;
  }

  a:last-of-type {
    color: ${Colors.black} !important;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`a:not(:last-of-type)`]: Animations.Link.LineSlideUnder.gray,
    },
  })}

  a:not(:last-of-type) {
    margin-right: 14px;
  }

  a + a::before {
    content: '';
    display: inline-block;
    height: 14px;
    background-color: ${Colors.gray.light};
    left: -7px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(15deg);
    width: 1px;
  }

  ${THEME_DARK_ATTR} a {
    color: ${Colors.white} !important;
  }

  ${THEME_DARK_ATTR} a + a::before {
    background-color: ${Colors.white};
  }`;

const CreatePaths = ({ element }: { element: UMDBreadcrumbElement }) => {
  const { PATHS } = element._slots;
  const theme = element._theme;

  const pathsSlot = SlotWithDefaultStyling({
    element,
    slotRef: PATHS,
  });

  if (pathsSlot) {
    pathsSlot.setAttribute(ATTRIBUTE_THEME, theme);
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
