/**
 * Removes one or more CSS classes from an HTML element
 *
 * @param element - The HTML element to remove classes from
 * @param classNames - Class name(s) to remove (space-separated string or array)
 *
 * @example
 * ```typescript
 * const element = document.querySelector('.my-element');
 * removeClass(element, 'active');
 * removeClass(element, 'active visible');
 * removeClass(element, ['active', 'visible']);
 * ```
 *
 * @category dom
 */
export const removeClass = (
  element: HTMLElement,
  classNames: string | string[]
): void => {
  if (!element) {
    throw new Error('Element is required');
  }

  const classes = Array.isArray(classNames)
    ? classNames.filter(Boolean)
    : classNames.split(' ').filter(Boolean);

  element.classList.remove(...classes);
};