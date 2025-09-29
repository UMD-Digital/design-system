import { createSlot } from '../../elements/createSlot';

describe('createSlot', () => {
  describe('happy path', () => {
    it('should create a slot element', () => {
      const slot = createSlot('test-slot');
      expect(slot.tagName).toBe('SLOT');
    });

    it('should set the name attribute correctly', () => {
      const slot = createSlot('headline');
      expect(slot.getAttribute('name')).toBe('headline');
    });

    it('should return HTMLSlotElement', () => {
      const slot = createSlot('test-slot');
      expect(slot instanceof HTMLSlotElement).toBe(true);
    });

    it('should create different slots with different names', () => {
      const slot1 = createSlot('slot-one');
      const slot2 = createSlot('slot-two');

      expect(slot1.getAttribute('name')).toBe('slot-one');
      expect(slot2.getAttribute('name')).toBe('slot-two');
    });

    it('should work with shadow DOM', () => {
      const host = document.createElement('div');
      const shadow = host.attachShadow({ mode: 'open' });

      const slot = createSlot('content');
      shadow.appendChild(slot);

      expect(shadow.querySelector('slot[name="content"]')).toBe(slot);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string name', () => {
      const slot = createSlot('');
      expect(slot.getAttribute('name')).toBe('');
    });

    it('should handle names with spaces', () => {
      const slot = createSlot('my slot');
      expect(slot.getAttribute('name')).toBe('my slot');
    });

    it('should handle names with special characters', () => {
      const slot = createSlot('slot-with-dash_and_underscore');
      expect(slot.getAttribute('name')).toBe('slot-with-dash_and_underscore');
    });

    it('should handle numeric names', () => {
      const slot = createSlot('123');
      expect(slot.getAttribute('name')).toBe('123');
    });
  });

  describe('integration', () => {
    it('should work with slotted content', () => {
      const host = document.createElement('div');
      const shadow = host.attachShadow({ mode: 'open' });

      // Create and add slot to shadow DOM
      const slot = createSlot('headline');
      shadow.appendChild(slot);

      // Add slotted content to host
      const headline = document.createElement('h1');
      headline.setAttribute('slot', 'headline');
      headline.textContent = 'Test Headline';
      host.appendChild(headline);

      expect(shadow.querySelector('slot[name="headline"]')).toBe(slot);
      expect(host.querySelector('[slot="headline"]')).toBe(headline);
    });
  });
});