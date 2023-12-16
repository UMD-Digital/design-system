export const MakeTemplate = ({ styles }: { styles: string }) => {
  const template = document.createElement('template');

  template.innerHTML = `<style>${styles}</style>`;

  return template;
};

export const MakeSpan = ({ text }: { text: string }) => {
  const span = document.createElement('span');
  span.innerHTML = text;

  return span;
};

export const MakeSlot = ({ type }: { type: string }) => {
  const slot = document.createElement('slot');
  slot.setAttribute('name', type);

  return slot;
};

export const CreateLinkWithSpan = ({
  url,
  title,
  label,
}: {
  url: string;
  title: string;
  label?: string;
}) => {
  const link = document.createElement('a');
  const span = document.createElement('span');

  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');

  span.innerText = title;
  link.appendChild(span);

  if (label) link.setAttribute('aria-label', label);

  return link;
};

export const SlotDefaultStyling = ({
  element,
  slotRef,
}: {
  element: HTMLElement;
  slotRef: string;
}) => {
  const elementRef = element.querySelector(
    `:scope > [slot=${slotRef}]`,
  ) as HTMLSlotElement;

  if (!elementRef) return null;
  const isStyled = elementRef.hasAttribute('styled');

  if (isStyled) {
    return MakeSlot({ type: slotRef });
  }

  const clonedElement = elementRef.cloneNode(true) as HTMLElement;
  clonedElement.removeAttribute('slot');
  return clonedElement;
};

export const SlotOberserver = ({
  element,
  shadowDom,
  slots,
  CreateShadowDom,
}: {
  element: HTMLElement;
  shadowDom: ShadowRoot;
  slots: { [key: string]: string };
  CreateShadowDom: ({ element }: { element: any }) => HTMLElement;
}) => {
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'styled') {
          const firstChild = shadowDom.querySelector('div');

          if (firstChild) {
            firstChild.remove();
            shadowDom.appendChild(CreateShadowDom({ element }));
          }
        }
      }
    });
  });

  Object.values(slots).forEach((slotName) => {
    const slot = element.querySelector(
      `[slot="${slotName}"]`,
    ) as HTMLSlotElement;

    if (slot) {
      observer.observe(slot, { attributes: true });
    }
  });
};

export const CheckForAnimationLinkSpan = ({
  element,
}: {
  element: HTMLElement | HTMLAnchorElement;
}) => {
  const isSlotContent =
    element.querySelector('slot') || element instanceof HTMLSlotElement;
  const link =
    element instanceof HTMLAnchorElement ? element : element.querySelector('a');

  if (isSlotContent) return;
  if (!link) return;

  const isLinkSpan = link.querySelector('span');

  if (!isLinkSpan) {
    const span = document.createElement('span');
    span.innerHTML = link.innerHTML;
    link.innerHTML = '';
    link.appendChild(span);
  }
};

export const CheckForImageAlt = ({
  element,
  slotRef,
}: {
  element: HTMLElement;
  slotRef: string;
}) => {
  const imageSlot: any = element.querySelector(
    `[slot="${slotRef}"]`,
  ) as HTMLElement;
  const isImage = imageSlot instanceof HTMLImageElement;
  let image = imageSlot;

  if (!isImage && imageSlot) {
    image = imageSlot.querySelector('img');
  }

  if (image) {
    const altText = image.getAttribute('alt');
    if (!altText) {
      console.error('Image elements require alt text');
      return false;
    }
  }

  return true;
};

export const CheckForCtaStyle = ({
  element,
  styleClass,
}: {
  element: HTMLElement | HTMLAnchorElement;
  styleClass: string;
}) => {
  if (element.nodeName === 'A') {
    element.classList.add(styleClass);
  } else {
    const link = element.querySelector('a');
    if (link) {
      link.classList.add(styleClass);
    }
  }
};
