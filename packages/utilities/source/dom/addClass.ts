/**
 * Adds one or more CSS classes to an HTML element
 *
 * @param element - The HTML element to add classes to
 * @param classNames - Class name(s) to add (space-separated string or array)
 *
 * @example
 * ```typescript
 * const element = document.querySelector('.my-element');
 * addClass(element, 'active');
 * addClass(element, 'active visible');
 * addClass(element, ['active', 'visible']);
 * ```
 */
export const addClass = (
  element: HTMLElement,
  classNames: string | string[]
): void => {
  if (!element) {
    throw new Error('Element is required');
  }

  const classes = Array.isArray(classNames)
    ? classNames
    : classNames.split(' ').filter(Boolean);

  element.classList.add(...classes);
};