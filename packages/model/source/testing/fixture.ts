const fixtures: Set<HTMLElement> = new Set();

interface FixtureOptions {
  container?: HTMLElement;
  attributes?: Record<string, string>;
}

function createFixtureSync<T extends HTMLElement = HTMLElement>(
  html: string,
  options?: FixtureOptions,
): T {
  const trimmed = html.trim();
  if (!trimmed) {
    throw new Error('createFixtureSync: HTML string must not be empty');
  }

  const temp = document.createElement('div');
  temp.innerHTML = trimmed;

  const element = temp.firstElementChild as T | null;
  if (!element) {
    throw new Error('createFixtureSync: HTML string produced no element');
  }

  if (options?.attributes) {
    for (const [name, value] of Object.entries(options.attributes)) {
      element.setAttribute(name, value);
    }
  }

  const container = options?.container ?? document.body;
  container.appendChild(element);
  fixtures.add(element);

  return element;
}

async function createFixture<T extends HTMLElement = HTMLElement>(
  html: string,
  options?: FixtureOptions,
): Promise<T> {
  const element = createFixtureSync<T>(html, options);
  return Promise.resolve(element);
}

function cleanupFixtures(): void {
  fixtures.forEach((el) => el.remove());
  fixtures.clear();
}

export { createFixture, createFixtureSync, cleanupFixtures };
export type { FixtureOptions };
