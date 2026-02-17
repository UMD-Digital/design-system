export function isElement(value: unknown): value is Element {
  return value instanceof Element;
}

export function isHTMLElement(value: unknown): value is HTMLElement {
  return value instanceof HTMLElement;
}

export function isCustomElement(element: Element): boolean {
  return customElements.get(element.tagName.toLowerCase()) !== undefined;
}

export function isShadowRoot(value: unknown): value is ShadowRoot {
  return value instanceof ShadowRoot;
}

export function isSlotElement(value: unknown): value is HTMLSlotElement {
  return value instanceof HTMLSlotElement;
}

export function isTemplateElement(
  value: unknown,
): value is HTMLTemplateElement {
  return value instanceof HTMLTemplateElement;
}

export function assertElement(
  value: unknown,
  message?: string,
): asserts value is Element {
  if (!isElement(value)) {
    throw new TypeError(message ?? `Expected Element, got ${typeof value}`);
  }
}

export function assertHTMLElement(
  value: unknown,
  message?: string,
): asserts value is HTMLElement {
  if (!isHTMLElement(value)) {
    throw new TypeError(message ?? `Expected HTMLElement, got ${typeof value}`);
  }
}

export function assertShadowRoot(
  value: unknown,
  message?: string,
): asserts value is ShadowRoot {
  if (!isShadowRoot(value)) {
    throw new TypeError(message ?? `Expected ShadowRoot, got ${typeof value}`);
  }
}
