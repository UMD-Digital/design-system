import * as Accessibility from '../accessibility';
import * as Animations from '../animations';
import * as ElementStyles from '../elements-styles';
import * as Layout from '../layout';
import * as Typography from '../typography';
import { default as WebComponents } from '../web-components';

export interface JssEntry {
  className: string | string[];
  [key: string]: any;
}

export interface JssInputFormat {
  [key: string]: JssEntry;
}

export interface JssNamedOutputFormat {
  [className: string]: {
    [key: string]: any;
  };
}

interface JssNameConverter {
  (originalObject: JssInputFormat): JssNamedOutputFormat;
}

export const objectWithName: JssNameConverter = (originalObject) => {
  const newFormat: JssNamedOutputFormat = {};

  for (const [key, value] of Object.entries(originalObject)) {
    const { className, ...rest } = value;

    if (Array.isArray(className)) {
      className.forEach((name) => {
        const typographyKey = `.${name}`;
        newFormat[typographyKey] = { ...rest };
      });
    } else {
      const typographyKey = `.${className}`;
      newFormat[typographyKey] = { ...rest };
    }
  }

  return newFormat;
};

export const processNestedObjects = <T extends object>(
  obj: T,
): JssNamedOutputFormat => {
  const result: JssNamedOutputFormat = {};

  const process = (value: any) => {
    if (!value || typeof value !== 'object') return;

    if ('className' in value) {
      const transformed = objectWithName({ key: value });
      Object.assign(result, transformed);
    } else {
      Object.values(value).forEach(process);
    }
  };

  process(obj);
  return result;
};

export const outputStyles: string = {
  ...Typography.fontFace.browserString,
  ...processNestedObjects(Accessibility),
  ...processNestedObjects(Animations),
  ...processNestedObjects(ElementStyles),
  ...processNestedObjects(Layout),
  ...processNestedObjects(Typography),
  ...WebComponents,
};
