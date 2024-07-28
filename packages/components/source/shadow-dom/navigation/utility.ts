declare global {
  interface Window {
    UMDHeaderUtilityElement: typeof UMDHeaderUtilityElement;
  }
}

import { NavigationUtility } from 'elements';
import { MarkupCreate, Styles } from 'utilities';

const { Node } = MarkupCreate;

const ELEMENT_NAME = 'umd-element-navigation-utility';

const styles = `
  :host {
    display: block;
  }

  ${Styles.ResetString}
  ${NavigationUtility.Styles}
`;

const styleTemplate = Node.stylesTemplate({ styles });

const CreateShadowDom = ({ element }: { element: UMDHeaderUtilityElement }) => {
  const shadow = element.shadowRoot as ShadowRoot;
  const alertUrl = element.getAttribute('alert-url');
  const giftAttribute = element.getAttribute('gift');
  const searchAttribute = element.getAttribute('search');
  const hasAdmissions = element.hasAttribute('admissions');
  const hasSchools = element.hasAttribute('schools');
  const hasNews = element.hasAttribute('news');
  const hasEvents = element.hasAttribute('events');
  const hasGifts = giftAttribute !== null && giftAttribute !== undefined;
  const hasSearch = searchAttribute !== null && searchAttribute !== undefined;
  const giftUrl = hasGifts ? giftAttribute : '';
  const searchType = hasSearch ? searchAttribute : '';

  shadow.appendChild(styleTemplate.content.cloneNode(true));

  shadow.appendChild(
    NavigationUtility.CreateElement({
      alertUrl,
      hasAdmissions,
      hasSchools,
      hasNews,
      hasGifts,
      hasEvents,
      hasSearch,
      giftUrl,
      searchType,
    }),
  );
};

class UMDHeaderUtilityElement extends HTMLElement {
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
    window.UMDHeaderUtilityElement = UMDHeaderUtilityElement;
    window.customElements.define(ELEMENT_NAME, UMDHeaderUtilityElement);
  }
};

export default {
  Load,
};
