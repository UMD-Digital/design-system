declare global {
  interface Window {
    UMDHeroBrandVideoElement: typeof UMDHeroBrandVideoElement;
  }
}

import { Composite } from '@universityofmaryland/web-elements-library';
import { Slots } from 'model';
import { Markup, Styles } from 'utilities';

const { Node } = Markup.create;
const { HeroBrandVideo } = Composite;

const ELEMENT_NAME = 'umd-element-hero-brand-video';

const styles = `
  :host {
    display: block;
  }

  ${Styles.reset}
  ${HeroBrandVideo.Styles}
`;

const template = Markup.create.Node.stylesTemplate({ styles });

const CreateShadowDom = ({
  element,
}: {
  element: UMDHeroBrandVideoElement;
}) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const videoSlot = Node.slot({ type: Slots.name.VIDEO });
  const animationTriggerAttribute = element.getAttribute('animation-trigger');
  shadow.appendChild(videoSlot);

  const video = element.querySelector('video') as HTMLVideoElement;

  if (!video) return;

  const videoElement = HeroBrandVideo.CreateElement({
    video,
    headline: Slots.headline.default({ element }),
    text: Slots.text.default({ element }),
    isAnimationOnLoad: animationTriggerAttribute === 'load',
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
