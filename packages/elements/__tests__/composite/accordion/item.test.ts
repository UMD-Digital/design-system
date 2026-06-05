import { item as createAccordionItem } from '../../../source/composite/accordion';
import '../test-helpers/setup';

describe('Composite Accordion Item — dispatched events', () => {
  const buildItem = (isStateOpen = false) => {
    const context = document.createElement('umd-element-accordion-item');
    document.body.appendChild(context);

    const headline = document.createElement('span');
    headline.textContent = 'Header';
    const text = document.createElement('div');
    text.textContent = 'Body content';

    const model = createAccordionItem({
      headline,
      text,
      isStateOpen,
      context,
    });

    return { context, model };
  };

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('dispatches a bubbling, composed `accordion:open` event on the context element', () => {
    const { context, model } = buildItem();
    const listener = jest.fn();
    context.addEventListener('accordion:open', listener);

    model.events?.open({ hasAnimation: false });

    expect(listener).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('accordion:open');
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
  });

  it('dispatches a bubbling, composed `accordion:close` event on the context element', () => {
    const { context, model } = buildItem();
    const listener = jest.fn();
    context.addEventListener('accordion:close', listener);

    model.events?.close({ hasAnimation: false });

    expect(listener).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0] as CustomEvent;
    expect(event.type).toBe('accordion:close');
    expect(event.bubbles).toBe(true);
    expect(event.composed).toBe(true);
  });

  it('does not dispatch an event for the initial open state set on load', () => {
    const openListener = jest.fn();
    const closeListener = jest.fn();
    document.addEventListener('accordion:open', openListener);
    document.addEventListener('accordion:close', closeListener);

    buildItem(true);

    expect(openListener).not.toHaveBeenCalled();
    expect(closeListener).not.toHaveBeenCalled();

    document.removeEventListener('accordion:open', openListener);
    document.removeEventListener('accordion:close', closeListener);
  });
});
