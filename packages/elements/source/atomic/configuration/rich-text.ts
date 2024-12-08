import { Elements } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import { ElementConfigStyleProps } from '../_model/text';

const { Text } = Elements;

// Simple Large
const simple = {
  type: 'Rich Text Simple',
  styleModifiers: [
    ({ styles, className }: ElementConfigStyleProps) => {
      return (
        styles +
        Styles.ConvertJSSObjectToStyles({
          styleObj: {
            [`.${className} *`]: Text.SimpleLarge,
          },
        })
      );
    },
  ],
};

export default {
  simple,
};
