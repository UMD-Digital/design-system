declare global {
  interface Window {
    UMDStatElement: typeof UMDStatElement;
  }
}

import { Stat } from 'elements';
import { MarkupCreate, Styles, WebComponents } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;
const { Attributes, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-stat';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${Stat.Styles}
`;

const CreateShadowDom = ({ element }: { element: UMDStatElement }) => {
  const lineAttr = element.hasAttribute(Attributes.OPTIONAL_HAS_LINE);

  return Stat.CreateElement({
    theme: element.getAttribute(Attributes.THEME),
    displayType: element.getAttribute(Attributes.DISPLAY_TYPE),
    size: element.getAttribute(Attributes.DISPLAY_SIZE),
    hasLine: lineAttr ? true : false,
    stat: SlotWithDefaultStyling({ element, slotRef: Slots.STAT }),
    text: SlotWithDefaultStyling({ element, slotRef: Slots.TEXT }),
    subText: SlotWithDefaultStyling({ element, slotRef: Slots.SUB_TEXT }),
  });
};

export class UMDStatElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
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
    window.UMDStatElement = UMDStatElement;
    window.customElements.define(ELEMENT_NAME, UMDStatElement);
  }
};

export default {
  Load,
};
