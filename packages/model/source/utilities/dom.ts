export type MutationObserverOptions = MutationObserverInit;

export interface ResizeObserverOptionsConfig {
  box?: ResizeObserverBoxOptions;
}

export type IntersectionObserverOptions = IntersectionObserverInit;

export function createMutationObserver(
  target: Node,
  callback: MutationCallback,
  options?: MutationObserverOptions,
): () => void {
  const observer = new MutationObserver(callback);
  observer.observe(target, options ?? { childList: true, subtree: true });

  let disconnected = false;
  return () => {
    if (disconnected) return;
    disconnected = true;
    observer.disconnect();
  };
}

export function createResizeObserver(
  target: Element,
  callback: ResizeObserverCallback,
  options?: ResizeObserverOptionsConfig,
): () => void {
  const observer = new ResizeObserver(callback);
  observer.observe(target, options);

  let disconnected = false;
  return () => {
    if (disconnected) return;
    disconnected = true;
    observer.disconnect();
  };
}

export function createIntersectionObserver(
  target: Element,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverOptions,
): () => void {
  const observer = new IntersectionObserver(callback, options);
  observer.observe(target);

  let disconnected = false;
  return () => {
    if (disconnected) return;
    disconnected = true;
    observer.disconnect();
  };
}

export function querySlotted(
  slot: HTMLSlotElement,
  selector?: string,
): Element[] {
  const elements = slot.assignedElements({ flatten: true });
  if (!selector) return elements;
  return elements.filter((el) => el.matches(selector));
}

export function closestAcrossShadow(
  element: Element,
  selector: string,
): Element | null {
  let current: Element | null = element;

  while (current) {
    const match = current.closest(selector);
    if (match) return match;

    const root = current.getRootNode();
    if (root instanceof ShadowRoot) {
      current = root.host;
    } else {
      return null;
    }
  }

  return null;
}
