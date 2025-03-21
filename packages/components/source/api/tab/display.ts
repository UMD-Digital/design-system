declare global {
  interface Window {
    UMDTabsElement: typeof UMDTabsElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';

const { Node } = Markup.create;

const ELEMENT_NAME = 'umd-element-tabs';

const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.tabs.standard.Styles}
`;

const styleTemplate = Markup.create.Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: UMDTabsElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isThemeDark = Attributes.isTheme.dark({ element });
  const topPosition = element.getAttribute(Attributes.names.LAYOUT_STICKY_TOP);
  const slot = Node.slot({ type: Slots.name.TABS });
  const markup = element.querySelector(`[slot="${Slots.name.TABS}"]`);

  const modifyDom = () => {
    if (!markup) return;

    const updateDom = Composite.tabs.elements.DomStrcuture.ModifyElement({
      markup,
    });

    markup.innerHTML = '';
    markup.appendChild(updateDom);
  };
  const createTabs = () => {
    const tabsElement = Composite.tabs.standard.CreateElement({
      isThemeDark,
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
    return [Attributes.names.RESIZE];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (!this._elementRef) return;

    if (name === Attributes.names.RESIZE && newValue === 'true') {
      this._elementRef.events.resize();
    }
  }

  connectedCallback() {
    CreateShadowDom({ element: this });
  }
}

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDTabsElement = UMDTabsElement;
    window.customElements.define(ELEMENT_NAME, UMDTabsElement);
  }
};
