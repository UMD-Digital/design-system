declare global {
  interface Window {
    UMDNavItemElement: typeof UMDNavItemElement;
  }
}

import { Debounce } from 'helpers/performance';
import { MakeTemplate } from 'helpers/ui';
import { ComponentStyles, CreateShadowDom } from './elements';
import {
  HideDropdown,
  ShowDropdown,
  EventSize,
  EventButtonClick,
} from './services/events';
import {
  DropdownPositionPerViewPort,
  OnLoadDropdownSpans,
} from './services/helper';
import { SLOTS, VARIABLES } from './globals';

export const ELEMENT_NAME = 'umd-element-nav-item';
export type ElementType = UMDNavItemElement;
export class UMDNavItemElement extends HTMLElement {
  _shadow: ShadowRoot;
  _hasDropdown = false;
  _navItemName = '';
  _isShowing = false;
  _focusCallback = () => {};

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
    if (hasDropdown) container.setAttribute(VARIABLES.ATTRIBUTE_DROPDOWN, '');

    setTimeout(() => {
      EventSize({ element });
      OnLoadDropdownSpans({ element });
    }, 10);

    setTimeout(() => {
      DropdownPositionPerViewPort({ element });
    }, 2000);

    // Events

    const resize = () => {
      EventSize({ element });
      DropdownPositionPerViewPort({ element });
    };

    window.addEventListener('resize', () => Debounce(resize, 20));

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
