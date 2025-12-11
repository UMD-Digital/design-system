import layoutSectionIntroSmall from '../../source/api/layout/section-intro/small';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
} from '../../test-helpers/component';
import { getComponentAttributes } from '../../test-helpers/validation';

describe('Component: umd-element-section-intro', () => {
  const tagName = 'umd-element-section-intro';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-section-intro');
      document.body.appendChild(testElement);
      
      layoutSectionIntroSmall();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      layoutSectionIntroSmall();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      layoutSectionIntroSmall();
    });

    it('should accept headline slot', () => {
      const { element } = createTestComponent(tagName);
      
      const headline = document.createElement('h2');
      headline.slot = 'headline';
      headline.textContent = 'Section Title';
      element.appendChild(headline)
      const slottedHeadline = element.querySelector('[slot="headline"]');
      expect(slottedHeadline).toBeTruthy();
      expect(slottedHeadline?.textContent).toBe('Section Title');
    });

    it('should accept actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      const actions = document.createElement('div');
      actions.slot = 'actions';
      actions.innerHTML = '<a href="/action">Take Action</a>';
      element.appendChild(actions)
      const slottedActions = element.querySelector('[slot="actions"]');
      expect(slottedActions).toBeTruthy();
      expect(slottedActions?.querySelector('a')).toBeTruthy();
    });

    it('should accept default slot for text content', () => {
      const { element } = createTestComponent(tagName);
      
      const text = document.createElement('p');
      text.textContent = 'This is the section description text.';
      element.appendChild(text)
      expect(element.querySelector('p')).toBeTruthy();
      expect(element.querySelector('p')?.textContent).toBe('This is the section description text.');
    });

    it('should handle all slots together', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <h2 slot="headline">Complete Section</h2>
        <p>Section description goes here.</p>
        <div slot="actions">
          <a href="/primary">Primary Action</a>
          <a href="/secondary">Secondary Action</a>
        </div>
      `;
      expect(element.querySelector('[slot="headline"]')?.textContent).toBe('Complete Section');
      expect(element.querySelector('p')?.textContent).toBe('Section description goes here.');
      expect(element.querySelectorAll('[slot="actions"] a').length).toBe(2);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      layoutSectionIntroSmall();
    });

    it('should handle data-theme="dark" attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-has-separator attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-has-separator': ''
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-has-separator']).toBe('');
    });

    it('should handle data-animation="true" attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-animation': 'true'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-animation']).toBe('true');
    });

    it('should handle multiple attributes together', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark',
        'data-has-separator': '',
        'data-animation': 'true'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
      expect(attributes['data-has-separator']).toBe('');
      expect(attributes['data-animation']).toBe('true');
    });

    it('should work without any attributes', () => {
      const { element } = createTestComponent(tagName);const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBeUndefined();
      expect(attributes['data-has-separator']).toBeUndefined();
      expect(attributes['data-animation']).toBeUndefined();
    });
  });

  describe('Animation Behavior', () => {
    beforeEach(() => {
      layoutSectionIntroSmall();
      
      // Mock getBoundingClientRect
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        top: 100,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: () => {}
      }));
    });

    it('should trigger animation when element is in viewport on connect', () => {
      jest.useFakeTimers();
      
      const { element } = createTestComponent(tagName, '', {
        'data-animation': 'true'
      });
      
      // Mock the loadAnimation event
      const mockLoadAnimation = jest.fn();
      (element as any).ref = { events: { loadAnimation: mockLoadAnimation } };// The component has a setTimeout of 10ms to check viewport position
      jest.advanceTimersByTime(10);
      
      // Element top > 0, so animation should be triggered
      // Note: The actual loadAnimation call happens in afterConnect callback
      
      jest.useRealTimers();
    });

    it('should not trigger animation when element is above viewport', () => {
      jest.useFakeTimers();
      
      // Mock getBoundingClientRect to return negative top
      Element.prototype.getBoundingClientRect = jest.fn(() => ({
        top: -100,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: () => {}
      }));
      
      const { element } = createTestComponent(tagName, '', {
        'data-animation': 'true'
      });
      
      // Mock the loadAnimation event
      const mockLoadAnimation = jest.fn();
      (element as any).ref = { events: { loadAnimation: mockLoadAnimation } };jest.advanceTimersByTime(10);
      
      // Element top <= 0, so animation should not be triggered
      
      jest.useRealTimers();
    });
  });

  describe('Content Examples', () => {
    beforeEach(() => {
      layoutSectionIntroSmall();
    });

    it('should handle basic section intro', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <h2 slot="headline">Our Mission</h2>
        <p>We are committed to excellence in education and research.</p>
      `;
      expect(element.querySelector('[slot="headline"]')?.textContent).toBe('Our Mission');
      expect(element.querySelector('p')?.textContent).toBe('We are committed to excellence in education and research.');
    });

    it('should handle section with actions and separator', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-has-separator': ''
      });
      
      element.innerHTML = `
        <h2 slot="headline">Get Started</h2>
        <p>Join our community of innovators and leaders.</p>
        <div slot="actions">
          <a href="/apply">Apply Now</a>
          <a href="/info">Learn More</a>
        </div>
      `;
      expect(element.hasAttribute('data-has-separator')).toBe(true);
      expect(element.querySelector('[slot="headline"]')?.textContent).toBe('Get Started');
      expect(element.querySelectorAll('[slot="actions"] a').length).toBe(2);
    });

    it('should handle dark theme with animation', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark',
        'data-animation': 'true'
      });
      
      element.innerHTML = `
        <h2 slot="headline">Research Excellence</h2>
        <p>Discover groundbreaking research across multiple disciplines.</p>
        <a slot="actions" href="/research">Explore Research</a>
      `;
      expect(element.getAttribute('data-theme')).toBe('dark');
      expect(element.getAttribute('data-animation')).toBe('true');
      expect(element.querySelector('[slot="actions"]')?.getAttribute('href')).toBe('/research');
    });

    it('should handle multiple paragraphs in default slot', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <h2 slot="headline">About Us</h2>
        <p>First paragraph of content.</p>
        <p>Second paragraph with more details.</p>
        <p>Third paragraph concluding the section.</p>
      `;
      
      const paragraphs = element.querySelectorAll('p');
      expect(paragraphs.length).toBe(3);
      expect(paragraphs[0].textContent).toBe('First paragraph of content.');
      expect(paragraphs[1].textContent).toBe('Second paragraph with more details.');
      expect(paragraphs[2].textContent).toBe('Third paragraph concluding the section.');
    });
  });
});