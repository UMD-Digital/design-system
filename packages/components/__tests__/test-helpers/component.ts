import { ComponentRef } from '../../../_types';

export interface TestComponent {
  element: HTMLElement;
  shadowRoot: ShadowRoot | null;
  ref?: ComponentRef;
}

/**
 * Creates a test component and adds it to the document
 */
export function createTestComponent(
  tagName: string,
  innerHTML?: string,
  attributes?: Record<string, string>
): TestComponent {
  const element = document.createElement(tagName) as HTMLElement;
  
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  
  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }
  
  document.body.appendChild(element);
  
  return {
    element,
    shadowRoot: element.shadowRoot,
  };
}

/**
 * Cleans up test components from the DOM
 */
export function cleanupComponents(): void {
  document.body.innerHTML = '';
}

/**
 * Waits for custom element to be defined
 */
export async function waitForComponentDefinition(tagName: string): Promise<void> {
  // Since we're mocking customElements, we don't need to wait
  // This is just for API compatibility
  return Promise.resolve();
}

/**
 * Gets slotted content from a shadow root
 */
export function getSlottedContent(
  shadowRoot: ShadowRoot | null,
  slotName?: string
): Element[] {
  if (!shadowRoot) return [];
  
  const selector = slotName ? `slot[name="${slotName}"]` : 'slot:not([name])';
  const slot = shadowRoot.querySelector(selector) as HTMLSlotElement;
  
  if (!slot) return [];
  
  return slot.assignedElements();
}

/**
 * Simulates an attribute change and waits for component update
 */
export function setAttributeAndWait(
  element: HTMLElement,
  attributeName: string,
  value: string | null
): void {
  if (value === null) {
    element.removeAttribute(attributeName);
  } else {
    element.setAttribute(attributeName, value);
  }
  
  // Since components are mocked, no need to wait for updates
}

/**
 * Captures console warnings during test execution
 */
export function captureWarnings(callback: () => void): string[] {
  const warnings: string[] = [];
  const originalWarn = console.warn;
  
  console.warn = jest.fn((...args) => {
    warnings.push(args.join(' '));
  });
  
  try {
    callback();
  } finally {
    console.warn = originalWarn;
  }
  
  return warnings;
}

/**
 * Captures console warnings during async test execution
 */
export async function captureWarningsAsync(callback: () => Promise<void>): Promise<string[]> {
  const warnings: string[] = [];
  const originalWarn = console.warn;
  
  console.warn = jest.fn((...args) => {
    warnings.push(args.join(' '));
  });
  
  try {
    await callback();
  } finally {
    console.warn = originalWarn;
  }
  
  return warnings;
}

/**
 * Validates that a component has expected slots
 */
export function validateSlots(
  element: HTMLElement,
  expectedSlots: Array<{ name?: string; required: boolean }>
): void {
  expectedSlots.forEach(({ name, required }) => {
    const slotContent = name
      ? element.querySelector(`[slot="${name}"]`)
      : Array.from(element.children).find(child => !child.hasAttribute('slot'));
    
    if (required && !slotContent) {
      throw new Error(`Required slot ${name ? `"${name}"` : '(default)'} is missing`);
    }
  });
}

/**
 * Creates slot content for testing
 */
export function createSlotContent(
  slotName: string | undefined,
  tagName: string,
  content: string
): HTMLElement {
  const element = document.createElement(tagName);
  element.textContent = content;
  
  if (slotName) {
    element.setAttribute('slot', slotName);
  }
  
  return element;
}