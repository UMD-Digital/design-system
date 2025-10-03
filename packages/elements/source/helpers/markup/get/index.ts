export const icon = ({ element }: { element: HTMLElement }) => {
  const svgIcon = element.querySelector(`svg`);
  const imgIcon = element.querySelector(`img`);

  if (svgIcon) {
    const colorSet = svgIcon.getAttribute('color');

    if (colorSet) {
      const path = svgIcon.querySelector('path');
      if (path) path.style.fill = colorSet;
    }

    return svgIcon;
  }

  if (imgIcon) return imgIcon;
  return null;
};

export const findParent = ({
  element,
  attr,
}: {
  element: HTMLElement;
  attr: string;
}): HTMLElement | null => {
  let currentElement: HTMLElement | null = element;

  while (currentElement && currentElement !== document.body) {
    if (currentElement.hasAttribute(attr)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }

  return null;
};
