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

  const stickyColumn = Node.slot({ type: STICKY_COLUMN });
  const staticColumn = Node.slot({ type: STATIC_COLUMN });

  return StickyColumns.CreateElement({
    stickyColumn,
    staticColumn,
    isStickyLast,
  });
};

export class UMDStickyColumnElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._shadow.appendChild(CreateShadowDom({ element: this }));
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
