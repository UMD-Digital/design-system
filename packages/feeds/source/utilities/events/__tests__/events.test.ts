import { events } from '..';

describe('Events Utility', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  afterEach(() => {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });

  describe('event constants', () => {
    test('exports predefined event names', () => {
      expect(events.eventNames.FEED_LOADED).toBe('feed:loaded');
      expect(events.eventNames.FEED_ERROR).toBe('feed:error');
      expect(events.eventNames.FEED_ITEM_CLICK).toBe('feed:item:click');
    });
  });

  describe('dispatch function', () => {
    test('successfully dispatches a custom event', () => {
      // Create a listener to verify the event
      const listener = jest.fn();
      element.addEventListener(events.eventNames.FEED_LOADED, listener);

      // Dispatch the event
      const result = events.dispatch(element, events.eventNames.FEED_LOADED, { items: [1, 2, 3] });

      // Verify the event was dispatched
      expect(result).toBe(true);
      expect(listener).toHaveBeenCalledTimes(1);

      // Get the event argument
      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail).toEqual({ items: [1, 2, 3] });
    });

    test('includes correct event details', () => {
      // Create a listener with a specific detail structure
      const listener = jest.fn((event: CustomEvent) => event.detail);
      element.addEventListener(events.eventNames.FEED_ERROR, listener);

      // Create a sample error
      const error = new Error('Test error');

      // Dispatch the event
      events.dispatch(element, events.eventNames.FEED_ERROR, { error });

      // Verify the details were passed correctly
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.results[0].value).toEqual({ error });
    });

    test('returns dispatch result', () => {
      // Create a listener
      element.addEventListener(events.eventNames.FEED_ITEM_CLICK, (event) => {
        // A real implementation would do something with the event
      });

      // Dispatch the event
      const result = events.dispatch(element, events.eventNames.FEED_ITEM_CLICK, { 
        item: { id: 1, title: 'Test Item' } 
      });

      // Verify the dispatch succeeded (we're just testing the return value here)
      expect(result).toBe(true);
    });
  });

  describe('listen function', () => {
    test('adds an event listener with proper callback structure', () => {
      // Create a mock callback
      const callback = jest.fn();

      // Add the listener using the utility function
      const removeListener = events.listen(
        element,
        events.eventNames.FEED_LOADED,
        callback
      );

      // Verify the callback hasn't been called yet
      expect(callback).not.toHaveBeenCalled();

      // Manually trigger an event
      const event = new CustomEvent(events.eventNames.FEED_LOADED, {
        detail: { items: [1, 2, 3] }
      });
      element.dispatchEvent(event);

      // Verify callback was called with the correct details
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({ items: [1, 2, 3] });

      // Test the returned cleanup function
      removeListener();

      // Dispatch another event
      element.dispatchEvent(event);

      // Verify no additional calls were made
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('passes the event options to addEventListener', () => {
      // Mock addEventListener to check if options are passed correctly
      const addEventListenerSpy = jest.spyOn(element, 'addEventListener');

      // Use listen with options
      events.listen(
        element,
        events.eventNames.FEED_ERROR,
        () => {},
        { once: true, passive: true }
      );

      // Verify options were passed correctly
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        events.eventNames.FEED_ERROR,
        expect.any(Function),
        { once: true, passive: true }
      );

      // Clean up spy
      addEventListenerSpy.mockRestore();
    });
  });
});