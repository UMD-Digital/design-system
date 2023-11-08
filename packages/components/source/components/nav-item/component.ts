declare global {
  interface Window {
    UMDNavItemElement: typeof UMDNavItemElement;
  }
}

import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';
import { EventDropdownToggle, EventSize } from './services/events';
import { SLOTS } from './globals';

export const ELEMENT_NAME = 'umd-element-nav-item';
export type ElementType = UMDNavItemElement;
export class UMDNavItemElement extends HTMLElement {
  _shadow: ShadowRoot;
  _hasDropdown = false;
  _navItemName = '';
  _isShowing = false;

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });

    const elementStyles = require('./styles/component.css');
    const styles = `${elementStyles.toString()}${ComponentStyles}`;
    const template = MakeTemplate({ styles });

    this._shadow.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['show'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

  connectedCallback() {
    const element = this;
    const primaryLink = element.querySelector(`[slot="${SLOTS.PRIMARY_LINK}"]`);
    const dropdownLinks = element.querySelector(
      `[slot="${SLOTS.DROPDOWN_LINKS}"]`,
    );

    if (!primaryLink) {
      throw new Error('Primary link is required for a nav item');
    } else {
      element._navItemName = primaryLink.innerHTML
        .replace(/(<([^>]+)>)/gi, '')
        .trim();
    }

    if (dropdownLinks?.children && dropdownLinks?.children.length > 0) {
      element._hasDropdown = true;
    }

    const container = CreateShadowDom({ element });
    this._shadow.appendChild(container);
    window.addEventListener('resize', () => EventSize({ element }));
    element.addEventListener('mouseover', () => {
      this._isShowing = true;
      EventDropdownToggle({ element: this });
    });

    element.addEventListener('focus', () => {
      console.log('focus');
    });

    element.addEventListener('mouseleave', () => {
      this._isShowing = false;
      EventDropdownToggle({ element: this });
    });

    setTimeout(() => {
      EventSize({ element });
    }, 10);
  }

  buttonClick() {
    this._isShowing = this._isShowing ? false : true;
    EventDropdownToggle({ element: this });
  }
}
