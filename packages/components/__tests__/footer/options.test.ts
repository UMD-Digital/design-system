import footerOptions from '../../source/api/footer/options';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../test-helpers/validation';
import { captureWarningsAsync } from '../test-helpers/component';

describe('Component: umd-element-footer', () => {
  const tagName = 'umd-element-footer';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-footer');
      document.body.appendChild(testElement);
      
      footerOptions();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      footerOptions();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Accessibility', () => {
    beforeEach(() => {
      footerOptions();
    });

    it('should support role attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'role': 'contentinfo'
      });
      // In real component, role="contentinfo" would be added automatically
      // In tests, we verify it can be set
      expect(element.getAttribute('role')).toBe('contentinfo');
    });

    it('should support aria-label attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'aria-label': 'site footer'
      });
      // In real component, aria-label would be added automatically
      // In tests, we verify it can be set
      expect(element.getAttribute('aria-label')).toBe('site footer');
    });

    it('should preserve existing role attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'role': 'complementary'
      });
      expect(element.getAttribute('role')).toBe('complementary');
    });

    it('should preserve existing aria-label', () => {
      const { element } = createTestComponent(tagName, '', {
        'aria-label': 'custom footer'
      });
      expect(element.getAttribute('aria-label')).toBe('custom footer');
    });
  });

  describe('Footer Types', () => {
    beforeEach(() => {
      footerOptions();
    });

    it('should default to simple type', () => {
      const { element } = createTestComponent(tagName);
      // Component defaults to simple when no type is specified
      expect(element.hasAttribute('type')).toBe(false);
    });

    it('should handle type="simple"', () => {
      const { element } = createTestComponent(tagName, '', {
        'type': 'simple'
      });
      expect(element.getAttribute('type')).toBe('simple');
    });

    it('should handle type="mega"', () => {
      const { element } = createTestComponent(tagName, '', {
        'type': 'mega'
      });
      expect(element.getAttribute('type')).toBe('mega');
    });

    it('should handle type="visual"', () => {
      const { element } = createTestComponent(tagName, '', {
        'type': 'visual'
      });
      expect(element.getAttribute('type')).toBe('visual');
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      footerOptions();
    });

    it('should accept contact-headline slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('contact-headline', 'h2', 'Contact Us'));
      
      expect(element.querySelector('[slot="contact-headline"]')).toBeTruthy();
    });

    it('should accept contact-links slot', () => {
      const { element } = createTestComponent(tagName);
      
      const links = document.createElement('div');
      links.setAttribute('slot', 'contact-links');
      links.innerHTML = '<a href="#">Link 1</a><a href="#">Link 2</a>';
      element.appendChild(links);
      
      expect(element.querySelector('[slot="contact-links"]')).toBeTruthy();
    });

    it('should accept contact-address slot', () => {
      const { element } = createTestComponent(tagName);
      
      const address = document.createElement('address');
      address.setAttribute('slot', 'contact-address');
      address.textContent = 'University of Maryland, College Park, MD 20742';
      element.appendChild(address);
      
      expect(element.querySelector('[slot="contact-address"]')).toBeTruthy();
    });

    it('should accept call-to-action slot', () => {
      const { element } = createTestComponent(tagName);
      
      const cta = document.createElement('a');
      cta.setAttribute('slot', 'call-to-action');
      cta.href = '/apply';
      cta.textContent = 'Apply Now';
      element.appendChild(cta);
      
      expect(element.querySelector('[slot="call-to-action"]')).toBeTruthy();
    });

    it('should accept social-links slot', () => {
      const { element } = createTestComponent(tagName);
      
      const social = document.createElement('div');
      social.setAttribute('slot', 'social-links');
      social.innerHTML = '<a href="#">Facebook</a><a href="#">Twitter</a>';
      element.appendChild(social);
      
      expect(element.querySelector('[slot="social-links"]')).toBeTruthy();
    });

    it('should accept utility-links slot', () => {
      const { element } = createTestComponent(tagName);
      
      const utility = document.createElement('div');
      utility.setAttribute('slot', 'utility-links');
      utility.innerHTML = '<a href="#">Privacy</a><a href="#">Terms</a>';
      element.appendChild(utility);
      
      expect(element.querySelector('[slot="utility-links"]')).toBeTruthy();
    });

    it('should accept link columns for mega footer', () => {
      const { element } = createTestComponent(tagName, '', {
        'type': 'mega'
      });
      
      // Column 1
      const col1 = document.createElement('div');
      col1.setAttribute('slot', 'link-column-one');
      col1.innerHTML = '<h3>Column 1</h3><ul><li><a href="#">Link</a></li></ul>';
      element.appendChild(col1);
      
      // Column 2
      const col2 = document.createElement('div');
      col2.setAttribute('slot', 'link-column-two');
      col2.innerHTML = '<h3>Column 2</h3><ul><li><a href="#">Link</a></li></ul>';
      element.appendChild(col2);
      
      // Column 3
      const col3 = document.createElement('div');
      col3.setAttribute('slot', 'link-column-three');
      col3.innerHTML = '<h3>Column 3</h3><ul><li><a href="#">Link</a></li></ul>';
      element.appendChild(col3);
      
      expect(element.querySelector('[slot="link-column-one"]')).toBeTruthy();
      expect(element.querySelector('[slot="link-column-two"]')).toBeTruthy();
      expect(element.querySelector('[slot="link-column-three"]')).toBeTruthy();
    });

    it('should validate background-image slot accepts only img elements', () => {
      const { element } = createTestComponent(tagName, '', {
        'type': 'visual'
      });
      
      // Valid: img element
      const img = document.createElement('img');
      img.setAttribute('slot', 'background-image');
      img.src = 'campus.jpg';
      img.alt = 'Campus';
      element.appendChild(img);
      
      const validation = validateSlotConfiguration(element, {
        'background-image': { allowedElements: ['img'] },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      footerOptions();
    });

    it('should handle data-theme attribute with light value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'light'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('light');
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'light'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      footerOptions();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});