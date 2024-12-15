declare global {
  interface Window {
    UMDStickyColumnElement: typeof UMDStickyColumnElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';

const { Node } = Markup.create;
const { StickyColumns } = Composite;

const ELEMENT_NAME = 'umd-element-sticky-columns';

const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${StickyColumns.Styles}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDStickyColumnElement;
}) => {
  const isStickyLast = !Attributes.isVisual.stickyFirst({ element });
  const topPosition = Attributes.getValue.topPosition({ element });

  const stickyColumn = Node.slot({ type: Slots.name.STICKY_COLUMN });
  const staticColumn = Node.slot({ type: Slots.name.STATIC_COLUMN });

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
    return [Attributes.names.LAYOUT_STICKY_TOP];
  }

  attributeChangedCallback(name: string) {
    if (name == Attributes.names.LAYOUT_STICKY_TOP && this._elementRef) {
      this._elementRef.events.SetPosition({
        value: this.getAttribute(Attributes.names.LAYOUT_STICKY_TOP),
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
