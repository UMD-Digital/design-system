import * as accessibility from '../accessibility';
import * as animations from '../animation';
import * as elementStyles from '../element';
import * as layout from '../layout';
import * as typography from '../typography';
import { default as webComponents } from '../web-components';

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
  ...typography.fontFace.browserString,
  ...processNestedObjects(accessibility),
  ...processNestedObjects(animations),
  ...processNestedObjects(elementStyles),
  ...processNestedObjects(layout),
  ...processNestedObjects(typography),
  ...webComponents,
};
