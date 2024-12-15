export const findParent = ({
  element,
  attr,
}: {
  element: HTMLElement;
  attr: string;
}) => {
  let parent = element;

  const findParentElementByAttribute: any = ({
    element,
    attr,
  }: {
    element: HTMLElement | null;
    attr: string;
  }) => {
    if (!element || element.hasAttribute(attr)) {
      return element;
    } else {
      return findParentElementByAttribute({
        element: element.parentElement,
        attr,
      });
    }
  };

  const foundElement = findParentElementByAttribute({ element, attr });
  if (foundElement) parent = foundElement;

  return parent;
};
