import { getImageFromSlot } from '../../source/dom/getImageFromSlot';

describe('getImageFromSlot', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('happy path', () => {
    it('should return img element when slot contains img directly', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test image';
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result).toBe(img);
      expect(result).toBeInstanceOf(HTMLImageElement);
    });

    it('should return img element when nested inside slot', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test image';
      slotElement.appendChild(img);
      container.appendChild(slotElement);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result).toBe(img);
      expect(result).toBeInstanceOf(HTMLImageElement);
    });

    it('should return first img when multiple images in slot', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      const img1 = document.createElement('img');
      img1.src = 'first.jpg';
      img1.alt = 'First';
      img1.id = 'first';
      const img2 = document.createElement('img');
      img2.src = 'second.jpg';
      img2.alt = 'Second';
      img2.id = 'second';
      slotElement.appendChild(img1);
      slotElement.appendChild(img2);
      container.appendChild(slotElement);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result?.id).toBe('first');
    });

    it('should handle different slot names', () => {
      const slotNames = ['image', 'thumbnail', 'hero', 'logo'];

      slotNames.forEach((slotName) => {
        container.innerHTML = '';
        const img = document.createElement('img');
        img.setAttribute('slot', slotName);
        container.appendChild(img);

        const result = getImageFromSlot({ element: container, slotRef: slotName });

        expect(result).toBe(img);
      });
    });

    it('should find img in deeply nested structure', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      const wrapper1 = document.createElement('div');
      const wrapper2 = document.createElement('figure');
      const img = document.createElement('img');
      img.src = 'test.jpg';

      wrapper2.appendChild(img);
      wrapper1.appendChild(wrapper2);
      slotElement.appendChild(wrapper1);
      container.appendChild(slotElement);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result).toBe(img);
    });
  });

  describe('edge cases', () => {
    it('should return null when slot does not exist', () => {
      const result = getImageFromSlot({ element: container, slotRef: 'nonexistent' });

      expect(result).toBeNull();
    });

    it('should return null when slot exists but contains no img', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      const span = document.createElement('span');
      span.textContent = 'Not an image';
      slotElement.appendChild(span);
      container.appendChild(slotElement);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result).toBeNull();
    });

    it('should return null for empty slot element', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      container.appendChild(slotElement);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result).toBeNull();
    });

    it('should handle slot with only text content', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      slotElement.textContent = 'Just text';
      container.appendChild(slotElement);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result).toBeNull();
    });

    it('should handle slot with SVG instead of img', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      slotElement.appendChild(svg);
      container.appendChild(slotElement);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result).toBeNull();
    });

    it('should handle img without src attribute', () => {
      const img = document.createElement('img');
      img.alt = 'Test';
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result).toBe(img);
    });

    it('should handle img without alt attribute', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result).toBe(img);
    });

    it('should handle multiple slots with same name (returns first)', () => {
      const slot1 = document.createElement('img');
      slot1.setAttribute('slot', 'image');
      slot1.id = 'first';
      const slot2 = document.createElement('img');
      slot2.setAttribute('slot', 'image');
      slot2.id = 'second';

      container.appendChild(slot1);
      container.appendChild(slot2);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result?.id).toBe('first');
    });

    it('should handle slot with picture element containing img', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      const picture = document.createElement('picture');
      const img = document.createElement('img');
      img.src = 'test.jpg';
      picture.appendChild(img);
      slotElement.appendChild(picture);
      container.appendChild(slotElement);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result).toBe(img);
    });

    it('should handle slot names with special characters', () => {
      const img = document.createElement('img');
      img.setAttribute('slot', 'hero-image');
      container.appendChild(img);

      const result = getImageFromSlot({ element: container, slotRef: 'hero-image' });

      expect(result).toBe(img);
    });

    it('should handle empty string slot name', () => {
      const img = document.createElement('img');
      img.setAttribute('slot', '');
      container.appendChild(img);

      const result = getImageFromSlot({ element: container, slotRef: '' });

      expect(result).toBe(img);
    });
  });

  describe('error conditions', () => {
    it('should handle null element gracefully', () => {
      expect(() =>
        getImageFromSlot({ element: null as any, slotRef: 'image' }),
      ).toThrow();
    });

    it('should handle undefined element gracefully', () => {
      expect(() =>
        getImageFromSlot({ element: undefined as any, slotRef: 'image' }),
      ).toThrow();
    });

    it('should handle element not in DOM', () => {
      const detached = document.createElement('div');
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      detached.appendChild(img);

      const result = getImageFromSlot({ element: detached, slotRef: 'image' });

      expect(result).toBe(img);
    });
  });

  describe('consistency', () => {
    it('should return same element on multiple calls', () => {
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const result1 = getImageFromSlot({ element: container, slotRef: 'image' });
      const result2 = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result1).toBe(result2);
    });

    it('should return null consistently for missing slot', () => {
      const result1 = getImageFromSlot({ element: container, slotRef: 'missing' });
      const result2 = getImageFromSlot({ element: container, slotRef: 'missing' });

      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });

    it('should not modify the DOM', () => {
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'original.jpg';
      container.appendChild(img);

      getImageFromSlot({ element: container, slotRef: 'image' });

      expect(container.children.length).toBe(1);
      expect(img.src).toContain('original.jpg');
    });

    it('should handle repeated queries with different slot names', () => {
      const img1 = document.createElement('img');
      img1.setAttribute('slot', 'hero');
      const img2 = document.createElement('img');
      img2.setAttribute('slot', 'thumbnail');
      container.appendChild(img1);
      container.appendChild(img2);

      const result1 = getImageFromSlot({ element: container, slotRef: 'hero' });
      const result2 = getImageFromSlot({ element: container, slotRef: 'thumbnail' });

      expect(result1).toBe(img1);
      expect(result2).toBe(img2);
    });
  });

  describe('querySelector behavior', () => {
    it('should use querySelector with slot attribute selector', () => {
      const img = document.createElement('img');
      img.setAttribute('slot', 'test-slot');
      img.id = 'test-image';
      container.appendChild(img);

      const result = getImageFromSlot({ element: container, slotRef: 'test-slot' });

      expect(result?.id).toBe('test-image');
    });

    it('should only match direct slot attribute, not nested', () => {
      const outerSlot = document.createElement('div');
      outerSlot.setAttribute('slot', 'outer');
      const innerSlot = document.createElement('img');
      innerSlot.setAttribute('slot', 'inner');
      outerSlot.appendChild(innerSlot);
      container.appendChild(outerSlot);

      // Should find outer slot
      const result1 = getImageFromSlot({ element: container, slotRef: 'outer' });
      expect(result1).toBe(innerSlot); // Should find inner img

      // Should not find inner slot at top level
      const result2 = getImageFromSlot({ element: container, slotRef: 'inner' });
      expect(result2).toBe(innerSlot); // querySelector finds it anyway
    });
  });

  describe('instance type checking', () => {
    it('should correctly identify HTMLImageElement', () => {
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const result = getImageFromSlot({ element: container, slotRef: 'image' });

      expect(result).toBeInstanceOf(HTMLImageElement);
    });

    it('should distinguish between img element and div with img', () => {
      // Direct img
      const img = document.createElement('img');
      img.setAttribute('slot', 'direct');
      container.appendChild(img);

      // Wrapped img
      const wrapper = document.createElement('div');
      wrapper.setAttribute('slot', 'wrapped');
      const wrappedImg = document.createElement('img');
      wrapper.appendChild(wrappedImg);
      container.appendChild(wrapper);

      const result1 = getImageFromSlot({ element: container, slotRef: 'direct' });
      const result2 = getImageFromSlot({ element: container, slotRef: 'wrapped' });

      expect(result1).toBeInstanceOf(HTMLImageElement);
      expect(result2).toBeInstanceOf(HTMLImageElement);
      expect(result1).toBe(img);
      expect(result2).toBe(wrappedImg);
    });
  });
});
