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
  textSizeSmall = 80,
  textSizeLarge = 110,
  textSizeMax = 232,
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
    text = `${text.substring(0, textSize)} ...`;
  }

  return text;
};

export default {
  AnimationLinkSpan,
  CtaStyle,
  TruncateText,
};
