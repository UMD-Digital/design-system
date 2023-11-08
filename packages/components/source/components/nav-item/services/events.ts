import { ElementType } from '../component';
import { ELEMENTS } from '../globals';

const ShowDropdown = ({ element }: { element: ElementType }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const dropdownContainer = shadowRoot.querySelector(
    `.${ELEMENTS.CONTAINER}`,
  ) as HTMLDivElement;

  if (!dropdownContainer) return;

  dropdownContainer.setAttribute('data-showing', '');
};

const HideDropdown = ({ element }: { element: ElementType }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const dropdownContainer = shadowRoot.querySelector(
    `.${ELEMENTS.CONTAINER}`,
  ) as HTMLDivElement;

  if (!dropdownContainer) return;

  dropdownContainer.removeAttribute('data-showing');
};

export const EventDropdownToggle = ({ element }: { element: ElementType }) => {
  if (element._isShowing) ShowDropdown({ element });
  if (!element._isShowing) HideDropdown({ element });
};

export const EventSize = ({ element }: { element: ElementType }) => {
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const wrapperElement = shadowRoot.querySelector(
    `.${ELEMENTS.PRIMARLY_LINK_WRAPPER}`,
  );

  if (!wrapperElement) return;

  element.style.width = `${wrapperElement.clientWidth}px`;
};
