import * as Components from '../api';
import { loadComponentClass } from './loader';
import * as Utilities from '../utilities';

const LoadUmdComponents = () => {
  loadComponentClass(Components as any);
  Utilities.Animations.loadIntersectionObserver();
};

// CDN initialization for script tag usage
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  const currentScript = document.currentScript;
  const isScriptTag =
    currentScript &&
    currentScript.tagName === 'SCRIPT' &&
    !currentScript.type?.includes('module');

  if (isScriptTag) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', LoadUmdComponents);
    } else {
      LoadUmdComponents();
    }
  }

  // Make the library available globally for CDN usage
  (window as any).UmdWebComponents = {
    init: LoadUmdComponents,
    Components,
  };
}

export { LoadUmdComponents, Components };
