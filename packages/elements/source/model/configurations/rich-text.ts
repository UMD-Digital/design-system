import { ElementStyles } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import { createElement } from './_base';
import { modifiers } from '../_modifiers/style';
import { type BuilderConfig, type ElementProps } from '../_types';

const RichTextConfig: BuilderConfig = {
  styleModifiers: (props) =>
    Styles.combineStyles(
      modifiers.fontStyles({
        ...props,
        fontStyles: ElementStyles.text.rich.simpleLarge,
      }),
    ),
};

export const simple = (props: ElementProps) =>
  createElement(
    { ...props, className: 'umd-rich-text-simple' },
    RichTextConfig,
  );
