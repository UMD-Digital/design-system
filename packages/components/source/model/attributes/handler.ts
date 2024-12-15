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
    name?: string;
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
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.RESIZE,
  handler: (ref, _, newValue) => {
    if (newValue === AttributeValues.state.TRUE) {
      callback(ref);
    }
  },
});

const stateOpen = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.STATE,
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
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.STATE,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.CLOSED &&
      oldValue === AttributeValues.state.OPENED
    ) {
      callback(ref);
    }
  },
});

const visuallyOpen = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.visual.open,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.TRUE &&
      oldValue === AttributeValues.state.FALSE
    ) {
      callback(ref);
    }
  },
});

const visuallyClosed = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.visual.open,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.FALSE &&
      oldValue === AttributeValues.state.TRUE
    ) {
      callback(ref);
    }
  },
});

const visuallyShow = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.layout.HIDDEN,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.FALSE &&
      oldValue === AttributeValues.state.TRUE
    ) {
      callback(ref);
    }
  },
});

const visuallyHide = ({
  callback,
  name,
}: AttributeHandlerTypes.Props): AttributeHandlerTypes.Config => ({
  name: name || AttributeNames.layout.HIDDEN,
  handler: (ref, oldValue, newValue) => {
    if (
      newValue === AttributeValues.state.TRUE &&
      oldValue === AttributeValues.state.FALSE
    ) {
      callback(ref);
    }
  },
});

const observe = {
  resize,
  stateOpen,
  stateClosed,
  visuallyOpen,
  visuallyClosed,
  visuallyShow,
  visuallyHide,
};

export default { combine, observe };
