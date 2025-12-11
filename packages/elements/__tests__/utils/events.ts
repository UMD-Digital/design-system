/**
 * Event testing utilities
 */

/**
 * Simulates a click event on an element
 */
export function simulateClick(element: HTMLElement, options?: MouseEventInit): void {
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
    ...options,
  });
  element.dispatchEvent(event);
}

/**
 * Simulates keyboard events
 */
export function simulateKeyboard(
  element: HTMLElement,
  key: string,
  type: 'keydown' | 'keyup' | 'keypress' = 'keydown',
  options?: KeyboardEventInit
): void {
  const event = new KeyboardEvent(type, {
    key,
    bubbles: true,
    cancelable: true,
    ...options,
  });
  element.dispatchEvent(event);
}

/**
 * Simulates input change
 */
export function simulateInput(
  input: HTMLInputElement | HTMLTextAreaElement,
  value: string
): void {
  input.value = value;
  const event = new Event('input', { bubbles: true, cancelable: true });
  input.dispatchEvent(event);
}

/**
 * Simulates form submission
 */
export function simulateSubmit(form: HTMLFormElement): void {
  const event = new Event('submit', { bubbles: true, cancelable: true });
  form.dispatchEvent(event);
}

/**
 * Simulates focus events
 */
export function simulateFocus(element: HTMLElement): void {
  element.focus();
  const event = new FocusEvent('focus', { bubbles: true });
  element.dispatchEvent(event);
}

/**
 * Simulates blur events
 */
export function simulateBlur(element: HTMLElement): void {
  element.blur();
  const event = new FocusEvent('blur', { bubbles: true });
  element.dispatchEvent(event);
}

/**
 * Simulates mouse events
 */
export function simulateMouse(
  element: HTMLElement,
  type: 'mouseenter' | 'mouseleave' | 'mouseover' | 'mouseout' | 'mousemove',
  options?: MouseEventInit
): void {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    view: window,
    ...options,
  });
  element.dispatchEvent(event);
}

/**
 * Simulates scroll events
 */
export function simulateScroll(
  element: HTMLElement | Window,
  scrollTop: number,
  scrollLeft: number = 0
): void {
  if (element instanceof Window) {
    window.scrollTo(scrollLeft, scrollTop);
  } else {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
  
  const event = new Event('scroll', { bubbles: true, cancelable: true });
  element.dispatchEvent(event);
}

/**
 * Simulates resize events
 */
export function simulateResize(width: number, height: number): void {
  // Update window dimensions (mocked in jsdom)
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });

  const event = new Event('resize', { bubbles: true, cancelable: true });
  window.dispatchEvent(event);
}

/**
 * Waits for an event to be fired
 */
export function waitForEvent(
  element: HTMLElement | Window,
  eventName: string,
  timeout: number = 1000
): Promise<Event> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      element.removeEventListener(eventName, handler);
      reject(new Error(`Event '${eventName}' did not fire within ${timeout}ms`));
    }, timeout);

    const handler = (event: Event) => {
      clearTimeout(timer);
      element.removeEventListener(eventName, handler);
      resolve(event);
    };

    element.addEventListener(eventName, handler);
  });
}

/**
 * Creates a spy for event listeners
 */
export function spyOnEvent(
  element: HTMLElement | Window,
  eventName: string
): jest.Mock {
  const spy = jest.fn();
  element.addEventListener(eventName, spy);
  
  // Return spy with cleanup method
  (spy as any).cleanup = () => {
    element.removeEventListener(eventName, spy);
  };
  
  return spy;
}

/**
 * Triggers a custom event
 */
export function triggerCustomEvent(
  element: HTMLElement,
  eventName: string,
  detail?: any
): void {
  const event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    detail,
  });
  element.dispatchEvent(event);
}