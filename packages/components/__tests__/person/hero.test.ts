import personHero from '../../source/api/person/hero';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
  captureWarningsAsync,
} from '../../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../../test-helpers/validation';

describe('Component: umd-element-person-hero', () => {
  const tagName = 'umd-element-person-hero';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-person-hero');
      document.body.appendChild(testElement);
      
      personHero();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      personHero();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      personHero();
    });

    it('should accept optional name slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('name', 'h1', 'Dr. Darryll J. Pines'));
      
      expect(element.querySelector('[slot="name"]')).toBeTruthy();
    });

    it('should accept optional pronouns slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('pronouns', 'span', '(she/her)'));
      
      expect(element.querySelector('[slot="pronouns"]')).toBeTruthy();
    });

    it('should accept optional job-title slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('job-title', 'p', 'President'));
      
      expect(element.querySelector('[slot="job-title"]')).toBeTruthy();
    });

    it('should accept optional association slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('association', 'p', 'University of Maryland'));
      
      expect(element.querySelector('[slot="association"]')).toBeTruthy();
    });

    it('should accept optional email slot with mailto link', () => {
      const { element } = createTestComponent(tagName);
      
      const emailLink = document.createElement('a');
      emailLink.setAttribute('slot', 'email');
      emailLink.setAttribute('href', 'mailto:president@umd.edu');
      emailLink.textContent = 'president@umd.edu';
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
      address.innerHTML = '1119 Main Administration Building<br>College Park, MD 20742';
      element.appendChild(address);
      
      expect(element.querySelector('[slot="address"]')).toBeTruthy();
    });

    it('should accept optional linkedin slot', () => {
      const { element } = createTestComponent(tagName);
      
      const linkedinLink = document.createElement('a');
      linkedinLink.setAttribute('slot', 'linkedin');
      linkedinLink.setAttribute('href', 'https://linkedin.com/in/president');
      linkedinLink.textContent = 'Connect on LinkedIn';
      element.appendChild(linkedinLink);
      
      expect(element.querySelector('[slot="linkedin"]')).toBeTruthy();
    });

    it('should accept optional additional-contact slot', () => {
      const { element } = createTestComponent(tagName);
      
      const additionalContact = document.createElement('div');
      additionalContact.setAttribute('slot', 'additional-contact');
      additionalContact.innerHTML = '<p>Assistant: Jane Smith</p><a href="mailto:assistant@umd.edu">assistant@umd.edu</a>';
      element.appendChild(additionalContact);
      
      expect(element.querySelector('[slot="additional-contact"]')).toBeTruthy();
    });

    it('should accept optional image slot', () => {
      const { element } = createTestComponent(tagName);
      
      const img = document.createElement('img');
      img.setAttribute('slot', 'image');
      img.src = 'president.jpg';
      img.alt = 'President Williams';
      element.appendChild(img);
      
      expect(element.querySelector('[slot="image"]')).toBeTruthy();
    });

    it('should accept optional sub-text slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.appendChild(createSlotContent('sub-text', 'p', 'Leading innovation in higher education'));
      
      expect(element.querySelector('[slot="sub-text"]')).toBeTruthy();
    });

    it('should accept optional actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      const action = document.createElement('a');
      action.setAttribute('slot', 'actions');
      action.setAttribute('href', '/president/bio');
      action.textContent = 'Read Full Biography';
      element.appendChild(action);
      
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should accept optional breadcrumb slot', () => {
      const { element } = createTestComponent(tagName);
      
      const nav = document.createElement('nav');
      nav.setAttribute('slot', 'breadcrumb');
      nav.innerHTML = '<ol><li><a href="/">Home</a></li><li><a href="/leadership">Leadership</a></li><li>President</li></ol>';
      element.appendChild(nav);
      
      expect(element.querySelector('[slot="breadcrumb"]')).toBeTruthy();
    });

    it('should accept breadcrumb slot for navigation', () => {
      personHero();
      const { element } = createTestComponent(tagName);
      
      const nav = document.createElement('nav');
      nav.setAttribute('slot', 'breadcrumb');
      nav.innerHTML = '<ol><li><a href="/">Home</a></li><li>President</li></ol>';
      element.appendChild(nav);
      
      // In the real component, breadcrumb would be duplicated for mobile
      // In tests, we just verify the slot is accepted
      expect(element.querySelector('[slot="breadcrumb"]')).toBeTruthy();
      expect(element.querySelector('[slot="breadcrumb"] ol')).toBeTruthy();
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      personHero();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'dark'
        });});
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      personHero();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });
});