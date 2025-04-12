import * as events from '../index';

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
      const listener = jest.fn();
      element.addEventListener(events.eventNames.FEED_LOADED, listener);

      const result = events.dispatch(element, events.eventNames.FEED_LOADED, {
        items: [1, 2, 3],
      });

      expect(result).toBe(true);
      expect(listener).toHaveBeenCalledTimes(1);

      const event = listener.mock.calls[0][0] as CustomEvent;
      expect(event.detail).toEqual({ items: [1, 2, 3] });
    });

    test('includes correct event details', () => {
      const listener = jest.fn((event: CustomEvent) => event.detail);
      element.addEventListener(events.eventNames.FEED_ERROR, () => listener);

      const error = new Error('Test error');

      events.dispatch(element, events.eventNames.FEED_ERROR, { error });

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener.mock.results[0].value).toEqual({ error });
    });

    test('returns dispatch result', () => {
      element.addEventListener(
        events.eventNames.FEED_ITEM_CLICK,
        (event) => {},
      );

      const result = events.dispatch(
        element,
        events.eventNames.FEED_ITEM_CLICK,
        {
          item: { id: 1, title: 'Test Item' },
        },
      );

      expect(result).toBe(true);
    });
  });

  describe('listen function', () => {
    test('adds an event listener with proper callback structure', () => {
      const callback = jest.fn();

      const removeListener = events.listen(
        element,
        events.eventNames.FEED_LOADED,
        callback,
      );

      expect(callback).not.toHaveBeenCalled();

      const event = new CustomEvent(events.eventNames.FEED_LOADED, {
        detail: { items: [1, 2, 3] },
      });
      element.dispatchEvent(event);

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({ items: [1, 2, 3] });

      removeListener();

      element.dispatchEvent(event);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('passes the event options to addEventListener', () => {
      const addEventListenerSpy = jest.spyOn(element, 'addEventListener');

      events.listen(element, events.eventNames.FEED_ERROR, () => {}, {
        once: true,
        passive: true,
      });

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        events.eventNames.FEED_ERROR,
        expect.any(Function),
        { once: true, passive: true },
      );

      addEventListenerSpy.mockRestore();
    });
  });
});
