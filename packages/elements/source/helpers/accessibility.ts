type EventAccessibilityFocusParams = {
  element: HTMLElement;
  action: (arg: KeyboardEvent) => void;
};

export type EventAccessibilityFocusType = (
  arg: EventAccessibilityFocusParams,
) => () => void;
export type EventAccessibilityEventsType = () => void | undefined;

export const EventAccessibilityFocus: EventAccessibilityFocusType = ({
  element,
  action,
}) => {
  const escapeEvent = (event: KeyboardEvent) => {
    if (event.keyCode == 27) {
      action(event);
    }
  };

  const keyEvent = (event: KeyboardEvent) => {
    const currentElement = event.srcElement as HTMLElement;

    if (event.key === 'Tab' || event.keyCode == 9) {
      if (element && !element.contains(currentElement)) {
        action(event);
      }
    }

    if (event.key === 'ArrowDown' || event.keyCode == 40) {
      const nextElement = currentElement.nextElementSibling as HTMLElement;

      if (element && !element.contains(nextElement)) {
        action(event);
      } else {
        nextElement.focus();
      }
    }

    if (event.key === 'ArrowUp' || event.keyCode == 38) {
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
