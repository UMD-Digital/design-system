import { Animations } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import { ModifierProps } from '../_model/text';

const TextColors = {
  white: { color: 'white' },
  black: { color: 'black' },
} as const;

const LinkAnimations = {
  white: Animations.Link.LineSlideUnder.white,
  black: Animations.Link.LineSlideUnder.black,
} as const;

const getColorConfig = (isColorWhite?: boolean) =>
  isColorWhite ? 'black' : 'white';

const generateStyles = (className: string, styles: any) =>
  Styles.ConvertJSSObjectToStyles({
    styleObj: { [`.${className}`]: styles },
  });

const createStyleModifier =
  (styleGenerator: (props: ModifierProps) => Record<string, any>) =>
  (props: ModifierProps) => {
    const { className } = props;
    return generateStyles(className, styleGenerator(props));
  };

const modifiers = {
  animationLink: createStyleModifier(({ isColorWhite }) => ({
    a: LinkAnimations[getColorConfig(isColorWhite)],
  })),
  textColor: createStyleModifier(
    ({ isColorWhite }) => TextColors[getColorConfig(isColorWhite)],
  ),
  fontStyles: createStyleModifier(({ fontStyles }) => fontStyles || {}),
};

export { modifiers };
