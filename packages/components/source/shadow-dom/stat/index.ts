declare global {
  interface Window {
    UMDStatElement: typeof UMDStatElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { Stat } from 'elements';

const { ResetString } = Styles;
const { SlotWithDefaultStyling } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-stat';
const ATTRIBUTE_TYPE = 'type';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_SIZE = 'size';
const ATTRIBUTE_HAS_LINE = 'has-line';
const SLOTS = {
  STAT: 'stat',
  TEXT: 'text',
  SUB_TEXT: 'sub-text',
};

const styles = `
  :host {
    display: block;
  }

  ${ResetString}
  ${Stat.Styles}
`;

const CreateShadowDom = ({ element }: { element: UMDStatElement }) => {
  const { STAT, TEXT, SUB_TEXT } = SLOTS;
  const lineAttr = element.hasAttribute(ATTRIBUTE_HAS_LINE);

  return Stat.CreateElement({
    theme: element.getAttribute(ATTRIBUTE_THEME),
    type: element.getAttribute(ATTRIBUTE_TYPE),
    size: element.getAttribute(ATTRIBUTE_SIZE),
    hasLine: lineAttr ? true : false,
    stat: SlotWithDefaultStyling({ element, slotRef: STAT }),
    text: SlotWithDefaultStyling({ element, slotRef: TEXT }),
    subText: SlotWithDefaultStyling({ element, slotRef: SUB_TEXT }),
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
