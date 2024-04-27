declare global {
  interface Window {
    UMDPersonBioElement: typeof UMDPersonBioElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { PersonBio, PersonBioFull } from 'elements';
import { SLOTS as CommonSlots, CommonPersonData } from '../common';

const { Node, SlotWithDefaultStyling } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-person-bio';
const ATTRIBUTE_THEME = 'theme';
const ATTRIBUTE_TYPE = 'type';
const TYPE_FULL_IMAGE = 'full-image';

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
  const theme = element.getAttribute(ATTRIBUTE_THEME);
  const type = element.getAttribute(ATTRIBUTE_TYPE);
  const { DESCRIPTION } = element._slots;

  if (type === TYPE_FULL_IMAGE) {
    return PersonBioFull.CreateElement({
      ...CommonPersonData({ element, slots: element._slots, theme }),
      description: SlotWithDefaultStyling({ element, slotRef: DESCRIPTION }),
    });
  }

  return PersonBio.CreateElement({
    ...CommonPersonData({ element, slots: element._slots, theme }),
    description: SlotWithDefaultStyling({ element, slotRef: DESCRIPTION }),
  });
};

export class UMDPersonBioElement extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = Node.stylesTemplate({
      styles,
    });

    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    this._slots = {
      ...CommonSlots,
      DESCRIPTION: 'description',
    };
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
    window.UMDPersonBioElement = UMDPersonBioElement;
    window.customElements.define(ELEMENT_NAME, UMDPersonBioElement);
  }
};
