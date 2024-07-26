declare global {
  interface Window {
    UMDPathwayElement: typeof UMDPathwayElement;
  }
}

import { MarkupCreate } from 'utilities';
import { ComponentStyles, CreateShadowDom } from './display';
import { SLOTS as CommonSlots } from '../common';

const { SlotOberserver } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-pathway';
const SLOTS = {
  ...CommonSlots,
  IMAGE: 'image',
  START_DATE_ISO: 'start-date-iso',
  END_DATE_ISO: 'end-date-iso',
  LOCATION: 'location',
  STATS: 'stats',
};

export class UMDPathwayElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;
  _styles: HTMLTemplateElement;

  constructor() {
    const styleTemplate = MarkupCreate.Node.stylesTemplate({
      styles: `${ComponentStyles}`,
    });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;
    this._styles = styleTemplate;
  }

  connectedCallback() {
    CreateShadowDom({ element: this });

    if (this.getAttribute('type') !== 'sticky') {
      SlotOberserver({
        element: this,
        shadowDom: this._shadow,
        slots: SLOTS,
        CreateShadowDom,
      });
    }
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDPathwayElement = UMDPathwayElement;
    window.customElements.define(ELEMENT_NAME, UMDPathwayElement);
  }
};

export default {
  Load,
};
