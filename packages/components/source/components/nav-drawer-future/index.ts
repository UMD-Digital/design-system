declare global {
  interface Window {
    UMDNavDrawerFeature: typeof UMDNavDrawerFeature;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { NavigationElements } from 'elements';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-nav-drawer-future';
const SLOTS = {
  PRIMARY_SLIDE_LINKS: 'primary-slide-links',
  PRIMARY_SLIDE_SECONDARY_LINKS: 'primary-slide-secondary-links',
  PRIMARY_SLIDE_CONTENT: 'primary-slide-content',
  CHILDREN_SLIDES: 'children-slides',
};

export const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${NavigationElements.Drawer.Styles}
`;

export const CreateShadowDom = ({
  element,
}: {
  element: UMDNavDrawerFeature;
}) => {
  const {
    PRIMARY_SLIDE_LINKS,
    PRIMARY_SLIDE_SECONDARY_LINKS,
    PRIMARY_SLIDE_CONTENT,
    CHILDREN_SLIDES,
  } = element._slots;
  const primarySlideSlot = element.querySelector(
    `[slot="${PRIMARY_SLIDE_CONTENT}"]`,
  ) as HTMLSlotElement;
  const primarySlideLinks = element.querySelector(
    `[slot="${PRIMARY_SLIDE_LINKS}"]`,
  ) as HTMLSlotElement;
  const primarySlidesSecondaryLinks = element.querySelector(
    `[slot="${PRIMARY_SLIDE_SECONDARY_LINKS}"]`,
  ) as HTMLSlotElement;
  const childrenSlides = element.querySelector(
    `[slot="${CHILDREN_SLIDES}"]`,
  ) as HTMLSlotElement;
  const hasPrimarySlideContent =
    primarySlideSlot && primarySlideSlot.children.length > 0;
  const primarySlideContent = hasPrimarySlideContent
    ? Node.slot({
        type: PRIMARY_SLIDE_CONTENT,
      })
    : null;

  return NavigationElements.Drawer.CreateElement({
    primarySlideLinks,
    primarySlidesSecondaryLinks,
    childrenSlides,
    primarySlideContent,
  });
};

export class UMDNavDrawerFeature extends HTMLElement {
  _shadow: ShadowRoot;
  _slots: Record<string, string>;

  constructor() {
    const template = MarkupCreate.Node.stylesTemplate({ styles });
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
    window.UMDNavDrawerFeature = UMDNavDrawerFeature;
    window.customElements.define(ELEMENT_NAME, UMDNavDrawerFeature);
  }
};
