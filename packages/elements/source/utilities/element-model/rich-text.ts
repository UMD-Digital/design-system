import { Elements } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import TextElementModel from './_model/text';
import { modifiers, ModifierProps } from './_modifiers/style';

const { Text } = Elements;

interface FontOptions {
  className: string;
  fontStyles?: Record<string, any>;
}

interface RichTextProps {
  element: HTMLElement;
  elementStyles: Record<string, string>;
  isThemeDark?: boolean;
}

type RichTextFactoryProps = RichTextProps & FontOptions;

const simpleConfig = {
  type: 'Rich Text Simple',
  styleModifiers: (props: ModifierProps) =>
    Styles.combineStyles(
      modifiers.fontStyles({ ...props, fontStyles: Text.SimpleLarge }),
    ),
};

const createRichTextFactory = (props: RichTextFactoryProps) => {
  const { element, className, elementStyles, isThemeDark } = props;

  return new TextElementModel(className, element).createElement({
    config: simpleConfig,
    options: {
      elementStyles,
    },
  });
};

export const simple = (props: RichTextProps) => {
  const className = 'umd-rich-text-simple';
  return createRichTextFactory({ ...props, className });
};

export default {
  simple,
};
