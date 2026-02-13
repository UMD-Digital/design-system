type ConsoleMethod = 'log' | 'warn' | 'error';

function captureConsole(method: ConsoleMethod, callback: () => void): string[] {
  const messages: string[] = [];
  const original = console[method];

  console[method] = (...args: unknown[]) => {
    messages.push(args.map(String).join(' '));
  };

  try {
    callback();
  } finally {
    console[method] = original;
  }

  return messages;
}

async function captureConsoleAsync(
  method: ConsoleMethod,
  callback: () => Promise<void>,
): Promise<string[]> {
  const messages: string[] = [];
  const original = console[method];

  console[method] = (...args: unknown[]) => {
    messages.push(args.map(String).join(' '));
  };

  try {
    await callback();
  } finally {
    console[method] = original;
  }

  return messages;
}

function captureWarnings(callback: () => void): string[] {
  return captureConsole('warn', callback);
}

async function captureWarningsAsync(
  callback: () => Promise<void>,
): Promise<string[]> {
  return captureConsoleAsync('warn', callback);
}

export {
  captureConsole,
  captureConsoleAsync,
  captureWarnings,
  captureWarningsAsync,
};
export type { ConsoleMethod };
