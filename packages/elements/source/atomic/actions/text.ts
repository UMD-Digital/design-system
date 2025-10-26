import * as token from '@universityofmaryland/web-styles-library/token';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as layoutStyles from '@universityofmaryland/web-styles-library/layout';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import type { JssObject } from '@universityofmaryland/web-styles-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { parseSvgString } from '@universityofmaryland/web-utilities-library/media';
import { extractIconElement } from '@universityofmaryland/web-utilities-library/dom';
import { external_link as iconExternalLink } from '@universityofmaryland/web-icons-library/controls';
import { email as iconEmail } from '@universityofmaryland/web-icons-library/communication';
import { document as iconDocument } from '@universityofmaryland/web-icons-library/files';
import { fearless as iconFearless } from '@universityofmaryland/web-icons-library/brand';

interface ElementProps {
  element: HTMLElement;
  isThemeDark?: boolean;
  isThemeGold?: boolean;
  isSizeLarge?: boolean;
  elementStyles?: Record<string, any>;
}

interface OptionProps extends ElementProps {
  isTypePrimary?: boolean;
  isTypeSecondary?: boolean;
  isTypeOutline?: boolean;
  plainText?: HTMLElement | null;
}

type ElementType = 'primary' | 'secondary' | 'outline';
type IconType = 'email' | 'newWindow' | 'document' | 'fearless';

type ActionVariants = {
  default: JssObject;
  large?: JssObject;
  dark?: JssObject;
  gold?: JssObject;
};

type Actions = Record<ElementType, ActionVariants>;

const createLinkIcon = (element: HTMLElement, type: ElementType): void => {
  const existingIcon = extractIconElement({ element });
  const ICONS: Record<IconType, string> = {
    email: iconEmail,
    newWindow: iconExternalLink,
    document: iconDocument,
    fearless: iconFearless,
  };

  if (existingIcon) {
    element.insertBefore(existingIcon, element.firstChild);
    return;
  }

  const href = element.getAttribute('href');
  const isExternalTab = element.getAttribute('target') === '_blank';
  const isDownload = element.getAttribute('download') !== null;
  const isMail = href?.includes('mailto:');
  const insertIcon = (element: HTMLElement, svg: string): void => {
    const icon = parseSvgString(svg);
    if (icon) element.insertBefore(icon, element.firstChild);
  };

  if (isMail) {
    insertIcon(element, ICONS.email);
  } else if (isExternalTab) {
    insertIcon(element, ICONS.newWindow);
  } else if (isDownload) {
    insertIcon(element, ICONS.document);
  } else if (type === 'secondary') {
    insertIcon(element, ICONS.fearless);
  }
};

const createPlainText = ({
  isThemeDark,
  isTypeSecondary,
  plainText,
}: Pick<OptionProps, 'isThemeDark' | 'isTypeSecondary' | 'plainText'>) => {
  if (!plainText) return null;

  const textColor = isThemeDark
    ? elementStyles.text.link.white
    : elementStyles.text.link.red;

  return new ElementBuilder(plainText)
    .styled(typography.sans.fonts.min)
    .withStyles({
      element: {
        ...textColor,

        ...(isTypeSecondary && {
          marginLeft: `${token.spacing.lg}`,
          alignSelf: 'baseline',
        }),
      },
    })
    .build();
};

const createElement = (type: ElementType, props: ElementProps) => {
  const createElementWithStyle = (
    styleObject: JssObject,
    props: ElementProps,
  ) => {
    return new ElementBuilder(props.element)
      .styled(styleObject)
      .withStylesIf(!!props.elementStyles, props.elementStyles || {})
      .build();
  };
  createLinkIcon(props.element, type);

  const actions: Actions = {
    primary: {
      default: elementStyles.action.primary.normal,
      large: elementStyles.action.primary.large,
    },
    secondary: {
      default: elementStyles.action.secondary.normal,
      large: elementStyles.action.secondary.large,
      dark: elementStyles.action.secondary.white,
      gold: elementStyles.action.secondary.gold,
    },
    outline: {
      default: elementStyles.action.outline.normal,
      large: elementStyles.action.outline.large,
      dark: elementStyles.action.outline.white,
    },
  };

  const typeActions = actions[type];

  if (props.isThemeGold && typeActions.gold) {
    return createElementWithStyle(typeActions.gold, props);
  }
  if (props.isThemeDark && typeActions.dark) {
    return createElementWithStyle(typeActions.dark, props);
  }
  if (props.isSizeLarge && typeActions.large) {
    return createElementWithStyle(typeActions.large, props);
  }
  return createElementWithStyle(typeActions.default, props);
};

export const primary = (props: ElementProps) => createElement('primary', props);
export const secondary = (props: ElementProps) =>
  createElement('secondary', props);
export const outline = (props: ElementProps) => createElement('outline', props);

export const options = (props: OptionProps) => {
  const { plainText, isTypePrimary, isTypeSecondary, isTypeOutline } = props;

  let actionModel;

  if (isTypePrimary) {
    actionModel = primary(props);
  } else if (isTypeSecondary) {
    actionModel = secondary(props);
  } else if (isTypeOutline) {
    actionModel = outline(props);
  }

  if (plainText) {
    const plainTextElement = createPlainText(props);

    if (plainTextElement) {
      return new ElementBuilder()
        .styled(layoutStyles.grid.stacked)
        .withStyles({
          element: {
            display: 'grid',
            gap: token.spacing.sm,
            ...(!isTypeSecondary && { alignItems: 'center' }),

            ['& > *']: {
              marginBottom: '0 !important',
            },
          },
        })
        .withChild(actionModel)
        .withChild(plainTextElement)
        .build();
    }
  }

  return new ElementBuilder().withChild(actionModel).build();
};
