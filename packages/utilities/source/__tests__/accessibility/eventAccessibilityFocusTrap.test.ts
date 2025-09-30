import { eventAccessibilityFocusTrap } from '../../accessibility/eventAccessibilityFocusTrap';

describe('eventAccessibilityFocusTrap', () => {
  let container: HTMLElement;
  let mockAction: jest.Mock;

  beforeEach(() => {
    container = document.createElement('div');
    mockAction = jest.fn();
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  describe('happy path', () => {
    it('should call action when Escape key is pressed', () => {
      const cleanup = eventAccessibilityFocusTrap({
        element: container,
        action: mockAction,
      });

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(event);

      expect(mockAction).toHaveBeenCalledWith(event);
      expect(mockAction).toHaveBeenCalledTimes(1);

      cleanup();
    });

    it('should focus first button when Tab is pressed outside container', () => {
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      container.appendChild(button1);
      container.appendChild(button2);

      const outsideElement = document.createElement('button');
      document.body.appendChild(outsideElement);

      const focusSpy = jest.spyOn(button1, 'focus');

      const cleanup = eventAccessibilityFocusTrap({
        element: container,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'Tab' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [outsideElement],
      });

      window.dispatchEvent(event);

      expect(focusSpy).toHaveBeenCalled();
      expect(mockAction).not.toHaveBeenCalled();

      cleanup();
    });

    it('should focus first anchor when Tab is pressed outside container', () => {
      const anchor = document.createElement('a');
      anchor.href = '#';
      container.appendChild(anchor);

      const outsideElement = document.createElement('button');
      document.body.appendChild(outsideElement);

      const focusSpy = jest.spyOn(anchor, 'focus');

      const cleanup = eventAccessibilityFocusTrap({
        element: container,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'Tab' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [outsideElement],
      });

      window.dispatchEvent(event);

      expect(focusSpy).toHaveBeenCalled();
      expect(mockAction).not.toHaveBeenCalled();

      cleanup();
    });

    it('should return cleanup function that removes event listeners', () => {
      const cleanup = eventAccessibilityFocusTrap({
        element: container,
        action: mockAction,
      });

      cleanup();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(event);

      expect(mockAction).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should not focus when Tab is pressed inside container', () => {
      const insideButton = document.createElement('button');
      container.appendChild(insideButton);

      const focusSpy = jest.spyOn(insideButton, 'focus');

      const cleanup = eventAccessibilityFocusTrap({
        element: container,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'Tab' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [insideButton, container],
      });

      window.dispatchEvent(event);

      expect(focusSpy).not.toHaveBeenCalled();
      expect(mockAction).not.toHaveBeenCalled();

      cleanup();
    });

    it('should not focus when Tab is pressed on container itself', () => {
      const button = document.createElement('button');
      container.appendChild(button);

      const focusSpy = jest.spyOn(button, 'focus');

      const cleanup = eventAccessibilityFocusTrap({
        element: container,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'Tab' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [container],
      });

      window.dispatchEvent(event);

      expect(focusSpy).not.toHaveBeenCalled();

      cleanup();
    });

    it('should use shadowDomContext as container when provided', () => {
      const shadowDomContext = document.createElement('div');
      const insideButton = document.createElement('button');
      shadowDomContext.appendChild(insideButton);

      const focusSpy = jest.spyOn(insideButton, 'focus');

      const cleanup = eventAccessibilityFocusTrap({
        element: container,
        action: mockAction,
        shadowDomContext,
      });

      const event = new KeyboardEvent('keyup', { key: 'Tab' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [document.body],
      });

      window.dispatchEvent(event);

      expect(focusSpy).toHaveBeenCalled();

      cleanup();
    });

    it('should handle container with no focusable elements', () => {
      const div = document.createElement('div');
      container.appendChild(div);

      const outsideElement = document.createElement('button');
      document.body.appendChild(outsideElement);

      const cleanup = eventAccessibilityFocusTrap({
        element: container,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'Tab' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [outsideElement],
      });

      expect(() => window.dispatchEvent(event)).not.toThrow();

      cleanup();
    });

    it('should handle null shadowDomContext', () => {
      const cleanup = eventAccessibilityFocusTrap({
        element: container,
        action: mockAction,
        shadowDomContext: null,
      });

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(event);

      expect(mockAction).toHaveBeenCalledWith(event);

      cleanup();
    });
  });

  describe('error conditions', () => {
    it('should handle Tab key when element is null or undefined', () => {
      const cleanup = eventAccessibilityFocusTrap({
        element: null as any,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'Tab' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [document.body],
      });

      expect(() => window.dispatchEvent(event)).not.toThrow();

      cleanup();
    });

    it('should handle multiple cleanup calls', () => {
      const cleanup = eventAccessibilityFocusTrap({
        element: container,
        action: mockAction,
      });

      cleanup();
      expect(() => cleanup()).not.toThrow();
    });
  });
});