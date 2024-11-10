declare global {
  interface Window {
    UMDPathwayHighlightElement: typeof UMDPathwayHighlightElement;
  }
}

import { PathwayHighlight, PathwayElements } from 'elements';
import { MarkupCreate, Styles, WebComponents } from 'utilities';
import { CommonPathwayData } from '../common';

const { SlotWithDefaultStyling } = MarkupCreate;
const { Attributes, AttributesValues, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-pathway-highlight';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${PathwayHighlight.Styles}
  ${PathwayElements.Image.Styles}
  ${PathwayElements.Text.Styles}
`;

const styleTemplate = MarkupCreate.Node.stylesTemplate({ styles });

const CreateShadowDom = ({
  element,
}: {
  element: UMDPathwayHighlightElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const themeAttribute = element.getAttribute(Attributes.THEME);
  let theme = null;

  if (themeAttribute) {
    if (themeAttribute === AttributesValues.THEME_LIGHT)
      theme = AttributesValues.THEME_LIGHT;
    if (themeAttribute === AttributesValues.THEME_DARK)
      theme = AttributesValues.THEME_DARK;
  }

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  shadow.appendChild(
    PathwayHighlight.CreateElement({
      ...CommonPathwayData({
        element,
      }),
      quote: SlotWithDefaultStyling({
        element,
        slotRef: Slots.HIGHLIGHT,
      }),
      attribution: SlotWithDefaultStyling({
        element,
        slotRef: Slots.HIGHLIGHT_ATTRIBUTION,
      }),
      theme,
    }),
  );
};

export class UMDPathwayHighlightElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    CreateShadowDom({ element: this });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDPathwayHighlightElement = UMDPathwayHighlightElement;
    window.customElements.define(ELEMENT_NAME, UMDPathwayHighlightElement);
  }
};

export default {
  Load,
};
