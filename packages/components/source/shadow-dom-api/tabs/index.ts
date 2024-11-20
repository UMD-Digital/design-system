declare global {
  interface Window {
    UMDTabsElement: typeof UMDTabsElement;
  }
}

import { Tabs, TabsElements } from 'elements';
import { AttributeNames, AttributesValues, Slots } from 'shadow-dom-model';
import { MarkupCreate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-tabs';

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
  const theme =
    element.getAttribute(AttributeNames.THEME) || AttributesValues.THEME_LIGHT;
  const topPosition = element.getAttribute(AttributeNames.LAYOUT_STICKY_TOP);
  const slot = Node.slot({ type: Slots.TABS });
  const markup = element.querySelector(`[slot="${Slots.TABS}"]`);

  const modifyDom = () => {
    if (!markup) return;

    const updateDom = TabsElements.DomStrcuture.ModifyElement({
      markup,
    });

    markup.innerHTML = '';
    markup.appendChild(updateDom);
  };
  const createTabs = () => {
    const tabsElement = Tabs.CreateElement({
      theme,
      tabsContainer: markup?.children[0] as HTMLElement,
      shadowContent: slot,
      topPosition,
    });

    if (!tabsElement) return;

    element._elementRef = tabsElement;
    shadow.appendChild(styleTemplate.content.cloneNode(true));
    shadow.appendChild(tabsElement.element);
    tabsElement.events.load();
  };

  modifyDom();
  createTabs();
};

class UMDTabsElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      resize: () => void;
      load: () => void;
    };
  } | null;

  constructor() {
    super();
    this._elementRef = null;
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [AttributeNames.RESIZE];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!this._elementRef) return;

    if (name === AttributeNames.RESIZE && newValue === 'true') {
      this._elementRef.events.resize();
    }
  }

  connectedCallback() {
    CreateShadowDom({ element: this });
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
