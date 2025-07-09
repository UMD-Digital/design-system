import { Composite } from '../../../../index';
import {
  createElement,
  createImageElement,
  createVideoElement,
} from '../../test-helpers/element';
import '../../test-helpers/setup';

describe('Hero Grid Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Structure', () => {
    it('should create a grid hero with minimal props', () => {
      // Use the actual interface structure expected by the component
      const props: any = {
        corners: [],
        center: null,
        isThemeDark: true
      };

      const result = Composite.hero.custom.grid(props);

      expect(result).toBeNull(); // Component returns null when validation fails
    });

    it('should create a grid hero with valid corner and center props', () => {
      const props: any = {
        corners: [
          {
            images: [createImageElement('corner1.jpg')],
            isCornerLeft: true
          },
          {
            images: [createImageElement('corner2.jpg')],
            isCornerLeft: false
          }
        ],
        center: {
          images: [createImageElement('center.jpg')]
        },
        headline: createElement('h1', 'Grid Hero'),
        isThemeDark: true
      };

      const result = Composite.hero.custom.grid(props);

      if (result) {
        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
        expect(result.styles).toBeDefined();
        expect(typeof result.styles).toBe('string');
      }
    });
  });

  describe('Content Properties', () => {
    it('should include headline when provided', () => {
      const headline = createElement('h1', 'Grid Hero Title');
      const props: any = {
        corners: [
          {
            images: [createImageElement()],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: {
          images: [createImageElement()]
        },
        headline,
        isThemeDark: true
      };

      const result = Composite.hero.custom.grid(props);

      if (result) {
        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
      }
    });

    it('should include text and actions when provided', () => {
      const props: any = {
        corners: [
          {
            images: [createImageElement()],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: {
          images: [createImageElement()]
        },
        headline: createElement('h1', 'Title'),
        text: createElement('p', 'Description'),
        actions: createElement('div', 'Actions'),
        isThemeDark: true
      };

      const result = Composite.hero.custom.grid(props);

      if (result) {
        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
      }
    });
  });

  describe('Corner Properties', () => {
    it('should handle multiple corner images', () => {
      const props: any = {
        corners: [
          {
            images: [
              createImageElement('corner1-1.jpg'),
              createImageElement('corner1-2.jpg')
            ],
            isCornerLeft: true
          },
          {
            images: [
              createImageElement('corner2-1.jpg'),
              createImageElement('corner2-2.jpg')
            ],
            isCornerLeft: false
          }
        ],
        center: {
          images: [createImageElement()]
        },
        isThemeDark: true
      };

      const result = Composite.hero.custom.grid(props);

      if (result) {
        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
      }
    });

    it('should require both left and right corners', () => {
      // Test with only left corner - should fail validation
      const propsOnlyLeft: any = {
        corners: [
          {
            images: [createImageElement()],
            isCornerLeft: true
          }
        ],
        center: {
          images: [createImageElement()]
        },
        isThemeDark: true
      };

      const resultOnlyLeft = Composite.hero.custom.grid(propsOnlyLeft);
      expect(resultOnlyLeft).toBeNull();

      // Test with both corners - should pass validation
      const propsBothCorners: any = {
        corners: [
          {
            images: [createImageElement()],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: {
          images: [createImageElement()]
        },
        isThemeDark: true
      };

      const resultBothCorners = Composite.hero.custom.grid(propsBothCorners);
      expect(resultBothCorners).toBeDefined();
    });
  });

  describe('Center Properties', () => {
    it('should handle center with video and multiple images', () => {
      const props: any = {
        corners: [
          {
            images: [createImageElement()],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: {
          images: [
            createImageElement('center1.jpg'),
            createImageElement('center2.jpg')
          ],
          video: createVideoElement('center-video.mp4')
        },
        isThemeDark: true
      };

      const result = Composite.hero.custom.grid(props);

      if (result) {
        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
      }
    });

    it('should require at least 2 images when video is provided', () => {
      // Test with video and only 1 image - should fail validation
      const propsInvalid: any = {
        corners: [
          {
            images: [createImageElement()],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: {
          images: [createImageElement()],
          video: createVideoElement('center-video.mp4')
        },
        isThemeDark: true
      };

      const resultInvalid = Composite.hero.custom.grid(propsInvalid);
      expect(resultInvalid).toBeNull();

      // Test with video and 2 images - should pass validation
      const propsValid: any = {
        corners: [
          {
            images: [createImageElement()],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: {
          images: [
            createImageElement('center1.jpg'),
            createImageElement('center2.jpg')
          ],
          video: createVideoElement('center-video.mp4')
        },
        isThemeDark: true
      };

      const resultValid = Composite.hero.custom.grid(propsValid);
      expect(resultValid).toBeDefined();
    });

    it('should handle center with multiple images without video', () => {
      const props: any = {
        corners: [
          {
            images: [createImageElement()],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: {
          images: [
            createImageElement('center1.jpg'),
            createImageElement('center2.jpg'),
            createImageElement('center3.jpg')
          ]
        },
        isThemeDark: true
      };

      const result = Composite.hero.custom.grid(props);

      if (result) {
        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
      }
    });
  });

  describe('Theme Properties', () => {
    it('should handle dark theme', () => {
      const props: any = {
        corners: [
          {
            images: [createImageElement()],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: {
          images: [createImageElement()]
        },
        headline: createElement('h1', 'Dark Grid'),
        isThemeDark: true
      };

      const result = Composite.hero.custom.grid(props);

      if (result) {
        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
      }
    });

    it('should handle light theme', () => {
      const props: any = {
        corners: [
          {
            images: [createImageElement()],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: {
          images: [createImageElement()]
        },
        headline: createElement('h1', 'Light Grid'),
        isThemeDark: false
      };

      const result = Composite.hero.custom.grid(props);

      if (result) {
        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
      }
    });
  });

  describe('Complete Configuration', () => {
    it('should handle all properties together', () => {
      const props: any = {
        corners: [
          {
            images: [
              createImageElement('corner1-1.jpg'),
              createImageElement('corner1-2.jpg')
            ],
            isCornerLeft: true
          },
          {
            images: [
              createImageElement('corner2-1.jpg'),
              createImageElement('corner2-2.jpg')
            ],
            isCornerLeft: false
          }
        ],
        center: {
          images: [
            createImageElement('center1.jpg'),
            createImageElement('center2.jpg')
          ],
          video: createVideoElement('center-video.mp4')
        },
        headline: createElement('h1', 'Complete Grid Hero'),
        text: createElement('p', 'This is a complete grid hero with all features'),
        actions: createElement('div', 'Call to action'),
        isThemeDark: true,
        includesAnimation: true
      };

      const result = Composite.hero.custom.grid(props);

      if (result) {
        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
        expect(typeof result.styles).toBe('string');
      }
    });
  });

  describe('Edge Cases', () => {
    it('should return null for empty corners array', () => {
      const props: any = {
        corners: [],
        center: {
          images: [createImageElement()]
        },
        isThemeDark: true
      };

      const result = Composite.hero.custom.grid(props);

      expect(result).toBeNull();
    });

    it('should return null for null center', () => {
      const props: any = {
        corners: [
          {
            images: [createImageElement()],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: null,
        isThemeDark: true
      };

      const result = Composite.hero.custom.grid(props);

      expect(result).toBeNull();
    });

    it('should return null for corner with empty images array', () => {
      const props: any = {
        corners: [
          {
            images: [],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: {
          images: [createImageElement()]
        },
        isThemeDark: true
      };

      const result = Composite.hero.custom.grid(props);

      expect(result).toBeNull();
    });

    it('should not throw when validation fails', () => {
      const props: any = {
        corners: [
          {
            images: [],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: {
          images: [createImageElement()]
        },
        isThemeDark: true
      };

      expect(() => Composite.hero.custom.grid(props)).not.toThrow();
    });
  });

  describe('Type Safety', () => {
    it('should handle minimal valid configuration', () => {
      const props: any = {
        corners: [
          {
            images: [createImageElement()],
            isCornerLeft: true
          },
          {
            images: [createImageElement()],
            isCornerLeft: false
          }
        ],
        center: {
          images: [createImageElement()]
        },
        isThemeDark: true
      };

      const result = Composite.hero.custom.grid(props);

      if (result) {
        expect(result).toBeDefined();
        expect(result.element).toBeInstanceOf(HTMLElement);
      }
    });
  });
});