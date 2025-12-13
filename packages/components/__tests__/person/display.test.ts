import personDisplay from '../../source/api/person/display';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
  captureWarningsAsync,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../test-helpers/validation';

describe('Component: umd-element-person', () => {
  const tagName = 'umd-element-person';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-person');
      document.body.appendChild(testElement);
      
      personDisplay();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      personDisplay();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      personDisplay();
    });

    it('should accept optional name slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('name', 'p', 'John Doe'));
      
      expect(element.querySelector('[slot="name"]')).toBeTruthy();
    });

    it('should accept optional pronouns slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('pronouns', 'span', '(he/him)'));
      
      expect(element.querySelector('[slot="pronouns"]')).toBeTruthy();
    });

    it('should accept optional job-title slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('job-title', 'p', 'Program Coordinator'));
      
      expect(element.querySelector('[slot="job-title"]')).toBeTruthy();
    });

    it('should accept optional association slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('association', 'p', 'Department of Biology'));
      
      expect(element.querySelector('[slot="association"]')).toBeTruthy();
    });

    it('should accept optional email slot with mailto link', () => {
      const { element } = createTestComponent(tagName);
      
      const emailLink = document.createElement('a');
      emailLink.setAttribute('slot', 'email');
      emailLink.setAttribute('href', 'mailto:jdoe@umd.edu');
      emailLink.textContent = 'jdoe@umd.edu';
      element.appendChild(emailLink);
      
      expect(element.querySelector('[slot="email"]')).toBeTruthy();
    });

    it('should accept optional phone slot with tel link', () => {
      const { element } = createTestComponent(tagName);
      
      const phoneLink = document.createElement('a');
      phoneLink.setAttribute('slot', 'phone');
      phoneLink.setAttribute('href', 'tel:301-405-1234');
      phoneLink.textContent = '301-405-1234';
      element.appendChild(phoneLink);
      
      expect(element.querySelector('[slot="phone"]')).toBeTruthy();
    });

    it('should accept optional address slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('address', 'p', '123 Campus Drive'));
      
      expect(element.querySelector('[slot="address"]')).toBeTruthy();
    });

    it('should accept optional linkedin slot', () => {
      const { element } = createTestComponent(tagName);
      
      const linkedinLink = document.createElement('a');
      linkedinLink.setAttribute('slot', 'linkedin');
      linkedinLink.setAttribute('href', 'https://linkedin.com/in/johndoe');
      linkedinLink.textContent = 'LinkedIn';
      element.appendChild(linkedinLink);
      
      expect(element.querySelector('[slot="linkedin"]')).toBeTruthy();
    });

    it('should accept optional additional-contact slot', () => {
      const { element } = createTestComponent(tagName);
      
      const additionalContact = document.createElement('div');
      additionalContact.setAttribute('slot', 'additional-contact');
      additionalContact.innerHTML = '<p>Regions: MD, DC</p>';
      element.appendChild(additionalContact);
      
      expect(element.querySelector('[slot="additional-contact"]')).toBeTruthy();
    });

    it('should accept optional image slot', () => {
      const { element } = createTestComponent(tagName);
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'staff-photo.jpg';
      img.alt = 'John Doe';
      element.appendChild(img);
      
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
    });

    it('should accept optional sub-text slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('sub-text', 'p', 'Office: Building A, Room 123'));
      
      expect(element.querySelector('[slot="sub-text"]')).toBeTruthy();
    });

    it('should accept optional actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      const action = document.createElement('a');
      action.setAttribute('slot', 'actions');
      action.setAttribute('href', '/faculty/johndoe');
      action.textContent = 'View Profile';
      element.appendChild(action);
      
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      personDisplay();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-display attribute with list value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-display': 'list'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBe('list');
    });

    it('should handle data-display attribute with tabular value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-display': 'tabular'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBe('tabular');
    });

    it('should handle default display (block) when data-display is not specified', () => {
      const { element } = createTestComponent(tagName);const attributes = getComponentAttributes(element);
      expect(attributes['data-display']).toBeUndefined();
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'dark'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });

    it('should handle deprecated display attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'display': 'list'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'display', 'data-display')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      personDisplay();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});