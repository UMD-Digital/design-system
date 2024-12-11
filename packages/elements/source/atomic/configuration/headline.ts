import { MarkupModify, Styles } from 'utilities';
import TextElementModel, { ModifierProps } from '../_model/text';
import { modifiers } from './_style-modifiers';

const { Fonts } = Styles;

interface FontOptions {
  className: string;
  fontStyles: Record<string, any>;
}

interface HeadlineProps {
  element: HTMLElement;
  additionalStyles: Record<string, string>;
  isThemeDark?: boolean;
}

type HeadlineFactoryProps = HeadlineProps & FontOptions;

const applyMarkupAnimaitonSpan = (element: HTMLElement) => {
  MarkupModify.AnimationLinkSpan({ element });
};

const HeadlineConfig = {
  styleModifiers: (props: ModifierProps) =>
    Styles.CombineStyles(
      modifiers.fontStyles(props),
      modifiers.textColor(props),
      modifiers.animationLink(props),
    ),
  elementModifiers: [applyMarkupAnimaitonSpan],
};

const createHeadlineFactory = (props: HeadlineFactoryProps) => {
  const { element, className, additionalStyles, fontStyles, isThemeDark } =
    props;

  return new TextElementModel(className, element).createElement({
    config: HeadlineConfig,
    options: {
      fontStyles,
      additionalStyles,
      isColorWhite: !isThemeDark,
    },
  });
};

export const SansLargeHeadline = (props: HeadlineProps) => {
  const { className, fontStyles } = Fonts.getSansLargeFont();
  return createHeadlineFactory({ ...props, className, fontStyles });
};

export const SansMediumHeadline = (props: HeadlineProps) => {
  const { className, fontStyles } = Fonts.getSansMediumFont();
  return createHeadlineFactory({ ...props, className, fontStyles });
};

export const CampaignLargeHeadline = (props: HeadlineProps) => {
  const { className, fontStyles } = Fonts.getCampaignLargeFont();
  return createHeadlineFactory({ ...props, className, fontStyles });
};

export default HeadlineConfig;
