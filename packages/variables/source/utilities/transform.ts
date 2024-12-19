interface JssEntry {
  class: string;
  [key: string]: any;
}

interface JssInputFormat {
  [key: string]: JssEntry;
}

interface JssNamedOutputFormat {
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
    const typographyKey = `.${value.class}`;
    const { class: _, ...rest } = value;

    newFormat[typographyKey] = {
      ...rest,
    };
  }

  return newFormat;
};
