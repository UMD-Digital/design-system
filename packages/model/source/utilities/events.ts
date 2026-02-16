export interface CustomEventOptions<T = unknown> {
  detail?: T;
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

export function createCustomEvent<T = unknown>(
  type: string,
  options?: CustomEventOptions<T>,
): CustomEvent<T> {
  return new CustomEvent<T>(type, {
    detail: options?.detail as T,
    bubbles: options?.bubbles ?? true,
    cancelable: options?.cancelable ?? false,
    composed: options?.composed ?? true,
  });
}

export function dispatchCustomEvent<T = unknown>(
  element: EventTarget,
  type: string,
  options?: CustomEventOptions<T>,
): boolean {
  return element.dispatchEvent(createCustomEvent(type, options));
}

export interface DefineEvents<T extends { [key: string]: unknown }> {
  types: { [K in keyof T]: K };
  dispatch<K extends keyof T & string>(
    element: EventTarget,
    type: K,
    detail?: T[K],
  ): boolean;
}

export function defineEvents<
  T extends { [key: string]: unknown },
>(): DefineEvents<T> {
  const types = new Proxy({} as { [K in keyof T]: K }, {
    get(_target, prop: string) {
      return prop;
    },
  });

  function dispatch<K extends keyof T & string>(
    element: EventTarget,
    type: K,
    detail?: T[K],
  ): boolean {
    return dispatchCustomEvent(element, type, { detail });
  }

  return { types, dispatch };
}

export function createEventListener<T extends Event = Event>(
  element: EventTarget,
  type: string,
  handler: (event: T) => void,
  options?: AddEventListenerOptions,
): () => void {
  element.addEventListener(type, handler as EventListener, options);

  let removed = false;
  return () => {
    if (removed) return;
    removed = true;
    element.removeEventListener(type, handler as EventListener, options);
  };
}

export function delegate<T extends HTMLElement = HTMLElement>(
  container: HTMLElement,
  selector: string,
  eventType: string,
  handler: (event: Event, matched: T) => void,
  options?: AddEventListenerOptions,
): () => void {
  const listener = (event: Event) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const matched = target.closest(selector) as T | null;
    if (!matched || !container.contains(matched)) return;

    handler(event, matched);
  };

  return createEventListener(container, eventType, listener, options);
}
