import {
  validateSlotElements,
  validateSlot,
  validateAllSlots,
} from '../../source/slots/slot-validation';
import type { SlotConfig } from '../../source/_types';

const createElement = (tag: string, slot?: string): Element => {
  const el = document.createElement(tag);
  if (slot) el.setAttribute('slot', slot);
  return el;
};

describe('validateSlotElements', () => {
  describe('required', () => {
    const config: SlotConfig = { required: true };

    it('passes when elements are present', () => {
      const result = validateSlotElements('headline', [createElement('h2')], config);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('fails when no elements are present', () => {
      const result = validateSlotElements('headline', [], config);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].error).toBe('missing');
      expect(result.errors[0].slot).toBe('headline');
    });
  });

  describe('deprecated', () => {
    const config: SlotConfig = { deprecated: 'Use "content" instead.' };

    it('passes when deprecated slot has no content', () => {
      const result = validateSlotElements('body', [], config);
      expect(result.isValid).toBe(true);
    });

    it('warns when deprecated slot has content', () => {
      const result = validateSlotElements('body', [createElement('div')], config);
      expect(result.isValid).toBe(false);
      expect(result.errors[0].error).toBe('deprecated');
      expect(result.errors[0].message).toContain('Use "content" instead.');
    });
  });

  describe('allowedElements', () => {
    const config: SlotConfig = { allowedElements: ['h2', 'h3'] };

    it('passes when all elements are allowed', () => {
      const result = validateSlotElements('headline', [createElement('h2'), createElement('h3')], config);
      expect(result.isValid).toBe(true);
    });

    it('fails when elements are not allowed', () => {
      const result = validateSlotElements('headline', [createElement('div')], config);
      expect(result.isValid).toBe(false);
      expect(result.errors[0].error).toBe('invalid-elements');
      expect(result.errors[0].invalidElements).toHaveLength(1);
    });

    it('passes when no elements are present', () => {
      const result = validateSlotElements('headline', [], config);
      expect(result.isValid).toBe(true);
    });
  });

  describe('disallowedElements', () => {
    const config: SlotConfig = { disallowedElements: ['script', 'iframe'] };

    it('passes when no disallowed elements are present', () => {
      const result = validateSlotElements('content', [createElement('div'), createElement('p')], config);
      expect(result.isValid).toBe(true);
    });

    it('fails when disallowed elements are present', () => {
      const result = validateSlotElements('content', [createElement('script')], config);
      expect(result.isValid).toBe(false);
      expect(result.errors[0].error).toBe('disallowed-elements');
      expect(result.errors[0].invalidElements).toHaveLength(1);
      expect(result.errors[0].message).toContain('script');
    });

    it('passes when no elements are present', () => {
      const result = validateSlotElements('content', [], config);
      expect(result.isValid).toBe(true);
    });
  });

  describe('minItems', () => {
    const config: SlotConfig = { minItems: 2 };

    it('passes when count meets minimum', () => {
      const result = validateSlotElements('items', [createElement('div'), createElement('div')], config);
      expect(result.isValid).toBe(true);
    });

    it('fails when count is below minimum', () => {
      const result = validateSlotElements('items', [createElement('div')], config);
      expect(result.isValid).toBe(false);
      expect(result.errors[0].error).toBe('min-items');
      expect(result.errors[0].message).toContain('at least 2');
    });
  });

  describe('maxItems', () => {
    const config: SlotConfig = { maxItems: 3 };

    it('passes when count is within maximum', () => {
      const elements = [createElement('div'), createElement('div'), createElement('div')];
      const result = validateSlotElements('items', elements, config);
      expect(result.isValid).toBe(true);
    });

    it('fails when count exceeds maximum', () => {
      const elements = Array.from({ length: 4 }, () => createElement('div'));
      const result = validateSlotElements('items', elements, config);
      expect(result.isValid).toBe(false);
      expect(result.errors[0].error).toBe('max-items');
      expect(result.errors[0].message).toContain('at most 3');
    });
  });

  describe('custom validate', () => {
    it('passes when validate returns true', () => {
      const config: SlotConfig = { validate: () => true };
      const result = validateSlotElements('content', [createElement('div')], config);
      expect(result.isValid).toBe(true);
    });

    it('fails when validate returns false', () => {
      const config: SlotConfig = { validate: () => false };
      const result = validateSlotElements('content', [createElement('div')], config);
      expect(result.isValid).toBe(false);
      expect(result.errors[0].error).toBe('custom-validation');
    });

    it('uses string return as error message', () => {
      const config: SlotConfig = { validate: () => 'Must contain an anchor' };
      const result = validateSlotElements('content', [createElement('div')], config);
      expect(result.isValid).toBe(false);
      expect(result.errors[0].message).toBe('Must contain an anchor');
    });

    it('skips validation when no elements are present', () => {
      const validate = jest.fn(() => true);
      const config: SlotConfig = { validate };
      validateSlotElements('content', [], config);
      expect(validate).not.toHaveBeenCalled();
    });
  });

  describe('combined checks', () => {
    it('aggregates errors from multiple checks', () => {
      const config: SlotConfig = {
        allowedElements: ['a'],
        maxItems: 1,
      };
      const elements = [createElement('div'), createElement('span')];
      const result = validateSlotElements('actions', elements, config);
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(2);
      const types = result.errors.map((e) => e.error);
      expect(types).toContain('invalid-elements');
      expect(types).toContain('max-items');
    });
  });

  describe('camelCase to kebab-case conversion', () => {
    it('converts camelCase slot names in messages', () => {
      const result = validateSlotElements('subText', [], { required: true });
      expect(result.errors[0].message).toContain('sub-text');
    });
  });
});

describe('validateSlot', () => {
  it('queries host for slotted elements', () => {
    const host = document.createElement('div');
    const child = createElement('h2', 'headline');
    host.appendChild(child);

    const result = validateSlot(host, 'headline', { allowedElements: ['h2'] });
    expect(result.isValid).toBe(true);
  });

  it('converts camelCase key to kebab-case for query', () => {
    const host = document.createElement('div');
    const child = createElement('p', 'sub-text');
    host.appendChild(child);

    const result = validateSlot(host, 'subText', { required: true });
    expect(result.isValid).toBe(true);
  });

  it('fails when required slot is missing from host', () => {
    const host = document.createElement('div');
    const result = validateSlot(host, 'headline', { required: true });
    expect(result.isValid).toBe(false);
  });
});

describe('validateAllSlots', () => {
  it('validates multiple slots and merges results', () => {
    const host = document.createElement('div');
    host.appendChild(createElement('h2', 'headline'));

    const slots: Record<string, SlotConfig> = {
      headline: { required: true, allowedElements: ['h2', 'h3'] },
      content: { required: true },
    };

    const result = validateAllSlots(host, slots);
    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0].slot).toBe('content');
  });

  it('returns valid when all slots pass', () => {
    const host = document.createElement('div');
    host.appendChild(createElement('h2', 'headline'));
    host.appendChild(createElement('p', 'content'));

    const slots: Record<string, SlotConfig> = {
      headline: { allowedElements: ['h2'] },
      content: { allowedElements: ['p'] },
    };

    const result = validateAllSlots(host, slots);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
