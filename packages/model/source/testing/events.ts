function simulateEvent<T = unknown>(
  target: EventTarget,
  type: string,
  detail?: T,
  options?: { bubbles?: boolean; composed?: boolean },
): void {
  const event = new CustomEvent(type, {
    detail,
    bubbles: options?.bubbles ?? true,
    composed: options?.composed ?? true,
  });
  target.dispatchEvent(event);
}

function waitForEvent<E extends Event = CustomEvent>(
  target: EventTarget,
  type: string,
  timeout = 1000,
): Promise<E> {
  return new Promise<E>((resolve, reject) => {
    let timer: ReturnType<typeof setTimeout>;

    const handler = (event: Event) => {
      clearTimeout(timer);
      target.removeEventListener(type, handler);
      resolve(event as E);
    };

    target.addEventListener(type, handler);

    timer = setTimeout(() => {
      target.removeEventListener(type, handler);
      reject(new Error(`waitForEvent: "${type}" not received within ${timeout}ms`));
    }, timeout);
  });
}

function captureEvents(
  target: EventTarget,
  types: string[],
): { events: Record<string, Event[]>; cleanup: () => void } {
  const events: Record<string, Event[]> = {};
  const listeners: Array<{ type: string; handler: (e: Event) => void }> = [];

  for (const type of types) {
    events[type] = [];
    const handler = (e: Event) => {
      events[type].push(e);
    };
    listeners.push({ type, handler });
    target.addEventListener(type, handler);
  }

  const cleanup = () => {
    for (const { type, handler } of listeners) {
      target.removeEventListener(type, handler);
    }
  };

  return { events, cleanup };
}

export { simulateEvent, waitForEvent, captureEvents };
