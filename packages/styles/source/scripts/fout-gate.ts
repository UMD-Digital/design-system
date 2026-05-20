/**
 * Coordinated FOUC / CLS gate for UMD custom elements.
 *
 * Pairs with the `html.umd-fout-gate` / `html.umd-fout-ready` rules in
 * `source/root.ts`. The CSS holds the page invisible; this script waits for
 * all `umd-*` custom elements currently in the DOM to upgrade, then releases
 * the page in a single fade-in frame.
 *
 * Why <html> and not <body>: Chrome's LCP algorithm disqualifies elements
 * inside an opacity:0 subtree, *except* when the documentElement is the
 * opacity-0 ancestor (carve-out for A/B testing libraries). Gating on body
 * would inflate LCP by the gate duration; gating on html does not.
 *
 * Side effect: importing this module auto-runs `initFoutGate()` with default
 * options. For explicit control, import `{ initFoutGate }` and call it
 * yourself.
 *
 * Usage:
 *   // Easiest — auto-run with defaults
 *   import '@universityofmaryland/web-styles-library/scripts/fout-gate';
 *
 *   // Or explicit control
 *   import { initFoutGate } from '@universityofmaryland/web-styles-library/scripts/fout-gate';
 *   await initFoutGate({ fallbackMs: 100 });
 */

const DEFAULTS = {
  gateClass: 'umd-fout-gate',
  readyClass: 'umd-fout-ready',
  tagPrefix: 'umd-',
  fallbackMs: 200,
};

export type FoutGateOptions = Partial<typeof DEFAULTS>;

const onDomReady = (cb: () => void) => {
  if (document.readyState !== 'loading') {
    cb();
    return;
  }
  document.addEventListener('DOMContentLoaded', cb, { once: true });
};

const collectUndefinedTags = (prefix: string): string[] => {
  const tags = new Set<string>();
  document.querySelectorAll(':not(:defined)').forEach((el) => {
    const name = el.localName;
    if (name.startsWith(prefix)) tags.add(name);
  });
  return Array.from(tags);
};

export const initFoutGate = (opts: FoutGateOptions = {}): Promise<void> => {
  const { gateClass, readyClass, tagPrefix, fallbackMs } = {
    ...DEFAULTS,
    ...opts,
  };

  if (typeof document === 'undefined' || typeof customElements === 'undefined') {
    return Promise.resolve();
  }

  const docEl = document.documentElement;
  docEl.classList.add(gateClass);

  return new Promise<void>((resolve) => {
    onDomReady(async () => {
      const tags = collectUndefinedTags(tagPrefix);

      const allDefined = tags.length
        ? Promise.allSettled(tags.map((t) => customElements.whenDefined(t)))
        : Promise.resolve();

      const fallback = new Promise<void>((r) => setTimeout(r, fallbackMs));

      await Promise.race([allDefined, fallback]);

      // rAF lets upgraded elements paint at their real size before the
      // fade-in starts, avoiding a final micro-shift frame.
      requestAnimationFrame(() => {
        docEl.classList.remove(gateClass);
        docEl.classList.add(readyClass);
        resolve();
      });
    });
  });
};

initFoutGate();
