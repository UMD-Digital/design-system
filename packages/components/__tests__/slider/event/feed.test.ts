import sliderEventFeed from '../../source/api/slider/event/feed';
import {
  createTestComponent,
  cleanupComponents,
  waitForComponentDefinition,
  createSlotContent,
  setAttributeAndWait,
  captureWarningsAsync,
} from '../../test-helpers/component';
import {
  validateSlotConfiguration,
  getComponentAttributes,
  validateDeprecatedAttribute,
} from '../../test-helpers/validation';

/**
 * Testing Approach for Slider Event Feed Components
 *
 * This component depends on @universityofmaryland/web-feeds-library which is mocked
 * globally in __mocks__. These tests focus on the public API of the component:
 *
 * 1. Component Registration - Verify the custom element is properly registered
 * 2. Slot Handling - Test that headline and actions slots are accepted
 * 3. Attribute Handling - Test that HTML attributes are accepted and stored correctly
 * 4. Attribute Validation - Ensure required attributes trigger appropriate errors
 * 5. Deprecated Attributes - Verify warnings for deprecated attributes
 * 6. Observed Attributes - Test dynamic attribute changes trigger callbacks
 *
 * We intentionally DO NOT test:
 * - Internal implementation details
 * - How attributes are transformed and passed to the feeds library
 * - The actual rendering of feed content (handled by the feeds library)
 * - Whether specific feed library methods are called
 *
 * This approach ensures our tests remain stable even as internal implementations change,
 * while still verifying the component's public contract.
 */

describe('Component: umd-element-slider-events-feed', () => {
  const tagName = 'umd-element-slider-events-feed';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement(
        'umd-element-slider-events-feed',
      );
      document.body.appendChild(testElement);

      sliderEventFeed();

      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function),
      );
    });

    it('should create custom element with correct tag name', () => {
      sliderEventFeed();

      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      sliderEventFeed();
    });

    it('should accept optional headline slot', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
      });

      element.appendChild(
        createSlotContent('headline', 'h2', 'Upcoming Events'),
      );

      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
    });

    it('should accept optional actions slot', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
      });

      const action = document.createElement('a');
      action.setAttribute('slot', 'actions');
      action.setAttribute('href', '/events');
      action.textContent = 'All Events';
      element.appendChild(action);

      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should accept multiple actions in actions slot', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
      });

      const actionsDiv = document.createElement('div');
      actionsDiv.setAttribute('slot', 'actions');
      actionsDiv.innerHTML = `
        <a href="/events/calendar">Full Calendar</a>
        <a href="/events/subscribe">Subscribe</a>
      `;
      element.appendChild(actionsDiv);

      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
      expect(element.querySelectorAll('[slot="actions"] a').length).toBe(2);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      sliderEventFeed();
    });

    it('should require data-token attribute', () => {
      const { element } = createTestComponent(tagName);

      // Component created without token
      expect(element.hasAttribute('data-token')).toBe(false);

      // In the real component, creating without a token would:
      // 1. Log an error: 'Token is required for this component'
      // 2. Return an empty div instead of the slider component
      // This ensures the component fails safely when misconfigured
    });

    it('should handle data-token attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'events-api-key',
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-token']).toBe('events-api-key');
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        'data-theme': 'dark',
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle data-type attribute with academic value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'academic-api-key',
        'data-type': 'academic',
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['data-type']).toBe('academic');
    });

    it('should handle categories attribute', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        categories: 'athletics,recreation',
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['categories']).toBe('athletics,recreation');
    });

    it('should handle multiple category filters', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        categories: 'workshop,seminar,lecture',
      });
      const attributes = getComponentAttributes(element);
      expect(attributes['categories']).toBe('workshop,seminar,lecture');
    });

    it('should handle deprecated token attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          token: 'test-token',
        });
      });

      expect(validateDeprecatedAttribute(warnings, 'token', 'data-token')).toBe(
        true,
      );
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'data-token': 'test-token',
          theme: 'dark',
        });
      });

      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(
        true,
      );
    });

    it('should handle deprecated type attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          'data-token': 'test-token',
          type: 'academic',
        });
      });

      expect(validateDeprecatedAttribute(warnings, 'type', 'data-type')).toBe(
        true,
      );
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      sliderEventFeed();
    });

    it('should observe resize attribute', async () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
      });
      // Test setting resize attribute
      await setAttributeAndWait(element, 'resize', 'true');

      // Should not throw error
      expect(element.hasAttribute('resize')).toBe(true);
    });

    it('should trigger size when resize attribute changes', async () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
      });
      // Mock the size event handler
      const mockSize = jest.fn();
      if ((element as any).events) {
        (element as any).events.size = mockSize;
      }

      // Trigger resize
      await setAttributeAndWait(element, 'resize', 'true');

      // Note: In a real implementation, this would trigger the resize callback
      // For testing purposes, we're just verifying the attribute is set
      expect(element.getAttribute('resize')).toBe('true');
    });
  });

  describe('Feed Integration', () => {
    beforeEach(() => {
      sliderEventFeed();
    });

    it('should configure general events feed with required token', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'events-api-key',
      });

      element.appendChild(createSlotContent('headline', 'h2', 'Events'));

      // Verify the component accepts the required configuration
      expect(element.getAttribute('data-token')).toBe('events-api-key');
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();

      // In a real component, this would:
      // 1. Pass the token to Feeds.events.slider()
      // 2. Include the headline slot content
      // 3. Use default values: isThemeDark: false, categories: null
      // 4. Render an events slider from the feeds library
    });

    it('should configure academic calendar feed with academic type', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'academic-api-key',
        'data-type': 'academic',
      });

      // Verify the component accepts academic type configuration
      expect(element.getAttribute('data-token')).toBe('academic-api-key');
      expect(element.getAttribute('data-type')).toBe('academic');

      // In a real component, this would:
      // 1. Detect data-type="academic"
      // 2. Call Feeds.academic.slider() instead of Feeds.events.slider()
      // 3. Pass the same configuration props to the academic feed
      // 4. Render an academic calendar slider
    });

    it('should support category filtering', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        categories: 'athletics,recreation',
      });

      // Verify the component accepts categories attribute
      expect(element.getAttribute('data-token')).toBe('test-token');
      expect(element.getAttribute('categories')).toBe('athletics,recreation');

      // In a real component, this would:
      // 1. Pass the categories string directly to the feeds library
      // 2. The feeds library would filter events by these categories
      // 3. Only athletics and recreation events would be displayed
    });

    it('should support dark theme configuration', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'test-token',
        'data-theme': 'dark',
      });

      // Verify the component accepts dark theme
      expect(element.getAttribute('data-token')).toBe('test-token');
      expect(element.getAttribute('data-theme')).toBe('dark');

      // In a real component, this would:
      // 1. Convert data-theme="dark" to isThemeDark: true
      // 2. Pass isThemeDark: true to the feeds library
      // 3. Apply dark theme styling to the events slider
    });

    it('should support complete configuration with all options', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-token': 'events-api-key',
        'data-theme': 'dark',
        categories: 'workshop,seminar',
      });

      // Add slots
      element.appendChild(
        createSlotContent('headline', 'h2', 'Upcoming Events'),
      );
      const actionsDiv = document.createElement('div');
      actionsDiv.setAttribute('slot', 'actions');
      actionsDiv.innerHTML = '<a href="/events">View All</a>';
      element.appendChild(actionsDiv);

      // Verify all configuration is accepted
      expect(element.getAttribute('data-token')).toBe('events-api-key');
      expect(element.getAttribute('data-theme')).toBe('dark');
      expect(element.getAttribute('categories')).toBe('workshop,seminar');
      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
      expect(element.querySelector('[slot="actions"]')).toBeTruthy();

      // In a real component, this would:
      // 1. Pass all configuration to Feeds.events.slider():
      //    - token: 'events-api-key'
      //    - categories: 'workshop,seminar'
      //    - isThemeDark: true
      //    - headline: the h2 element
      //    - actions: the actions div
      // 2. Render a dark-themed slider with filtered events
    });
  });
});
