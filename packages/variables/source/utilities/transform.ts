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
