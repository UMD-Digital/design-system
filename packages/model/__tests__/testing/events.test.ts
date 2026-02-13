import {
  simulateEvent,
  waitForEvent,
  captureEvents,
} from '../../source/testing/events';

describe('simulateEvent', () => {
  it('dispatches CustomEvent with detail', () => {
    const target = document.createElement('div');
    let received: CustomEvent | null = null;

    target.addEventListener('test-event', (e) => {
      received = e as CustomEvent;
    });

    simulateEvent(target, 'test-event', { value: 42 });

    expect(received).not.toBeNull();
    expect(received!.detail).toEqual({ value: 42 });
  });

  it('defaults to bubbles: true, composed: true', () => {
    const target = document.createElement('div');
    let received: CustomEvent | null = null;

    target.addEventListener('test-event', (e) => {
      received = e as CustomEvent;
    });

    simulateEvent(target, 'test-event');

    expect(received!.bubbles).toBe(true);
    expect(received!.composed).toBe(true);
  });

  it('respects custom options', () => {
    const target = document.createElement('div');
    let received: CustomEvent | null = null;

    target.addEventListener('test-event', (e) => {
      received = e as CustomEvent;
    });

    simulateEvent(target, 'test-event', undefined, {
      bubbles: false,
      composed: false,
    });

    expect(received!.bubbles).toBe(false);
    expect(received!.composed).toBe(false);
  });
});

describe('waitForEvent', () => {
  it('resolves when event fires', async () => {
    const target = document.createElement('div');

    const promise = waitForEvent(target, 'ready');
    simulateEvent(target, 'ready', { status: 'ok' });

    const event = (await promise) as CustomEvent;
    expect(event.type).toBe('ready');
    expect(event.detail).toEqual({ status: 'ok' });
  });

  it('rejects after timeout', async () => {
    const target = document.createElement('div');

    await expect(waitForEvent(target, 'never', 50)).rejects.toThrow(
      'not received within 50ms',
    );
  });

  it('cleans up listener after resolving', async () => {
    const target = document.createElement('div');
    const spy = jest.spyOn(target, 'removeEventListener');

    const promise = waitForEvent(target, 'done');
    simulateEvent(target, 'done');
    await promise;

    expect(spy).toHaveBeenCalledWith('done', expect.any(Function));
    spy.mockRestore();
  });
});

describe('captureEvents', () => {
  it('captures multiple event types', () => {
    const target = document.createElement('div');
    const { events, cleanup } = captureEvents(target, ['click', 'focus']);

    simulateEvent(target, 'click', { x: 1 });
    simulateEvent(target, 'click', { x: 2 });
    simulateEvent(target, 'focus');

    expect(events['click']).toHaveLength(2);
    expect(events['focus']).toHaveLength(1);

    cleanup();
  });

  it('cleanup removes all listeners', () => {
    const target = document.createElement('div');
    const { events, cleanup } = captureEvents(target, ['test']);

    simulateEvent(target, 'test');
    expect(events['test']).toHaveLength(1);

    cleanup();

    simulateEvent(target, 'test');
    expect(events['test']).toHaveLength(1); // no new capture
  });
});
