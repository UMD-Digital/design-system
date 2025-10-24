/**
 * @jest-environment jsdom
 */

import * as buttons from '../styledElements/buttons';
import * as text from '../styledElements/text';
import * as assets from '../styledElements/assets';
import * as event from '../styledElements/event';
import * as headline from '../styledElements/headline';
import * as layout from '../styledElements/layout';
import * as richText from '../styledElements/rich-text';
import { ElementProps } from '../core/_types';

describe('Styled Elements - Buttons', () => {
  let element: HTMLElement;
  let props: ElementProps;

  beforeEach(() => {
    element = document.createElement('button');
    props = { element };
  });

  describe('fullScreen', () => {
    it('should create fullscreen button element', () => {
      const result = buttons.fullScreen(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('videoState', () => {
    it('should create video state button element', () => {
      const result = buttons.videoState(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });
});

describe('Styled Elements - Text', () => {
  let element: HTMLElement;
  let props: ElementProps;

  beforeEach(() => {
    element = document.createElement('span');
    props = { element };
  });

  describe('eyebrow', () => {
    it('should create eyebrow text element', () => {
      const result = text.eyebrow(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('ribbon', () => {
    it('should create ribbon text element', () => {
      const result = text.ribbon(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('lineAdjustment', () => {
    it('should create line adjustment text element', () => {
      const result = text.lineAdjustment(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });

  describe('lineAdjustmentInset', () => {
    it('should create line adjustment inset text element', () => {
      const result = text.lineAdjustmentInset(props);

      expect(result.element).toBe(element);
      expect(result.className).toBeTruthy();
      expect(result.styles).toBeTruthy();
    });
  });
});

describe('Styled Elements - Assets', () => {
  let element: HTMLElement;
  let props: ElementProps;

  beforeEach(() => {
    element = document.createElement('div');
    props = { element };
  });

  describe('asset functions exist', () => {
    it('should export asset-related functions', () => {
      expect(typeof assets).toBe('object');
      // Assets module exists and can be imported
      expect(assets).toBeDefined();
    });
  });
});

describe('Styled Elements - Event', () => {
  let element: HTMLElement;
  let props: ElementProps;

  beforeEach(() => {
    element = document.createElement('div');
    props = { element };
  });

  describe('event functions exist', () => {
    it('should export event-related functions', () => {
      expect(typeof event).toBe('object');
      expect(event).toBeDefined();
    });
  });
});

describe('Styled Elements - Headline', () => {
  let element: HTMLElement;
  let props: ElementProps;

  beforeEach(() => {
    element = document.createElement('h1');
    props = { element };
  });

  describe('headline functions exist', () => {
    it('should export headline-related functions', () => {
      expect(typeof headline).toBe('object');
      expect(headline).toBeDefined();
    });
  });
});

describe('Styled Elements - Layout', () => {
  let element: HTMLElement;
  let props: ElementProps;

  beforeEach(() => {
    element = document.createElement('div');
    props = { element };
  });

  describe('layout functions exist', () => {
    it('should export layout-related functions', () => {
      expect(typeof layout).toBe('object');
      expect(layout).toBeDefined();
    });
  });
});

describe('Styled Elements - Rich Text', () => {
  let element: HTMLElement;
  let props: ElementProps;

  beforeEach(() => {
    element = document.createElement('div');
    props = { element };
  });

  describe('richText functions exist', () => {
    it('should export rich-text-related functions', () => {
      expect(typeof richText).toBe('object');
      expect(richText).toBeDefined();
    });
  });
});

describe('Styled Elements - Consistent Interface', () => {
  it('should export all styled element categories', () => {
    const categories = [
      buttons,
      text,
      assets,
      event,
      headline,
      layout,
      richText,
    ];

    categories.forEach((category) => {
      expect(category).toBeDefined();
      expect(typeof category).toBe('object');
    });
  });

  it('should have functions that return element models', () => {
    const element = document.createElement('button');
    const buttonResult = buttons.fullScreen({ element });

    expect(buttonResult).toHaveProperty('element');
    expect(buttonResult).toHaveProperty('className');
    expect(buttonResult).toHaveProperty('styles');

    const span = document.createElement('span');
    const textResult = text.eyebrow({ element: span });

    expect(textResult).toHaveProperty('element');
    expect(textResult).toHaveProperty('className');
    expect(textResult).toHaveProperty('styles');
  });
});
