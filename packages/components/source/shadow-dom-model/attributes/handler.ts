import AttributeNames from './names';
import AttributeValues from './values';

export namespace AttributeHandlerTypes {
  type Callback<T = ElementRef> = (arg: T) => void;

  export interface ElementRef {
    element: HTMLElement;
    events?: Record<string, Function>;
  }

  export interface Config {
    name: string;
    handler: (
      ref: ElementRef,
      oldValue: string | null,
      newValue: string | null,
    ) => void;
  }

  export interface Props {
    callback: Callback;
  }
}

const combine = (
  ...configs: AttributeHandlerTypes.Config[]
): AttributeHandlerTypes.Config[] => {
  const handlerMap = new Map<
    string,
    ((
      ref: AttributeHandlerTypes.ElementRef,
      oldValue: string | null,
      newValue: string | null,
    ) => void)[]
  >();

  configs.forEach((config) => {
    const handlers = handlerMap.get(config.name) || [];
    handlers.push(config.handler);
    handlerMap.set(config.name, handlers);
  });

  return Array.from(handlerMap.entries()).map(([name, handlers]) => ({
    name,
    handler: (
      ref: AttributeHandlerTypes.ElementRef,
      oldValue: string | null,
      newValue: string | null,
    ) => {
      handlers.forEach((handler) => handler(ref, oldValue, newValue));
    },
  }));
};

const resize = ({
  callback,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: AttributeNames.RESIZE,
  handler: (ref, _, newValue) => {
    if (newValue === AttributeValues.state.TRUE) {
      callback(ref);
    }
  },
});

const stateOpen = ({
  callback,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: AttributeNames.STATE,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.OPENED &&
      oldValue === AttributeValues.state.CLOSED
    ) {
      callback(ref);
    }
  },
});

const stateClosed = ({
  callback,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: AttributeNames.STATE,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.CLOSED &&
      oldValue === AttributeValues.state.OPENED
    ) {
      callback(ref);
    }
  },
});

const observe = {
  resize,
  stateOpen,
  stateClosed,
};

export default { combine, observe };
