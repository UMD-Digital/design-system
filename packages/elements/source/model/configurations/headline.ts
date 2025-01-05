import * as Utility from 'utilities';
import { modifiers } from '../_modifiers/style';
import { createElementBuild } from './_base';
import { type BuilderConfig, type ElementProps } from '../_types';

const headlineConfig: BuilderConfig = {
  styleModifiers: (props) =>
    Utility.styles.combineStyles(
      modifiers.animationLink(props),
      modifiers.baseStyles(props),
      modifiers.textColor(props),
      modifiers.element(props),
      modifiers.elementChild(props),
      modifiers.elementSiblingAfter(props),
    ),
  elementModifiers: [
    (element) => Utility.markup.modify.animationLinkSpan({ element }),
  ],
};

export const createHeadline = (
  props: ElementProps,
  getFontFn: () => { className: string; fontStyles: Record<string, any> },
) => {
  const { className, fontStyles } = getFontFn();
  return createElementBuild(
    { ...props, className, baseStyles: fontStyles },
    headlineConfig,
  );
};

export const sansLarge = (props: ElementProps) =>
  createHeadline(props, Utility.styles.fonts.getSansLargeFont);

export const sansMedium = (props: ElementProps) =>
  createHeadline(props, Utility.styles.fonts.getSansMediumFont);

export const campaignLarge = (props: ElementProps) =>
  createHeadline(props, Utility.styles.fonts.getCampaignLargeFont);
