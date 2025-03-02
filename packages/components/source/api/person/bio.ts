declare global {
  interface Window {
    UMDPersonBioElement: typeof UMDPersonBioElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup, Styles } from 'utilities';
import { CommonPersonData } from './common';

const { Node, SlotWithDefaultStyling } = Markup.create;

const ELEMENT_NAME = 'umd-element-person-bio';

export const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${Composite.person.bio.small.Styles}
  ${Composite.person.bio.full.Styles}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDPersonBioElement;
}) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const isFullImage = Attributes.isLayout.fullImage({ element });

  if (isFullImage) {
    return Composite.person.bio.full.CreateElement({
      ...CommonPersonData({ element, isThemeDark }),
      description: SlotWithDefaultStyling({
        element,
        slotRef: Slots.name.DESCRIPTION,
      }),
    });
  }

  return Composite.person.bio.small.CreateElement({
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

export default () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDPersonBioElement = UMDPersonBioElement;
    window.customElements.define(ELEMENT_NAME, UMDPersonBioElement);
  }
};
