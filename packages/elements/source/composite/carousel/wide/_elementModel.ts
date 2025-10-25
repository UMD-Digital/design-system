import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { type UMDElement } from '../../../_types';

interface ElementWithRefsProps<T extends Record<string, any>> {
  className: string;
  element?: HTMLElement;
  children?: UMDElement[];
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
  const { refs, element, children, elementStyles, attributes, className } =
    props;

  const builder = element ? new ElementBuilder(element) : new ElementBuilder();

  builder.withClassName(className);

  if (children) {
    builder.withChildren(...children);
  }

  if (elementStyles) {
    builder.withStyles(elementStyles);
  }

  if (attributes) {
    attributes.forEach((attr) => {
      const [key, value] = Object.entries(attr)[0];
      builder.withAttribute(key, value);
    });
  }

  const component = builder.build();

  return {
    element: component.element,
    className,
    styles: component.styles,
    refs,
  };
}
