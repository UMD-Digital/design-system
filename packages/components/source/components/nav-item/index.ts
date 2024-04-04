declare global {
  interface Window {
    UMDNavItemElement: typeof UMDNavItemElement;
  }
}

import { Performance } from 'utilities';
import { MarkupCreate } from 'utilities';
import { ComponentStyles, CreateShadowDom } from './elements';
import {
  HideDropdown,
  ShowDropdown,
  EventSize,
  EventButtonClick,
} from './services/events';
import { OnLoadDropdownSpans } from './services/helper';
import { SLOTS, VARIABLES } from './globals';

const { Debounce } = Performance;

const { PRIMARY_LINK, DROPDOWN_LINKS } = SLOTS;
const { ATTRIBUTE_DROPDOWN, ELEMENT_NAME } = VARIABLES;

export class UMDNavItemElement extends HTMLElement {
  _shadow: ShadowRoot;
  _hasDropdown = false;
  _navItemName = '';
  _isShowing = false;
  _focusCallback = () => {};

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const styles = `${ComponentStyles}`;
    const template = MarkupCreate.Node.stylesTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const element = this;
    const primaryLink = element.querySelector(`[slot="${PRIMARY_LINK}"]`);
    const dropdownLinks = element.querySelector(`[slot="${DROPDOWN_LINKS}"]`);
    const hasDropdown =
      (dropdownLinks?.children && dropdownLinks?.children.length > 0) || false;

    element._hasDropdown = hasDropdown;

    if (!primaryLink) {
      throw new Error('Primary link is required for a nav item');
    } else {
      element._navItemName = primaryLink.innerHTML
        .replace(/(<([^>]+)>)/gi, '')
        .trim();
    }

    const container = CreateShadowDom({ element });
    element._shadow.appendChild(container);
    if (hasDropdown) container.setAttribute(ATTRIBUTE_DROPDOWN, '');

    setTimeout(() => {
      EventSize({ element });
      OnLoadDropdownSpans({ element });
    }, 10);

    // Events

    const resize = () => {
      EventSize({ element });
    };

    window.addEventListener('resize', Debounce(resize, 20));

    element.addEventListener('mouseover', () => {
      this._isShowing = true;
      ShowDropdown({ element });
    });

    element.addEventListener('mouseleave', () => {
      this._isShowing = false;
      HideDropdown({ element });
    });
  }

  buttonClick() {
    const element = this;
    this._isShowing = this._isShowing ? false : true;
    EventButtonClick({ element });
  }
}

export const Load = () => {
  const hasElement =
    document.getElementsByTagName(`${ELEMENT_NAME}`).length > 0;

  if (!window.customElements.get(ELEMENT_NAME) && hasElement) {
    window.UMDNavItemElement = UMDNavItemElement;
    window.customElements.define(ELEMENT_NAME, UMDNavItemElement);
  }
};
