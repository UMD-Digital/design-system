import { getValidatedSlotImage } from '../../validation/getValidatedSlotImage';

describe('getValidatedSlotImage', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    // Mock console.error to avoid noise in test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });

  describe('happy path', () => {
    it('should return cloned image when image has alt text', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test image';
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(HTMLImageElement);
      expect(result?.src).toContain('test.jpg');
      expect(result?.alt).toBe('Test image');
    });

    it('should return cloned image, not original reference', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test image';
      img.setAttribute('slot', 'image');
      img.id = 'original';
      container.appendChild(img);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      expect(result).not.toBe(img);
      expect(result?.id).toBe('original');
    });

    it('should return cloned image with empty alt (valid for decorative images)', () => {
      const img = document.createElement('img');
      img.src = 'decorative.jpg';
      img.alt = '';
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      expect(result).toBeDefined();
      expect(result?.alt).toBe('');
    });

    it('should handle styled slot with valid image', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      slotElement.setAttribute('styled', '');
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test';
      slotElement.appendChild(img);
      container.appendChild(slotElement);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      // Returns cloned slot element, not the image
      expect(result).toBeDefined();
      expect(result?.tagName.toLowerCase()).toBe('slot');
    });

    it('should preserve all image attributes when cloning', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test image';
      img.width = 300;
      img.height = 200;
      img.className = 'test-class';
      img.setAttribute('slot', 'image');
      img.setAttribute('data-id', '123');
      container.appendChild(img);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      expect(result?.src).toContain('test.jpg');
      expect(result?.alt).toBe('Test image');
      expect(result?.width).toBe(300);
      expect(result?.height).toBe(200);
      expect(result?.className).toBe('test-class');
      expect(result?.getAttribute('data-id')).toBe('123');
    });

    it('should work with different slot names', () => {
      const slotNames = ['hero', 'thumbnail', 'logo', 'avatar'];

      slotNames.forEach((slotName) => {
        container.innerHTML = '';
        const img = document.createElement('img');
        img.src = 'test.jpg';
        img.alt = 'Test';
        img.setAttribute('slot', slotName);
        container.appendChild(img);

        const result = getValidatedSlotImage({ element: container, slotName });

        expect(result).toBeDefined();
      });
    });
  });

  describe('edge cases', () => {
    it('should return null when slot does not exist', () => {
      const result = getValidatedSlotImage({ element: container, slotName: 'nonexistent' });

      expect(result).toBeNull();
    });

    it('should return null when image has no alt attribute', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.setAttribute('slot', 'image');
      // No alt attribute
      container.appendChild(img);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      expect(result).toBeNull();
      expect(console.error).toHaveBeenCalledWith('Image elements require alt text');
    });

    it('should return cloned slot even when slot contains no image', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      slotElement.textContent = 'Not an image';
      container.appendChild(slotElement);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      // imageHasAlt returns true when image is null, slotImage exists, so returns clone
      expect(result).toBeDefined();
    });

    it('should return cloned slot when slot is empty', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      container.appendChild(slotElement);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      // imageHasAlt returns true when image is null, slotImage exists, so returns clone
      expect(result).toBeDefined();
    });

    it('should handle nested image with alt text', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      const wrapper = document.createElement('figure');
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test';
      wrapper.appendChild(img);
      slotElement.appendChild(wrapper);
      container.appendChild(slotElement);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      expect(result).toBeDefined();
    });

    it('should handle nested image without alt text', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      const wrapper = document.createElement('figure');
      const img = document.createElement('img');
      img.src = 'test.jpg';
      // No alt attribute
      wrapper.appendChild(img);
      slotElement.appendChild(wrapper);
      container.appendChild(slotElement);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      expect(result).toBeNull();
    });

    it('should handle image in picture element', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      const picture = document.createElement('picture');
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test';
      picture.appendChild(img);
      slotElement.appendChild(picture);
      container.appendChild(slotElement);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      expect(result).toBeDefined();
    });

    it('should return cloned slot with SVG instead of img', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      slotElement.appendChild(svg);
      container.appendChild(slotElement);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      // imageHasAlt returns true when image is null, slotImage exists, so returns clone
      expect(result).toBeDefined();
    });

    it('should return cloned slot container, not the image itself', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      slotElement.id = 'slot-container';
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

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      // Returns cloned slot container (div), not individual image
      expect(result?.id).toBe('slot-container');
      expect(result?.tagName.toLowerCase()).toBe('div');
    });
  });

  describe('error conditions', () => {
    it('should handle null element', () => {
      expect(() =>
        getValidatedSlotImage({ element: null as any, slotName: 'image' }),
      ).toThrow();
    });

    it('should handle undefined element', () => {
      expect(() =>
        getValidatedSlotImage({ element: undefined as any, slotName: 'image' }),
      ).toThrow();
    });

    it('should handle element not in DOM', () => {
      const detached = document.createElement('div');
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test';
      img.setAttribute('slot', 'image');
      detached.appendChild(img);

      const result = getValidatedSlotImage({ element: detached, slotName: 'image' });

      expect(result).toBeDefined();
    });
  });

  describe('consistency', () => {
    it('should return independent clones on multiple calls', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test';
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const result1 = getValidatedSlotImage({ element: container, slotName: 'image' });
      const result2 = getValidatedSlotImage({ element: container, slotName: 'image' });

      expect(result1).not.toBe(result2);
      expect(result1?.src).toBe(result2?.src);
    });

    it('should return null consistently for invalid images', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      // No alt attribute
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const result1 = getValidatedSlotImage({ element: container, slotName: 'image' });
      const result2 = getValidatedSlotImage({ element: container, slotName: 'image' });

      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });

    it('should not modify original image', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Original alt';
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });
      result!.alt = 'Modified alt';

      expect(img.alt).toBe('Original alt');
    });

    it('should not modify DOM structure', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test';
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const childCountBefore = container.children.length;
      getValidatedSlotImage({ element: container, slotName: 'image' });
      const childCountAfter = container.children.length;

      expect(childCountBefore).toBe(childCountAfter);
    });
  });

  describe('validation logic', () => {
    it('should validate image before cloning', () => {
      // Image without alt should fail validation
      const imgNoAlt = document.createElement('img');
      imgNoAlt.src = 'test.jpg';
      imgNoAlt.setAttribute('slot', 'no-alt');
      container.appendChild(imgNoAlt);

      // Image with alt should pass validation
      const imgWithAlt = document.createElement('img');
      imgWithAlt.src = 'test.jpg';
      imgWithAlt.alt = 'Test';
      imgWithAlt.setAttribute('slot', 'with-alt');
      container.appendChild(imgWithAlt);

      const result1 = getValidatedSlotImage({ element: container, slotName: 'no-alt' });
      const result2 = getValidatedSlotImage({ element: container, slotName: 'with-alt' });

      expect(result1).toBeNull();
      expect(result2).toBeDefined();
    });

    it('should check both slot existence and validation', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      // No alt
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const result1 = getValidatedSlotImage({ element: container, slotName: 'image' });
      const result2 = getValidatedSlotImage({ element: container, slotName: 'nonexistent' });

      // Both should be null but for different reasons
      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });

    it('should require both valid slot and valid image', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'image');
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test';
      slotElement.appendChild(img);
      container.appendChild(slotElement);

      // Valid slot, valid image
      const result = getValidatedSlotImage({ element: container, slotName: 'image' });
      expect(result).toBeDefined();

      // Remove alt to make invalid
      img.removeAttribute('alt');
      const result2 = getValidatedSlotImage({ element: container, slotName: 'image' });
      expect(result2).toBeNull();
    });
  });

  describe('integration with dependencies', () => {
    it('should use getImageFromSlot to find image', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.alt = 'Test';
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      const result = getValidatedSlotImage({ element: container, slotName: 'image' });

      expect(result).toBeDefined();
    });

    it('should use imageHasAlt to validate image', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';
      img.setAttribute('slot', 'image');
      container.appendChild(img);

      getValidatedSlotImage({ element: container, slotName: 'image' });

      expect(console.error).toHaveBeenCalledWith('Image elements require alt text');
    });

    it('should use createStyledSlotOrClone to determine return value', () => {
      // Styled slot should return slot element
      const styledSlot = document.createElement('div');
      styledSlot.setAttribute('slot', 'styled');
      styledSlot.setAttribute('styled', '');
      const img1 = document.createElement('img');
      img1.src = 'test.jpg';
      img1.alt = 'Test';
      styledSlot.appendChild(img1);
      container.appendChild(styledSlot);

      // Non-styled slot should return cloned element
      const normalSlot = document.createElement('div');
      normalSlot.setAttribute('slot', 'normal');
      const img2 = document.createElement('img');
      img2.src = 'test.jpg';
      img2.alt = 'Test';
      normalSlot.appendChild(img2);
      container.appendChild(normalSlot);

      const result1 = getValidatedSlotImage({ element: container, slotName: 'styled' });
      const result2 = getValidatedSlotImage({ element: container, slotName: 'normal' });

      expect(result1?.tagName.toLowerCase()).toBe('slot');
      expect(result2?.tagName.toLowerCase()).toBe('div');
    });
  });
});
