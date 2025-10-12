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
 * Helper to adapt ComponentRef to UMDElement type
 *
 * @param ref - ComponentRef to convert
 * @returns UMDElement-compatible object or undefined
 *
 * @example
 * ```typescript
 * const dateSign = extractEventData(element);
 * const umdElement = toUMDElement(dateSign);
 * ```
 *
 * @category adapters
 */
export function toUMDElement(ref: ComponentRef | undefined) {
  if (!ref) return undefined;
  // Ensure element is HTMLElement, not DocumentFragment
  if (ref.element instanceof HTMLElement) {
    return ref as any;
  }
  // If it's a DocumentFragment, we can't use it as UMDElement
  return undefined;
}
