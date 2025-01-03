import { element } from '@universityofmaryland/web-styles-library';
import * as Utility from 'utilities';
import { createElement } from './_base';
import { modifiers } from '../_modifiers/style';
import { type BuilderConfig, type ElementProps } from '../_types';

const RichTextConfig: BuilderConfig = {
  styleModifiers: (props) =>
    Utility.styles.combineStyles(
      modifiers.fontStyles({
        ...props,
        fontStyles: element.text.rich.simpleLarge,
      }),
    ),
};

export const simple = (props: ElementProps) =>
  createElement(
    { ...props, className: 'umd-rich-text-simple' },
    RichTextConfig,
  );
