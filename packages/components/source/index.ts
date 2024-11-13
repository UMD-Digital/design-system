import * as UmdComponents from './shadow-dom-api';
import * as UmdElements from './elements';
import * as UmdUtilities from './utilities';

const LoadUmdComponents = () => {
  for (const key in UmdComponents) {
    // @ts-ignore
    UmdComponents[key].Load();
  }
  UmdUtilities.Animation.Load();
};

export const Components = {
  ...UmdComponents,
};

export const Elements = {
  ...UmdElements,
};

export const Utilties = {
  ...UmdUtilities,
};

export default LoadUmdComponents;
