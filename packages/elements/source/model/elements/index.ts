import { createStyledElement } from '../modifiers';
import { type ElementProps } from '../modifiers/_types';

interface ElementModelOption extends ElementProps {
  className: string;
}

/**
 * Creates a styled element with the given properties
 * @param props - Element configuration options
 * @returns The created and styled HTML element
 */
export function create(props: ElementModelOption) {
  const { className, ...rest } = props;
  return createStyledElement(rest, { className });
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
