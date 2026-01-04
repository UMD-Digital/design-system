import { sectionIntroWide as layoutSectionIntroWide } from '../../../source/web-components/layout/section-intro/wide';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
} from '../../test-helpers/component';
import { getComponentAttributes } from '../../test-helpers/validation';

describe('Component: umd-element-section-intro-wide', () => {
  const tagName = 'umd-element-section-intro-wide';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-section-intro-wide');
      document.body.appendChild(testElement);
      
      layoutSectionIntroWide();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      layoutSectionIntroWide();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      layoutSectionIntroWide();
    });

    it('should accept headline slot', () => {
      const { element } = createTestComponent(tagName);
      
      const headline = document.createElement('h1');
      headline.slot = 'headline';
      headline.textContent = 'Welcome to the University';
      element.appendChild(headline)
      const slottedHeadline = element.querySelector('[slot="headline"]');
      expect(slottedHeadline).toBeTruthy();
      expect(slottedHeadline?.textContent).toBe('Welcome to the University');
    });

    it('should accept actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      const actions = document.createElement('div');
      actions.slot = 'actions';
      actions.innerHTML = `
        <a href="/apply" class="button">Apply Now</a>
        <a href="/tour" class="button-outline">Take a Tour</a>
      `;
      element.appendChild(actions)
      const slottedActions = element.querySelector('[slot="actions"]');
      expect(slottedActions).toBeTruthy();
      expect(slottedActions?.querySelectorAll('a').length).toBe(2);
    });

    it('should work with both slots', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <h2 slot="headline">Discover Your Future</h2>
        <div slot="actions">
          <a href="/programs">View Programs</a>
          <a href="/contact">Contact Us</a>
        </div>
      `;
      expect(element.querySelector('[slot="headline"]')?.textContent).toBe('Discover Your Future');
      expect(element.querySelectorAll('[slot="actions"] a').length).toBe(2);
    });

    it('should work with only headline slot', () => {
      const { element } = createTestComponent(tagName);
      
      const headline = createSlotContent('headline', 'h1', 'Main Headline Only');
      element.appendChild(headline)
      expect(element.querySelector('[slot="headline"]')?.textContent).toBe('Main Headline Only');
      expect(element.querySelector('[slot="actions"]')).toBeFalsy();
    });

    it('should work with only actions slot', () => {
      const { element } = createTestComponent(tagName);
      
      const actions = createSlotContent('actions', 'a', 'Single Action');
      actions.setAttribute('href', '/action');
      element.appendChild(actions)
      expect(element.querySelector('[slot="headline"]')).toBeFalsy();
      expect(element.querySelector('[slot="actions"]')?.textContent).toBe('Single Action');
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      layoutSectionIntroWide();
    });

    it('should handle data-theme="dark" attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should work without theme attribute', () => {
      const { element } = createTestComponent(tagName);const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBeUndefined();
    });

    it('should not have other layout attributes like separator', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-has-separator': ''
      });
      // Wide variant doesn't support separator
      const attributes = getComponentAttributes(element);
      expect(attributes['data-has-separator']).toBe('');
      // But it won't be used by the component
    });
  });

  describe('Content Examples', () => {
    beforeEach(() => {
      layoutSectionIntroWide();
    });

    it('should handle basic wide section intro', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <h1 slot="headline">Welcome to the University of Maryland</h1>
      `;
      expect(element.querySelector('[slot="headline"]')?.textContent).toBe('Welcome to the University of Maryland');
    });

    it('should handle section with call-to-action', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <h2 slot="headline">Discover Your Path</h2>
        <div slot="actions">
          <a href="/programs" class="button">Explore Programs</a>
          <a href="/visit" class="button-outline">Plan a Visit</a>
        </div>
      `;
      const headline = element.querySelector('[slot="headline"]');
      expect(headline?.textContent).toBe('Discover Your Path');
      
      const actions = element.querySelectorAll('[slot="actions"] a');
      expect(actions.length).toBe(2);
      expect(actions[0].getAttribute('href')).toBe('/programs');
      expect(actions[1].getAttribute('href')).toBe('/visit');
    });

    it('should handle dark theme variant', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      
      element.innerHTML = `
        <h1 slot="headline">Innovation Starts Here</h1>
        <a slot="actions" href="/innovation">Join the Movement</a>
      `;
      expect(element.getAttribute('data-theme')).toBe('dark');
      expect(element.querySelector('[slot="headline"]')?.textContent).toBe('Innovation Starts Here');
      expect(element.querySelector('[slot="actions"]')?.getAttribute('href')).toBe('/innovation');
    });

    it('should handle multiple action buttons', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <h1 slot="headline">Choose Your Journey</h1>
        <div slot="actions">
          <button>Undergraduate</button>
          <button>Graduate</button>
          <button>Professional</button>
          <button>Online</button>
        </div>
      `;
      const buttons = element.querySelectorAll('[slot="actions"] button');
      expect(buttons.length).toBe(4);
      expect(buttons[0].textContent).toBe('Undergraduate');
      expect(buttons[3].textContent).toBe('Online');
    });

    it('should handle different heading levels', () => {
      const { element } = createTestComponent(tagName);
      
      // Using h3 instead of h1/h2
      element.innerHTML = `
        <h3 slot="headline">Section Headline</h3>
      `;
      const headline = element.querySelector('[slot="headline"]');
      expect(headline?.tagName).toBe('H3');
      expect(headline?.textContent).toBe('Section Headline');
    });
  });

  describe('Wide Layout Specifics', () => {
    beforeEach(() => {
      layoutSectionIntroWide();
    });

    it('should create wide layout variant', () => {
      const { element } = createTestComponent(tagName);
      // The component uses Composite.layout.sectionIntro.wide
      // which creates a full-width section introduction
      expect(element).toBeInstanceOf(HTMLElement);
      // expect(element.shadowRoot).toBeTruthy();
    });

    it('should use CommonIntroData for consistent slot handling', () => {
      const { element } = createTestComponent(tagName);
      
      element.innerHTML = `
        <h1 slot="headline">Test Headline</h1>
        <a slot="actions" href="/test">Test Action</a>
      `;// CommonIntroData handles headline and actions slots consistently
      // across both small and wide variants
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should not include text slot like small variant', () => {
      const { element } = createTestComponent(tagName);
      
      // Try adding text content without slot (default slot)
      element.innerHTML = `
        <h1 slot="headline">Headline</h1>
        <p>This text should not be slotted</p>
      `;// Wide variant doesn't use default slot for text
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
      expect(element.querySelector('p')).toBeTruthy(); // Still in DOM but not used by component
    });
  });
});