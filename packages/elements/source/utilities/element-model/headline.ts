import { MarkupModify, Styles } from 'utilities';
import TextElementModel from './_model/text';
import {
  modifiers,
  type ModifierProps,
  type ElementStyles,
} from './_modifiers/style';

interface FontOptions {
  className: string;
  fontStyles: Record<string, any>;
}

interface HeadlineProps {
  element: HTMLElement;
  elementStyles: ElementStyles;
  isThemeDark?: boolean;
}

type HeadlineFactoryProps = HeadlineProps & FontOptions;

const applyMarkupAnimaitonSpan = (element: HTMLElement) => {
  MarkupModify.AnimationLinkSpan({ element });
};

const HeadlineConfig = {
  styleModifiers: (props: ModifierProps) =>
    Styles.combineStyles(
      modifiers.animationLink(props),
      modifiers.fontStyles(props),
      modifiers.textColor(props),
      modifiers.element(props),
      modifiers.elementChild(props),
      modifiers.elementSiblingAfter(props),
    ),
  elementModifiers: [applyMarkupAnimaitonSpan],
};

const createHeadlineFactory = (props: HeadlineFactoryProps) => {
  const { element, className, elementStyles, fontStyles, isThemeDark } = props;

  return new TextElementModel(className, element).createElement({
    config: HeadlineConfig,
    options: {
      fontStyles,
      ...elementStyles,
      isColorWhite: !isThemeDark,
    },
  });
};

export const SansLargeHeadline = (props: HeadlineProps) => {
  const { className, fontStyles } = Styles.fonts.getSansLargeFont();
  return createHeadlineFactory({ ...props, className, fontStyles });
};

export const SansMediumHeadline = (props: HeadlineProps) => {
  const { className, fontStyles } = Styles.fonts.getSansMediumFont();
  return createHeadlineFactory({ ...props, className, fontStyles });
};

export const CampaignLargeHeadline = (props: HeadlineProps) => {
  const { className, fontStyles } = Styles.fonts.getCampaignLargeFont();
  return createHeadlineFactory({ ...props, className, fontStyles });
};

export default HeadlineConfig;
