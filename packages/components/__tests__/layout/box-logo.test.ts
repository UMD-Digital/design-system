import layoutBoxLogo from '../../source/api/layout/box-logo';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  validateSlots,
  createSlotContent,
} from '../test-helpers/component';
import { getComponentAttributes } from '../test-helpers/validation';

describe('Component: umd-element-logo', () => {
  const tagName = 'umd-element-logo';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-logo');
      document.body.appendChild(testElement);
      
      layoutBoxLogo();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      layoutBoxLogo();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      layoutBoxLogo();
    });

    it('should require image slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Component requires image slot, should handle missing required slot// Add image slot
      const img = createSlotContent('image', 'img', '');
      img.setAttribute('src', 'logo.png');
      img.setAttribute('alt', 'Test Logo');
      element.appendChild(img);
      
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
    });

    it('should accept img element in image slot', () => {
      const { element } = createTestComponent(tagName);
      
      const img = document.createElement('img');
      img.slot = 'image';
      img.src = 'company-logo.png';
      img.alt = 'Company Logo';
      element.appendChild(img)
      const slottedImage = element.querySelector('img[slot="image"]');
      expect(slottedImage).toBeTruthy();
      expect(slottedImage?.getAttribute('src')).toBe('company-logo.png');
      expect(slottedImage?.getAttribute('alt')).toBe('Company Logo');
    });

    it('should accept optional text content in default slot', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required image
      const img = createSlotContent('image', 'img', '');
      img.setAttribute('src', 'logo.png');
      img.setAttribute('alt', 'Logo');
      element.appendChild(img);
      
      // Add text content to default slot
      const text = document.createElement('p');
      text.textContent = 'Official Partner';
      element.appendChild(text)
      expect(element.querySelector('p')).toBeTruthy();
      expect(element.querySelector('p')?.textContent).toBe('Official Partner');
    });

    it('should validate slots configuration', () => {
      const { element } = createTestComponent(tagName);
      
      const expectedSlots = [
        { name: 'image', required: true }
      ];
      
      // This should throw because image slot is required
      expect(() => validateSlots(element, expectedSlots)).toThrow('Required slot "image" is missing');
      
      // Add required image slot
      const img = createSlotContent('image', 'img', '');
      element.appendChild(img);
      
      // Now validation should pass
      expect(() => validateSlots(element, expectedSlots)).not.toThrow();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      layoutBoxLogo();
    });

    it('should handle data-theme="dark" attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      
      // Add required image
      const img = createSlotContent('image', 'img', '');
      img.setAttribute('src', 'logo.png');
      img.setAttribute('alt', 'Logo');
      element.appendChild(img)
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-visual="bordered" attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'bordered'
      });
      
      // Add required image
      const img = createSlotContent('image', 'img', '');
      img.setAttribute('src', 'logo.png');
      img.setAttribute('alt', 'Logo');
      element.appendChild(img)
      const attributes = getComponentAttributes(element);
      expect(attributes['data-visual']).toBe('bordered');
    });

    it('should handle multiple attributes together', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark',
        'data-visual': 'bordered'
      });
      
      // Add required image
      const img = createSlotContent('image', 'img', '');
      img.setAttribute('src', 'logo.png');
      img.setAttribute('alt', 'Logo');
      element.appendChild(img)
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
      expect(attributes['data-visual']).toBe('bordered');
    });

    it('should work without any attributes', () => {
      const { element } = createTestComponent(tagName);
      
      // Add required image
      const img = createSlotContent('image', 'img', '');
      img.setAttribute('src', 'logo.png');
      img.setAttribute('alt', 'Logo');
      element.appendChild(img)
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBeUndefined();
      expect(attributes['data-visual']).toBeUndefined();
    });
  });

  describe('Content Examples', () => {
    beforeEach(() => {
      layoutBoxLogo();
    });

    it('should handle basic logo display', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <img slot="image" src="logo.png" alt="Company Logo" />
      `;
      const img = element.querySelector('img[slot="image"]');
      expect(img).toBeTruthy();
      expect(img?.getAttribute('src')).toBe('logo.png');
      expect(img?.getAttribute('alt')).toBe('Company Logo');
    });

    it('should handle logo with text and dark theme', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      
      element.innerHTML = `
        <img slot="image" src="partner-logo.png" alt="Partner Logo" />
        <p>Official University Partner</p>
      `;
      expect(element.getAttribute('data-theme')).toBe('dark');
      expect(element.querySelector('img[slot="image"]')).toBeTruthy();
      expect(element.querySelector('p')?.textContent).toBe('Official University Partner');
    });

    it('should handle bordered logo box', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-visual': 'bordered'
      });
      
      element.innerHTML = `
        <img slot="image" src="sponsor.png" alt="Sponsor Logo" />
        <span>Gold Sponsor</span>
      `;
      expect(element.getAttribute('data-visual')).toBe('bordered');
      expect(element.querySelector('img[slot="image"]')).toBeTruthy();
      expect(element.querySelector('span')?.textContent).toBe('Gold Sponsor');
    });
  });
});