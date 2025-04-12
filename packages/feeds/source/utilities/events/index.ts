/**
 * Event names supported by the feeds library.
 * These can be used for consistent event handling across implementations.
 */
export const eventNames = {
  /** Triggered when a feed has finished loading its content */
  FEED_LOADED: 'feed:loaded',

  /** Triggered when an error occurs during feed loading or processing */
  FEED_ERROR: 'feed:error',

  /** Triggered when a feed item is clicked */
  FEED_ITEM_CLICK: 'feed:item:click',
};

/**
 * Custom event details for different feed events.
 */
export interface FeedEventDetails {
  /** Items in the feed that have been loaded */
  items?: any[];

  /** Error information if a feed failed to load */
  error?: Error | string;

  /** Information about a specific item that was clicked */
  item?: any;

  /** Additional custom data that may be included with any event */
  [key: string]: any;
}

/**
 * Dispatches a custom feed event on the specified element.
 *
 * @param element - The element to dispatch the event on
 * @param eventName - Name of the event to dispatch (use eventNames constants for consistency)
 * @param detail - Event details to include
 * @returns True if the event was dispatched successfully and not cancelled
 *
 * @example
 * ```typescript
 * import { events } from '@universityofmaryland/web-feeds-library/utilities';
 *
 * // Dispatch a feed loaded event
 * events.dispatch(feedContainer, events.eventNames.FEED_LOADED, { items: loadedItems });
 *
 * // Listen for feed loaded events
 * feedContainer.addEventListener(events.eventNames.FEED_LOADED, (event) => {
 *   console.log('Feed loaded with', event.detail.items.length, 'items');
 * });
 * ```
 */
export const dispatch = (
  element: HTMLElement,
  eventName: string,
  detail: FeedEventDetails,
): boolean => {
  const event = new CustomEvent(eventName, {
    detail,
    bubbles: true,
    cancelable: true,
  });

  return element.dispatchEvent(event);
};

/**
 * Adds an event listener for a specific feed event with proper TypeScript typings for the event detail.
 *
 * @param element - The element to attach the event listener to
 * @param eventName - Name of the event to listen for (use eventNames constants for consistency)
 * @param callback - Function to call when the event is triggered
 * @param options - Standard addEventListener options (capture, once, passive, etc.)
 * @returns A function that removes the event listener when called
 *
 * @example
 * ```typescript
 * import { events } from '@universityofmaryland/web-feeds-library/utilities';
 *
 * // Add a typed event listener
 * const removeListener = events.listen(
 *   feedContainer,
 *   events.eventNames.FEED_LOADED,
 *   (detail) => console.log('Feed loaded with', detail.items.length, 'items')
 * );
 *
 * // Later, if needed:
 * removeListener();
 * ```
 */
export const listen = (
  element: HTMLElement,
  eventName: string,
  callback: (detail: FeedEventDetails) => void,
  options?: AddEventListenerOptions,
): (() => void) => {
  const eventListener = (event: Event) => {
    const customEvent = event as CustomEvent<FeedEventDetails>;
    callback(customEvent.detail);
  };

  element.addEventListener(eventName, eventListener, options);

  return () => {
    element.removeEventListener(eventName, eventListener, options);
  };
};
