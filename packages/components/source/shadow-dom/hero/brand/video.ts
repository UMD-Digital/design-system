declare global {
  interface Window {
    UMDHeroBrandVideoElement: typeof UMDHeroBrandVideoElement;
  }
}

import { MarkupCreate, Styles } from 'utilities';
import { HeroBrandVideo } from 'elements';

const { SlotOberserver, Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-hero-brand-video';
const SLOTS = {
  VIDEO: 'video',
};

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${HeroBrandVideo.Styles}
`;

const template = MarkupCreate.Node.stylesTemplate({ styles });

const CreateShadowDom = ({
  element,
}: {
  element: UMDHeroBrandVideoElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const videoSlot = Node.slot({ type: SLOTS.VIDEO });
  shadow.appendChild(videoSlot);

  const video = element.querySelector('video') as HTMLVideoElement;

  if (!video) return;

  const videoElement = HeroBrandVideo.CreateElement({
    video,
  });

  shadow.appendChild(template.content.cloneNode(true));
  shadow.appendChild(videoElement.element);
  videoElement.events.load();
};

export class UMDHeroBrandVideoElement extends HTMLElement {
  _shadow: ShadowRoot;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    CreateShadowDom({ element: this });

    SlotOberserver({
      element: this,
      shadowDom: this._shadow,
      slots: SLOTS,
      CreateShadowDom,
    });
  }
}

const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDHeroBrandVideoElement = UMDHeroBrandVideoElement;
    window.customElements.define(ELEMENT_NAME, UMDHeroBrandVideoElement);
  }
};

export default {
  Load,
};
