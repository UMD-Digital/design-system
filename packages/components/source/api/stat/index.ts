declare global {
  interface Window {
    UMDStatElement: typeof UMDStatElement;
  }
}

import { Components } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { MarkupCreate, Styles } from 'utilities';

const { SlotWithDefaultStyling } = MarkupCreate;
const { Stat } = Components;

const ELEMENT_NAME = 'umd-element-stat';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${Stat.Styles}
`;

const CreateShadowDom = ({ element }: { element: HTMLElement }) => {
  const lineAttr = element.hasAttribute(Attributes.names.OPTIONAL_HAS_LINE);

  return Stat.CreateElement({
    isThemeDark: Attributes.isTheme.dark({ element }),
    displayType: element.getAttribute(Attributes.names.DISPLAY_TYPE),
    size: element.getAttribute(Attributes.names.DISPLAY_SIZE),
    hasLine: lineAttr ? true : false,
    stat: SlotWithDefaultStyling({ element, slotRef: Slots.name.STAT }),
    text: Slots.text.default({ element }),
    subText: Slots.text.subText({ element }),
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
