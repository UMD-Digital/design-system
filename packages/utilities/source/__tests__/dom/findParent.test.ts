import { findParent } from '../../dom/findParent';

describe('findParent', () => {
  let grandparent: HTMLElement;
  let parent: HTMLElement;
  let child: HTMLElement;

  beforeEach(() => {
    grandparent = document.createElement('div');
    grandparent.setAttribute('data-container', 'true');

    parent = document.createElement('div');
    parent.setAttribute('data-parent', 'true');

    child = document.createElement('button');
    child.setAttribute('data-child', 'true');

    grandparent.appendChild(parent);
    parent.appendChild(child);
    document.body.appendChild(grandparent);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('happy path', () => {
    it('should find immediate parent with attribute', () => {
      const result = findParent({ element: child, attr: 'data-parent' });

      expect(result).toBe(parent);
    });

    it('should find grandparent with attribute', () => {
      const result = findParent({ element: child, attr: 'data-container' });

      expect(result).toBe(grandparent);
    });

    it('should return element itself if it has the attribute', () => {
      const result = findParent({ element: child, attr: 'data-child' });

      expect(result).toBe(child);
    });

    it('should traverse multiple levels', () => {
      const greatGrandparent = document.createElement('div');
      greatGrandparent.setAttribute('data-root', 'true');
      greatGrandparent.appendChild(grandparent);
      document.body.appendChild(greatGrandparent);

      const result = findParent({ element: child, attr: 'data-root' });

      expect(result).toBe(greatGrandparent);
    });

    it('should work with different attribute types', () => {
      parent.setAttribute('role', 'dialog');

      const result = findParent({ element: child, attr: 'role' });

      expect(result).toBe(parent);
    });

    it('should work with id attribute', () => {
      parent.id = 'main-parent';

      const result = findParent({ element: child, attr: 'id' });

      expect(result).toBe(parent);
    });

    it('should work with class attribute', () => {
      parent.className = 'parent-class';

      const result = findParent({ element: child, attr: 'class' });

      expect(result).toBe(parent);
    });
  });

  describe('edge cases', () => {
    it('should return original element when no parent has attribute', () => {
      const result = findParent({ element: child, attr: 'data-nonexistent' });

      expect(result).toBe(child);
    });

    it('should return original element when element has no parent', () => {
      const orphan = document.createElement('div');

      const result = findParent({ element: orphan, attr: 'data-something' });

      expect(result).toBe(orphan);
    });

    it('should handle element at document root', () => {
      const root = document.createElement('div');
      document.body.appendChild(root);

      const result = findParent({ element: root, attr: 'data-missing' });

      expect(result).toBe(root);
    });

    it('should stop at first matching parent', () => {
      const middle = document.createElement('div');
      middle.setAttribute('data-level', 'middle');
      parent.removeChild(child);
      parent.appendChild(middle);
      middle.appendChild(child);

      grandparent.setAttribute('data-level', 'top');

      const result = findParent({ element: child, attr: 'data-level' });

      // Should find middle, not grandparent
      expect(result).toBe(middle);
      expect(result).not.toBe(grandparent);
    });

    it('should handle empty string attribute', () => {
      parent.setAttribute('data-empty', '');

      const result = findParent({ element: child, attr: 'data-empty' });

      expect(result).toBe(parent);
    });

    it('should handle attribute with special characters', () => {
      parent.setAttribute('data-special-attr-123', 'value');

      const result = findParent({ element: child, attr: 'data-special-attr-123' });

      expect(result).toBe(parent);
    });

    it('should be case-insensitive for attribute names (HTML behavior)', () => {
      parent.setAttribute('data-Test', 'value');

      const resultCorrect = findParent({ element: child, attr: 'data-Test' });
      const resultLowercase = findParent({ element: child, attr: 'data-test' });

      // HTML attributes are case-insensitive, so both should find the parent
      expect(resultCorrect).toBe(parent);
      expect(resultLowercase).toBe(parent);
    });
  });

  describe('error conditions', () => {
    it('should handle null element gracefully', () => {
      // The function will return null when passed null
      const result = findParent({ element: null as any, attr: 'data-test' });
      expect(result).toBeNull();
    });

    it('should handle undefined element gracefully', () => {
      // The function will return the element (undefined) when passed undefined
      const result = findParent({ element: undefined as any, attr: 'data-test' });
      expect(result).toBeUndefined();
    });

    it('should handle null attribute', () => {
      const result = findParent({ element: child, attr: null as any });

      // hasAttribute with null converts to 'null' string
      expect(result).toBe(child);
    });

    it('should handle undefined attribute', () => {
      const result = findParent({ element: child, attr: undefined as any });

      // hasAttribute with undefined converts to 'undefined' string
      expect(result).toBe(child);
    });

    it('should handle empty string attribute name', () => {
      const result = findParent({ element: child, attr: '' });

      expect(result).toBe(child);
    });
  });

  describe('recursion handling', () => {
    it('should not cause stack overflow with deeply nested elements', () => {
      let current = child;

      // Create a deep nesting (100 levels)
      for (let i = 0; i < 100; i++) {
        const newParent = document.createElement('div');
        newParent.appendChild(current);
        current = newParent;
      }

      current.setAttribute('data-deep', 'true');
      document.body.appendChild(current);

      const result = findParent({ element: child, attr: 'data-deep' });

      expect(result).toBe(current);
    });

    it('should handle circular references gracefully', () => {
      // This shouldn't happen in normal DOM, but test behavior
      // Normal DOM prevents circular references, so this should work fine
      const result = findParent({ element: child, attr: 'data-circular' });

      expect(result).toBe(child);
    });
  });
});