/**
 * Timer and async testing utilities
 */

/**
 * Advances timers and waits for promises to resolve
 */
export async function flushPromises(): Promise<void> {
  await new Promise(resolve => setImmediate(resolve));
}

/**
 * Waits for a condition to be true
 */
export async function waitFor(
  condition: () => boolean,
  options: {
    timeout?: number;
    interval?: number;
    message?: string;
  } = {}
): Promise<void> {
  const { timeout = 1000, interval = 50, message = 'Condition not met' } = options;
  const startTime = Date.now();

  while (!condition()) {
    if (Date.now() - startTime > timeout) {
      throw new Error(`${message} (timeout: ${timeout}ms)`);
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
}

/**
 * Waits for an element to appear in the DOM
 */
export async function waitForElement(
  selector: string,
  container: HTMLElement | Document = document,
  timeout: number = 1000
): Promise<HTMLElement> {
  const element = await waitFor(
    () => container.querySelector(selector) !== null,
    {
      timeout,
      message: `Element with selector '${selector}' not found`,
    }
  ).then(() => container.querySelector(selector) as HTMLElement);

  return element;
}

/**
 * Waits for an element to be removed from the DOM
 */
export async function waitForElementRemoval(
  selector: string,
  container: HTMLElement | Document = document,
  timeout: number = 1000
): Promise<void> {
  await waitFor(
    () => container.querySelector(selector) === null,
    {
      timeout,
      message: `Element with selector '${selector}' was not removed`,
    }
  );
}

/**
 * Runs callback after animation frame
 */
export async function nextFrame(): Promise<void> {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

/**
 * Waits for a specific number of milliseconds
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Creates a timeout promise that rejects after specified time
 */
export function timeout(ms: number, message?: string): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(message || `Timeout after ${ms}ms`));
    }, ms);
  });
}

/**
 * Runs a function with fake timers
 */
export async function withFakeTimers<T>(
  fn: () => T | Promise<T>
): Promise<T> {
  jest.useFakeTimers();
  try {
    const result = await fn();
    return result;
  } finally {
    jest.useRealTimers();
  }
}

/**
 * Advances timers by time and flushes promises
 */
export async function advanceTimersByTimeAsync(ms: number): Promise<void> {
  jest.advanceTimersByTime(ms);
  await flushPromises();
}

/**
 * Runs all timers and flushes promises
 */
export async function runAllTimersAsync(): Promise<void> {
  jest.runAllTimers();
  await flushPromises();
}

/**
 * Creates a deferred promise
 */
export function createDeferred<T = void>(): {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: any) => void;
} {
  let resolve: (value: T) => void;
  let reject: (reason?: any) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return { promise, resolve: resolve!, reject: reject! };
}