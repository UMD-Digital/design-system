import { createStyleTemplate } from '../../elements/createStyleTemplate';

describe('createStyleTemplate', () => {
  describe('happy path', () => {
    it('should create a template element', () => {
      const template = createStyleTemplate('.test { color: red; }');
      expect(template.tagName).toBe('TEMPLATE');
    });

    it('should contain style tag with CSS', () => {
      const styles = '.container { display: flex; }';
      const template = createStyleTemplate(styles);

      expect(template.innerHTML).toContain('<style>');
      expect(template.innerHTML).toContain(styles);
      expect(template.innerHTML).toContain('</style>');
    });

    it('should work with shadow DOM', () => {
      const host = document.createElement('div');
      const shadow = host.attachShadow({ mode: 'open' });

      const template = createStyleTemplate('.test { color: blue; }');
      shadow.appendChild(template.content.cloneNode(true));

      const styleElement = shadow.querySelector('style');
      expect(styleElement).not.toBeNull();
      expect(styleElement?.textContent).toBe('.test { color: blue; }');
    });

    it('should handle complex CSS', () => {
      const styles = `
        .container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .container > .item {
          padding: 0.5rem;
          background: #fff;
        }

        @media (min-width: 768px) {
          .container {
            flex-direction: row;
          }
        }
      `;

      const template = createStyleTemplate(styles);
      expect(template.innerHTML).toContain(styles);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      const template = createStyleTemplate('');
      expect(template.innerHTML).toBe('<style></style>');
    });

    it('should handle CSS with special characters', () => {
      const styles = '.test { content: "Hello & <World>"; }';
      const template = createStyleTemplate(styles);
      expect(template.innerHTML).toContain(styles);
    });

    it('should handle CSS with quotes', () => {
      const styles = `.test { content: "It's a quote"; }`;
      const template = createStyleTemplate(styles);
      expect(template.innerHTML).toContain(styles);
    });

    it('should handle CSS with newlines', () => {
      const styles = '.test {\n  color: red;\n}';
      const template = createStyleTemplate(styles);
      expect(template.innerHTML).toContain(styles);
    });

    it('should handle CSS with comments', () => {
      const styles = '/* Comment */ .test { color: red; }';
      const template = createStyleTemplate(styles);
      expect(template.innerHTML).toContain(styles);
    });

    it('should handle CSS with unicode', () => {
      const styles = `.test::before { content: "→"; }`;
      const template = createStyleTemplate(styles);
      expect(template.innerHTML).toContain(styles);
    });
  });

  describe('content cloning', () => {
    it('should allow content to be cloned multiple times', () => {
      const template = createStyleTemplate('.test { color: red; }');
      const container1 = document.createElement('div');
      const container2 = document.createElement('div');

      container1.appendChild(template.content.cloneNode(true));
      container2.appendChild(template.content.cloneNode(true));

      expect(container1.querySelector('style')).not.toBeNull();
      expect(container2.querySelector('style')).not.toBeNull();
      expect(container1.querySelector('style')?.textContent).toBe('.test { color: red; }');
      expect(container2.querySelector('style')?.textContent).toBe('.test { color: red; }');
    });

    it('should not mutate original when content is modified', () => {
      const template = createStyleTemplate('.test { color: red; }');
      const clone = template.content.cloneNode(true) as DocumentFragment;

      const styleInClone = clone.querySelector('style');
      if (styleInClone) {
        styleInClone.textContent = '.modified { color: blue; }';
      }

      // Original template should be unchanged
      expect(template.innerHTML).toContain('.test { color: red; }');
    });
  });

  describe('integration with shadow DOM', () => {
    it('should properly inject styles into shadow DOM', () => {
      const host = document.createElement('div');
      const shadow = host.attachShadow({ mode: 'open' });

      const styles = `
        :host {
          display: block;
        }
        .container {
          padding: 1rem;
        }
      `;

      const template = createStyleTemplate(styles);
      shadow.appendChild(template.content.cloneNode(true));

      // Add some content
      const container = document.createElement('div');
      container.className = 'container';
      container.textContent = 'Test';
      shadow.appendChild(container);

      // Verify structure
      expect(shadow.querySelector('style')).not.toBeNull();
      expect(shadow.querySelector('.container')).not.toBeNull();
      expect(shadow.querySelector('style')?.textContent).toContain(':host');
    });

    it('should support CSS custom properties', () => {
      const styles = `
        :host {
          --primary-color: #FF0000;
        }
        .test {
          color: var(--primary-color);
        }
      `;

      const template = createStyleTemplate(styles);
      expect(template.innerHTML).toContain('--primary-color');
      expect(template.innerHTML).toContain('var(--primary-color)');
    });
  });
});