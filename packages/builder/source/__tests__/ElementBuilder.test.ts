/**
 * @file ElementBuilder.test.ts
 * @description Unit tests for ElementBuilder
 */

import { ElementBuilder } from '../core/ElementBuilder';
import type { ElementModel } from '../core/types';

describe('ElementBuilder', () => {
  describe('Constructor and Basic Building', () => {
    test('should create builder with HTMLElement', () => {
      const div = document.createElement('div');
      const builder = new ElementBuilder(div);

      expect(builder).toBeInstanceOf(ElementBuilder);
    });

    test('should build and return ElementModel', () => {
      const div = document.createElement('div');
      const builder = new ElementBuilder(div);
      const model = builder.build();

      expect(model).toHaveProperty('element');
      expect(model).toHaveProperty('styles');
      expect(model.element).toBe(div);
      expect(typeof model.styles).toBe('string');
    });

    test('should prevent modification after build', () => {
      const div = document.createElement('div');
      const builder = new ElementBuilder(div);

      builder.build();

      expect(() => {
        builder.withClassName('test');
      }).toThrow('Cannot modify builder after build()');
    });

    test('should allow multiple build calls but warn', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const div = document.createElement('div');
      const builder = new ElementBuilder(div);

      const model1 = builder.build();
      const model2 = builder.build();

      expect(model1.element).toBe(model2.element);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('Class Name Management', () => {
    test('should add single class name', () => {
      const div = document.createElement('div');
      const model = new ElementBuilder(div)
        .withClassName('test-class')
        .build();

      expect(model.element.classList.contains('test-class')).toBe(true);
    });

    test('should add multiple class names', () => {
      const div = document.createElement('div');
      const model = new ElementBuilder(div)
        .withClassName('class1', 'class2', 'class3')
        .build();

      expect(model.element.classList.contains('class1')).toBe(true);
      expect(model.element.classList.contains('class2')).toBe(true);
      expect(model.element.classList.contains('class3')).toBe(true);
    });

    test('should chain multiple withClassName calls', () => {
      const div = document.createElement('div');
      const model = new ElementBuilder(div)
        .withClassName('class1')
        .withClassName('class2')
        .build();

      expect(model.element.classList.contains('class1')).toBe(true);
      expect(model.element.classList.contains('class2')).toBe(true);
    });

    test('should handle empty class names', () => {
      const div = document.createElement('div');
      const model = new ElementBuilder(div)
        .withClassName('', '  ', 'valid')
        .build();

      expect(model.element.classList.contains('valid')).toBe(true);
      expect(model.element.classList.length).toBe(1);
    });
  });

  describe('Attribute Management', () => {
    test('should set single attribute', () => {
      const div = document.createElement('div');
      const model = new ElementBuilder(div)
        .withAttribute('data-test', 'value')
        .build();

      expect(model.element.getAttribute('data-test')).toBe('value');
    });

    test('should set multiple attributes', () => {
      const div = document.createElement('div');
      const model = new ElementBuilder(div)
        .withAttribute('id', 'test-id')
        .withAttribute('data-value', '123')
        .build();

      expect(model.element.getAttribute('id')).toBe('test-id');
      expect(model.element.getAttribute('data-value')).toBe('123');
    });

    test('should skip null attributes in withAttributes', () => {
      const div = document.createElement('div');
      div.setAttribute('data-test', 'initial');

      const model = new ElementBuilder(div)
        .withAttributes({ 'data-test': null as any })
        .build();

      // null values are filtered out, so original value remains
      expect(model.element.getAttribute('data-test')).toBe('initial');
    });

    test('should skip undefined attributes in withAttributes', () => {
      const div = document.createElement('div');
      div.setAttribute('data-test', 'initial');

      const model = new ElementBuilder(div)
        .withAttributes({ 'data-test': undefined as any })
        .build();

      // undefined values are filtered out, so original value remains
      expect(model.element.getAttribute('data-test')).toBe('initial');
    });
  });

  describe('Text Content', () => {
    test('should set text content', () => {
      const div = document.createElement('div');
      const model = new ElementBuilder(div)
        .withText('Hello World')
        .build();

      expect(model.element.textContent).toBe('Hello World');
    });

    test('should replace existing text content', () => {
      const div = document.createElement('div');
      div.textContent = 'Initial';

      const model = new ElementBuilder(div)
        .withText('Replaced')
        .build();

      expect(model.element.textContent).toBe('Replaced');
    });

    test('should handle empty string', () => {
      const div = document.createElement('div');
      div.textContent = 'Initial';

      const model = new ElementBuilder(div)
        .withText('')
        .build();

      expect(model.element.textContent).toBe('');
    });
  });

  describe('HTML Content', () => {
    test('should set HTML content', () => {
      const div = document.createElement('div');
      const model = new ElementBuilder(div)
        .withHTML('<span>Hello</span>')
        .build();

      expect(model.element.innerHTML).toBe('<span>Hello</span>');
    });

    test('should replace existing HTML content', () => {
      const div = document.createElement('div');
      div.innerHTML = '<p>Initial</p>';

      const model = new ElementBuilder(div)
        .withHTML('<strong>Replaced</strong>')
        .build();

      expect(model.element.innerHTML).toBe('<strong>Replaced</strong>');
    });
  });

  describe('Children Management', () => {
    test('should append HTMLElement child', () => {
      const parent = document.createElement('div');
      const child = document.createElement('span');

      const model = new ElementBuilder(parent)
        .withChild(child)
        .build();

      expect(model.element.children.length).toBe(1);
      expect(model.element.children[0]).toBe(child);
    });

    test('should append text node child', () => {
      const parent = document.createElement('div');

      const model = new ElementBuilder(parent)
        .withChild('Text content')
        .build();

      expect(model.element.textContent).toBe('Text content');
    });

    test('should append builder child', () => {
      const parent = document.createElement('div');
      const childBuilder = new ElementBuilder(document.createElement('span'))
        .withText('Child');

      const model = new ElementBuilder(parent)
        .withChild(childBuilder)
        .build();

      expect(model.element.children.length).toBe(1);
      expect(model.element.children[0].textContent).toBe('Child');
    });

    test('should append multiple children', () => {
      const parent = document.createElement('div');
      const child1 = document.createElement('span');
      const child2 = document.createElement('p');

      const model = new ElementBuilder(parent)
        .withChildren(child1, child2)
        .build();

      expect(model.element.children.length).toBe(2);
      expect(model.element.children[0]).toBe(child1);
      expect(model.element.children[1]).toBe(child2);
    });

    test('should skip null and undefined children', () => {
      const parent = document.createElement('div');
      const child = document.createElement('span');

      const model = new ElementBuilder(parent)
        .withChildren(null as any, child, undefined as any)
        .build();

      expect(model.element.children.length).toBe(1);
      expect(model.element.children[0]).toBe(child);
    });

    test('should handle mixed child types', () => {
      const parent = document.createElement('div');
      const elementChild = document.createElement('span');
      const builderChild = new ElementBuilder(document.createElement('p'));

      const model = new ElementBuilder(parent)
        .withChildren(
          elementChild,
          'Text node',
          builderChild,
          null as any
        )
        .build();

      expect(model.element.children.length).toBe(2); // span + p
    });
  });

  describe('Event Listeners', () => {
    test('should add event listener using on method', () => {
      const button = document.createElement('button');
      const handler = jest.fn();

      const model = new ElementBuilder(button)
        .on('click', handler)
        .build();

      model.element.dispatchEvent(new Event('click'));
      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should cleanup event listeners on destroy', () => {
      const button = document.createElement('button');
      const handler = jest.fn();

      const model = new ElementBuilder(button)
        .on('click', handler)
        .build();

      model.element.dispatchEvent(new Event('click'));
      expect(handler).toHaveBeenCalledTimes(1);

      model.destroy?.();

      model.element.dispatchEvent(new Event('click'));
      expect(handler).toHaveBeenCalledTimes(1); // Should not be called again
    });

    test('should support multiple event types', () => {
      const input = document.createElement('input');
      const focusHandler = jest.fn();
      const blurHandler = jest.fn();
      const inputHandler = jest.fn();

      const model = new ElementBuilder(input)
        .on('focus', focusHandler)
        .on('blur', blurHandler)
        .on('input', inputHandler)
        .build();

      input.dispatchEvent(new Event('focus'));
      input.dispatchEvent(new Event('blur'));
      input.dispatchEvent(new Event('input'));

      expect(focusHandler).toHaveBeenCalledTimes(1);
      expect(blurHandler).toHaveBeenCalledTimes(1);
      expect(inputHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe('ARIA Attributes', () => {
    test('should add aria attributes with auto-prefix', () => {
      const button = document.createElement('button');

      const model = new ElementBuilder(button)
        .withAria({ label: 'Close', expanded: 'false' })
        .build();

      expect(model.element.getAttribute('aria-label')).toBe('Close');
      expect(model.element.getAttribute('aria-expanded')).toBe('false');
    });

    test('should handle aria attributes without prefix', () => {
      const button = document.createElement('button');

      const model = new ElementBuilder(button)
        .withAria({ 'aria-label': 'Menu' })
        .build();

      expect(model.element.getAttribute('aria-label')).toBe('Menu');
    });

    test('should chain multiple aria calls', () => {
      const button = document.createElement('button');

      const model = new ElementBuilder(button)
        .withAria({ label: 'Button' })
        .withAria({ pressed: 'true' })
        .build();

      expect(model.element.getAttribute('aria-label')).toBe('Button');
      expect(model.element.getAttribute('aria-pressed')).toBe('true');
    });
  });

  describe('Data Attributes', () => {
    test('should add data attributes with auto-prefix', () => {
      const div = document.createElement('div');

      const model = new ElementBuilder(div)
        .withData({ id: '123', value: 'test' })
        .build();

      expect(model.element.getAttribute('data-id')).toBe('123');
      expect(model.element.getAttribute('data-value')).toBe('test');
    });

    test('should handle data attributes without prefix', () => {
      const div = document.createElement('div');

      const model = new ElementBuilder(div)
        .withData({ 'data-custom': 'value' })
        .build();

      expect(model.element.getAttribute('data-custom')).toBe('value');
    });
  });

  describe('Conditional Methods', () => {
    test('withChildIf should add child when condition is true', () => {
      const parent = document.createElement('div');
      const child = document.createElement('span');

      const model = new ElementBuilder(parent)
        .withChildIf(true, child)
        .build();

      expect(model.element.children.length).toBe(1);
    });

    test('withChildIf should not add child when condition is false', () => {
      const parent = document.createElement('div');
      const child = document.createElement('span');

      const model = new ElementBuilder(parent)
        .withChildIf(false, child)
        .build();

      expect(model.element.children.length).toBe(0);
    });

    test('should add text conditionally using imperative approach', () => {
      const div = document.createElement('div');
      const shouldAddText = true;

      const builder = new ElementBuilder(div);

      if (shouldAddText) {
        builder.withText('Conditional text');
      }

      const model = builder.build();

      expect(model.element.textContent).toBe('Conditional text');
    });

    test('should not add text when condition is false using imperative approach', () => {
      const div = document.createElement('div');
      const shouldAddText = false;

      const builder = new ElementBuilder(div);

      if (shouldAddText) {
        builder.withText('Conditional text');
      }

      const model = builder.build();

      expect(model.element.textContent).toBe('');
    });

    test('withStylesIf should add styles when condition is true', () => {
      const div = document.createElement('div');

      const model = new ElementBuilder(div)
        .withClassName('test-class')
        .withStylesIf(true, { element: { color: 'red' } })
        .build();

      expect(model.styles).toBeTruthy();
    });

    test('withStylesIf should not add styles when condition is false', () => {
      const div = document.createElement('div');

      const model = new ElementBuilder(div)
        .withStylesIf(false, { element: { color: 'red' } })
        .build();

      // No styles added when condition is false
      expect(model.styles).toBe('');
    });
  });

  describe('Array Mapping', () => {
    test('withChildrenFrom should map array to children', () => {
      const parent = document.createElement('div');
      const items = ['Item 1', 'Item 2', 'Item 3'];

      const model = new ElementBuilder(parent)
        .withChildrenFrom(items, (text) => {
          const span = document.createElement('span');
          span.textContent = text;
          return span;
        })
        .build();

      expect(model.element.children.length).toBe(3);
      expect(model.element.children[0].textContent).toBe('Item 1');
      expect(model.element.children[2].textContent).toBe('Item 3');
    });

    test('withChildrenFrom should handle builder returns', () => {
      const parent = document.createElement('div');
      const items = [1, 2, 3];

      const model = new ElementBuilder(parent)
        .withChildrenFrom(items, (num) =>
          new ElementBuilder(document.createElement('div'))
            .withText(`Number: ${num}`)
        )
        .build();

      expect(model.element.children.length).toBe(3);
      expect(model.element.children[1].textContent).toBe('Number: 2');
    });
  });

  describe('Theme Support', () => {
    test('should apply dark theme to styles', () => {
      const div = document.createElement('div');

      const model = new ElementBuilder(div)
        .withClassName('test-class')
        .withStyles({ element: { color: 'black' } })
        .withThemeDark(true)
        .build();

      // Dark theme should convert black to white
      expect(model.styles).toContain('color: white');
    });

    test('should not apply theme modifiers when false', () => {
      const div = document.createElement('div');

      const model = new ElementBuilder(div)
        .withClassName('test-class')
        .withStyles({ element: { color: 'black' } })
        .withThemeDark(false)
        .build();

      // Should keep original color
      expect(model.styles).toContain('color: black');
    });

    test('should not apply theme modifiers when undefined', () => {
      const div = document.createElement('div');
      const isThemeDark = undefined;

      const model = new ElementBuilder(div)
        .withClassName('test-class')
        .withStyles({ element: { color: 'black' } })
        .withThemeDark(isThemeDark)
        .build();

      // Should keep original color when undefined
      expect(model.styles).toContain('color: black');
    });
  });

  describe('Ref Method', () => {
    test('should call ref callback with element', () => {
      const div = document.createElement('div');
      const refCallback = jest.fn();

      new ElementBuilder(div)
        .ref(refCallback)
        .build();

      expect(refCallback).toHaveBeenCalledWith(div);
    });
  });

  describe('Apply Method', () => {
    test('should apply function to builder', () => {
      const div = document.createElement('div');

      const addRedColor = (builder: ElementBuilder<HTMLDivElement>) =>
        builder.withClassName('test-class').withStyles({ element: { color: 'red' } });

      const model = new ElementBuilder(div)
        .apply(addRedColor)
        .build();

      expect(model.styles).toBeTruthy();
    });

    test('should chain multiple apply calls', () => {
      const div = document.createElement('div');

      const addClass = (builder: ElementBuilder<HTMLDivElement>) =>
        builder.withClassName('applied-class');

      const addText = (builder: ElementBuilder<HTMLDivElement>) =>
        builder.withText('Applied text');

      const model = new ElementBuilder(div)
        .apply(addClass)
        .apply(addText)
        .build();

      expect(model.element.classList.contains('applied-class')).toBe(true);
      expect(model.element.textContent).toBe('Applied text');
    });
  });

  describe('Custom Modifier', () => {
    test('should apply custom modifier to element', () => {
      const div = document.createElement('div');

      const model = new ElementBuilder(div)
        .withModifier((el) => {
          el.style.backgroundColor = 'blue';
        })
        .build();

      expect(model.element.style.backgroundColor).toBe('blue');
    });

    test('should chain multiple modifiers', () => {
      const div = document.createElement('div');

      const model = new ElementBuilder(div)
        .withModifier((el) => el.style.color = 'red')
        .withModifier((el) => el.style.padding = '10px')
        .build();

      expect(model.element.style.color).toBe('red');
      expect(model.element.style.padding).toBe('10px');
    });
  });

  describe('Method Chaining', () => {
    test('should chain all methods fluently', () => {
      const div = document.createElement('div');
      const child = document.createElement('span');

      const model = new ElementBuilder(div)
        .withClassName('container')
        .withAttribute('id', 'main')
        .withThemeDark(true)
        .withChild(child)
        .withAria({ label: 'Container' })
        .withData({ value: '123' })
        .on('click', () => {})
        .build();

      expect(model.element.classList.contains('container')).toBe(true);
      expect(model.element.getAttribute('id')).toBe('main');
      // Dark theme applies style modifiers, not attributes
      expect(model.element.getAttribute('aria-label')).toBe('Container');
      expect(model.element.getAttribute('data-value')).toBe('123');
      expect(model.element.children.length).toBe(1);
    });
  });

  describe('Destroy Method', () => {
    test('should call cleanup on destroy', () => {
      const div = document.createElement('div');
      const handler = jest.fn();

      const model = new ElementBuilder(div)
        .on('click', handler)
        .build();

      expect(model.destroy).toBeDefined();

      model.destroy?.();

      div.dispatchEvent(new Event('click'));
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('ElementModel Children Support', () => {
    test('should accept ElementModel as child and merge styles', () => {
      const child = new ElementBuilder('span')
        .withClassName('child-class')
        .withText('Child')
        .withStyles({ element: { color: 'red' } })
        .build();

      const parent = new ElementBuilder()
        .withClassName('parent-class')
        .withChild(child)
        .withStyles({ element: { padding: '10px' } })
        .build();

      expect(parent.element.children.length).toBe(1);
      expect(parent.element.querySelector('.child-class')).toBeTruthy();
      expect(parent.styles).toContain('color: red'); // Child styles merged
      expect(parent.styles).toContain('padding: 10px'); // Parent styles present
    });

    test('should accept multiple ElementModel children via withChildren', () => {
      const child1 = new ElementBuilder('span')
        .withText('Child 1')
        .withClassName('child-1')
        .withStyles({ element: { color: 'red' } })
        .build();

      const child2 = new ElementBuilder('span')
        .withText('Child 2')
        .withClassName('child-2')
        .withStyles({ element: { color: 'blue' } })
        .build();

      const parent = new ElementBuilder()
        .withChildren(child1, child2)
        .build();

      expect(parent.element.children.length).toBe(2);
      expect(parent.styles).toContain('color: red');
      expect(parent.styles).toContain('color: blue');
    });

    test('should mix ElementModel and HTMLElement children', () => {
      const childModel = new ElementBuilder('span')
        .withText('Model Child')
        .withClassName('model-child')
        .withStyles({ element: { fontWeight: 'bold' } })
        .build();

      const childElement = document.createElement('div');
      childElement.textContent = 'Plain Element';

      const parent = new ElementBuilder()
        .withChildren(childModel, childElement, 'Text node')
        .build();

      expect(parent.element.children.length).toBe(2); // Model + Element
      expect(parent.element.textContent).toContain('Model Child');
      expect(parent.element.textContent).toContain('Plain Element');
      expect(parent.element.textContent).toContain('Text node');
      expect(parent.styles).toContain('font-weight: bold');
    });
  });

  describe('Custom Events Support', () => {
    test('should add custom events via withEvents', () => {
      const playFn = jest.fn();
      const pauseFn = jest.fn();

      const model = new ElementBuilder()
        .withEvents({
          play: playFn,
          pause: pauseFn,
        })
        .build();

      expect(model.events).toBeDefined();
      expect(model.events?.play).toBe(playFn);
      expect(model.events?.pause).toBe(pauseFn);

      model.events?.play();
      expect(playFn).toHaveBeenCalled();

      model.events?.pause();
      expect(pauseFn).toHaveBeenCalled();
    });

    test('should not include events property when no events added', () => {
      const model = new ElementBuilder().build();

      expect(model.events).toBeUndefined();
    });

    test('should merge multiple withEvents calls', () => {
      const fn1 = jest.fn();
      const fn2 = jest.fn();

      const model = new ElementBuilder()
        .withEvents({ method1: fn1 })
        .withEvents({ method2: fn2 })
        .build();

      expect(model.events?.method1).toBe(fn1);
      expect(model.events?.method2).toBe(fn2);
    });

    test('should work with closures for stateful events', () => {
      const videoElement = document.createElement('video');
      let isPaused = true;

      const model = new ElementBuilder()
        .withChild(videoElement)
        .withEvents({
          play: () => {
            isPaused = false;
            videoElement.play();
          },
          pause: () => {
            isPaused = true;
            videoElement.pause();
          },
          isPaused: () => isPaused,
        })
        .build();

      expect(model.events?.isPaused()).toBe(true);
      model.events?.play();
      expect(model.events?.isPaused()).toBe(false);
      model.events?.pause();
      expect(model.events?.isPaused()).toBe(true);
    });
  });

  describe('Combined ElementModel Children + Events', () => {
    test('should handle ElementModel child with events and merge both styles and events', () => {
      const buttonFn = jest.fn();
      const button = new ElementBuilder('button')
        .withText('Play')
        .withClassName('play-button')
        .withStyles({ element: { backgroundColor: 'blue' } })
        .withEvents({ click: buttonFn })
        .build();

      const containerPlayFn = jest.fn();
      const container = new ElementBuilder()
        .withClassName('container')
        .withChild(button)
        .withStyles({ element: { padding: '20px' } })
        .withEvents({ play: containerPlayFn })
        .build();

      // Check child was added
      expect(container.element.querySelector('button')).toBeTruthy();

      // Check styles were merged
      expect(container.styles).toContain('background-color: blue');
      expect(container.styles).toContain('padding: 20px');

      // Check container events work
      expect(container.events?.play).toBe(containerPlayFn);
      container.events?.play();
      expect(containerPlayFn).toHaveBeenCalled();

      // Note: Button's events are on its own model, not the container
      expect(button.events?.click).toBe(buttonFn);
      button.events?.click();
      expect(buttonFn).toHaveBeenCalled();
    });
  });

  describe('getStyles() Method', () => {
    test('should return compiled styles without building element', () => {
      const builder = new ElementBuilder()
        .withClassName('test-class')
        .withStyles({
          element: {
            color: 'red',
            padding: '10px',
          },
        });

      const styles = builder.getStyles();

      expect(typeof styles).toBe('string');
      expect(styles).toContain('.test-class');
      expect(styles).toContain('color: red');
      expect(styles).toContain('padding: 10px');
    });

    test('should not mark builder as built when calling getStyles()', () => {
      const builder = new ElementBuilder()
        .withClassName('test-class')
        .withStyles({
          element: { color: 'blue' },
        });

      const styles1 = builder.getStyles();

      // Should still be able to add more styles
      expect(() => {
        builder.withStyles({
          element: { margin: '5px' },
        });
      }).not.toThrow();

      const styles2 = builder.getStyles();

      expect(styles2).toContain('color: blue');
      expect(styles2).toContain('margin: 5px');
    });

    test('should apply theme modifiers when calling getStyles()', () => {
      const builder = new ElementBuilder()
        .withClassName('dark-test')
        .withThemeDark(true)
        .withStyles({
          element: {
            color: 'black',
          },
        });

      const styles = builder.getStyles();

      expect(styles).toBeDefined();
      expect(typeof styles).toBe('string');
    });

    test('should return same styles as build() for styles property', () => {
      const builder1 = new ElementBuilder()
        .withClassName('compare-test')
        .withStyles({
          element: {
            fontSize: '16px',
            fontWeight: 'bold',
          },
        });

      const builder2 = new ElementBuilder()
        .withClassName('compare-test')
        .withStyles({
          element: {
            fontSize: '16px',
            fontWeight: 'bold',
          },
        });

      const stylesFromGet = builder1.getStyles();
      const stylesFromBuild = builder2.build().styles;

      expect(stylesFromGet).toBe(stylesFromBuild);
    });

    test('should work with presets to extract styles', () => {
      const presetBuilder = new ElementBuilder()
        .withClassName('preset-example')
        .withStyles({
          element: {
            backgroundColor: 'blue',
            color: 'white',
            padding: '12px 24px',
          },
        });

      const presetStyles = presetBuilder.getStyles();

      const customElement = new ElementBuilder()
        .withClassName('custom-element')
        .withStyles({ element: { margin: '10px' } })
        .build();

      expect(presetStyles).toContain('background-color: blue');
      expect(presetStyles).toContain('color: white');
      expect(presetStyles).toContain('padding: 12px 24px');
    });

    test('should handle empty styles', () => {
      const builder = new ElementBuilder();
      const styles = builder.getStyles();

      expect(typeof styles).toBe('string');
      // Empty styles should return empty string or minimal CSS
    });

    test('should handle complex nested styles', () => {
      const builder = new ElementBuilder()
        .withClassName('complex')
        .withStyles({
          element: {
            display: 'flex',
            '&:hover': {
              backgroundColor: 'gray',
            },
            '& > *': {
              margin: '5px',
            },
          },
        });

      const styles = builder.getStyles();

      expect(styles).toContain('.complex');
      expect(styles).toContain('display: flex');
    });
  });

  describe('.styled() Method', () => {
    test('should apply style object with className property', () => {
      const styleObject = {
        className: 'test-styled-class',
        element: {
          color: 'blue',
          padding: '10px',
        },
      };

      const model = new ElementBuilder()
        .styled(styleObject)
        .build();

      expect(model.element.classList.contains('test-styled-class')).toBe(true);
      expect(model.styles).toContain('.test-styled-class');
      expect(model.styles).toContain('color: blue');
      expect(model.styles).toContain('padding: 10px');
    });

    test('should handle array of class names in styled object', () => {
      const styleObject = {
        className: ['class-one', 'class-two'],
        element: {
          fontSize: '16px',
        },
      };

      const model = new ElementBuilder()
        .styled(styleObject)
        .build();

      expect(model.element.classList.contains('class-one')).toBe(true);
      expect(model.element.classList.contains('class-two')).toBe(true);
    });

    test('should apply styles with custom priority', () => {
      const baseStyle = {
        className: 'base',
        element: { color: 'red' },
      };

      const overrideStyle = {
        className: 'override',
        element: { color: 'blue' },
      };

      const model = new ElementBuilder()
        .styled(baseStyle, 0)
        .styled(overrideStyle, 10)
        .build();

      expect(model.styles).toBeTruthy();
      expect(model.element.classList.contains('base')).toBe(true);
      expect(model.element.classList.contains('override')).toBe(true);
    });

    test('should handle ElementStyles structure', () => {
      const styleObject = {
        className: 'with-pseudo',
        element: {
          color: 'red',
        },
        pseudoBefore: {
          content: '""',
          display: 'block',
        },
      };

      const model = new ElementBuilder()
        .styled(styleObject)
        .build();

      expect(model.element.classList.contains('with-pseudo')).toBe(true);
      expect(model.styles).toContain('.with-pseudo');
    });

    test('should chain styled calls', () => {
      const style1 = {
        className: 'style-one',
        element: { padding: '5px' },
      };

      const style2 = {
        className: 'style-two',
        element: { margin: '10px' },
      };

      const model = new ElementBuilder()
        .styled(style1)
        .styled(style2)
        .build();

      expect(model.element.classList.contains('style-one')).toBe(true);
      expect(model.element.classList.contains('style-two')).toBe(true);
      expect(model.styles).toContain('padding: 5px');
      expect(model.styles).toContain('margin: 10px');
    });

    test('should work without className property', () => {
      const styleObject = {
        element: {
          display: 'flex',
        },
      };

      const model = new ElementBuilder()
        .withClassName('manual-class')
        .styled(styleObject)
        .build();

      expect(model.element.classList.contains('manual-class')).toBe(true);
      expect(model.styles).toContain('display: flex');
    });
  });

  describe('.getElement() Method', () => {
    test('should return element with classes applied without building', () => {
      const builder = new ElementBuilder()
        .withClassName('test-class')
        .withClassName('another-class');

      const element = builder.getElement();

      expect(element.classList.contains('test-class')).toBe(true);
      expect(element.classList.contains('another-class')).toBe(true);
    });

    test('should return element with attributes applied without building', () => {
      const builder = new ElementBuilder()
        .withAttribute('data-id', '123')
        .withAttribute('data-test', 'value');

      const element = builder.getElement();

      expect(element.getAttribute('data-id')).toBe('123');
      expect(element.getAttribute('data-test')).toBe('value');
    });

    test('should allow continued modification after getElement()', () => {
      const builder = new ElementBuilder()
        .withClassName('initial');

      const element1 = builder.getElement();
      expect(element1.classList.contains('initial')).toBe(true);

      // Should still be able to modify builder
      expect(() => {
        builder.withClassName('added-later');
      }).not.toThrow();

      const element2 = builder.getElement();
      expect(element2.classList.contains('initial')).toBe(true);
      expect(element2.classList.contains('added-later')).toBe(true);
    });

    test('should not apply children or modifiers', () => {
      const child = document.createElement('span');
      const modifierCalled = jest.fn();

      const builder = new ElementBuilder()
        .withChild(child)
        .withModifier(modifierCalled);

      const element = builder.getElement();

      // Children not added by getElement
      expect(element.children.length).toBe(0);
      // Modifiers not called by getElement
      expect(modifierCalled).not.toHaveBeenCalled();
    });

    test('should work with data and aria attributes', () => {
      const builder = new ElementBuilder()
        .withData({ value: '456' })
        .withAria({ label: 'Test Label' });

      const element = builder.getElement();

      expect(element.getAttribute('data-value')).toBe('456');
      expect(element.getAttribute('aria-label')).toBe('Test Label');
    });

    test('should allow building after getElement()', () => {
      const builder = new ElementBuilder()
        .withClassName('pre-get')
        .withAttribute('data-pre', 'value');

      const preElement = builder.getElement();
      expect(preElement.classList.contains('pre-get')).toBe(true);

      builder.withClassName('post-get');

      const model = builder.build();
      expect(model.element.classList.contains('pre-get')).toBe(true);
      expect(model.element.classList.contains('post-get')).toBe(true);
    });

    test('should return same element instance', () => {
      const builder = new ElementBuilder();

      const element1 = builder.getElement();
      const element2 = builder.getElement();

      expect(element1).toBe(element2);
    });
  });

  describe('.withAnimation() Method', () => {
    test('should add animation with default options', () => {
      const model = new ElementBuilder()
        .withClassName('animated')
        .withAnimation('fadeIn')
        .build();

      expect(model.styles).toContain('animation:');
      expect(model.styles).toContain('fadeIn');
    });

    test('should add animation with custom duration', () => {
      const model = new ElementBuilder()
        .withClassName('animated')
        .withAnimation('slideIn', { duration: '500ms' })
        .build();

      expect(model.styles).toContain('animation:');
      expect(model.styles).toContain('slideIn');
      expect(model.styles).toContain('500ms');
    });

    test('should add animation with custom delay', () => {
      const model = new ElementBuilder()
        .withClassName('animated')
        .withAnimation('fadeIn', { delay: '200ms' })
        .build();

      expect(model.styles).toContain('animation:');
      expect(model.styles).toContain('200ms');
    });

    test('should add animation with all options', () => {
      const model = new ElementBuilder()
        .withClassName('complex-animation')
        .withAnimation('slideOver', {
          duration: '1s',
          delay: '100ms',
          easing: 'linear',
          iterationCount: 'infinite',
          direction: 'alternate',
          fillMode: 'both',
        })
        .build();

      const styles = model.styles;
      expect(styles).toContain('animation:');
      expect(styles).toContain('slideOver');
      expect(styles).toContain('1s');
      expect(styles).toContain('linear');
      expect(styles).toContain('infinite');
      expect(styles).toContain('alternate');
      expect(styles).toContain('both');
    });

    test('should chain multiple animations', () => {
      const model = new ElementBuilder()
        .withClassName('multi-animated')
        .withAnimation('fadeIn', { duration: '300ms' })
        .withAnimation('slideIn', { duration: '500ms' })
        .build();

      expect(model.styles).toContain('animation:');
    });

    test('should work with other style methods', () => {
      const model = new ElementBuilder()
        .withClassName('styled-animated')
        .withStyles({ element: { color: 'red' } })
        .withAnimation('scale', { duration: '600ms' })
        .build();

      expect(model.styles).toContain('color: red');
      expect(model.styles).toContain('animation:');
      expect(model.styles).toContain('scale');
    });

    test('should handle numeric iteration count', () => {
      const model = new ElementBuilder()
        .withClassName('counted-animation')
        .withAnimation('fadeOut', { iterationCount: 3 })
        .build();

      expect(model.styles).toContain('animation:');
      expect(model.styles).toContain('3');
    });
  });

  describe('.getClassNames() Method', () => {
    test('should return empty array when no classes added', () => {
      const builder = new ElementBuilder();
      const classNames = builder.getClassNames();

      expect(Array.isArray(classNames)).toBe(true);
      expect(classNames.length).toBe(0);
    });

    test('should return array of class names', () => {
      const builder = new ElementBuilder()
        .withClassName('class-one')
        .withClassName('class-two');

      const classNames = builder.getClassNames();

      expect(classNames).toEqual(['class-one', 'class-two']);
    });

    test('should return accumulated class names from multiple calls', () => {
      const builder = new ElementBuilder()
        .withClassName('a', 'b')
        .withClassName('c');

      const classNames = builder.getClassNames();

      expect(classNames).toContain('a');
      expect(classNames).toContain('b');
      expect(classNames).toContain('c');
      expect(classNames.length).toBe(3);
    });

    test('should not mark builder as built', () => {
      const builder = new ElementBuilder()
        .withClassName('test');

      const classNames1 = builder.getClassNames();

      // Should still be able to add more classes
      expect(() => {
        builder.withClassName('another');
      }).not.toThrow();

      const classNames2 = builder.getClassNames();
      expect(classNames2).toContain('test');
      expect(classNames2).toContain('another');
    });
  });

  describe('.withRole() Method', () => {
    test('should set role attribute', () => {
      const model = new ElementBuilder()
        .withRole('button')
        .build();

      expect(model.element.getAttribute('role')).toBe('button');
    });

    test('should chain with other methods', () => {
      const model = new ElementBuilder()
        .withRole('navigation')
        .withAria({ label: 'Main Navigation' })
        .withClassName('nav')
        .build();

      expect(model.element.getAttribute('role')).toBe('navigation');
      expect(model.element.getAttribute('aria-label')).toBe('Main Navigation');
      expect(model.element.classList.contains('nav')).toBe(true);
    });

    test('should support various ARIA roles', () => {
      const roles = ['main', 'dialog', 'alert', 'tab', 'tabpanel'];

      roles.forEach(role => {
        const model = new ElementBuilder()
          .withRole(role)
          .build();

        expect(model.element.getAttribute('role')).toBe(role);
      });
    });
  });
});
