declare global {
  interface Window {
    UMDPathwayHighlightElement: typeof UMDPathwayHighlightElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';
import { CommonPathwayData } from '../common';

const { SlotWithDefaultStyling } = Markup.create;

const ELEMENT_NAME = 'umd-element-pathway-highlight';

const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.pathway.highlight.Styles}
  ${Composite.pathway.elements.image.Styles}
  ${Composite.pathway.elements.text.Styles}
`;

const styleTemplate = Markup.create.Node.stylesTemplate({ styles });

const CreateShadowDom = ({
  element,
}: {
  element: UMDPathwayHighlightElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const isThemeDark = Attributes.isTheme.dark({ element });

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  shadow.appendChild(
    Composite.pathway.highlight.CreateElement({
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
