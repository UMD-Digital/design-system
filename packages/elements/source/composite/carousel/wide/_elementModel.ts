import ElementBuilder from '@universityofmaryland/web-builder-library';
import { type ElementVisual } from '../../../_types';

interface ElementWithRefsProps<T extends Record<string, any>> {
  className: string;
  element?: HTMLElement;
  children?: ElementVisual[];
  elementStyles?: any;
  attributes?: Record<string, string>[];
  refs: T;
}

export interface ElementWithRefsReturn<T extends Record<string, any>> {
  element: HTMLElement;
  className: string;
  styles: string;
  refs: T;
}

export function createElementWithRefs<T extends Record<string, any>>(
  props: ElementWithRefsProps<T>,
): ElementWithRefsReturn<T> {
  const { refs, element, ...elementProps } = props;

  const component = element
    ? ElementBuilder.create.element({
        element,
        ...elementProps,
      })
    : ElementBuilder.create.div(elementProps);

  return {
    ...component,
    refs,
  };
}
