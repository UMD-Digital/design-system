import { createStyledElement } from '../core';
import { type ElementProps } from '../core/_types';

interface ElementModelBase extends ElementProps {
  className: string;
}

type ElementModelDefined = Omit<ElementModelBase, 'element'>;

/**
 * Creates a styled element with the given properties
 * @param props - Element configuration options
 * @returns The created and styled HTML element
 */
export function create(props: ElementModelBase) {
  const { className, ...rest } = props;
  return createStyledElement(rest, { className });
}

/**
 * Creates a styled div element with the given properties
 * @param props - Element configuration options
 * @returns The created and styled HTML element
 */
export function createDiv(props: ElementModelDefined) {
  return create({ ...props, element: document.createElement('div') });
}

/**
 * Creates a styled p element with the given properties
 * @param props - Element configuration options
 * @returns The created and styled HTML element
 */
export function createParagraph(props: ElementModelDefined) {
  return create({ ...props, element: document.createElement('p') });
}

/**
 * Creates a styled span element with the given properties
 * @param props - Element configuration options
 * @returns The created and styled HTML element
 */
export function createSpan(props: ElementModelDefined) {
  return create({ ...props, element: document.createElement('span') });
}
