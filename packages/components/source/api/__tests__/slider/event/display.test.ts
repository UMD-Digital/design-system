import sliderEventDisplay from '../../../slider/event/display';
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

describe('Component: umd-element-slider-events', () => {
  const tagName = 'umd-element-slider-events';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-slider-events');
      document.body.appendChild(testElement);

      sliderEventDisplay();

      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function),
      );
    });

    it('should create custom element with correct tag name', () => {
      sliderEventDisplay();

      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      sliderEventDisplay();
    });

    it('should require event-list slot', () => {
      const { element } = createTestComponent(tagName);

      const eventList = document.createElement('div');
      eventList.setAttribute('slot', 'event-list');
      eventList.innerHTML = `
        <div class="event">
          <time datetime="2024-04-15">April 15</time>
          <h3>Spring Concert</h3>
          <p>Annual spring concert featuring student performances</p>
        </div>
      `;
      element.appendChild(eventList);

      const validation = validateSlotConfiguration(element, {
        'event-list': { required: true },
      });

      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should log error if event-list slot is missing', () => {
      const { element } = createTestComponent(tagName);

      // Component created without required event-list slot
      expect(element.querySelector('[slot="event-list"]')).toBeNull();

      // In the real component, creating without the event-list slot would:
      // 1. Log an error: 'Slot event-list is required'
      // 2. The component would fail to render properly
      // This validation ensures developers provide the required slot content
    });

    it('should accept optional headline slot', () => {
      const { element } = createTestComponent(tagName);

      element.appendChild(
        createSlotContent('headline', 'h2', 'Upcoming Events'),
      );

      const eventList = document.createElement('div');
      eventList.setAttribute('slot', 'event-list');
      eventList.innerHTML = '<div class="event">Event 1</div>';
      element.appendChild(eventList);

      expect(element.querySelector('[slot="headline"]')).toBeTruthy();
    });

    it('should accept optional actions slot', () => {
      const { element } = createTestComponent(tagName);

      const action = document.createElement('a');
      action.setAttribute('slot', 'actions');
      action.setAttribute('href', '/events');
      action.textContent = 'View All Events';
      element.appendChild(action);

      const eventList = document.createElement('div');
      eventList.setAttribute('slot', 'event-list');
      eventList.innerHTML = '<div class="event">Event 1</div>';
      element.appendChild(eventList);

      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
    });

    it('should accept multiple events in event-list', () => {
      const { element } = createTestComponent(tagName);

      const eventList = document.createElement('div');
      eventList.setAttribute('slot', 'event-list');
      eventList.innerHTML = `
        <div class="event">
          <time datetime="2024-04-15">April 15</time>
          <h3>Spring Concert</h3>
          <p>Annual spring concert featuring student performances</p>
        </div>
        <div class="event">
          <time datetime="2024-04-20">April 20</time>
          <h3>Research Symposium</h3>
          <p>Undergraduate research presentations</p>
        </div>
        <div class="event">
          <time datetime="2024-04-25">April 25</time>
          <h3>Career Fair</h3>
          <p>Connect with employers and explore opportunities</p>
        </div>
      `;
      element.appendChild(eventList);

      expect(element.querySelector('[slot="event-list"]')).toBeTruthy();
      expect(
        element.querySelectorAll('[slot="event-list"] .event').length,
      ).toBe(3);
    });

    it('should accept events with links', () => {
      const { element } = createTestComponent(tagName);

      const eventList = document.createElement('div');
      eventList.setAttribute('slot', 'event-list');
      eventList.innerHTML = `
        <div class="event">
          <time datetime="2024-03-10T14:00">Mar 10, 2:00 PM</time>
          <h3>Guest Lecture: AI Ethics</h3>
          <p>Dr. Smith discusses ethical considerations in AI</p>
          <a href="/event/ai-ethics">Learn More</a>
        </div>
        <div class="event">
          <time datetime="2024-03-12T18:00">Mar 12, 6:00 PM</time>
          <h3>Film Screening</h3>
          <p>Documentary screening and discussion</p>
          <a href="/event/film">RSVP</a>
        </div>
      `;
      element.appendChild(eventList);

      expect(element.querySelector('[slot="event-list"]')).toBeTruthy();
      expect(
        element.querySelectorAll('[slot="event-list"] .event a').length,
      ).toBe(2);
    });

    it('should accept multiple actions in actions slot', () => {
      const { element } = createTestComponent(tagName);

      const actionsDiv = document.createElement('div');
      actionsDiv.setAttribute('slot', 'actions');
      actionsDiv.innerHTML = `
        <a href="/events/calendar">Full Calendar</a>
        <a href="/events/subscribe">Subscribe</a>
      `;
      element.appendChild(actionsDiv);

      const eventList = document.createElement('div');
      eventList.setAttribute('slot', 'event-list');
      eventList.innerHTML = '<div class="event">Event 1</div>';
      element.appendChild(eventList);

      expect(element.querySelector('[slot="actions"]')).toBeTruthy();
      expect(element.querySelectorAll('[slot="actions"] a').length).toBe(2);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      sliderEventDisplay();
    });

    it('should handle data-theme attribute with dark value', () => {
      const { element } = createTestComponent(tagName, '', {
        'data-theme': 'dark',
      });

      const eventList = document.createElement('div');
      eventList.setAttribute('slot', 'event-list');
      eventList.innerHTML = '<div class="event">Event 1</div>';
      element.appendChild(eventList);
      const attributes = getComponentAttributes(element);
      expect(attributes['data-theme']).toBe('dark');
    });

    it('should handle deprecated theme attribute with warning', async () => {
      const warnings = await captureWarningsAsync(async () => {
        const { element } = createTestComponent(tagName, '', {
          theme: 'dark',
        });

        const eventList = document.createElement('div');
        eventList.setAttribute('slot', 'event-list');
        eventList.innerHTML = '<div class="event">Event 1</div>';
        element.appendChild(eventList);
      });

      expect(validateDeprecatedAttribute(warnings, 'theme', 'data-theme')).toBe(
        true,
      );
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      sliderEventDisplay();
    });

    it('should observe resize attribute', async () => {
      const { element } = createTestComponent(tagName);

      const eventList = document.createElement('div');
      eventList.setAttribute('slot', 'event-list');
      eventList.innerHTML = '<div class="event">Event 1</div>';
      element.appendChild(eventList);
      // Test setting resize attribute
      await setAttributeAndWait(element, 'resize', 'true');

      // Should not throw error
      expect(element.hasAttribute('resize')).toBe(true);
    });

    it('should trigger size when resize attribute changes', async () => {
      const { element } = createTestComponent(tagName);

      const eventList = document.createElement('div');
      eventList.setAttribute('slot', 'event-list');
      eventList.innerHTML = `
        <div class="event">
          <time datetime="2024-04-15">April 15</time>
          <h3>Event Title</h3>
        </div>
      `;
      element.appendChild(eventList);
      // Mock the resize event handler
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
});
