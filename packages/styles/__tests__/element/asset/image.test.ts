import { composeWrapper } from '../../../source/element/asset/image';
import { convertToClassSelectorCss } from '../../../source/utilities/transform/jss';

describe('element/asset/image', () => {
  describe('image link focus indicator', () => {
    const variants = [
      { name: 'wrapper', options: { scaled: false } },
      { name: 'wrapperScaled', options: { scaled: true } },
    ];

    variants.forEach(({ name, options }) => {
      describe(name, () => {
        const css = convertToClassSelectorCss(composeWrapper(options));

        it('targets nested links, not only direct children', () => {
          // The elements layer wraps the <a> in an inner container div, so a
          // direct-child selector (`> a`) never matches the rendered link.
          expect(css).not.toMatch(/> a\)?(:focus-visible)?\s*\{/);
        });

        it('positions the link so the focus overlay stays inside it', () => {
          expect(css).toMatch(/a\)?\s*\{[^}]*position: relative/);
        });

        it('draws the focus ring on an overlay above the image', () => {
          const overlayMatch = css.match(/:focus-visible::after\s*\{([^}]*)\}/);

          if (overlayMatch === null) {
            throw new Error('Focus overlay rule was not generated');
          }

          const overlay = overlayMatch[1];

          expect(overlay).toContain('content: ""');
          expect(overlay).toContain('position: absolute');
          expect(overlay).toContain('inset: 0');
          expect(overlay).toContain('z-index: 1');
          expect(overlay).toContain('pointer-events: none');
          expect(overlay).toContain('outline-offset: -2px');
          expect(overlay).toContain('box-shadow: inset 0 0 0 4px');
        });
      });
    });
  });
});
