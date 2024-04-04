declare global {
  interface Window {
    UMDPathwayHighlightElement: typeof UMDPathwayHighlightElement;
  }
}

import { PathwayHighlight, PathwayElements } from 'elements';
import { Reset } from 'helpers/styles';
import { SlotDefaultStyling, MakeTemplate } from 'helpers/ui';

const ELEMENT_NAME = 'umd-element-pathway-highlight';
const ATTRIBUTE_THEME = 'theme';
const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';
const SLOTS = {
  IMAGE: 'image',
  HEADLINE: 'headline',
  EYEBROW: 'eyebrow',
  TEXT: 'text',
  ACTIONS: 'actions',
  HIGHLIGHT: 'highlight',
  HIGHLIGHT_ATTRIBUTION: 'highlight-attribution',
};

const styles = `
  :host {
    display: block;
  }

  ${Reset}
  ${PathwayHighlight.Styles}
  ${PathwayElements.Image.Styles}
  ${PathwayElements.Text.Styles}
`;

const CreateShadowDom = ({
  element,
}: {
  element: UMDPathwayHighlightElement;
}) => {
  const { EYEBROW, HEADLINE, TEXT, ACTIONS, HIGHLIGHT, HIGHLIGHT_ATTRIBUTION } =
    element._slots;

  const themeAttribute = element.getAttribute(ATTRIBUTE_THEME);
  let theme = null;

  if (themeAttribute) {
    if (themeAttribute === THEME_LIGHT) theme = THEME_LIGHT;
    if (themeAttribute === THEME_DARK) theme = THEME_DARK;
  }

  return PathwayHighlight.CreateElement({
    theme,
    eyebrow: SlotDefaultStyling({ element, slotRef: EYEBROW }),
    headline: SlotDefaultStyling({ element, slotRef: HEADLINE }),
    text: SlotDefaultStyling({ element, slotRef: TEXT }),
    action: SlotDefaultStyling({ element, slotRef: ACTIONS }),
    quote: SlotDefaultStyling({
      element,
      slotRef: HIGHLIGHT,
    }),
    attribution: SlotDefaultStyling({
      element,
      slotRef: HIGHLIGHT_ATTRIBUTION,
    }),
  });
};

export class UMDPathwayHighlightElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = MakeTemplate({ styles });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._shadow.appendChild(CreateShadowDom({ element: this }));
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDPathwayHighlightElement = UMDPathwayHighlightElement;
    window.customElements.define(ELEMENT_NAME, UMDPathwayHighlightElement);
  }
};
