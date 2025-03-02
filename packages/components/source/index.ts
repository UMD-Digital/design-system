import * as umdComponents from './api';
import * as umdElements from '@universityofmaryland/web-elements-library';
import * as umdUtilities from './utilities';

interface ComponentMap {
  [key: string]: {
    [subKey: string]: () => void;
  };
}

const LoadUmdComponents = () => {
  const list = umdComponents as ComponentMap;

  for (const key in list) {
    if (Object.prototype.hasOwnProperty.call(list, key)) {
      const component = list[key];

      for (const subKey in component) {
        if (Object.prototype.hasOwnProperty.call(component, subKey)) {
          component[subKey]();
        }
      }
    }
  }

  umdUtilities.Animations.loadIntersectionObserver();
};

export const Components = {
  ...umdComponents,
};

export const Elements = {
  ...umdElements,
};

export const Utilties = {
  ...umdUtilities,
  ...umdElements.Utilities,
};

export default LoadUmdComponents;
