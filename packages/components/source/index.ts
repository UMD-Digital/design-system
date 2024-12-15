import * as UmdComponents from './api';
import * as UmdElements from '@universityofmaryland/web-elements-library';
import * as UmdUtilities from './utilities';
import animations from './animations';

const LoadUmdComponents = () => {
  for (const key in UmdComponents) {
    // @ts-ignore
    UmdComponents[key].Load();
  }
  animations();
};

export const Components = {
  ...UmdComponents,
};

export const Elements = {
  ...UmdElements,
};

export const Utilties = {
  ...UmdUtilities,
  ...UmdElements.Utilities,
};

export default LoadUmdComponents;
