import { EventAccessibilityFocus } from 'helpers/accessibility';
import { ElementType } from 'components/nav-item/component';
import { ELEMENTS, VARIABLES } from 'components/nav-item/globals';
import { DropdownPositionPerViewPort } from './helper';

export const ShowDropdown = ({ element }: { element: ElementType }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const dropdownContainer = shadowRoot.querySelector(
    `.${ELEMENTS.CONTAINER}`,
  ) as HTMLDivElement;

  if (!dropdownContainer) return;

  dropdownContainer.setAttribute(VARIABLES.ATTRIBUTE_SHOWING, '');
  DropdownPositionPerViewPort({ element });
};

export const HideDropdown = ({ element }: { element: ElementType }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const dropdownContainer = shadowRoot.querySelector(
    `.${ELEMENTS.CONTAINER}`,
  ) as HTMLDivElement;

  if (!dropdownContainer) return;

  dropdownContainer.removeAttribute(VARIABLES.ATTRIBUTE_SHOWING);
  element._focusCallback();
  element._focusCallback = () => {};
};

export const EventButtonClick = ({ element }: { element: ElementType }) => {
  if (element._isShowing) {
    const shadowRoot = element.shadowRoot as ShadowRoot;
    const dropdownContainer = shadowRoot.querySelector(
      `.${ELEMENTS.DROPDOWN_CONTAINER}`,
    ) as HTMLDivElement;
    const firstElement = dropdownContainer.querySelector(
      'a',
    ) as HTMLAnchorElement;

    ShowDropdown({ element });
    if (firstElement) firstElement.focus();

    element._focusCallback = EventAccessibilityFocus({
      element,
      action: () => HideDropdown({ element }),
    });
  }

  if (!element._isShowing) HideDropdown({ element });
};

export const EventSize = ({ element }: { element: ElementType }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const wrapperElement = shadowRoot.querySelector(
    `.${ELEMENTS.PRIMARLY_LINK_WRAPPER}`,
  ) as HTMLDivElement;

  if (!wrapperElement) return;
  let width = wrapperElement.offsetWidth;

  if (width > 230) {
    width = 230;
    const slottedLink = wrapperElement.querySelector(`a`) as HTMLAnchorElement;
    slottedLink.style.whiteSpace = `initial`;
  }

  element.style.width = `${width}px`;
};
