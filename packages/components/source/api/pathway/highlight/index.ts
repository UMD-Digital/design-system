declare global {
  interface Window {
    UMDPathwayHighlightElement: typeof UMDPathwayHighlightElement;
  }
}

import { Components } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { MarkupCreate, Styles } from 'utilities';
import { CommonPathwayData } from '../common';

const { SlotWithDefaultStyling } = MarkupCreate;
const { PathwayHighlight, PathwayElements } = Components;

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
  const isThemeDark = Attributes.isTheme.dark({ element });

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  shadow.appendChild(
    PathwayHighlight.CreateElement({
      ...CommonPathwayData({
        element,
      }),
      quote: SlotWithDefaultStyling({
        element,
        slotRef: Slots.name.HIGHLIGHT,
      }),
      attribution: SlotWithDefaultStyling({
        element,
        slotRef: Slots.name.HIGHLIGHT_ATTRIBUTION,
      }),
      isThemeDark,
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
