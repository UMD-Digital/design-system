import { Animations } from '@universityofmaryland/variables';
import { MarkupModify, Styles } from 'utilities';
import { TextModelProps, ElementConfigStyleProps } from '../_model/text';

const HeadlineConfig = {
  type: 'headline',
  styleModifiers: [
    ({ styles, className, fontStyles }: ElementConfigStyleProps) => {
      return (
        styles +
        Styles.ConvertJSSObjectToStyles({
          styleObj: {
            [`.${className} *`]: fontStyles,
          },
        })
      );
    },
    ({ styles, className }: ElementConfigStyleProps) => {
      return (
        styles +
        Styles.ConvertJSSObjectToStyles({
          styleObj: {
            [`.${className} a`]: Animations.Link.LineSlideUnder.black,
          },
        })
      );
    },
  ],
  elementModifiers: [
    ({ element }: TextModelProps) => {
      MarkupModify.AnimationLinkSpan({ element });
    },
  ],
};

export default HeadlineConfig;
