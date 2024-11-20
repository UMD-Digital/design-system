declare global {
  interface Window {
    UMDStatElement: typeof UMDStatElement;
  }
}

import { Stat } from 'elements';
import { AttributeNames, Slots } from 'shadow-dom-model';
import { MarkupCreate, Styles } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-stat';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${Stat.Styles}
`;

const CreateShadowDom = ({ element }: { element: UMDStatElement }) => {
  const lineAttr = element.hasAttribute(AttributeNames.OPTIONAL_HAS_LINE);

  return Stat.CreateElement({
    theme: element.getAttribute(AttributeNames.THEME),
    displayType: element.getAttribute(AttributeNames.DISPLAY_TYPE),
    size: element.getAttribute(AttributeNames.DISPLAY_SIZE),
    hasLine: lineAttr ? true : false,
    stat: SlotWithDefaultStyling({ element, slotRef: Slots.STAT }),
    text: Slots.SlottedText({ element }),
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
