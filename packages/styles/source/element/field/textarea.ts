import { baseInput } from './_base';
import { valid, invalid } from './_state';

export const textarea = {
  ...baseInput,

  "&[aria-invalid='true']": {
    ...invalid,
  },

  "&[aria-invalid='false']": {
    ...valid,
  },
};
