declare global {
  interface Window {
    UMDTabsElement: typeof UMDTabsElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { Tabs } from 'elements';

const { SlotOberserver } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-tabs';
const ATTRIBUTE_RESIZE = 'resize';
const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';

const SLOTS = { TABS: 'tabs' };

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${Tabs.Styles}
`;

const styleTemplate = MarkupCreate.Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: UMDTabsElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const theme = element.getAttribute(ATTRIBUTE_THEME) || THEME_LIGHT;
  const slottedTabs = Array.from(
    element.querySelectorAll(`[slot="${SLOTS.TABS}"] > *`),
  ) as HTMLElement[];

  const tabs = slottedTabs.map((tab) => tab.cloneNode(true)) as HTMLElement[];

  const tabsElement = Tabs.CreateElement({
    theme,
    tabs,
  });

  element._elementRef = tabsElement;
  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(tabsElement.element);
};

class UMDTabsElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      resize: () => void;
    };
  } | null;

  constructor() {
    super();
    this._elementRef = null;
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [ATTRIBUTE_RESIZE];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!this._elementRef) return;

    if (name === ATTRIBUTE_RESIZE && newValue === 'true') {
      this._elementRef.events.resize();
    }
  }

  connectedCallback() {
    CreateShadowDom({ element: this });

    SlotOberserver({
      element: this,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDTabsElement = UMDTabsElement;
    window.customElements.define(ELEMENT_NAME, UMDTabsElement);
  }
};

export default {
  Load,
};
