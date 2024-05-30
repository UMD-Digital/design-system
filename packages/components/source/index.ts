import * as UmdComponents from './shadow-dom';
import * as UmdElements from './elements';

const LoadUmdComponents = () => {
  for (const key in UmdComponents) {
    // @ts-ignore
    Components[key]();
  }
};

export const Components = {
  ...UmdComponents,
};

export const Elements = {
  ...UmdElements,
};

export default LoadUmdComponents;
