declare global {
  interface Window {
    UMDSocialSharingElement: typeof UMDSocialSharingElement;
  }
}

import { SocialSharing } from 'elements';
import { AttributeNames } from 'shadow-dom-model';
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
  const title = element.getAttribute(AttributeNames.INFORMATION_TITLE);
  const url = element.getAttribute(AttributeNames.INFORMATION_URL);
  const facebook = element.getAttribute(AttributeNames.SOCIAL_FACEBOOK);
  const twitter = element.getAttribute(AttributeNames.SOCIAL_TWITTER);
  const print = element.getAttribute(AttributeNames.SHARING_PRINT);
  const email = element.getAttribute(AttributeNames.SHARING_EMAIL);

  const includeFacebook = facebook ? facebook === 'true' : true;
  const includeTwitter = twitter ? twitter === 'true' : true;

  const socialSharing = SocialSharing.CreateElement({
    isFixed: element.hasAttribute(AttributeNames.LAYOUT_FIXED),
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
