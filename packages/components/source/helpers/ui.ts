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

export const SlotDefaultStyling = ({
  element,
  slotRef,
}: {
  element: HTMLElement;
  slotRef: string;
}) => {
  const elementRef = element.querySelector(
    `[slot=${slotRef}]`,
  ) as HTMLSlotElement;

  if (!elementRef) return null;
  const isStyled = elementRef.hasAttribute('styled');
  const wrapper = document.createElement('div');

  if (isStyled) {
    wrapper.appendChild(MakeSlot({ type: slotRef }));
  } else {
    wrapper.innerHTML = elementRef.innerHTML;
  }

  return wrapper;
};

export const CheckForAnimationLinkSpan = ({
  element,
}: {
  element: HTMLElement;
}) => {
  const isSlotContent =
    element.querySelector('slot') || element instanceof HTMLSlotElement;
  const link = element.querySelector('a');

  if (isSlotContent) return element;
  if (!link) return element;

  const isLinkSpan = link.querySelector('span');

  if (!isLinkSpan) {
    const span = document.createElement('span');
    span.innerHTML = link.innerHTML;
    link.innerHTML = '';
    link.appendChild(span);

    return element;
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
