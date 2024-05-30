declare global {
  interface Window {
    UMDPathwayHighlightElement: typeof UMDPathwayHighlightElement;
  }
}

import { PathwayHighlight, PathwayElements } from 'elements';
import { Styles, MarkupCreate } from 'utilities';
import { SLOTS as CommonSlots, CommonPathwayData } from '../common';

const { SlotWithDefaultStyling, SlotOberserver } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-pathway-highlight';
const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const SLOTS = {
  ...CommonSlots,
  HIGHLIGHT: 'highlight',
  HIGHLIGHT_ATTRIBUTION: 'highlight-attribution',
};

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
  const { HIGHLIGHT, HIGHLIGHT_ATTRIBUTION } = SLOTS;
  const themeAttribute = element.getAttribute(ATTRIBUTE_THEME);
  let theme = null;

  if (themeAttribute) {
    if (themeAttribute === THEME_LIGHT) theme = THEME_LIGHT;
    if (themeAttribute === THEME_DARK) theme = THEME_DARK;
  }

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  shadow.appendChild(
    PathwayHighlight.CreateElement({
      ...CommonPathwayData({
        element,
        slots: SLOTS,
      }),
      quote: SlotWithDefaultStyling({
        element,
        slotRef: HIGHLIGHT,
      }),
      attribution: SlotWithDefaultStyling({
        element,
        slotRef: HIGHLIGHT_ATTRIBUTION,
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

    SlotOberserver({
      element: this,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
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
