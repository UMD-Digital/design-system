import {
  Tokens,
  Animations,
  Typography,
  Elements,
  Layout,
} from '@universityofmaryland/variables';
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
const { ConvertJSSObjectToStyles } = Styles;

const ELEMENT_ALERT_TEXT_WRAPPER = 'alert-text-wrapper';
const ELEMENT_ALERT_TEXT_HEADLINE = 'alert-text-headline';
const ELEMENT_ALERT_TEXT_BODY = 'alert-text-body';
const ELEMENT_ALERT_TEXT_CTA = 'alert-text-cta';

// prettier-ignore
const headlineStyles = `
  .${ELEMENT_ALERT_TEXT_HEADLINE} {
    margin-bottom: ${Spacing.sm};
    color: ${Colors.black};
    padding-right: ${Spacing.md};
  }

  .${ELEMENT_ALERT_TEXT_HEADLINE} * {
    color: currentColor;
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ALERT_TEXT_HEADLINE}`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ALERT_TEXT_HEADLINE} *`]: SansLarge,
    },
  })}

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ALERT_TEXT_HEADLINE} a`]: Link.LineSlideUnder.black,
    },
  })}
`;

// prettier-ignore
const bodyStyles = `
  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ALERT_TEXT_BODY}`]: Text.RichText,
    },
  })}

  .${ELEMENT_ALERT_TEXT_BODY} * {
    font-weight: 500;
    color: ${Colors.gray.dark}
  }
`;

// prettier-ignore
const ctaStyles = `
  * + .${ELEMENT_ALERT_TEXT_CTA} {
    margin-top: ${Spacing.sm};
  }

  ${ConvertJSSObjectToStyles({
    styleObj: {
      [`.${ELEMENT_ALERT_TEXT_CTA}`]: GridColumnAndRowsMobileTablet,
    },
  })}
`;

const STYLES_ALERT_TEXT = `
  .${ELEMENT_ALERT_TEXT_WRAPPER} {
     max-width: ${MaxWidth.small};
  }

  ${headlineStyles}
  ${bodyStyles}
  ${ctaStyles}
`;

export const CreateAlertText = (props: TypeAlertTextProps) => {
  const { headline, text, actions } = props;
  const wrapper = document.createElement('div');

  if (headline) {
    MarkupModify.AnimationLinkSpan({ element: headline });
    headline.classList.add(ELEMENT_ALERT_TEXT_HEADLINE);
    wrapper.appendChild(headline);
  }

  if (text) {
    text.classList.add(ELEMENT_ALERT_TEXT_BODY);
    wrapper.appendChild(text);
  }

  if (actions) {
    actions.classList.add(ELEMENT_ALERT_TEXT_CTA);
    wrapper.appendChild(actions);
  }

  wrapper.classList.add(ELEMENT_ALERT_TEXT_WRAPPER);

  return wrapper;
};

export default {
  CreateElement: CreateAlertText,
  Styles: STYLES_ALERT_TEXT,
  Elements: {
    wrapper: ELEMENT_ALERT_TEXT_WRAPPER,
    textBody: ELEMENT_ALERT_TEXT_BODY,
  },
};
