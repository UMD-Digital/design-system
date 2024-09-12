const AnimationLinkSpan = ({
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

// To Do - Verify still a need

const CtaStyle = ({
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

const TruncateText = ({
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

  const isRequriesTrunciation = text.length > textSize;

  if (isRequriesTrunciation) {
    text = `${text.slice(0, textSize)} ...`;
  }

  return text;
};

const CleanCopy = ({ element }: { element: HTMLElement }) => {
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

export default {
  AnimationLinkSpan,
  CleanCopy,
  CtaStyle,
  TruncateText,
};
