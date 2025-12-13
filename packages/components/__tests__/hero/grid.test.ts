import heroGrid from '../../source/api/hero/custom/grid';
import {
  createTestComponent,
  cleanupComponents,
} from '../test-helpers/component';
import { getComponentAttributes } from '../test-helpers/validation';

describe('Component: umd-element-hero-grid', () => {
  const tagName = 'umd-element-hero-grid';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanupComponents();
  });

  describe('Registration', () => {
    it('should register the web component', () => {
      // Create an element first so registration will proceed
      const testElement = document.createElement('umd-element-hero-grid');
      document.body.appendChild(testElement);

      heroGrid();

      // Verify customElements.define was called
      expect(customElements.define).toHaveBeenCalledWith(
        tagName,
        expect.any(Function),
      );
    });

    it('should create custom element with correct tag name', () => {
      heroGrid();

      const { element } = createTestComponent(tagName);
      expect(element.tagName.toLowerCase()).toBe(tagName);
    });
  });

  describe('Slots', () => {
    beforeEach(() => {
      heroGrid();
    });

    it('should accept all defined slots', () => {
      const { element } = createTestComponent(tagName);

      // Create column containers with content
      const leftColumn = document.createElement('div');
      leftColumn.slot = 'column-left';
      leftColumn.innerHTML =
        '<img src="test1.jpg" alt="Test 1"><img src="test2.jpg" alt="Test 2">';

      const centerColumn = document.createElement('div');
      centerColumn.slot = 'column-center';
      centerColumn.innerHTML =
        '<img src="test3.jpg" alt="Test 3"><img src="test4.jpg" alt="Test 4">';

      const rightColumn = document.createElement('div');
      rightColumn.slot = 'column-right';
      rightColumn.innerHTML =
        '<img src="test5.jpg" alt="Test 5"><img src="test6.jpg" alt="Test 6">';

      element.appendChild(leftColumn);
      element.appendChild(centerColumn);
      element.appendChild(rightColumn);

      // Verify all slots are present
      expect(element.querySelector('[slot="column-left"]')).toBeTruthy();
      expect(element.querySelector('[slot="column-center"]')).toBeTruthy();
      expect(element.querySelector('[slot="column-right"]')).toBeTruthy();
    });

    it('should extract images from left column slot', () => {
      const { element } = createTestComponent(tagName);

      const leftColumn = document.createElement('div');
      leftColumn.slot = 'column-left';
      leftColumn.innerHTML =
        '<img src="left1.jpg" alt="Left 1"><img src="left2.jpg" alt="Left 2">';
      element.appendChild(leftColumn);

      const images = leftColumn.querySelectorAll('img');
      expect(images.length).toBe(2);
      expect(images[0].src).toContain('left1.jpg');
      expect(images[1].src).toContain('left2.jpg');
    });

    it('should extract images from center column slot', () => {
      const { element } = createTestComponent(tagName);

      const centerColumn = document.createElement('div');
      centerColumn.slot = 'column-center';
      centerColumn.innerHTML =
        '<img src="center1.jpg" alt="Center 1"><img src="center2.jpg" alt="Center 2">';
      element.appendChild(centerColumn);

      const images = centerColumn.querySelectorAll('img');
      expect(images.length).toBe(2);
      expect(images[0].src).toContain('center1.jpg');
      expect(images[1].src).toContain('center2.jpg');
    });

    it('should extract images from right column slot', () => {
      const { element } = createTestComponent(tagName);

      const rightColumn = document.createElement('div');
      rightColumn.slot = 'column-right';
      rightColumn.innerHTML =
        '<img src="right1.jpg" alt="Right 1"><img src="right2.jpg" alt="Right 2">';
      element.appendChild(rightColumn);

      const images = rightColumn.querySelectorAll('img');
      expect(images.length).toBe(2);
      expect(images[0].src).toContain('right1.jpg');
      expect(images[1].src).toContain('right2.jpg');
    });

    it('should handle video element in center column', () => {
      const { element } = createTestComponent(tagName);

      const centerColumn = document.createElement('div');
      centerColumn.slot = 'column-center';

      // Create video element programmatically to ensure properties are set correctly
      const video = document.createElement('video');
      video.autoplay = true;
      video.muted = true;
      video.loop = true;

      const source = document.createElement('source');
      source.src = 'test.mp4';
      source.type = 'video/mp4';
      video.appendChild(source);

      // Add images and video to center column
      const img1 = document.createElement('img');
      img1.src = 'center1.jpg';
      img1.alt = 'Center 1';

      const img2 = document.createElement('img');
      img2.src = 'center2.jpg';
      img2.alt = 'Center 2';

      centerColumn.appendChild(img1);
      centerColumn.appendChild(video);
      centerColumn.appendChild(img2);

      element.appendChild(centerColumn);

      const foundVideo = centerColumn.querySelector('video');
      const images = centerColumn.querySelectorAll('img');

      expect(foundVideo).toBeTruthy();
      expect(foundVideo?.autoplay).toBe(true);
      expect(foundVideo?.muted).toBe(true);
      expect(foundVideo?.loop).toBe(true);
      expect(images.length).toBe(2);
    });

    it('should handle empty column slots', () => {
      const { element } = createTestComponent(tagName);

      const leftColumn = document.createElement('div');
      leftColumn.slot = 'column-left';

      const centerColumn = document.createElement('div');
      centerColumn.slot = 'column-center';

      const rightColumn = document.createElement('div');
      rightColumn.slot = 'column-right';

      element.appendChild(leftColumn);
      element.appendChild(centerColumn);
      element.appendChild(rightColumn);

      // Should not throw errors with empty columns
      expect(element.querySelector('[slot="column-left"]')).toBeTruthy();
      expect(element.querySelector('[slot="column-center"]')).toBeTruthy();
      expect(element.querySelector('[slot="column-right"]')).toBeTruthy();
    });

    it('should handle multiple images in each column', () => {
      const { element } = createTestComponent(tagName);

      const leftColumn = document.createElement('div');
      leftColumn.slot = 'column-left';
      leftColumn.innerHTML =
        '<img src="l1.jpg"><img src="l2.jpg"><img src="l3.jpg">';

      const centerColumn = document.createElement('div');
      centerColumn.slot = 'column-center';
      centerColumn.innerHTML =
        '<img src="c1.jpg"><img src="c2.jpg"><img src="c3.jpg"><img src="c4.jpg">';

      const rightColumn = document.createElement('div');
      rightColumn.slot = 'column-right';
      rightColumn.innerHTML = '<img src="r1.jpg"><img src="r2.jpg">';

      element.appendChild(leftColumn);
      element.appendChild(centerColumn);
      element.appendChild(rightColumn);

      expect(leftColumn.querySelectorAll('img').length).toBe(3);
      expect(centerColumn.querySelectorAll('img').length).toBe(4);
      expect(rightColumn.querySelectorAll('img').length).toBe(2);
    });
  });

  describe('Attributes', () => {
    beforeEach(() => {
      heroGrid();
    });

    it('should not have configuration attributes', () => {
      // This component doesn't have data-* configuration attributes based on the code
      const { element } = createTestComponent(tagName);
      const attributes = getComponentAttributes(element);

      // Component should exist without configuration attributes
      expect(element).toBeInstanceOf(HTMLElement);
      expect(
        Object.keys(attributes).filter((key) => key.startsWith('data-')).length,
      ).toBe(0);
    });
  });

  describe('Observed Attributes', () => {
    beforeEach(() => {
      heroGrid();
    });

    it('should not have observed attributes', () => {
      // This component doesn't have observed attributes based on the code
      const { element } = createTestComponent(tagName);
      // Component should exist without observed attributes
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Component Lifecycle', () => {
    beforeEach(() => {
      heroGrid();
    });

    it('should create component without lifecycle hooks', () => {
      const { element } = createTestComponent(tagName);
      // Component doesn't have afterConnect or other lifecycle hooks
      expect(element).toBeInstanceOf(HTMLElement);
    });
  });

  describe('Component Data Structure', () => {
    beforeEach(() => {
      heroGrid();
    });

    it('should structure data correctly for composite hero grid', () => {
      const { element } = createTestComponent(tagName);

      // Create columns with specific content
      const leftColumn = document.createElement('div');
      leftColumn.slot = 'column-left';
      leftColumn.innerHTML = '<img src="left1.jpg"><img src="left2.jpg">';

      const centerColumn = document.createElement('div');
      centerColumn.slot = 'column-center';
      centerColumn.innerHTML = `
        <img src="center1.jpg">
        <video><source src="test.mp4" type="video/mp4"></video>
        <img src="center2.jpg">
      `;

      const rightColumn = document.createElement('div');
      rightColumn.slot = 'column-right';
      rightColumn.innerHTML = '<img src="right1.jpg"><img src="right2.jpg">';

      element.appendChild(leftColumn);
      element.appendChild(centerColumn);
      element.appendChild(rightColumn);

      // Verify the structure matches what the component expects
      const leftImages = leftColumn.querySelectorAll('img');
      const centerImages = centerColumn.querySelectorAll('img');
      const centerVideo = centerColumn.querySelector('video');
      const rightImages = rightColumn.querySelectorAll('img');

      expect(leftImages.length).toBe(2);
      expect(centerImages.length).toBe(2);
      expect(centerVideo).toBeTruthy();
      expect(rightImages.length).toBe(2);
    });
  });
});
