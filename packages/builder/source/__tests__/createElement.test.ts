/**
 * @file createElement.test.ts
 * @description Unit tests for ElementBuilder constructor and createElement helper
 */

import { ElementBuilder } from '../core/ElementBuilder';

describe('ElementBuilder Constructor', () => {
  describe('Default constructor (no arguments)', () => {
    test('should create div by default', () => {
      const builder = new ElementBuilder();
      const model = builder.build();
      expect(model.element).toBeInstanceOf(HTMLDivElement);
      expect(model.element.tagName).toBe('DIV');
    });
  });

  describe('Constructor with tag name', () => {
    test('should create builder for any HTML tag', () => {
      const builder = new ElementBuilder('div');
      expect(builder).toBeInstanceOf(ElementBuilder);
    });

    test('should preserve element type', () => {
      const builder = new ElementBuilder('a');
      const model = builder.build();
      expect(model.element.tagName).toBe('A');
      expect(model.element).toBeInstanceOf(HTMLAnchorElement);
    });

    test('should accept builder options', () => {
      const builder = new ElementBuilder('div', {
        className: ['test-class'],
      });
      const model = builder.build();
      expect(model.element.classList.contains('test-class')).toBe(true);
    });
  });

  describe('Constructor with existing element', () => {
    test('should wrap existing element', () => {
      const existingDiv = document.createElement('div');
      existingDiv.textContent = 'Existing';

      const builder = new ElementBuilder(existingDiv);
      const model = builder.build();

      expect(model.element).toBe(existingDiv);
      expect(model.element.textContent).toBe('Existing');
    });

    test('should accept options when wrapping', () => {
      const existingDiv = document.createElement('div');

      const builder = new ElementBuilder(existingDiv, {
        className: ['test-class'],
      });
      const model = builder.build();

      expect(model.element).toBe(existingDiv);
      expect(model.element.classList.contains('test-class')).toBe(true);
    });
  });

  describe('Constructor with BuilderOptions', () => {
    test('should create div with options', () => {
      const builder = new ElementBuilder({
        className: ['test-class'],
      });
      const model = builder.build();

      expect(model.element).toBeInstanceOf(HTMLDivElement);
      expect(model.element.classList.contains('test-class')).toBe(true);
    });
  });

  describe('Container Elements', () => {
    test('div should create HTMLDivElement', () => {
      const model = new ElementBuilder('div').build();
      expect(model.element).toBeInstanceOf(HTMLDivElement);
      expect(model.element.tagName).toBe('DIV');
    });

    test('span should create HTMLSpanElement', () => {
      const model = new ElementBuilder('span').build();
      expect(model.element).toBeInstanceOf(HTMLSpanElement);
      expect(model.element.tagName).toBe('SPAN');
    });

    test('section should create HTMLElement with section tag', () => {
      const model = new ElementBuilder('section').build();
      expect(model.element.tagName).toBe('SECTION');
    });

    test('article should create HTMLElement with article tag', () => {
      const model = new ElementBuilder('article').build();
      expect(model.element.tagName).toBe('ARTICLE');
    });

    test('aside should create HTMLElement with aside tag', () => {
      const model = new ElementBuilder('aside').build();
      expect(model.element.tagName).toBe('ASIDE');
    });

    test('header should create HTMLElement with header tag', () => {
      const model = new ElementBuilder('header').build();
      expect(model.element.tagName).toBe('HEADER');
    });

    test('footer should create HTMLElement with footer tag', () => {
      const model = new ElementBuilder('footer').build();
      expect(model.element.tagName).toBe('FOOTER');
    });

    test('main should create HTMLElement with main tag', () => {
      const model = new ElementBuilder('main').build();
      expect(model.element.tagName).toBe('MAIN');
    });

    test('nav should create HTMLElement with nav tag', () => {
      const model = new ElementBuilder('nav').build();
      expect(model.element.tagName).toBe('NAV');
    });
  });

  describe('Text Elements', () => {
    test('p should create HTMLParagraphElement', () => {
      const model = new ElementBuilder('p').build();
      expect(model.element).toBeInstanceOf(HTMLParagraphElement);
      expect(model.element.tagName).toBe('P');
    });

    test('a should create HTMLAnchorElement', () => {
      const model = new ElementBuilder('a').build();
      expect(model.element).toBeInstanceOf(HTMLAnchorElement);
      expect(model.element.tagName).toBe('A');
    });

    test('strong should create HTMLElement with strong tag', () => {
      const model = new ElementBuilder('strong').build();
      expect(model.element.tagName).toBe('STRONG');
    });

    test('em should create HTMLElement with em tag', () => {
      const model = new ElementBuilder('em').build();
      expect(model.element.tagName).toBe('EM');
    });

    test('small should create HTMLElement with small tag', () => {
      const model = new ElementBuilder('small').build();
      expect(model.element.tagName).toBe('SMALL');
    });

    test('mark should create HTMLElement with mark tag', () => {
      const model = new ElementBuilder('mark').build();
      expect(model.element.tagName).toBe('MARK');
    });

    test('code should create HTMLElement with code tag', () => {
      const model = new ElementBuilder('code').build();
      expect(model.element.tagName).toBe('CODE');
    });

    test('pre should create HTMLPreElement', () => {
      const model = new ElementBuilder('pre').build();
      expect(model.element).toBeInstanceOf(HTMLPreElement);
      expect(model.element.tagName).toBe('PRE');
    });
  });

  describe('Heading Elements', () => {
    test('h1 should create HTMLHeadingElement', () => {
      const model = new ElementBuilder('h1').build();
      expect(model.element).toBeInstanceOf(HTMLHeadingElement);
      expect(model.element.tagName).toBe('H1');
    });

    test('h2 should create HTMLHeadingElement', () => {
      const model = new ElementBuilder('h2').build();
      expect(model.element).toBeInstanceOf(HTMLHeadingElement);
      expect(model.element.tagName).toBe('H2');
    });

    test('h3 should create HTMLHeadingElement', () => {
      const model = new ElementBuilder('h3').build();
      expect(model.element).toBeInstanceOf(HTMLHeadingElement);
      expect(model.element.tagName).toBe('H3');
    });

    test('h4 should create HTMLHeadingElement', () => {
      const model = new ElementBuilder('h4').build();
      expect(model.element).toBeInstanceOf(HTMLHeadingElement);
      expect(model.element.tagName).toBe('H4');
    });

    test('h5 should create HTMLHeadingElement', () => {
      const model = new ElementBuilder('h5').build();
      expect(model.element).toBeInstanceOf(HTMLHeadingElement);
      expect(model.element.tagName).toBe('H5');
    });

    test('h6 should create HTMLHeadingElement', () => {
      const model = new ElementBuilder('h6').build();
      expect(model.element).toBeInstanceOf(HTMLHeadingElement);
      expect(model.element.tagName).toBe('H6');
    });
  });

  describe('List Elements', () => {
    test('ul should create HTMLUListElement', () => {
      const model = new ElementBuilder('ul').build();
      expect(model.element).toBeInstanceOf(HTMLUListElement);
      expect(model.element.tagName).toBe('UL');
    });

    test('ol should create HTMLOListElement', () => {
      const model = new ElementBuilder('ol').build();
      expect(model.element).toBeInstanceOf(HTMLOListElement);
      expect(model.element.tagName).toBe('OL');
    });

    test('li should create HTMLLIElement', () => {
      const model = new ElementBuilder('li').build();
      expect(model.element).toBeInstanceOf(HTMLLIElement);
      expect(model.element.tagName).toBe('LI');
    });

    test('dl should create HTMLDListElement', () => {
      const model = new ElementBuilder('dl').build();
      expect(model.element).toBeInstanceOf(HTMLDListElement);
      expect(model.element.tagName).toBe('DL');
    });

    test('dt should create HTMLElement with dt tag', () => {
      const model = new ElementBuilder('dt').build();
      expect(model.element.tagName).toBe('DT');
    });

    test('dd should create HTMLElement with dd tag', () => {
      const model = new ElementBuilder('dd').build();
      expect(model.element.tagName).toBe('DD');
    });
  });

  describe('Form Elements', () => {
    test('form should create HTMLFormElement', () => {
      const model = new ElementBuilder('form').build();
      expect(model.element).toBeInstanceOf(HTMLFormElement);
      expect(model.element.tagName).toBe('FORM');
    });

    test('input should create HTMLInputElement', () => {
      const model = new ElementBuilder('input').build();
      expect(model.element).toBeInstanceOf(HTMLInputElement);
      expect(model.element.tagName).toBe('INPUT');
    });

    test('textarea should create HTMLTextAreaElement', () => {
      const model = new ElementBuilder('textarea').build();
      expect(model.element).toBeInstanceOf(HTMLTextAreaElement);
      expect(model.element.tagName).toBe('TEXTAREA');
    });

    test('button should create HTMLButtonElement', () => {
      const model = new ElementBuilder('button').build();
      expect(model.element).toBeInstanceOf(HTMLButtonElement);
      expect(model.element.tagName).toBe('BUTTON');
    });

    test('select should create HTMLSelectElement', () => {
      const model = new ElementBuilder('select').build();
      expect(model.element).toBeInstanceOf(HTMLSelectElement);
      expect(model.element.tagName).toBe('SELECT');
    });

    test('option should create HTMLOptionElement', () => {
      const model = new ElementBuilder('option').build();
      expect(model.element).toBeInstanceOf(HTMLOptionElement);
      expect(model.element.tagName).toBe('OPTION');
    });

    test('label should create HTMLLabelElement', () => {
      const model = new ElementBuilder('label').build();
      expect(model.element).toBeInstanceOf(HTMLLabelElement);
      expect(model.element.tagName).toBe('LABEL');
    });

    test('fieldset should create HTMLFieldSetElement', () => {
      const model = new ElementBuilder('fieldset').build();
      expect(model.element).toBeInstanceOf(HTMLFieldSetElement);
      expect(model.element.tagName).toBe('FIELDSET');
    });

    test('legend should create HTMLLegendElement', () => {
      const model = new ElementBuilder('legend').build();
      expect(model.element).toBeInstanceOf(HTMLLegendElement);
      expect(model.element.tagName).toBe('LEGEND');
    });
  });

  describe('Media Elements', () => {
    test('img should create HTMLImageElement', () => {
      const model = new ElementBuilder('img').build();
      expect(model.element).toBeInstanceOf(HTMLImageElement);
      expect(model.element.tagName).toBe('IMG');
    });

    test('picture should create HTMLPictureElement', () => {
      const model = new ElementBuilder('picture').build();
      expect(model.element).toBeInstanceOf(HTMLPictureElement);
      expect(model.element.tagName).toBe('PICTURE');
    });

    test('source should create HTMLSourceElement', () => {
      const model = new ElementBuilder('source').build();
      expect(model.element).toBeInstanceOf(HTMLSourceElement);
      expect(model.element.tagName).toBe('SOURCE');
    });

    test('video should create HTMLVideoElement', () => {
      const model = new ElementBuilder('video').build();
      expect(model.element).toBeInstanceOf(HTMLVideoElement);
      expect(model.element.tagName).toBe('VIDEO');
    });

    test('audio should create HTMLAudioElement', () => {
      const model = new ElementBuilder('audio').build();
      expect(model.element).toBeInstanceOf(HTMLAudioElement);
      expect(model.element.tagName).toBe('AUDIO');
    });

    test('canvas should create HTMLCanvasElement', () => {
      const model = new ElementBuilder('canvas').build();
      expect(model.element).toBeInstanceOf(HTMLCanvasElement);
      expect(model.element.tagName).toBe('CANVAS');
    });

    test('svg should create element with svg tag', () => {
      const model = new ElementBuilder('svg' as any).build();
      // Note: document.createElement('svg') creates HTMLUnknownElement in JSDOM
      // In real browsers, it works correctly. SVG elements need createElementNS for proper namespace.
      expect(model.element.tagName.toLowerCase()).toBe('svg');
    });
  });

  describe('Table Elements', () => {
    test('table should create HTMLTableElement', () => {
      const model = new ElementBuilder('table').build();
      expect(model.element).toBeInstanceOf(HTMLTableElement);
      expect(model.element.tagName).toBe('TABLE');
    });

    test('thead should create HTMLTableSectionElement', () => {
      const model = new ElementBuilder('thead').build();
      expect(model.element).toBeInstanceOf(HTMLTableSectionElement);
      expect(model.element.tagName).toBe('THEAD');
    });

    test('tbody should create HTMLTableSectionElement', () => {
      const model = new ElementBuilder('tbody').build();
      expect(model.element).toBeInstanceOf(HTMLTableSectionElement);
      expect(model.element.tagName).toBe('TBODY');
    });

    test('tfoot should create HTMLTableSectionElement', () => {
      const model = new ElementBuilder('tfoot').build();
      expect(model.element).toBeInstanceOf(HTMLTableSectionElement);
      expect(model.element.tagName).toBe('TFOOT');
    });

    test('tr should create HTMLTableRowElement', () => {
      const model = new ElementBuilder('tr').build();
      expect(model.element).toBeInstanceOf(HTMLTableRowElement);
      expect(model.element.tagName).toBe('TR');
    });

    test('th should create HTMLTableCellElement', () => {
      const model = new ElementBuilder('th').build();
      expect(model.element).toBeInstanceOf(HTMLTableCellElement);
      expect(model.element.tagName).toBe('TH');
    });

    test('td should create HTMLTableCellElement', () => {
      const model = new ElementBuilder('td').build();
      expect(model.element).toBeInstanceOf(HTMLTableCellElement);
      expect(model.element.tagName).toBe('TD');
    });

    test('caption should create HTMLTableCaptionElement', () => {
      const model = new ElementBuilder('caption').build();
      expect(model.element).toBeInstanceOf(HTMLTableCaptionElement);
      expect(model.element.tagName).toBe('CAPTION');
    });

    test('colgroup should create HTMLTableColElement', () => {
      const model = new ElementBuilder('colgroup').build();
      expect(model.element).toBeInstanceOf(HTMLTableColElement);
      expect(model.element.tagName).toBe('COLGROUP');
    });

    test('col should create HTMLTableColElement', () => {
      const model = new ElementBuilder('col').build();
      expect(model.element).toBeInstanceOf(HTMLTableColElement);
      expect(model.element.tagName).toBe('COL');
    });
  });

  describe('Interactive Elements', () => {
    test('details should create HTMLDetailsElement', () => {
      const model = new ElementBuilder('details').build();
      expect(model.element).toBeInstanceOf(HTMLDetailsElement);
      expect(model.element.tagName).toBe('DETAILS');
    });

    test('summary should create HTMLElement with summary tag', () => {
      const model = new ElementBuilder('summary').build();
      expect(model.element.tagName).toBe('SUMMARY');
    });

    test('dialog should create HTMLDialogElement', () => {
      const model = new ElementBuilder('dialog').build();
      expect(model.element).toBeInstanceOf(HTMLDialogElement);
      expect(model.element.tagName).toBe('DIALOG');
    });
  });

  describe('Utility Elements', () => {
    test('br should create HTMLBRElement', () => {
      const model = new ElementBuilder('br').build();
      expect(model.element).toBeInstanceOf(HTMLBRElement);
      expect(model.element.tagName).toBe('BR');
    });

    test('hr should create HTMLHRElement', () => {
      const model = new ElementBuilder('hr').build();
      expect(model.element).toBeInstanceOf(HTMLHRElement);
      expect(model.element.tagName).toBe('HR');
    });

    test('template should create HTMLTemplateElement', () => {
      const model = new ElementBuilder('template').build();
      expect(model.element).toBeInstanceOf(HTMLTemplateElement);
      expect(model.element.tagName).toBe('TEMPLATE');
    });

    test('slot should create HTMLSlotElement', () => {
      const model = new ElementBuilder('slot').build();
      expect(model.element).toBeInstanceOf(HTMLSlotElement);
      expect(model.element.tagName).toBe('SLOT');
    });
  });

});
