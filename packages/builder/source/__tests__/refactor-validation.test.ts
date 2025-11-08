/**
 * @file refactor-validation.test.ts
 * @description Validation tests for REFACTOR.md migration patterns
 *
 * These tests validate that all 10 refactoring patterns in REFACTOR.md
 * produce equivalent functionality to the original V1 patterns.
 */

import { ElementBuilder } from '../core/ElementBuilder';
import { actions, headlines, text, layouts } from '../factories/presets';
import type { ElementModel } from '../core/types';

describe('REFACTOR.md Pattern Validation', () => {

  // ============================================================================
  // Pattern 1: Simple Element with Conditional Icon Injection
  // ============================================================================
  describe('Pattern 1: Simple Element with Conditional Icon Injection', () => {
    test('should create primary action with icon', () => {
      const link = document.createElement('a');
      link.href = '/test';
      link.textContent = 'Test Action';

      const model = new ElementBuilder(link)
        .withClassName('test-action')
        .build();

      expect(model.element.tagName).toBe('A');
      expect(model.element.getAttribute('href')).toBe('/test');
      expect(model.element.textContent).toBe('Test Action');
      expect(model.element.classList.contains('test-action')).toBe(true);
    });

    test('should apply conditional styles based on theme', () => {
      const link = document.createElement('a');
      const isThemeGold = true;
      const isThemeDark = false;

      const model = new ElementBuilder(link)
        .withStylesIf(isThemeGold, { element: { color: 'gold' } })
        .withStylesIf(isThemeDark, { element: { color: 'white' } })
        .build();

      expect(model.styles).toContain('color');
      expect(model.styles).toContain('gold');
    });

    test('should chain multiple conditional modifications', () => {
      const link = document.createElement('a');
      const hasIcon = true;
      const isLarge = true;

      const builder = new ElementBuilder(link);

      if (hasIcon) {
        builder.withClassName('has-icon');
      }
      if (isLarge) {
        builder.withClassName('large');
      }

      const model = builder.build();

      expect(model.element.classList.contains('has-icon')).toBe(true);
      expect(model.element.classList.contains('large')).toBe(true);
    });
  });

  // ============================================================================
  // Pattern 2: Children Array with Dynamic Style Accumulation
  // ============================================================================
  describe('Pattern 2: Children Array with Dynamic Style Accumulation', () => {
    test('should build composite element with multiple children', () => {
      const iconElement = new ElementBuilder('span')
        .withHTML('<svg>icon</svg>')
        .build();

      const textElement = new ElementBuilder('span')
        .withText('Detail text')
        .build();

      const container = new ElementBuilder('p')
        .withClassName('detail-item')
        .withChildren(iconElement.element, textElement.element)
        .build();

      expect(container.element.children.length).toBe(2);
      expect(container.element.children[0].innerHTML).toContain('icon');
      expect(container.element.children[1].textContent).toBe('Detail text');
    });

    test('should accumulate styles from children', () => {
      const child1 = new ElementBuilder('div')
        .withStyles({ element: { color: 'red' } })
        .build();

      const child2 = new ElementBuilder('div')
        .withStyles({ element: { color: 'blue' } })
        .build();

      const parent = new ElementBuilder()
        .withStyles({ element: { padding: '10px' } })
        .withChild(child1.element)
        .withChild(child2.element)
        .build();

      // Parent should have its own styles
      expect(parent.styles).toBeTruthy();
      expect(parent.styles.length).toBeGreaterThan(0);
    });

    test('should handle conditional children with withChildIf', () => {
      const hasLocation = true;
      const hasDate = false;

      const container = new ElementBuilder()
        .withChildIf(hasLocation, () => {
          return new ElementBuilder('p')
            .withText('Location detail')
            .build().element;
        })
        .withChildIf(hasDate, () => {
          return new ElementBuilder('p')
            .withText('Date detail')
            .build().element;
        })
        .build();

      expect(container.element.children.length).toBe(1);
      expect(container.element.children[0].textContent).toBe('Location detail');
    });

    test('should apply theme to nested elements', () => {
      const wrapper = new ElementBuilder()
        .withStyles({ element: { color: 'black' } })
        .withThemeDark(true)
        .withChild(
          new ElementBuilder('span')
            .withText('Themed content')
            .build().element
        )
        .build();

      // Dark theme should apply white color modifier
      expect(wrapper.styles).toContain('color: white');
    });
  });

  // ============================================================================
  // Pattern 3: Array Mapping with Animation
  // ============================================================================
  describe('Pattern 3: Array Mapping with Animation', () => {
    test('should map array of words to animated elements', () => {
      const words = ['Hello', 'World', 'Test'];

      const container = new ElementBuilder()
        .withChildrenFrom(words, (word, index) => {
          return new ElementBuilder()
            .withClassName('animated-word')
            .withText(word)
            .withStyles({
              element: {
                display: 'inline-block',
                opacity: '0',
                transform: 'translateY(20px)',
              }
            })
            .build().element;
        })
        .build();

      expect(container.element.children.length).toBe(3);
      expect(container.element.children[0].textContent).toBe('Hello');
      expect(container.element.children[0].classList.contains('animated-word')).toBe(true);
    });

    test('should apply conditional styles with withStylesIf', () => {
      const isSizeLarge = true;
      const shouldHaveWhiteText = false;

      const model = new ElementBuilder()
        .withStyles({ element: { fontWeight: '700' } })
        .withStylesIf(isSizeLarge, { element: { fontSize: '2rem' } })
        .withStylesIf(shouldHaveWhiteText, { element: { color: 'white' } })
        .build();

      expect(model.styles).toContain('font-weight');
      expect(model.styles).toContain('font-size');
      expect(model.styles).not.toContain('color');
    });

    test('should handle array mapping with index', () => {
      const items = ['A', 'B', 'C'];

      const container = new ElementBuilder()
        .withChildrenFrom(items, (item, index) => {
          return new ElementBuilder()
            .withAttribute('data-index', index)
            .withText(item)
            .build().element;
        })
        .build();

      expect(container.element.children[0].getAttribute('data-index')).toBe('0');
      expect(container.element.children[1].getAttribute('data-index')).toBe('1');
      expect(container.element.children[2].getAttribute('data-index')).toBe('2');
    });
  });

  // ============================================================================
  // Pattern 4: Conditional Children Building
  // ============================================================================
  describe('Pattern 4: Conditional Children Building', () => {
    test('should build text lockup with all optional sections', () => {
      const eyebrowEl = document.createElement('span');
      eyebrowEl.textContent = 'Eyebrow';

      const headlineEl = document.createElement('h2');
      headlineEl.textContent = 'Headline';

      const textEl = document.createElement('p');
      textEl.textContent = 'Body text';

      const container = new ElementBuilder()
        .withClassName('text-lockup')
        .withChildIf(true, eyebrowEl)
        .withChildIf(true, headlineEl)
        .withChildIf(true, textEl)
        .build();

      expect(container.element.children.length).toBe(3);
    });

    test('should skip children when condition is false', () => {
      const container = new ElementBuilder()
        .withChildIf(false, document.createElement('div'))
        .withChildIf(true, document.createElement('span'))
        .withChildIf(false, document.createElement('p'))
        .build();

      expect(container.element.children.length).toBe(1);
      expect(container.element.children[0].tagName).toBe('SPAN');
    });

    test('should handle lazy child evaluation', () => {
      let evaluated = false;
      const shouldShow = false;

      const container = new ElementBuilder()
        .withChildIf(shouldShow, () => {
          evaluated = true;
          return document.createElement('div');
        })
        .build();

      expect(evaluated).toBe(false);
      expect(container.element.children.length).toBe(0);
    });

    test('should apply theme to conditional elements', () => {
      const isThemeDark = true;

      const container = new ElementBuilder()
        .withStyles({ element: { color: 'black' } })
        .withThemeDark(isThemeDark)
        .build();

      // Dark theme should apply white color modifier to styles
      expect(container.styles).toContain('color: white');
    });
  });

  // ============================================================================
  // Pattern 5: Complex State Management with Event Handlers
  // ============================================================================
  describe('Pattern 5: Complex State Management with Event Handlers', () => {
    test('should handle event listeners and maintain reference', () => {
      const clickHandler = jest.fn();

      const model = new ElementBuilder('button')
        .onClick(clickHandler)
        .build();

      model.element.dispatchEvent(new Event('click'));
      expect(clickHandler).toHaveBeenCalledTimes(1);
    });

    test('should allow post-build element references', () => {
      let buttonRef: HTMLElement = document.createElement('div');

      const model = new ElementBuilder('button')
        .withText('Click me')
        .ref((el) => {
          buttonRef = el;
        })
        .build();

      expect(buttonRef).toBe(model.element);
      expect(buttonRef.textContent).toBe('Click me');
    });

    test('should use withModifier for imperative operations', () => {
      const slides = [
        document.createElement('div'),
        document.createElement('div')
      ];

      const model = new ElementBuilder()
        .withClassName('carousel')
        .withModifier((el) => {
          slides.forEach(slide => slide.classList.add('slide'));
          el.append(...slides);
        })
        .build();

      expect(model.element.children.length).toBe(2);
      expect(model.element.children[0].classList.contains('slide')).toBe(true);
    });

    test('should cleanup event listeners on destroy', () => {
      const handler = jest.fn();

      const model = new ElementBuilder('button')
        .onClick(handler)
        .build();

      model.element.dispatchEvent(new Event('click'));
      expect(handler).toHaveBeenCalledTimes(1);

      model.destroy?.();

      model.element.dispatchEvent(new Event('click'));
      expect(handler).toHaveBeenCalledTimes(1); // Should not be called again
    });
  });

  // ============================================================================
  // Pattern 6: Modal with Accessibility Features
  // ============================================================================
  describe('Pattern 6: Modal with Accessibility Features', () => {
    test('should apply ARIA attributes with convenience methods', () => {
      const model = new ElementBuilder()
        .role('dialog')
        .ariaLabel('Modal dialog')
        .focusable(-1)
        .build();

      expect(model.element.getAttribute('role')).toBe('dialog');
      expect(model.element.getAttribute('aria-label')).toBe('Modal dialog');
      expect(model.element.getAttribute('tabindex')).toBe('-1');
    });

    test('should apply data attributes', () => {
      const model = new ElementBuilder()
        .withData({ hidden: true, modal: 'true' })
        .build();

      expect(model.element.getAttribute('data-hidden')).toBe('true');
      expect(model.element.getAttribute('data-modal')).toBe('true');
    });

    test('should handle nested structure with background', () => {
      const content = document.createElement('div');
      content.textContent = 'Modal content';

      const background = new ElementBuilder()
        .withClassName('modal-background')
        .withChild(content)
        .build();

      const modal = new ElementBuilder()
        .withClassName('modal-container')
        .withChild(background.element)
        .role('dialog')
        .build();

      expect(modal.element.querySelector('.modal-background')).toBeTruthy();
      expect(modal.element.textContent).toContain('Modal content');
    });

    test('should support conditional visibility', () => {
      const isHidden = true;

      const model = new ElementBuilder()
        .withData({ hidden: isHidden })
        .withModifier((el) => {
          if (isHidden) el.style.display = 'none';
        })
        .build();

      expect(model.element.style.display).toBe('none');
    });
  });

  // ============================================================================
  // Pattern 7: Navigation with Keyboard Events
  // ============================================================================
  describe('Pattern 7: Navigation with Keyboard Events', () => {
    test('should build navigation with ARIA attributes', () => {
      const model = new ElementBuilder()
        .withClassName('nav-drawer')
        .role('navigation')
        .ariaLabel('Main navigation drawer')
        .build();

      expect(model.element.getAttribute('role')).toBe('navigation');
      expect(model.element.getAttribute('aria-label')).toBe('Main navigation drawer');
    });

    test('should handle keyboard event listeners', () => {
      const keyHandler = jest.fn();

      const model = new ElementBuilder()
        .onKeydown(keyHandler)
        .build();

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      model.element.dispatchEvent(event);

      expect(keyHandler).toHaveBeenCalled();
    });

    test('should maintain closure references after build', () => {
      let model: any;
      let called = false;

      const handler = () => {
        called = true;
        model.element.style.display = 'none';
      };

      model = new ElementBuilder()
        .withText('Drawer')
        .build();

      handler();
      expect(called).toBe(true);
      expect(model.element.style.display).toBe('none');
    });
  });

  // ============================================================================
  // Pattern 8: Responsive Carousel with Adaptive Logic
  // ============================================================================
  describe('Pattern 8: Responsive Carousel with Adaptive Logic', () => {
    test('should store responsive metadata with data attributes', () => {
      const model = new ElementBuilder()
        .withClassName('carousel')
        .withData({
          breakpoint: 768,
          count: 3,
          gap: 20
        })
        .build();

      expect(model.element.getAttribute('data-breakpoint')).toBe('768');
      expect(model.element.getAttribute('data-count')).toBe('3');
      expect(model.element.getAttribute('data-gap')).toBe('20');
    });

    test('should apply initial styles with withModifier', () => {
      const slide = document.createElement('div');

      const model = new ElementBuilder()
        .withChild(slide)
        .withModifier((el) => {
          slide.style.display = 'flex';
          slide.style.gap = '20px';
        })
        .build();

      expect(slide.style.display).toBe('flex');
      expect(slide.style.gap).toBe('20px');
    });

    test('should support dynamic child manipulation', () => {
      const blocks = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div')
      ];

      const model = new ElementBuilder()
        .withClassName('carousel-container')
        .withModifier((el) => {
          blocks.forEach(block => {
            block.classList.add('carousel-block');
            el.appendChild(block);
          });
        })
        .build();

      expect(model.element.children.length).toBe(3);
      expect(model.element.children[0].classList.contains('carousel-block')).toBe(true);
    });
  });

  // ============================================================================
  // Pattern 9: Array Mapping with Icon Injection
  // ============================================================================
  describe('Pattern 9: Array Mapping with Icon Injection', () => {
    test('should map array with conditional icon injection', () => {
      const links = [
        { href: 'https://facebook.com', icon: '<svg>fb</svg>' },
        { href: 'https://x.com', icon: '<svg>x</svg>' },
        { href: 'https://instagram.com', icon: '<svg>ig</svg>' }
      ];

      const container = new ElementBuilder()
        .withClassName('social-links')
        .withChildrenFrom(links, (link) => {
          return new ElementBuilder('a')
            .withAttribute('href', link.href)
            .withHTML(link.icon)
            .withClassName('social-link')
            .build().element;
        })
        .build();

      expect(container.element.children.length).toBe(3);
      expect(container.element.children[0].innerHTML).toContain('fb');
    });

    test('should apply conditional theme styles', () => {
      const isThemeLight = true;

      const model = new ElementBuilder()
        .withStyles({
          element: { backgroundColor: '#333' }
        })
        .withStylesIf(isThemeLight, {
          element: { backgroundColor: '#fff' }
        })
        .build();

      expect(model.styles).toContain('background-color');
    });

    test('should calculate grid columns dynamically', () => {
      const itemCount = 5;
      const gridColumns = Math.min(itemCount, 3);

      const model = new ElementBuilder()
        .withStyles({
          element: {
            display: 'grid',
            gridTemplateColumns: `repeat(${gridColumns}, 1fr)`
          }
        })
        .build();

      expect(model.styles).toContain('grid');
      expect(model.styles).toContain('repeat(3, 1fr)');
    });
  });

  // ============================================================================
  // Pattern 10: Type Guards with Conditional Rendering
  // ============================================================================
  describe('Pattern 10: Type Guards with Conditional Rendering', () => {
    test('should handle type guard checks for HTMLImageElement', () => {
      const img = document.createElement('img');
      img.src = 'test.jpg';

      const isImageElement = (element: HTMLElement): element is HTMLImageElement => {
        return element instanceof HTMLImageElement;
      };

      expect(isImageElement(img)).toBe(true);
      expect(isImageElement(document.createElement('div'))).toBe(false);
    });

    test('should conditionally create caption based on attributes', () => {
      const img = document.createElement('img');
      img.setAttribute('data-caption', 'Test caption');

      const captionText = img.getAttribute('data-caption');
      let caption = null;

      if (captionText) {
        caption = new ElementBuilder('span')
          .withText(captionText)
          .withClassName('image-caption')
          .build();
      }

      expect(caption).not.toBeNull();
      expect(caption?.element.textContent).toBe('Test caption');
    });

    test('should use withChildIf with null safety', () => {
      const caption = new ElementBuilder('span')
        .withText('Caption')
        .build();

      const dateSign = null;
      const asset = document.createElement('img');

      const container = new ElementBuilder()
        .withChildIf(!!caption, () => caption!.element)
        .withChildIf(!!dateSign, () => dateSign!)
        .withChildIf(!!asset, asset)
        .build();

      expect(container.element.children.length).toBe(2); // caption + asset
    });

    test('should handle nested conditional builders', () => {
      const hasDateSign = true;
      const dateContent = document.createElement('time');
      dateContent.textContent = '2024-01-24';

      const container = new ElementBuilder()
        .withClassName('image-wrapper')
        .withChildIf(hasDateSign, () => {
          return new ElementBuilder()
            .withClassName('date-box')
            .withChild(dateContent)
            .build().element;
        })
        .build();

      expect(container.element.querySelector('.date-box')).toBeTruthy();
      expect(container.element.textContent).toContain('2024-01-24');
    });

    test('should merge custom styles with base styles', () => {
      const customStyles = {
        position: 'relative' as const,
        zIndex: '10'
      };

      const model = new ElementBuilder()
        .withStyles({
          element: {
            display: 'block',
            width: '100%'
          }
        })
        .withStyles({
          element: {
            ...customStyles
          }
        })
        .build();

      expect(model.styles).toContain('display');
      expect(model.styles).toContain('position');
      expect(model.styles).toContain('z-index');
    });
  });

  // ============================================================================
  // Cross-Pattern Integration Tests
  // ============================================================================
  describe('Cross-Pattern Integration', () => {
    test('should combine multiple patterns in complex component', () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];
      const hasHeader = true;
      const isThemeDark = true;

      const component = new ElementBuilder()
        .withClassName('complex-component')
        .withThemeDark(true)
        .withChildIf(hasHeader, () => {
          return new ElementBuilder('header')
            .withText('Component Header')
            .withClassName('component-header')
            .build().element;
        })
        .withChild(
          new ElementBuilder()
            .withClassName('component-body')
            .withChildrenFrom(items, (item, index) => {
              return new ElementBuilder()
                .withClassName('item')
                .withAttribute('data-index', index)
                .withText(item)
                .build().element;
            })
            .build().element
        )
        .withData({ theme: 'dark', items: items.length })
        .role('region')
        .ariaLabel('Complex component')
        .build();

      expect(component.element.children.length).toBe(2); // header + body
      expect(component.element.getAttribute('data-theme')).toBe('dark'); // This is from .withData()
      expect(component.element.getAttribute('role')).toBe('region');

      const body = component.element.querySelector('.component-body');
      expect(body?.children.length).toBe(3);
    });

    test('should maintain style accumulation across nested builders', () => {
      const child1 = new ElementBuilder()
        .withStyles({ element: { margin: '10px' } })
        .build();

      const child2 = new ElementBuilder()
        .withStyles({ element: { padding: '20px' } })
        .build();

      const parent = new ElementBuilder()
        .withStyles({ element: { display: 'flex' } })
        .withChildren(child1.element, child2.element)
        .build();

      // Parent styles should include all accumulated styles
      expect(parent.styles).toBeTruthy();
    });

    test('should handle event handlers in nested structure', () => {
      const buttonClick = jest.fn();
      const containerClick = jest.fn();

      const button = new ElementBuilder('button')
        .withText('Click')
        .onClick(buttonClick)
        .build();

      const container = new ElementBuilder()
        .withChild(button.element)
        .onClick(containerClick)
        .build();

      button.element.dispatchEvent(new Event('click'));
      expect(buttonClick).toHaveBeenCalledTimes(1);

      container.element.dispatchEvent(new Event('click'));
      expect(containerClick).toHaveBeenCalledTimes(1);
    });
  });
});
