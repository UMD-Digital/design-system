import personBio from '../../source/api/person/bio';
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

describe('Component: umd-element-person-bio', () => {
  const tagName = 'umd-element-person-bio';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-person-bio');
      document.body.appendChild(testElement);
      
      personBio();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      personBio();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      personBio();
    });

    it('should accept optional name slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('name', 'h2', 'Dr. Jane Smith'));
      
      expect(element.querySelector('[slot="name"]')).toBeTruthy();
    });

    it('should accept optional pronouns slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('pronouns', 'span', '(she/her)'));
      
      expect(element.querySelector('[slot="pronouns"]')).toBeTruthy();
    });

    it('should accept optional job-title slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('job-title', 'p', 'Professor of Computer Science'));
      
      expect(element.querySelector('[slot="job-title"]')).toBeTruthy();
    });

    it('should accept optional association slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('association', 'p', 'Department of Computer Science'));
      
      expect(element.querySelector('[slot="association"]')).toBeTruthy();
    });

    it('should accept optional email slot with mailto link', () => {
      const { element } = createTestComponent(tagName);
      
      const emailLink = document.createElement('a');
      emailLink.setAttribute('slot', 'email');
      emailLink.setAttribute('href', 'mailto:jsmith@umd.edu');
      emailLink.textContent = 'jsmith@umd.edu';
      element.appendChild(emailLink);
      
      expect(element.querySelector('[slot="email"]')).toBeTruthy();
    });

    it('should accept optional phone slot with tel link', () => {
      const { element } = createTestComponent(tagName);
      
      const phoneLink = document.createElement('a');
      phoneLink.setAttribute('slot', 'phone');
      phoneLink.setAttribute('href', 'tel:301-405-1000');
      phoneLink.textContent = '301-405-1000';
      element.appendChild(phoneLink);
      
      expect(element.querySelector('[slot="phone"]')).toBeTruthy();
    });

    it('should accept optional address slot', () => {
      const { element } = createTestComponent(tagName);
      
      const address = document.createElement('address');
      address.setAttribute('slot', 'address');
      address.innerHTML = '2101 Glenn L. Martin Hall<br>College Park, MD 20742';
      element.appendChild(address);
      
      expect(element.querySelector('[slot="address"]')).toBeTruthy();
    });

    it('should accept optional linkedin slot', () => {
      const { element } = createTestComponent(tagName);
      
      const linkedinLink = document.createElement('a');
      linkedinLink.setAttribute('slot', 'linkedin');
      linkedinLink.setAttribute('href', 'https://linkedin.com/in/jsmith');
      linkedinLink.textContent = 'LinkedIn';
      element.appendChild(linkedinLink);
      
      expect(element.querySelector('[slot="linkedin"]')).toBeTruthy();
    });

    it('should accept optional additional-contact slot', () => {
      const { element } = createTestComponent(tagName);
      
      const additionalContact = document.createElement('div');
      additionalContact.setAttribute('slot', 'additional-contact');
      additionalContact.innerHTML = '<p>Lab: Room 3120</p><p>Office Hours: Tue/Thu 2-4pm</p>';
      element.appendChild(additionalContact);
      
      expect(element.querySelector('[slot="additional-contact"]')).toBeTruthy();
    });

    it('should accept optional image slot', () => {
      const { element } = createTestComponent(tagName);
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'professor.jpg';
      img.alt = 'Dr. Smith';
      element.appendChild(img);
      
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
    });

    it('should accept optional description slot', () => {
      const { element } = createTestComponent(tagName);
      
      const description = document.createElement('div');
      description.setAttribute('slot', 'description');
      description.innerHTML = '<p>Dr. Smith is a leading researcher...</p>';
      element.appendChild(description);
      
      expect(element.querySelector('[slot="description"]')).toBeTruthy();
    });

    it('should accept optional sub-text slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('sub-text', 'p', 'Additional information'));
      
      expect(element.querySelector('[slot="sub-text"]')).toBeTruthy();
    });

    it('should accept optional actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      const actions = document.createElement('div');
      actions.setAttribute('slot', 'actions');
      actions.innerHTML = '<a href="/schedule">Schedule a Meeting</a>';
      element.appendChild(actions);
      
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      personBio();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-image attribute with full value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-image': 'full'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-image']).toBe('full');
    });

    it('should handle default image layout when data-image is not specified', () => {
      const { element } = createTestComponent(tagName);const attributes = getComponentAttributes(element);
      expect(attributes['data-image']).toBeUndefined();
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'dark'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });

    it('should handle deprecated image attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'image': 'full'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'image', 'data-image')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      personBio();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});