import { Tokens, Layout } from '@universityofmaryland/variables';
import { TextElementModel, HeadlineConfig, RichTextConfig } from 'atomic';
import { Styles } from 'utilities';

export type TypeAlertTextProps = {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
};

const { Colors, Spacing, MaxWidth } = Tokens;

const { GridColumnAndRowsMobileTablet } = Layout;
const { ConvertJSSObjectToStyles, Fonts } = Styles;

export const CONSTANTS = {
  className: {
    wrapper: 'wrapper',
    headline: 'headline',
    text: 'text',
    actions: 'actions',
  },
};

const { className } = CONSTANTS;

// prettier-ignore
const ctaStyles = `
  * + .${className.actions} {
    margin-top: ${Spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${className.actions}`]: GridColumnAndRowsMobileTablet,
    },
  })}
`;

const STYLES_ALERT_TEXT = `
  .${className.wrapper} {
     max-width: ${MaxWidth.small};
  }

  ${ctaStyles}
`;

const headlineStyles = {
  element: `
    color: ${Colors.black};
    padding-right: ${Spacing.md};
  `,
  siblingAfter: `
    margin-top: ${Spacing.sm};
  `,
  subElement: `
      color: currentColor;
  `,
};

const richTextStyles = {
  element: `
    font-weight: 500;
    color: ${Colors.gray.dark}
  `,
  siblingAfter: `
    margin-top: ${Spacing.sm};
  `,
};

export const CreateAlertText = (props: TypeAlertTextProps) => {
  const { headline, text, actions } = props;

  const wrapper = document.createElement('div');
  let styles = STYLES_ALERT_TEXT;

  if (headline) {
    const { className, fontStyles } = Fonts.SansFontOptions(
      Fonts.SansFontSize.Large,
    );
    const headlineModel = new TextElementModel(HeadlineConfig).createElement({
      element: headline,
      className,
      fontStyles,
      additionalStyles: headlineStyles,
    });

    wrapper.appendChild(headlineModel.element);
    styles += headlineModel.styles;
  }

  if (text) {
    const textSimpleModel = new TextElementModel(
      RichTextConfig.simple,
    ).createElement({
      element: text,
      className: 'umd-rich-text-simple',
      additionalStyles: richTextStyles,
    });

    wrapper.appendChild(textSimpleModel.element);
    styles += textSimpleModel.styles;
  }

  if (actions) {
    actions.classList.add(className.actions);
    wrapper.appendChild(actions);
  }

  wrapper.classList.add(className.wrapper);

  return {
    element: wrapper,
    styles,
  };
};

export default CreateAlertText;
