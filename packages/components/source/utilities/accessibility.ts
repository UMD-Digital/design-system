type EventAccessibilityFocusParams = {
  element: HTMLElement | Element;
  action: (arg: KeyboardEvent) => void;
};

export type EventAccessibilityFocusType = (
  arg: EventAccessibilityFocusParams,
) => () => void;
export type EventAccessibilityEventsType = () => void | undefined;

const EventAccessibilityFocus: EventAccessibilityFocusType = ({
  element,
  action,
}) => {
  const escapeEvent = (event: KeyboardEvent) => {
    if (event.keyCode == 27) {
      action(event);
    }
  };

  const keyEvent = (event: KeyboardEvent) => {
    const currentElement = event.composedPath()[0] as HTMLElement;

    if (event.key === 'Tab') {
      if (
        element &&
        !element.contains(currentElement) &&
        currentElement !== element
      ) {
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
}) => {
  const escapeEvent = (event: KeyboardEvent) => {
    if (event.key == 'Escape') {
      action(event);
    }
  };

  const keyEvent = (event: KeyboardEvent) => {
    const currentElement = event.composedPath()[0] as HTMLElement;

    if (event.key === 'Tab') {
      const firstElement = element?.firstElementChild as HTMLElement;

      if (element && !element.contains(currentElement)) {
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

export default {
  EventAccessibilityFocus,
  EventAccessibilityFocusTrap,
};
