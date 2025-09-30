import { eventAccessibilityFocus } from '../../accessibility/eventAccessibilityFocus';

describe('eventAccessibilityFocus', () => {
  let element: HTMLElement;
  let shadowDomContext: HTMLElement;
  let mockAction: jest.Mock;

  beforeEach(() => {
    element = document.createElement('div');
    shadowDomContext = document.createElement('div');
    mockAction = jest.fn();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  describe('happy path', () => {
    it('should call action when Escape key is pressed', () => {
      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
      });

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(event);

      expect(mockAction).toHaveBeenCalledWith(event);
      expect(mockAction).toHaveBeenCalledTimes(1);

      cleanup();
    });

    it('should call action when Tab key is pressed outside element', () => {
      const outsideElement = document.createElement('button');
      document.body.appendChild(outsideElement);

      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'Tab' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [outsideElement],
      });

      window.dispatchEvent(event);

      expect(mockAction).toHaveBeenCalledWith(event);
      expect(mockAction).toHaveBeenCalledTimes(1);

      cleanup();
    });

    it('should focus next sibling when ArrowDown is pressed', () => {
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      element.appendChild(button1);
      element.appendChild(button2);

      const focusSpy = jest.spyOn(button2, 'focus');

      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'ArrowDown' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [button1],
      });

      window.dispatchEvent(event);

      expect(focusSpy).toHaveBeenCalled();
      expect(mockAction).not.toHaveBeenCalled();

      cleanup();
    });

    it('should focus previous sibling when ArrowUp is pressed', () => {
      const button1 = document.createElement('button');
      const button2 = document.createElement('button');
      element.appendChild(button1);
      element.appendChild(button2);

      const focusSpy = jest.spyOn(button1, 'focus');

      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'ArrowUp' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [button2],
      });

      window.dispatchEvent(event);

      expect(focusSpy).toHaveBeenCalled();
      expect(mockAction).not.toHaveBeenCalled();

      cleanup();
    });

    it('should return cleanup function that removes event listeners', () => {
      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
      });

      cleanup();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      window.dispatchEvent(event);

      expect(mockAction).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should not call action when Tab is pressed inside element', () => {
      const insideButton = document.createElement('button');
      element.appendChild(insideButton);

      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'Tab' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [insideButton],
      });

      window.dispatchEvent(event);

      expect(mockAction).not.toHaveBeenCalled();

      cleanup();
    });

    it('should not call action when Tab is pressed inside shadowDomContext', () => {
      const insideButton = document.createElement('button');
      shadowDomContext.appendChild(insideButton);

      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
        shadowDomContext,
      });

      const event = new KeyboardEvent('keyup', { key: 'Tab' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [insideButton],
      });

      window.dispatchEvent(event);

      expect(mockAction).not.toHaveBeenCalled();

      cleanup();
    });

    it('should not call action when Tab is pressed on the element itself', () => {
      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'Tab' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [element],
      });

      window.dispatchEvent(event);

      expect(mockAction).not.toHaveBeenCalled();

      cleanup();
    });

    it('should call action when ArrowDown is pressed and next sibling is outside element', () => {
      const button = document.createElement('button');
      const outsideButton = document.createElement('button');
      element.appendChild(button);
      document.body.appendChild(outsideButton);

      // Make outsideButton the next sibling
      button.parentNode?.insertBefore(outsideButton, button.nextSibling);

      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'ArrowDown' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [button],
      });

      window.dispatchEvent(event);

      expect(mockAction).toHaveBeenCalledWith(event);

      cleanup();
    });

    it('should call action when ArrowUp is pressed and previous sibling is outside element', () => {
      const button = document.createElement('button');
      const outsideButton = document.createElement('button');
      element.appendChild(button);
      document.body.insertBefore(outsideButton, element);
      element.insertBefore(button, element.firstChild);

      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'ArrowUp' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [button],
      });

      window.dispatchEvent(event);

      expect(mockAction).toHaveBeenCalledWith(event);

      cleanup();
    });

    it('should not focus anything when ArrowDown is pressed and there is no next sibling', () => {
      const button = document.createElement('button');
      element.appendChild(button);

      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'ArrowDown' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [button],
      });

      window.dispatchEvent(event);

      expect(mockAction).not.toHaveBeenCalled();

      cleanup();
    });

    it('should not focus anything when ArrowUp is pressed and there is no previous sibling', () => {
      const button = document.createElement('button');
      element.appendChild(button);

      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'ArrowUp' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [button],
      });

      window.dispatchEvent(event);

      expect(mockAction).not.toHaveBeenCalled();

      cleanup();
    });

    it('should handle null shadowDomContext', () => {
      const cleanup = eventAccessibilityFocus({
        element,
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
      const cleanup = eventAccessibilityFocus({
        element: null as any,
        action: mockAction,
      });

      const event = new KeyboardEvent('keyup', { key: 'Tab' });
      Object.defineProperty(event, 'composedPath', {
        value: () => [document.body],
      });

      expect(() => window.dispatchEvent(event)).not.toThrow();
      expect(mockAction).not.toHaveBeenCalled();

      cleanup();
    });

    it('should handle multiple cleanup calls', () => {
      const cleanup = eventAccessibilityFocus({
        element,
        action: mockAction,
      });

      cleanup();
      expect(() => cleanup()).not.toThrow();
    });
  });
});