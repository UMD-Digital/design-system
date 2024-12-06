type EventAccessibilityFocusParams = {
  element: HTMLElement | Element;
  action: (arg: KeyboardEvent) => void;
  shadowDomContext?: HTMLElement | null;
};

export type EventAccessibilityFocusType = (
  arg: EventAccessibilityFocusParams,
) => () => void;
export type EventAccessibilityEventsType = () => void | undefined;

const EventAccessibilityFocus: EventAccessibilityFocusType = ({
  element,
  action,
  shadowDomContext,
}) => {
  const escapeEvent = (event: KeyboardEvent) => {
    if (event.keyCode == 27) {
      action(event);
    }
  };

  const keyEvent = (event: KeyboardEvent) => {
    const currentElement = event.composedPath()[0] as HTMLElement;

    if (event.key === 'Tab') {
      if (!element) return;

      const hasElement = element.contains(currentElement);
      const hasShadowDomContext = shadowDomContext?.contains(currentElement);
      const isCurrentElement = currentElement === element;

      if (!hasElement && !hasShadowDomContext && !isCurrentElement) {
        action(event);
      }
    }

    if (event.key === 'ArrowDown') {
      const nextElement = currentElement.nextElementSibling as HTMLElement;

      if (element && !element.contains(nextElement)) {
        action(event);
      } else {
        nextElement.focus();
      }
    }

    if (event.key === 'ArrowUp') {
      const previousElement =
        currentElement.previousElementSibling as HTMLElement;

      if (element && !element.contains(previousElement)) {
        action(event);
      } else {
        previousElement.focus();
      }
    }
  };

  window.addEventListener('keydown', escapeEvent);
  window.addEventListener('keyup', keyEvent);

  return () => {
    window.removeEventListener('keydown', escapeEvent);
    window.removeEventListener('keyup', keyEvent);
  };
};

const EventAccessibilityFocusTrap: EventAccessibilityFocusType = ({
  element,
  action,
  shadowDomContext,
}) => {
  const container = shadowDomContext || element;
  const escapeEvent = (event: KeyboardEvent) => {
    if (event.key == 'Escape') {
      action(event);
    }
  };

  const keyEvent = (event: KeyboardEvent) => {
    const currentElement = event.composedPath()[0] as HTMLElement;

    if (event.key === 'Tab') {
      const firstElement = container?.querySelector('button') as HTMLElement;
      const hasElement = container.contains(currentElement);

      if (!hasElement) {
        firstElement.focus();
      }
    }
  };

  window.addEventListener('keydown', escapeEvent);
  window.addEventListener('keyup', keyEvent);

  return () => {
    window.removeEventListener('keydown', escapeEvent);
    window.removeEventListener('keyup', keyEvent);
  };
};

const IsScreenZoomed = () => {
  const isHighDPI = window.devicePixelRatio > 1;
  const browserZoomLevel = Math.round(window.devicePixelRatio * 100);

  if (isHighDPI && browserZoomLevel > 200) return true;
  if (!isHighDPI && browserZoomLevel > 100) return true;

  return false;
};

const IsPrefferdReducedMotion = () =>
  window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;

export default {
  EventAccessibilityFocus,
  EventAccessibilityFocusTrap,
  IsScreenZoomed,
  IsPrefferdReducedMotion,
};
