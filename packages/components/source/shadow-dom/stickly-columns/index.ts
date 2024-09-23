declare global {
  interface Window {
    UMDStickyColumnElement: typeof UMDStickyColumnElement;
  }
}

import { StickyColumns } from 'elements';
import { MarkupCreate } from 'utilities';
import { Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-sticky-columns';
const ATTRIBUTE_STICKY_FIRST = 'isStickyFirst';
const ATTRIBUTE_POSITION_TOP = 'position-top';

const SLOTS = {
  STICKY_COLUMN: 'sticky-column',
  STATIC_COLUMN: 'static-column',
};

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
  const { STICKY_COLUMN, STATIC_COLUMN } = element._slots;
  const isStickyLast = element.getAttribute(ATTRIBUTE_STICKY_FIRST) === 'false';
  const topPosition = element.getAttribute(ATTRIBUTE_POSITION_TOP);

  const stickyColumn = Node.slot({ type: STICKY_COLUMN });
  const staticColumn = Node.slot({ type: STATIC_COLUMN });

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
  _slots: Record<string, string>;
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
    this._slots = SLOTS;
    this._shadow.appendChild(template.content.cloneNode(true));
    this._elementRef = null;
  }

  static get observedAttributes() {
    return [ATTRIBUTE_POSITION_TOP];
  }

  attributeChangedCallback(name: string) {
    if (name == ATTRIBUTE_POSITION_TOP && this._elementRef) {
      this._elementRef.events.SetPosition({
        value: this.getAttribute(ATTRIBUTE_POSITION_TOP),
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
