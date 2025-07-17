import { createStyledElement } from '../modifiers';
import { type ElementProps } from '../modifiers/_types';

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

export * as actions from './actions';
export * as assets from './assets';
export * as buttons from './buttons';
export * as composite from './composite';
export * as event from './event';
export * as headline from './headline';
export * as layout from './layout';
export * as richText from './rich-text';
export * as text from './text';

export default create;
