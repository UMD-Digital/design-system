import { Elements } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import TextElementModel, { ModifierProps } from 'atomic/_model/text';
import { modifiers } from './_style-modifiers';

const { Text } = Elements;

interface FontOptions {
  className: string;
  fontStyles?: Record<string, any>;
}

interface RichTextProps {
  element: HTMLElement;
  additionalStyles: Record<string, string>;
  isThemeDark?: boolean;
}

type RichTextFactoryProps = RichTextProps & FontOptions;

const simpleConfig = {
  type: 'Rich Text Simple',
  styleModifiers: (props: ModifierProps) =>
    Styles.CombineStyles(
      modifiers.fontStyles({ ...props, fontStyles: Text.SimpleLarge }),
    ),
};

const createRichTextFactory = (props: RichTextFactoryProps) => {
  const { element, className, additionalStyles, isThemeDark } = props;

  return new TextElementModel(className, element).createElement({
    config: simpleConfig,
    options: {
      additionalStyles,
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
