declare global {
  interface Window {
    UMDStickyColumnElement: typeof UMDStickyColumnElement;
  }
}

import { StickyColumns } from 'elements';
import { MarkupCreate, Styles, WebComponents } from 'utilities';

const { Node } = MarkupCreate;
const { Attributes, AttributesValues, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-sticky-columns';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${StickyColumns.Styles}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDStickyColumnElement;
}) => {
  const isStickyLast =
    element.getAttribute(Attributes.OPTIONAL_STICKY_FIRST) ===
    AttributesValues.STATE_FALSE;
  const topPosition = element.getAttribute(Attributes.LAYOUT_STICKY_TOP);

  const stickyColumn = Node.slot({ type: Slots.STICKY_COLUMN });
  const staticColumn = Node.slot({ type: Slots.STATIC_COLUMN });

  const component = StickyColumns.CreateElement({
    stickyColumn,
    staticColumn,
    isStickyLast,
    topPosition,
  });

  element._elementRef = component;
  return component.element;
};

export class UMDStickyColumnElement extends HTMLElement {
  _shadow: ShadowRoot;
  _elementRef: {
    element: HTMLDivElement;
    events: {
      SetPosition: ({ value }: { value: string | null }) => void;
    };
  } | null;

  constructor() {
    const template = Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
    this._elementRef = null;
  }

  static get observedAttributes() {
    return [Attributes.LAYOUT_STICKY_TOP];
  }

  attributeChangedCallback(name: string) {
    if (name == Attributes.LAYOUT_STICKY_TOP && this._elementRef) {
      this._elementRef.events.SetPosition({
        value: this.getAttribute(Attributes.LAYOUT_STICKY_TOP),
      });
    }
  }

  connectedCallback() {
    const shadowNode = CreateShadowDom({ element: this });
    if (!shadowNode) return;
    this._shadow.appendChild(shadowNode);
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDStickyColumnElement = UMDStickyColumnElement;
    window.customElements.define(ELEMENT_NAME, UMDStickyColumnElement);
  }
};

export default {
  Load,
};
