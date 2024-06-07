declare global {
  interface Window {
    UMDSocialSharingElement: typeof UMDSocialSharingElement;
  }
}

import { SocialSharing } from 'elements';
import { MarkupCreate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-social-sharing';
const ATTRIBUTE_FIXED = 'fixed';

const styles = `
  :host {
    display: block;
  }
  
  ${Styles.ResetString}
  ${SocialSharing.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: UMDSocialSharingElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const title = element.getAttribute('data-title');
  const url = element.getAttribute('data-url');
  const facebook = element.getAttribute('data-facebook');
  const twitter = element.getAttribute('data-facebook');
  const print = element.getAttribute('data-print');
  const email = element.getAttribute('data-email');

  const includeFacebook = facebook ? facebook === 'true' : true;
  const includeTwitter = twitter ? twitter === 'true' : true;

  const socialSharing = SocialSharing.CreateElement({
    isFixed: element.hasAttribute(ATTRIBUTE_FIXED),
    title,
    url,
    includeFacebook,
    includeTwitter,
    includePrint: print === 'true',
    includeEmail: email === 'true',
  });

  shadow.appendChild(styleTemplate.content.cloneNode(true));
  shadow.appendChild(socialSharing.element);
  socialSharing.events.load();
};

class UMDSocialSharingElement extends HTMLElement {
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
    window.UMDSocialSharingElement = UMDSocialSharingElement;
    window.customElements.define(ELEMENT_NAME, UMDSocialSharingElement);
  }
};

export default {
  Load,
};
