import { SlotWithDefaultStyling } from './create';
import type { ComponentRef } from '../../_types';

/**
 * Type guard to check if a value is an HTMLElement
 * 
 * @param value - Value to check
 * @returns True if value is an HTMLElement
 * 
 * @example
 * ```typescript
 * const element = document.querySelector('.my-element');
 * if (isHTMLElement(element)) {
 *   // TypeScript knows element is HTMLElement here
 *   element.style.display = 'block';
 * }
 * ```
 */
export function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
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

export const imageAlt = ({
  element,
  slotRef,
}: {
  element: HTMLElement;
  slotRef: string;
}) => {
  const imageSlot: any = element.querySelector(
    `[slot="${slotRef}"]`,
  ) as HTMLElement;
  const isImage = imageSlot instanceof HTMLImageElement;
  let image = imageSlot;

  if (!isImage && imageSlot) {
    image = imageSlot.querySelector('img');
  }

  return ImageHasAlt({ image });
};

export const ImageHasAlt = ({ image }: { image: HTMLImageElement }) => {
  if (!image) return true;

  const altText = image.getAttribute('alt');
  if (!altText) {
    console.error('Image elements require alt text');
    return false;
  }

  return true;
};

export const ImageSlot = ({
  element,
  ImageSlot,
}: {
  element: HTMLElement;
  ImageSlot: string;
}) => {
  const isProperImage = imageAlt({ element, slotRef: ImageSlot });
  const slotImage = SlotWithDefaultStyling({ element, slotRef: ImageSlot });

  if (isProperImage && slotImage) {
    return slotImage.cloneNode(true) as HTMLImageElement;
  }

  return null;
};
