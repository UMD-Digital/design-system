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

export const MakeDefaultStyleTag = ({
  styleString,
}: {
  styleString: string;
}) => {
  const body = document.querySelector('body') as HTMLBodyElement;
  const style = document.createElement('style');
  style.innerHTML = `${styleString.replace(/\s\s+/g, ' ')}`;

  body.appendChild(style);
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
