export interface ComponentRef {
  element: HTMLElement | DocumentFragment;
  styles?: string;
  events?: {
    load?: () => void;
    destroy?: () => void;
    recalculate?: () => void;
    resize?: () => void;
    [key: string]: any;
  };
}

/**
 * Helper to adapt ComponentRef to ElementVisual type
 *
 * @param ref - ComponentRef to convert
 * @returns ElementVisual-compatible object or undefined
 *
 * @example
 * ```typescript
 * const eventMeta = extractEventData(element);
 * const elementVisual = toElementVisual(eventMeta);
 * ```
 */
export function toElementVisual(ref: ComponentRef | undefined) {
  if (!ref) return undefined;
  // ElementVisual expects element to be HTMLElement and className property
  if (ref.element instanceof HTMLElement) {
    return {
      ...ref,
      className: ref.styles || '',
    } as any;
  }
  return undefined;
}
