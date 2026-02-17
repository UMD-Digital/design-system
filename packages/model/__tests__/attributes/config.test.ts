import {
  toAttributeName,
  defineObservedAttributes,
  readAttributes,
  resolveAttributeConfigs,
  type ReactiveAttributeMap,
} from '../../source/attributes/config';
import { AttributeValidationError } from '../../source/attributes/errors';

describe('toAttributeName', () => {
  it('converts camelCase to kebab-case', () => {
    expect(toAttributeName('tabletSize')).toBe('tablet-size');
  });

  it('handles multiple capitals', () => {
    expect(toAttributeName('backgroundColor')).toBe('background-color');
  });

  it('returns single-word names unchanged', () => {
    expect(toAttributeName('theme')).toBe('theme');
  });

  it('handles empty string', () => {
    expect(toAttributeName('')).toBe('');
  });

  it('handles leading capital', () => {
    expect(toAttributeName('MaxWidth')).toBe('-max-width');
  });
});

describe('defineObservedAttributes', () => {
  it('derives attribute names from property names', () => {
    const map: ReactiveAttributeMap = {
      theme: { type: 'string' },
      maxCount: { type: 'number' },
    };
    expect(defineObservedAttributes(map)).toEqual(['theme', 'max-count']);
  });

  it('uses custom attribute name when provided', () => {
    const map: ReactiveAttributeMap = {
      theme: { attribute: 'data-theme', type: 'string' },
    };
    expect(defineObservedAttributes(map)).toEqual(['data-theme']);
  });

  it('excludes entries with attribute: false', () => {
    const map: ReactiveAttributeMap = {
      theme: { type: 'string' },
      internal: { attribute: false, type: 'string' },
    };
    expect(defineObservedAttributes(map)).toEqual(['theme']);
  });

  it('returns empty array for empty map', () => {
    expect(defineObservedAttributes({})).toEqual([]);
  });
});

describe('readAttributes', () => {
  function createElement(attrs: Record<string, string>): Element {
    const el = document.createElement('div');
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }
    return el;
  }

  it('reads string attribute', () => {
    const el = createElement({ theme: 'dark' });
    const map: ReactiveAttributeMap = { theme: { type: 'string' } };
    const result = readAttributes<{ theme: string }>(el, map);
    expect(result.theme).toBe('dark');
  });

  it('reads number attribute', () => {
    const el = createElement({ count: '5' });
    const map: ReactiveAttributeMap = { count: { type: 'number' } };
    const result = readAttributes<{ count: number }>(el, map);
    expect(result.count).toBe(5);
  });

  it('reads boolean attribute (present)', () => {
    const el = createElement({ open: '' });
    const map: ReactiveAttributeMap = { open: { type: 'boolean' } };
    const result = readAttributes<{ open: boolean }>(el, map);
    expect(result.open).toBe(true);
  });

  it('applies default when attribute is absent', () => {
    const el = createElement({});
    const map: ReactiveAttributeMap = {
      theme: { type: 'string', defaultValue: 'light' },
    };
    const result = readAttributes<{ theme: string }>(el, map);
    expect(result.theme).toBe('light');
  });

  it('uses custom attribute name', () => {
    const el = createElement({ 'data-theme': 'dark' });
    const map: ReactiveAttributeMap = {
      theme: { attribute: 'data-theme', type: 'string' },
    };
    const result = readAttributes<{ theme: string }>(el, map);
    expect(result.theme).toBe('dark');
  });

  it('uses defaultValue for attribute: false entries', () => {
    const el = createElement({});
    const map: ReactiveAttributeMap = {
      internal: { attribute: false, defaultValue: 42 },
    };
    const result = readAttributes<{ internal: number }>(el, map);
    expect(result.internal).toBe(42);
  });

  it('throws AttributeValidationError when validate fails', () => {
    const el = createElement({ count: '5' });
    const map: ReactiveAttributeMap = {
      count: {
        type: 'number',
        validate: (v) => ((v as number) > 10 ? undefined : 'must be > 10'),
      },
    };
    expect(() => readAttributes(el, map)).toThrow(AttributeValidationError);
  });

  it('does not throw when validate passes', () => {
    const el = createElement({ count: '20' });
    const map: ReactiveAttributeMap = {
      count: {
        type: 'number',
        validate: (v) => ((v as number) > 10 ? undefined : 'must be > 10'),
      },
    };
    expect(() => readAttributes(el, map)).not.toThrow();
  });

  it('defaults to string converter when no type or converter specified', () => {
    const el = createElement({ name: 'hello' });
    const map: ReactiveAttributeMap = { name: {} };
    const result = readAttributes<{ name: string }>(el, map);
    expect(result.name).toBe('hello');
  });
});

describe('resolveAttributeConfigs', () => {
  it('resolves property names and attribute names', () => {
    const map: ReactiveAttributeMap = {
      tabletSize: { type: 'number' },
    };
    const resolved = resolveAttributeConfigs(map);
    expect(resolved).toHaveLength(1);
    expect(resolved[0].propertyName).toBe('tabletSize');
    expect(resolved[0].attributeName).toBe('tablet-size');
  });

  it('uses custom attribute name', () => {
    const map: ReactiveAttributeMap = {
      theme: { attribute: 'data-theme', type: 'string' },
    };
    const resolved = resolveAttributeConfigs(map);
    expect(resolved[0].attributeName).toBe('data-theme');
  });

  it('sets attributeName to false for attribute: false', () => {
    const map: ReactiveAttributeMap = {
      internal: { attribute: false, type: 'string' },
    };
    const resolved = resolveAttributeConfigs(map);
    expect(resolved[0].attributeName).toBe(false);
  });

  it('defaults reflect to false', () => {
    const map: ReactiveAttributeMap = { theme: { type: 'string' } };
    const resolved = resolveAttributeConfigs(map);
    expect(resolved[0].reflect).toBe(false);
  });

  it('preserves reflect: true', () => {
    const map: ReactiveAttributeMap = {
      theme: { type: 'string', reflect: true },
    };
    const resolved = resolveAttributeConfigs(map);
    expect(resolved[0].reflect).toBe(true);
  });

  it('preserves defaultValue', () => {
    const map: ReactiveAttributeMap = {
      count: { type: 'number', defaultValue: 0 },
    };
    const resolved = resolveAttributeConfigs(map);
    expect(resolved[0].defaultValue).toBe(0);
  });

  it('pre-resolves converter from type', () => {
    const map: ReactiveAttributeMap = { count: { type: 'number' } };
    const resolved = resolveAttributeConfigs(map);
    expect(resolved[0].converter.fromAttribute('5', 'count')).toBe(5);
  });

  it('preserves onChange callback', () => {
    const onChange = jest.fn();
    const map: ReactiveAttributeMap = {
      count: { type: 'number', onChange },
    };
    const resolved = resolveAttributeConfigs(map);
    expect(resolved[0].onChange).toBe(onChange);
  });

  it('sets onChange to undefined when not provided', () => {
    const map: ReactiveAttributeMap = {
      count: { type: 'number' },
    };
    const resolved = resolveAttributeConfigs(map);
    expect(resolved[0].onChange).toBeUndefined();
  });

  it('preserves hasChanged callback', () => {
    const hasChanged = jest.fn();
    const map: ReactiveAttributeMap = {
      count: { type: 'number', hasChanged },
    };
    const resolved = resolveAttributeConfigs(map);
    expect(resolved[0].hasChanged).toBe(hasChanged);
  });

  it('sets hasChanged to undefined when not provided', () => {
    const map: ReactiveAttributeMap = {
      count: { type: 'number' },
    };
    const resolved = resolveAttributeConfigs(map);
    expect(resolved[0].hasChanged).toBeUndefined();
  });
});
