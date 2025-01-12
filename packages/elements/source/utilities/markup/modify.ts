export const animationLinkSpan = ({
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

export const wrapTextNodeInSpan = (
  element: HTMLElement | HTMLAnchorElement,
) => {
  const link =
    element instanceof HTMLAnchorElement ? element : element.querySelector('a');
  if (!link) return;

  const textNodes = Array.from(link.childNodes).filter(
    (node) => node.nodeType === Node.TEXT_NODE,
  );
  textNodes.forEach((node) => {
    const span = document.createElement('span');
    span.textContent = node.textContent?.trim() || '';
    node.replaceWith(span);
  });

  return link;
};

export const truncateText = ({
  text,
  maxTextSize,
}: {
  text: string;
  maxTextSize: number;
}) => {
  const wrapper = document.createElement('div');
  const cleanedText = text
    .replace(/[\n\r\t]+/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();

  wrapper.innerHTML = cleanedText;

  let textContent = wrapper.textContent || wrapper.innerText;
  let orginalString = textContent;
  textContent = textContent.slice(0, maxTextSize);

  const walkAndReplace = (node: any) => {
    if (node.nodeType === Node.TEXT_NODE) {
      let newText = textContent.slice(0, node.nodeValue.length);
      textContent = textContent.slice(node.nodeValue.length);

      node.nodeValue = `${newText}`;
    } else {
      node.childNodes.forEach(walkAndReplace);
    }
  };

  walkAndReplace(wrapper);

  if (orginalString.length >= maxTextSize) {
    const lastChild = wrapper.children[
      wrapper.children.length - 1
    ] as HTMLElement;

    if (lastChild) {
      lastChild.innerHTML = lastChild.innerHTML + ' ...';
    } else {
      wrapper.innerHTML += ' ...';
    }
  }

  return wrapper.innerHTML;
};

export const truncateTextBasedOnSize = ({
  text,
  size,
  breakpointLarge = 400,
  breakpointMax = 600,
  textSizeSmall = 220,
  textSizeLarge = 260,
  textSizeMax = 280,
}: {
  text: string;
  size: number;
  breakpointLarge?: number;
  breakpointMax?: number;
  textSizeSmall?: number;
  textSizeLarge?: number;
  textSizeMax?: number;
}) => {
  const isContainerLarge = size >= breakpointLarge;
  const isContainerMax = size >= breakpointMax;
  let textSize = textSizeSmall;

  if (isContainerLarge) textSize = textSizeLarge;
  if (isContainerMax) textSize = textSizeMax;

  return truncateText({ text, maxTextSize: textSize });
};

export const cleanCopy = ({ element }: { element: HTMLElement }) => {
  const clonedNoded = element.cloneNode(true) as HTMLAnchorElement;
  const attributes = Array.from(clonedNoded.attributes);

  attributes.forEach((attribute) => {
    const name = attribute.name;

    if (name !== 'href') {
      clonedNoded.removeAttribute(name);
    }
  });

  return clonedNoded;
};
