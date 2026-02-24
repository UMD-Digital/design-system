export interface SlotchangeEvent {
  slot: HTMLSlotElement;
  elements: Element[];
  nodes: Node[];
  slotName?: string;
}

export interface SlotchangeOptions {
  /** Debounce delay in ms (default: 0) */
  debounce?: number;
  /** Slot name to listen to (undefined = all slots) */
  slotName?: string;
  /** Whether to flatten assigned nodes */
  flatten?: boolean;
  /** Fire callback immediately with current content */
  immediate?: boolean;
}

export interface SlotchangeHandler {
  connect(): void;
  disconnect(): void;
}

export type { ReactiveController, ReactiveControllerHost } from '../_types';
import type { ReactiveController, ReactiveControllerHost } from '../_types';

export function createSlotchangeHandler(
  host: HTMLElement,
  callback: (event: SlotchangeEvent) => void,
  options?: SlotchangeOptions,
): SlotchangeHandler {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const handler = (event: Event) => {
    const slot = event.target as HTMLSlotElement;

    if (options?.slotName !== undefined) {
      const name = slot.name || '';
      if (name !== options.slotName) return;
    }

    const flatten = options?.flatten ?? false;
    const elements = slot.assignedElements({ flatten });
    const nodes = Array.from(slot.assignedNodes({ flatten }));

    const invoke = () => {
      callback({
        slot,
        elements,
        nodes,
        slotName: slot.name || undefined,
      });
    };

    if (options?.debounce && options.debounce > 0) {
      if (timeoutId !== null) clearTimeout(timeoutId);
      timeoutId = setTimeout(invoke, options.debounce);
    } else {
      invoke();
    }
  };

  return {
    connect() {
      host.shadowRoot?.addEventListener('slotchange', handler);

      if (options?.immediate) {
        const flatten = options.flatten ?? false;
        const slots =
          host.shadowRoot?.querySelectorAll<HTMLSlotElement>('slot') ?? [];

        slots.forEach((slot) => {
          const name = slot.name || '';
          if (options.slotName !== undefined && name !== options.slotName) {
            return;
          }

          callback({
            slot,
            elements: slot.assignedElements({ flatten }),
            nodes: Array.from(slot.assignedNodes({ flatten })),
            slotName: slot.name || undefined,
          });
        });
      }
    },
    disconnect() {
      host.shadowRoot?.removeEventListener('slotchange', handler);
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    },
  };
}

export class SlotchangeController implements ReactiveController {
  private handlers: SlotchangeHandler[] = [];

  constructor(
    private host: ReactiveControllerHost,
    private configs: Array<{
      slotName?: string;
      callback: (event: SlotchangeEvent) => void;
      options?: SlotchangeOptions;
    }>,
  ) {
    host.addController(this);
  }

  hostConnected() {
    for (const config of this.configs) {
      const handler = createSlotchangeHandler(
        this.host,
        config.callback,
        { ...config.options, slotName: config.slotName },
      );
      handler.connect();
      this.handlers.push(handler);
    }
  }

  hostDisconnected() {
    this.handlers.forEach((h) => h.disconnect());
    this.handlers = [];
  }
}
