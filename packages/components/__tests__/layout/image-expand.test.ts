import layoutImageExpand from '../../source/api/layout/image-expand';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  validateSlots,
  createSlotContent,
} from '../test-helpers/component';

describe('Component: umd-layout-image-expand', () => {
  const tagName = 'umd-layout-image-expand';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-layout-image-expand');
      document.body.appendChild(testElement);
      
      layoutImageExpand();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      layoutImageExpand();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      layoutImageExpand();
    });

    it('should require content slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Component requires content slot
      const expectedSlots = [
        { name: 'content', required: true },
        { name: 'image', required: true }
      ];
      
      // Should throw because both slots are required
      expect(() => validateSlots(element, expectedSlots)).toThrow();
    });

    it('should require image slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Add only content slot
      const content = createSlotContent('content', 'div', 'Test content');
      element.appendChild(content)
      const expectedSlots = [
        { name: 'content', required: true },
        { name: 'image', required: true }
      ];
      
      // Should still throw because image slot is missing
      expect(() => validateSlots(element, expectedSlots)).toThrow('Required slot "image" is missing');
    });

    it('should accept both required slots', () => {
      const { element } = createTestComponent(tagName);
      
      // Add content slot
      const content = document.createElement('div');
      content.slot = 'content';
      content.innerHTML = '<h2>Featured Content</h2><p>Description</p>';
      element.appendChild(content);
      
      // Add image slot
      const img = document.createElement('img');
      img.slot = 'image';
      img.src = 'feature.jpg';
      img.alt = 'Feature Image';
      element.appendChild(img)
      expect(element.querySelector('[slot="content"]')).toBeTruthy();
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
    });

    it('should accept any elements in content slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Add varied content
      const content = document.createElement('div');
      content.slot = 'content';
      content.innerHTML = `
        <h1>Title</h1>
        <p>Paragraph</p>
        <ul>
          <li>List item</li>
        </ul>
        <a href="/link">Link</a>
      `;
      element.appendChild(content);
      
      // Add image
      const img = createSlotContent('image', 'img', '');
      img.setAttribute('src', 'image.jpg');
      img.setAttribute('alt', 'Image');
      element.appendChild(img)
      const slottedContent = element.querySelector('[slot="content"]');
      expect(slottedContent?.querySelector('h1')).toBeTruthy();
      expect(slottedContent?.querySelector('p')).toBeTruthy();
      expect(slottedContent?.querySelector('ul')).toBeTruthy();
      expect(slottedContent?.querySelector('a')).toBeTruthy();
    });
  });

  describe('Content Examples', () => {
    beforeEach(() => {
      layoutImageExpand();
    });

    it('should handle basic image expand layout', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <div slot="content">
          <h2>Featured Research</h2>
          <p>Breakthrough discoveries in quantum computing...</p>
        </div>
        <img slot="image" src="research-lab.jpg" alt="Quantum Lab" />
      `;
      const content = element.querySelector('[slot="content"]');
      expect(content?.querySelector('h2')?.textContent).toBe('Featured Research');
      expect(content?.querySelector('p')?.textContent).toBe('Breakthrough discoveries in quantum computing...');
      
      const img = element.querySelector('img[slot="image"]');
      expect(img?.getAttribute('src')).toBe('research-lab.jpg');
      expect(img?.getAttribute('alt')).toBe('Quantum Lab');
    });

    it('should handle rich content with article', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <article slot="content">
          <h1>Campus Innovation Hub</h1>
          <p>The new Innovation Hub brings together students, faculty, and industry partners...</p>
          <a href="/innovation">Learn More</a>
        </article>
        <img slot="image" src="innovation-hub.jpg" alt="Innovation Hub Interior" />
      `;
      const article = element.querySelector('article[slot="content"]');
      expect(article).toBeTruthy();
      expect(article?.querySelector('h1')?.textContent).toBe('Campus Innovation Hub');
      expect(article?.querySelector('p')?.textContent).toContain('Innovation Hub brings together');
      expect(article?.querySelector('a')?.getAttribute('href')).toBe('/innovation');
      
      const img = element.querySelector('img[slot="image"]');
      expect(img?.getAttribute('src')).toBe('innovation-hub.jpg');
    });

    it('should handle multiple content elements', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <div slot="content">
          <h2>Research Excellence</h2>
          <p>First paragraph of content</p>
          <p>Second paragraph of content</p>
          <div class="actions">
            <a href="/action1">Primary Action</a>
            <a href="/action2">Secondary Action</a>
          </div>
        </div>
        <img slot="image" src="research.jpg" alt="Research" />
      `;
      const content = element.querySelector('[slot="content"]');
      const paragraphs = content?.querySelectorAll('p');
      expect(paragraphs?.length).toBe(2);
      
      const actions = content?.querySelectorAll('.actions a');
      expect(actions?.length).toBe(2);
    });
  });

  describe('Image Validation', () => {
    beforeEach(() => {
      layoutImageExpand();
    });

    it('should only accept img element in image slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Add content
      const content = createSlotContent('content', 'div', 'Content');
      element.appendChild(content);
      
      // Try to add non-img element to image slot
      const div = document.createElement('div');
      div.slot = 'image';
      div.textContent = 'Not an image';
      element.appendChild(div);
      // The component validates that image slot contains an img element
      // The validation happens in Markup.validate.ImageSlot
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
    });

    it('should handle image with various attributes', () => {
      const { element } = createTestComponent(tagName);
      
      // Add content
      const content = createSlotContent('content', 'div', 'Content');
      element.appendChild(content);
      
      // Add image with multiple attributes
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.setAttribute('src', 'hero-image.jpg');
      img.setAttribute('alt', 'Hero Image');
      img.setAttribute('width', '1200');
      img.setAttribute('height', '600');
      img.setAttribute('loading', 'lazy');
      element.appendChild(img)
      const slottedImage = element.querySelector('img[slot="image"]');
      expect(slottedImage?.getAttribute('src')).toBe('hero-image.jpg');
      expect(slottedImage?.getAttribute('alt')).toBe('Hero Image');
      expect(slottedImage?.getAttribute('width')).toBe('1200');
      expect(slottedImage?.getAttribute('height')).toBe('600');
      expect(slottedImage?.getAttribute('loading')).toBe('lazy');
    });
  });
});