import { Tokens, Layout } from '@universityofmaryland/variables';
import { Styles } from 'utilities';
import { ElementModel } from 'model';

export type TypeAlertTextProps = {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
};

const { Colors, Spacing, SpaceLayout } = Tokens;

const { GridColumnAndRowsMobileTablet } = Layout;
const { convertJSSObjectToStyles } = Styles;

export const CONSTANTS = {
  className: {
    wrapper: 'wrapper',
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

  ${convertJSSObjectToStyles({
    styleObj: {
      [`.${className.actions}`]: GridColumnAndRowsMobileTablet,
    },
  })}
`;

const STYLES_ALERT_TEXT = `
  .${className.wrapper} {
     max-width: ${SpaceLayout.maxWidth.small};
  }

  ${ctaStyles}
`;

const headlineStyles = {
  element: {
    color: Colors.black,
    paddingRigh: Spacing.md,
  },
  siblingAfter: {
    marginTop: Spacing.sm,
  },
  subElement: {
    color: 'currentColor',
  },
};

const richTextStyles = {
  element: {
    color: Colors.gray.dark,
    fontWeight: 500,
  },
  siblingAfter: {
    marginTop: Spacing.sm,
  },
};

export const CreateAlertText = (props: TypeAlertTextProps) => {
  const { headline, text, actions } = props;

  const wrapper = document.createElement('div');
  let styles = STYLES_ALERT_TEXT;

  if (headline) {
    const headlineModel = ElementModel.headline.sansLarge({
      ...props,
      elementStyles: headlineStyles,
      element: headline,
    });

    wrapper.appendChild(headlineModel.element);
    styles += headlineModel.styles;
  }

  if (text) {
    const textModel = ElementModel.richText.simple({
      ...props,
      elementStyles: richTextStyles,
      element: text,
    });

    wrapper.appendChild(textModel.element);
    styles += textModel.styles;
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
