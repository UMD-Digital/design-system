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
    test('should add event listener using onClick', () => {
      const button = document.createElement('button');
      const handler = jest.fn();

      const model = new ElementBuilder(button)
        .onClick(handler)
        .build();

      model.element.dispatchEvent(new Event('click'));
      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should use convenience onClick method', () => {
      const button = document.createElement('button');
      const handler = jest.fn();

      const model = new ElementBuilder(button)
        .onClick(handler)
        .build();

      model.element.dispatchEvent(new Event('click'));
      expect(handler).toHaveBeenCalledTimes(1);
    });

    test('should cleanup event listeners on destroy', () => {
      const button = document.createElement('button');
      const handler = jest.fn();

      const model = new ElementBuilder(button)
        .onClick(handler)
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
        .onFocus(focusHandler)
        .onBlur(blurHandler)
        .onInput(inputHandler)
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

    test('withTextIf should add text when condition is true', () => {
      const div = document.createElement('div');

      const model = new ElementBuilder(div)
        .withTextIf(true, 'Conditional text')
        .build();

      expect(model.element.textContent).toBe('Conditional text');
    });

    test('withTextIf should not add text when condition is false', () => {
      const div = document.createElement('div');

      const model = new ElementBuilder(div)
        .withTextIf(false, 'Conditional text')
        .build();

      expect(model.element.textContent).toBe('');
    });

    test('withStylesIf should add styles when condition is true', () => {
      const div = document.createElement('div');

      const model = new ElementBuilder(div)
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
        .withStyles({ element: { color: 'black' } })
        .withThemeDark(true)
        .build();

      // Dark theme should convert black to white
      expect(model.styles).toContain('color: white');
    });

    test('should not apply theme modifiers when false', () => {
      const div = document.createElement('div');

      const model = new ElementBuilder(div)
        .withStyles({ element: { color: 'black' } })
        .withThemeDark(false)
        .build();

      // Should keep original color
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
        builder.withStyles({ element: { color: 'red' } });

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
        .onClick(() => {})
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
        .onClick(handler)
        .build();

      expect(model.destroy).toBeDefined();

      model.destroy?.();

      div.dispatchEvent(new Event('click'));
      expect(handler).not.toHaveBeenCalled();
    });
  });
});
