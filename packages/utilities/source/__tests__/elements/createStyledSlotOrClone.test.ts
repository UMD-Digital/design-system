import { createStyledSlotOrClone } from '../../elements/createStyledSlotOrClone';

describe('createStyledSlotOrClone', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('happy path', () => {
    it('should return slot element when styled attribute is present', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.setAttribute('styled', '');
      slotElement.textContent = 'Test content';
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(result).toBeDefined();
      expect(result?.tagName.toLowerCase()).toBe('slot');
      expect(result?.getAttribute('name')).toBe('content');
    });

    it('should return cloned element when styled attribute is absent', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.textContent = 'Test content';
      slotElement.className = 'test-class';
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(result).toBeDefined();
      expect(result?.tagName.toLowerCase()).toBe('div');
      expect(result?.textContent).toBe('Test content');
      expect(result?.className).toBe('test-class');
    });

    it('should remove slot attribute from cloned element', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.textContent = 'Test content';
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(result?.hasAttribute('slot')).toBe(false);
    });

    it('should preserve all other attributes when cloning', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.setAttribute('id', 'test-id');
      slotElement.setAttribute('data-value', '123');
      slotElement.className = 'test-class';
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' }) as HTMLElement;

      expect(result.getAttribute('id')).toBe('test-id');
      expect(result.getAttribute('data-value')).toBe('123');
      expect(result.className).toBe('test-class');
    });

    it('should preserve child elements when cloning', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      const child = document.createElement('span');
      child.textContent = 'Child';
      slotElement.appendChild(child);
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' }) as HTMLElement;

      expect(result.children.length).toBe(1);
      expect(result.children[0].tagName.toLowerCase()).toBe('span');
      expect(result.children[0].textContent).toBe('Child');
    });

    it('should create independent clone (not reference)', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.textContent = 'Original';
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' }) as HTMLElement;

      result.textContent = 'Modified';

      expect(slotElement.textContent).toBe('Original');
      expect(result.textContent).toBe('Modified');
    });
  });

  describe('edge cases', () => {
    it('should return null when slot does not exist', () => {
      const result = createStyledSlotOrClone({ element: container, slotRef: 'nonexistent' });

      expect(result).toBeNull();
    });

    it('should return null for empty container', () => {
      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(result).toBeNull();
    });

    it('should handle empty styled attribute', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.setAttribute('styled', '');
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(result?.tagName.toLowerCase()).toBe('slot');
    });

    it('should handle styled attribute with value', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.setAttribute('styled', 'true');
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(result?.tagName.toLowerCase()).toBe('slot');
    });

    it('should use :scope selector to find direct children only', () => {
      const directSlot = document.createElement('div');
      directSlot.setAttribute('slot', 'content');
      directSlot.textContent = 'Direct';

      const wrapper = document.createElement('div');
      const nestedSlot = document.createElement('div');
      nestedSlot.setAttribute('slot', 'content');
      nestedSlot.textContent = 'Nested';
      wrapper.appendChild(nestedSlot);

      container.appendChild(directSlot);
      container.appendChild(wrapper);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(result?.textContent).toBe('Direct');
    });

    it('should handle different element types', () => {
      const elementTypes = ['div', 'span', 'section', 'article', 'p'];

      elementTypes.forEach((tagName) => {
        container.innerHTML = '';
        const slotElement = document.createElement(tagName);
        slotElement.setAttribute('slot', 'content');
        container.appendChild(slotElement);

        const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });

        expect(result?.tagName.toLowerCase()).toBe(tagName);
      });
    });

    it('should handle slot with complex nested structure', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      const level1 = document.createElement('div');
      const level2 = document.createElement('span');
      const level3 = document.createElement('strong');
      level3.textContent = 'Deep text';
      level2.appendChild(level3);
      level1.appendChild(level2);
      slotElement.appendChild(level1);
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' }) as HTMLElement;

      expect(result.querySelector('strong')?.textContent).toBe('Deep text');
    });

    it('should handle slot with text nodes', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.appendChild(document.createTextNode('Text node'));
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(result?.textContent).toBe('Text node');
    });

    it('should handle slot with mixed content', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.appendChild(document.createTextNode('Text '));
      const span = document.createElement('span');
      span.textContent = 'span';
      slotElement.appendChild(span);
      slotElement.appendChild(document.createTextNode(' more text'));
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(result?.textContent).toBe('Text span more text');
    });

    it('should handle slot names with hyphens', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'main-content');
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'main-content' });

      expect(result).toBeDefined();
    });

    it('should handle multiple slots with different names', () => {
      const slot1 = document.createElement('div');
      slot1.setAttribute('slot', 'header');
      slot1.textContent = 'Header';

      const slot2 = document.createElement('div');
      slot2.setAttribute('slot', 'footer');
      slot2.textContent = 'Footer';

      container.appendChild(slot1);
      container.appendChild(slot2);

      const result1 = createStyledSlotOrClone({ element: container, slotRef: 'header' });
      const result2 = createStyledSlotOrClone({ element: container, slotRef: 'footer' });

      expect(result1?.textContent).toBe('Header');
      expect(result2?.textContent).toBe('Footer');
    });
  });

  describe('error conditions', () => {
    it('should handle null element', () => {
      expect(() =>
        createStyledSlotOrClone({ element: null as any, slotRef: 'content' }),
      ).toThrow();
    });

    it('should handle undefined element', () => {
      expect(() =>
        createStyledSlotOrClone({ element: undefined as any, slotRef: 'content' }),
      ).toThrow();
    });

    it('should handle element not in DOM', () => {
      const detached = document.createElement('div');
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      detached.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: detached, slotRef: 'content' });

      expect(result).toBeDefined();
    });
  });

  describe('consistency', () => {
    it('should produce consistent results for styled elements', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.setAttribute('styled', '');
      container.appendChild(slotElement);

      const result1 = createStyledSlotOrClone({ element: container, slotRef: 'content' });
      const result2 = createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(result1?.tagName).toBe(result2?.tagName);
      expect(result1?.getAttribute('name')).toBe(result2?.getAttribute('name'));
    });

    it('should produce independent clones each time', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.textContent = 'Original';
      container.appendChild(slotElement);

      const result1 = createStyledSlotOrClone({ element: container, slotRef: 'content' }) as HTMLElement;
      const result2 = createStyledSlotOrClone({ element: container, slotRef: 'content' }) as HTMLElement;

      expect(result1).not.toBe(result2);
      result1.textContent = 'Modified 1';
      result2.textContent = 'Modified 2';

      expect(result1.textContent).toBe('Modified 1');
      expect(result2.textContent).toBe('Modified 2');
      expect(slotElement.textContent).toBe('Original');
    });

    it('should not modify original element', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.textContent = 'Original';
      slotElement.className = 'original-class';
      container.appendChild(slotElement);

      createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(slotElement.getAttribute('slot')).toBe('content');
      expect(slotElement.textContent).toBe('Original');
      expect(slotElement.className).toBe('original-class');
    });

    it('should return null consistently for missing slots', () => {
      const result1 = createStyledSlotOrClone({ element: container, slotRef: 'missing' });
      const result2 = createStyledSlotOrClone({ element: container, slotRef: 'missing' });

      expect(result1).toBeNull();
      expect(result2).toBeNull();
    });
  });

  describe('slot element creation', () => {
    it('should create slot with correct name attribute', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'test-slot');
      slotElement.setAttribute('styled', '');
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'test-slot' });

      expect(result?.tagName.toLowerCase()).toBe('slot');
      expect(result?.getAttribute('name')).toBe('test-slot');
    });

    it('should not include styled attribute in slot element', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.setAttribute('styled', '');
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(result?.hasAttribute('styled')).toBe(false);
    });

    it('should not include original content in slot element', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.setAttribute('styled', '');
      slotElement.textContent = 'This should not appear';
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' });

      expect(result?.textContent).toBe('');
    });
  });

  describe('cloneNode behavior', () => {
    it('should deep clone with true parameter', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      const child = document.createElement('span');
      child.textContent = 'Child content';
      slotElement.appendChild(child);
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' }) as HTMLElement;

      expect(result.children.length).toBe(1);
      expect(result.querySelector('span')?.textContent).toBe('Child content');
    });

    it('should preserve event listeners structure but not handlers', () => {
      const slotElement = document.createElement('div');
      slotElement.setAttribute('slot', 'content');
      slotElement.onclick = jest.fn();
      container.appendChild(slotElement);

      const result = createStyledSlotOrClone({ element: container, slotRef: 'content' }) as HTMLElement;

      // cloneNode does not copy event listeners
      expect(result.onclick).toBeNull();
    });
  });
});
