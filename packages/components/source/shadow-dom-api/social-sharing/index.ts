declare global {
  interface Window {
    UMDSocialSharingElement: typeof UMDSocialSharingElement;
  }
}

import { SocialSharing } from 'elements';
import { Attributes } from 'shadow-dom-model';
import { MarkupCreate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-social-sharing';

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
  const title = element.getAttribute(Attributes.names.information.TITLE);
  const url = element.getAttribute(Attributes.names.information.URL);
  const facebook = element.getAttribute(Attributes.names.social.FACEBOOK);
  const twitter = element.getAttribute(Attributes.names.social.TWITTER);
  const print = element.getAttribute(Attributes.names.sharing.PRINT);
  const email = element.getAttribute(Attributes.names.sharing.EMAIL);

  const includeFacebook = facebook ? facebook === 'true' : true;
  const includeTwitter = twitter ? twitter === 'true' : true;

  const socialSharing = SocialSharing.CreateElement({
    isFixed: element.hasAttribute(Attributes.names.LAYOUT_FIXED),
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