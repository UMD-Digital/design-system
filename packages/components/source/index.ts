import * as Components from './shadow-dom';
import * as Elements from './elements';

const LoadUmdComponents = () => {
  for (const key in Components) {
    // @ts-ignore
    Components[key]();
  }
};

export const UmdComponents = {
  ...Components,
};

export const UmdElements = {
  ...Elements,
};

export default LoadUmdComponents;
