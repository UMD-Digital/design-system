declare global {
  interface Window {
    UMDPersonBioElement: typeof UMDPersonBioElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { MarkupCreate, Styles } from 'utilities';
import { CommonPersonData } from '../common';

const { Node, SlotWithDefaultStyling } = MarkupCreate;
const { PersonBio, PersonBioFull } = Composite;

const ELEMENT_NAME = 'umd-element-person-bio';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.resetString}
  ${PersonBio.Styles}
  ${PersonBioFull.Styles}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDPersonBioElement;
}) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const isFullImage = Attributes.isLayout.fullImage({ element });

  if (isFullImage) {
    return PersonBioFull.CreateElement({
      ...CommonPersonData({ element, isThemeDark }),
      description: SlotWithDefaultStyling({
        element,
        slotRef: Slots.name.DESCRIPTION,
      }),
    });
  }

  return PersonBio.CreateElement({
    ...CommonPersonData({ element, isThemeDark }),
    description: SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.DESCRIPTION,
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
