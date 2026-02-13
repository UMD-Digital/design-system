import {
  captureConsole,
  captureConsoleAsync,
  captureWarnings,
  captureWarningsAsync,
} from '../../source/testing/console';

describe('captureConsole', () => {
  it('captures warn messages', () => {
    const messages = captureConsole('warn', () => {
      console.warn('warning 1');
      console.warn('warning 2');
    });
    expect(messages).toEqual(['warning 1', 'warning 2']);
  });

  it('captures error messages', () => {
    const messages = captureConsole('error', () => {
      console.error('error message');
    });
    expect(messages).toEqual(['error message']);
  });

  it('captures log messages', () => {
    const messages = captureConsole('log', () => {
      console.log('log message');
    });
    expect(messages).toEqual(['log message']);
  });

  it('captures multi-argument messages as joined string', () => {
    const messages = captureConsole('warn', () => {
      console.warn('value:', 42);
    });
    expect(messages).toEqual(['value: 42']);
  });

  it('restores original method after callback', () => {
    const originalWarn = console.warn;
    captureConsole('warn', () => {
      console.warn('test');
    });
    expect(console.warn).toBe(originalWarn);
  });

  it('restores original method even if callback throws', () => {
    const originalError = console.error;

    expect(() =>
      captureConsole('error', () => {
        throw new Error('boom');
      }),
    ).toThrow('boom');

    expect(console.error).toBe(originalError);
  });
});

describe('captureConsoleAsync', () => {
  it('captures during async execution', async () => {
    const messages = await captureConsoleAsync('warn', async () => {
      console.warn('async warning');
      await Promise.resolve();
      console.warn('after await');
    });
    expect(messages).toEqual(['async warning', 'after await']);
  });

  it('restores original method after async callback', async () => {
    const originalWarn = console.warn;
    await captureConsoleAsync('warn', async () => {
      console.warn('test');
    });
    expect(console.warn).toBe(originalWarn);
  });
});

describe('captureWarnings', () => {
  it('is a convenience wrapper for captureConsole warn', () => {
    const messages = captureWarnings(() => {
      console.warn('convenience warning');
    });
    expect(messages).toEqual(['convenience warning']);
  });
});

describe('captureWarningsAsync', () => {
  it('is a convenience wrapper for captureConsoleAsync warn', async () => {
    const messages = await captureWarningsAsync(async () => {
      console.warn('async convenience');
    });
    expect(messages).toEqual(['async convenience']);
  });
});
