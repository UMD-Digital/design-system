export interface JssEntry {
  className: string;
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
    const typographyKey = `.${className}`;

    newFormat[typographyKey] = {
      ...rest,
    };
  }

  return newFormat;
};
