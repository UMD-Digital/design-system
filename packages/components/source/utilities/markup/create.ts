const Node = {
  span: ({ text }: { text: string }) => {
    const span = document.createElement('span');
    span.innerHTML = text;

    return span;
  },

  slot: ({ type }: { type: string }) => {
    const slot = document.createElement('slot');
    slot.setAttribute('name', type);

    return slot;
  },

  linkWithSpan: ({
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
  },
  stylesTemplate: ({ styles }: { styles: string }) => {
    const template = document.createElement('template');

    template.innerHTML = `<style>${styles}</style>`;

    return template;
  },
};

export const SlotWithDefaultStyling = ({
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
    return Node.slot({ type: slotRef });
  }

  const clonedElement = elementRef.cloneNode(true) as HTMLElement;
  clonedElement.removeAttribute('slot');
  return clonedElement;
};

const SlotOberserver = ({
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

export default {
  Node,
  SlotWithDefaultStyling,
  SlotOberserver,
};