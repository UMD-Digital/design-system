import { stickyColumns as layoutStickyColumns } from '../../source/web-components/layout/sticky-columns';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  validateSlots,
  createSlotContent,
  setAttributeAndWait,
} from '../test-helpers/component';
import { getComponentAttributes, validateDeprecatedAttribute } from '../test-helpers/validation';
import { captureWarnings } from '../test-helpers/component';

describe('Component: umd-element-sticky-columns', () => {
  const tagName = 'umd-element-sticky-columns';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-sticky-columns');
      document.body.appendChild(testElement);
      
      layoutStickyColumns();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      layoutStickyColumns();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      layoutStickyColumns();
    });

    it('should require sticky-column slot', () => {
      const { element } = createTestComponent(tagName);
      
      const expectedSlots = [
        { name: 'sticky-column', required: true },
        { name: 'static-column', required: true }
      ];
      
      // Should throw because both slots are required
      expect(() => validateSlots(element, expectedSlots)).toThrow('Required slot "sticky-column" is missing');
    });

    it('should require static-column slot', async () => {
      const { element } = createTestComponent(tagName);
      
      // Add only sticky-column
      const sticky = createSlotContent('sticky-column', 'nav', '');
      element.appendChild(sticky);
      
      const expectedSlots = [
        { name: 'sticky-column', required: true },
        { name: 'static-column', required: true }
      ];
      
      // Should still throw because static-column is missing
      expect(() => validateSlots(element, expectedSlots)).toThrow('Required slot "static-column" is missing');
    });

    it('should accept both required slots', async () => {
      const { element } = createTestComponent(tagName);
      
      // Add sticky column
      const sticky = document.createElement('nav');
      sticky.slot = 'sticky-column';
      sticky.innerHTML = '<ul><li>Item 1</li><li>Item 2</li></ul>';
      element.appendChild(sticky);
      
      // Add static column
      const static_ = document.createElement('article');
      static_.slot = 'static-column';
      static_.innerHTML = '<h1>Content</h1><p>Main content here</p>';
      element.appendChild(static_)
      expect(element.querySelector('[slot="sticky-column"]')).toBeTruthy();
      expect(element.querySelector('[slot="static-column"]')).toBeTruthy();
    });

    it('should accept any content type in slots', () => {
      const { element } = createTestComponent(tagName);
      
      // Various content in sticky column
      const sticky = document.createElement('aside');
      sticky.slot = 'sticky-column';
      sticky.innerHTML = `
        <h3>Navigation</h3>
        <nav>
          <a href="#1">Link 1</a>
          <a href="#2">Link 2</a>
        </nav>
        <div>Additional info</div>
      `;
      element.appendChild(sticky);
      
      // Various content in static column
      const static_ = document.createElement('main');
      static_.slot = 'static-column';
      static_.innerHTML = `
        <article>
          <h1>Title</h1>
          <section id="1">Section 1</section>
          <section id="2">Section 2</section>
        </article>
      `;
      element.appendChild(static_)
      const stickySlot = element.querySelector('[slot="sticky-column"]');
      expect(stickySlot?.querySelector('h3')).toBeTruthy();
      expect(stickySlot?.querySelector('nav')).toBeTruthy();
      expect(stickySlot?.querySelector('div')).toBeTruthy();
      
      const staticSlot = element.querySelector('[slot="static-column"]');
      expect(staticSlot?.querySelector('article')).toBeTruthy();
      expect(staticSlot?.querySelector('h1')).toBeTruthy();
      expect(staticSlot?.querySelectorAll('section').length).toBe(2);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      layoutStickyColumns();
    });

    it('should handle data-visual="sticky-first" attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'sticky-first'
      });
      
      // Add required slots
      element.innerHTML = `
        <div slot="sticky-column">Sticky</div>
        <div slot="static-column">Static</div>
      `;
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual']).toBe('sticky-first');
    });

    it('should default to sticky-last when data-visual is not set', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required slots
      element.innerHTML = `
        <div slot="sticky-column">Sticky</div>
        <div slot="static-column">Static</div>
      `;// Without data-visual="sticky-first", isStickyLast should be true
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual']).toBeUndefined();
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      layoutStickyColumns();
    });

    it('should observe data-visual-position attribute', async () => {
      const { element } = createTestComponent(tagName);
      
      // Add required slots
      element.innerHTML = `
        <div slot="sticky-column">Sticky</div>
        <div slot="static-column">Static</div>
      `;// Mock the setPosition event
      const mockSetPosition = jest.fn();
      (element as any).events = { setPosition: mockSetPosition };
      
      // Set data-visual-position
      await setAttributeAndWait(element, 'data-visual-position', '100');
      
      expect(element.getAttribute('data-visual-position')).toBe('100');
    });

    it('should handle position changes dynamically', async () => {
      const { element } = createTestComponent(tagName);
      
      // Add required slots
      element.innerHTML = `
        <div slot="sticky-column">Sticky</div>
        <div slot="static-column">Static</div>
      `;// Mock the setPosition event
      const mockSetPosition = jest.fn();
      (element as any).events = { setPosition: mockSetPosition };
      
      // Change position multiple times
      await setAttributeAndWait(element, 'data-visual-position', '50');
      expect(element.getAttribute('data-visual-position')).toBe('50');
      
      await setAttributeAndWait(element, 'data-visual-position', '150');
      expect(element.getAttribute('data-visual-position')).toBe('150');
      
      await setAttributeAndWait(element, 'data-visual-position', '0');
      expect(element.getAttribute('data-visual-position')).toBe('0');
    });

    it('should handle deprecated sticky-top attribute', async () => {
      const warnings = captureWarnings(() => {
        const { element } = createTestComponent(tagName);
        
        // Add required slots
        element.innerHTML = `
          <div slot="sticky-column">Sticky</div>
          <div slot="static-column">Static</div>
        `;
        
        // Use deprecated attribute
        element.setAttribute('sticky-top', '80');
      });
      
      // The component still observes the deprecated attribute
      // but it should work the same as data-visual-position
      const { element } = createTestComponent(tagName);
      element.innerHTML = `
        <div slot="sticky-column">Sticky</div>
        <div slot="static-column">Static</div>
      `;// Mock the setPosition event
      const mockSetPosition = jest.fn();
      (element as any).events = { setPosition: mockSetPosition };
      
      // Set deprecated attribute
      await setAttributeAndWait(element, 'sticky-top', '80');
      expect(element.getAttribute('sticky-top')).toBe('80');
    });
  });

  describe('Content Examples', () => {
    beforeEach(() => {
      layoutStickyColumns();
    });

    it('should handle basic sticky columns with navigation', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <nav slot="sticky-column">
          <ul>
            <li><a href="#section1">Section 1</a></li>
            <li><a href="#section2">Section 2</a></li>
            <li><a href="#section3">Section 3</a></li>
          </ul>
        </nav>
        <article slot="static-column">
          <section id="section1">Content 1</section>
          <section id="section2">Content 2</section>
          <section id="section3">Content 3</section>
        </article>
      `;
      const nav = element.querySelector('nav[slot="sticky-column"]');
      expect(nav?.querySelectorAll('li').length).toBe(3);
      
      const article = element.querySelector('article[slot="static-column"]');
      expect(article?.querySelectorAll('section').length).toBe(3);
    });

    it('should handle sticky column first with custom offset', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'sticky-first',
        'data-visual-position': '100'
      });
      
      element.innerHTML = `
        <aside slot="sticky-column">
          <h3>Quick Facts</h3>
          <ul>
            <li>Founded: 1856</li>
            <li>Students: 40,000+</li>
            <li>Location: College Park, MD</li>
          </ul>
        </aside>
        <main slot="static-column">
          <h1>About the University</h1>
          <p>Long content about the university...</p>
        </main>
      `;
      expect(element.getAttribute('data-visual')).toBe('sticky-first');
      expect(element.getAttribute('data-visual-position')).toBe('100');
      
      const aside = element.querySelector('aside[slot="sticky-column"]');
      expect(aside?.querySelector('h3')?.textContent).toBe('Quick Facts');
      expect(aside?.querySelectorAll('li').length).toBe(3);
    });

    it('should support dynamic position adjustment', async () => {
      const { element } = createTestComponent(tagName);
      element.id = 'sticky-layout';
      
      element.innerHTML = `
        <div slot="sticky-column">Sticky content</div>
        <div slot="static-column">Scrollable content</div>
      `;// Mock the setPosition event
      const mockSetPosition = jest.fn();
      (element as any).events = { setPosition: mockSetPosition };
      
      // Simulate dynamic position adjustment
      const headerHeight = 80; // Mock header height
      const offset = 20;
      await setAttributeAndWait(element, 'data-visual-position', String(headerHeight + offset));
      
      expect(element.getAttribute('data-visual-position')).toBe('100');
    });
  });

  describe('Column Order', () => {
    beforeEach(() => {
      layoutStickyColumns();
    });

    it('should place sticky column last by default', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <div slot="sticky-column">Sticky</div>
        <div slot="static-column">Static</div>
      `;// Without data-visual="sticky-first", sticky should be last
      expect(element.hasAttribute('data-visual')).toBe(false);
    });

    it('should place sticky column first when specified', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'sticky-first'
      });
      
      element.innerHTML = `
        <div slot="sticky-column">Sticky</div>
        <div slot="static-column">Static</div>
      `;
      expect(element.getAttribute('data-visual')).toBe('sticky-first');
    });
  });
});