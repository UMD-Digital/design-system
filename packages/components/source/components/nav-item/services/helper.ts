import { MarkupModify } from 'utilities';
import { SLOTS, ELEMENTS } from '../globals';
import { UMDNavItemElement } from '../index';

const { DROPDOWN_LINKS } = SLOTS;
const { DROPDOWN_CONTAINER } = ELEMENTS;

const BOUNDS_SHIFT = 140;

export const OnLoadDropdownSpans = ({
  element,
}: {
  element: UMDNavItemElement;
}) => {
  const dropdownSlot = element.querySelector(
    `[slot=${DROPDOWN_LINKS}]`,
  ) as HTMLSlotElement;

  if (!dropdownSlot) return;

  const links = Array.from(
    dropdownSlot.querySelectorAll('a'),
  ) as HTMLAnchorElement[];

  links.forEach((link) => {
    const hasSpan = link.querySelector('span');

    if (!hasSpan) {
      MarkupModify.AnimationLinkSpan({ element: link });
      link.appendChild(link);
    }
  });
};

export const DropdownPositionPerViewPort = ({
  element,
}: {
  element: UMDNavItemElement;
}) => {
  const elementBounds = element.getBoundingClientRect();
  const shadowRoot = element.shadowRoot as ShadowRoot;
  const dropdownContainer = shadowRoot.querySelector(
    `.${DROPDOWN_CONTAINER}`,
  ) as HTMLDivElement;
  const width = element.offsetWidth;

  if (!dropdownContainer) return;

  const size = dropdownContainer.offsetWidth + BOUNDS_SHIFT;

  if (elementBounds.left + width < size) {
    dropdownContainer.style.left = '0';
    dropdownContainer.style.transform = 'translateX(0)';
  }

  if (window.innerWidth - (elementBounds.right + width) < BOUNDS_SHIFT) {
    dropdownContainer.style.right = '0';
    dropdownContainer.style.left = 'inherit';
    dropdownContainer.style.transform = 'translateX(0)';
  }
};
