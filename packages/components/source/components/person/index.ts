declare global {
  interface Window {
    UMDPersonElement: typeof UMDPersonElement;
  }
}

import { MarkupCreate } from 'utilities';
import { ComponentStyles, CreateShadowDom } from './display';

const { Node, SlotOberserver } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-person';
const SLOTS = {
  IMAGE: 'image',
  NAME: 'name',
  JOB_TITLE: 'job-title',
  ASSOCIATION: 'association',
  PRONOUNS: 'pronouns',
  PHONE: 'phone',
  EMAIL: 'email',
  LINKEDIN: 'linkedin',
  ADDRESS: 'address',
  ADDITIONAL_CONTACT: 'additional-contact',
  SUB_TEXT: 'sub-text',
  ACTIONS: 'actions',
};

export class UMDPersonElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = Node.stylesTemplate({
      styles: `${ComponentStyles}`,
    });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = SLOTS;
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const shadowDom = this._shadow;

    shadowDom.appendChild(CreateShadowDom({ element }));

    SlotOberserver({
      element,
      shadowDom,
      slots: SLOTS,
      CreateShadowDom,
    });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDPersonElement = UMDPersonElement;
    window.customElements.define(ELEMENT_NAME, UMDPersonElement);
  }
};
