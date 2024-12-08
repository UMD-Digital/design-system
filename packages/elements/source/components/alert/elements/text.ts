import {
  Tokens,
  Animations,
  Typography,
  Elements,
  Layout,
} from '@universityofmaryland/variables';
import { Headline } from 'atomic';
import { MarkupModify, Styles } from 'utilities';

export type TypeAlertTextProps = {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
};

const { Colors, Spacing, MaxWidth } = Tokens;
const { Link } = Animations;
const { SansLarge } = Typography;
const { Text } = Elements;
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
const textStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${className.text}`]: Text.RichText,
    },
  })}

  .${className.text} * {
    font-weight: 500;
    color: ${Colors.gray.dark}
  }
`;

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

  ${textStyles}
  ${ctaStyles}
`;

// prettier-ignore
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
  `
}

export const CreateAlertText = (props: TypeAlertTextProps) => {
  const { headline, text, actions } = props;
  const wrapper = document.createElement('div');
  let styles = STYLES_ALERT_TEXT;

  if (headline) {
    const headlineObj = Headline({
      element: headline,
      fontStyle: Fonts.getSansFont(Fonts.SansFontSize.Large),
      additonalStyles: headlineStyles,
    });

    wrapper.appendChild(headlineObj.element);
    styles += headlineObj.styles;
  }

  if (text) {
    text.classList.add(className.text);
    wrapper.appendChild(text);
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
