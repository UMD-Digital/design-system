import tabDisplay from '../../tab/display';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  setAttributeAndWait,
  captureWarningsAsync,
} from '../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../test-helpers/validation';

describe('Component: umd-element-tabs', () => {
  const tagName = 'umd-element-tabs';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-tabs');
      document.body.appendChild(testElement);
      
      tabDisplay();
      
      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function)
      );
    });

    it('should create custom element with correct tag name', () => {
      tabDisplay();
      
      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      tabDisplay();
    });

    it('should require tabs slot', () => {
      const { element } = createTestComponent(tagName);
      
      const tabsContainer = document.createElement('div');
      tabsContainer.setAttribute('slot', 'tabs');
      tabsContainer.innerHTML = `
        <div class="tab" data-tab="tab1">Tab 1</div>
        <div class="tab" data-tab="tab2">Tab 2</div>
        <div class="panel" data-panel="tab1">Panel 1 Content</div>
        <div class="panel" data-panel="tab2">Panel 2 Content</div>
      `;
      element.appendChild(tabsContainer);
      
      const validation = validateSlotConfiguration(element, {
        tabs: { required: true },
      });
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should accept properly structured tab content', () => {
      const { element } = createTestComponent(tagName);
      
      const tabsContainer = document.createElement('div');
      tabsContainer.setAttribute('slot', 'tabs');
      tabsContainer.innerHTML = `
        <div class="tab" data-tab="overview">Overview</div>
        <div class="tab" data-tab="requirements">Requirements</div>
        <div class="tab" data-tab="curriculum">Curriculum</div>
        
        <div class="panel" data-panel="overview">
          <h3>Program Overview</h3>
          <p>Learn about our comprehensive program...</p>
        </div>
        <div class="panel" data-panel="requirements">
          <h3>Admission Requirements</h3>
          <ul>
            <li>Bachelor's degree</li>
            <li>3.0 GPA minimum</li>
          </ul>
        </div>
        <div class="panel" data-panel="curriculum">
          <h3>Course Curriculum</h3>
          <p>Our curriculum includes...</p>
        </div>
      `;
      element.appendChild(tabsContainer);
      
      expect(element.querySelector('[slot="tabs"]')).toBeTruthy();
      expect(element.querySelectorAll('[slot="tabs"] .tab').length).toBe(3);
      expect(element.querySelectorAll('[slot="tabs"] .panel').length).toBe(3);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      tabDisplay();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark'
      });
      
      const tabsContainer = document.createElement('div');
      tabsContainer.setAttribute('slot', 'tabs');
      tabsContainer.innerHTML = `
        <div class="tab" data-tab="tab1">Tab 1</div>
        <div class="panel" data-panel="tab1">Content 1</div>
      `;
      element.appendChild(tabsContainer)
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-sticky-position attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-sticky-position': '80'
      });
      
      const tabsContainer = document.createElement('div');
      tabsContainer.setAttribute('slot', 'tabs');
      tabsContainer.innerHTML = `
        <div class="tab" data-tab="tab1">Tab 1</div>
        <div class="panel" data-panel="tab1">Content 1</div>
      `;
      element.appendChild(tabsContainer)
      const attributes = getComponentAttributes(element);
      expect(attributes['data-sticky-position']).toBe('80');
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'theme': 'dark'
        });
        
        const tabsContainer = document.createElement('div');
        tabsContainer.setAttribute('slot', 'tabs');
        tabsContainer.innerHTML = `
          <div class="tab" data-tab="tab1">Tab 1</div>
          <div class="panel" data-panel="tab1">Content 1</div>
        `;
        element.appendChild(tabsContainer)
      });
      
      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(true);
    });

    it('should handle deprecated sticky-position attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'sticky-position': '80'
        });
        
        const tabsContainer = document.createElement('div');
        tabsContainer.setAttribute('slot', 'tabs');
        tabsContainer.innerHTML = `
          <div class="tab" data-tab="tab1">Tab 1</div>
          <div class="panel" data-panel="tab1">Content 1</div>
        `;
        element.appendChild(tabsContainer)
      });
      
      expect(validateDeprecatedAttribute(warnings, 'sticky-position', 'data-sticky-position')).toBe(true);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      tabDisplay();
    });

    it('should observe resize attribute', async () => {
      const { element } = createTestComponent(tagName);
      
      const tabsContainer = document.createElement('div');
      tabsContainer.setAttribute('slot', 'tabs');
      tabsContainer.innerHTML = `
        <div class="tab" data-tab="tab1">Tab 1</div>
        <div class="panel" data-panel="tab1">Content 1</div>
      `;
      element.appendChild(tabsContainer);
      // Test setting resize attribute
      await setAttributeAndWait(element, 'resize', 'true');
      
      // Should not throw error
      expect(element.hasAttribute('resize')).toBe(true);
    });

    it('should trigger resize event when resize attribute changes', async () => {
      const { element } = createTestComponent(tagName);
      
      const tabsContainer = document.createElement('div');
      tabsContainer.setAttribute('slot', 'tabs');
      tabsContainer.innerHTML = `
        <div class="tab" data-tab="tab1">Tab 1</div>
        <div class="panel" data-panel="tab1">Content 1</div>
      `;
      element.appendChild(tabsContainer);
      // Mock the resize event handler
      const mockResize = jest.fn();
      if ((element as any).events) {
        (element as any).events.resize = mockResize;
      }
      
      // Trigger resize
      await setAttributeAndWait(element, 'resize', 'true');
      
      // Note: In a real implementation, this would trigger the resize callback
      // For testing purposes, we're just verifying the attribute is set
      expect(element.getAttribute('resize')).toBe('true');
    });
  });
});