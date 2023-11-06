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
  style.innerHTML = styleString;

  body.appendChild(style);
};
