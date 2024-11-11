declare global {
  interface Window {
    UMDPersonBioElement: typeof UMDPersonBioElement;
  }
}

import { PersonBio, PersonBioFull } from 'elements';
import { MarkupCreate, Styles, WebComponents } from 'utilities';
import { CommonPersonData } from '../common';

const { Node, SlotWithDefaultStyling } = MarkupCreate;
const { AttributesNames, AttributesValues, Slots } = WebComponents;

const ELEMENT_NAME = 'umd-element-person-bio';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${PersonBio.Styles}
  ${PersonBioFull.Styles}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDPersonBioElement;
}) => {
  const theme = element.getAttribute(AttributesNames.THEME);
  const type = element.getAttribute(AttributesNames.TYPE);

  if (type === AttributesValues.LAYOUT_FULL_IMAGE) {
    return PersonBioFull.CreateElement({
      ...CommonPersonData({ element, theme }),
      description: SlotWithDefaultStyling({
        element,
        slotRef: Slots.DESCRIPTION,
      }),
    });
  }

  return PersonBio.CreateElement({
    ...CommonPersonData({ element, theme }),
    description: SlotWithDefaultStyling({
      element,
      slotRef: Slots.DESCRIPTION,
    }),
  });
};

export class UMDPersonBioElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    const template = Node.stylesTemplate({
      styles,
    });

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
    window.UMDPersonBioElement = UMDPersonBioElement;
    window.customElements.define(ELEMENT_NAME, UMDPersonBioElement);
  }
};

export default {
  Load,
};
