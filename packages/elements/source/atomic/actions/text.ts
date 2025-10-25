import * as token from '@universityofmaryland/web-styles-library/token';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { actions as actionPresets } from '@universityofmaryland/web-builder-library/presets';
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

type ActionFunction = (props: ElementProps) => {
  element: HTMLElement;
  styles: string;
};

type ActionVariants = {
  default: ActionFunction;
  large?: ActionFunction;
  dark?: ActionFunction;
  gold?: ActionFunction;
};

type Actions = Record<ElementType, ActionVariants>;

const ICONS: Record<IconType, string> = {
  email: iconEmail,
  newWindow: iconExternalLink,
  document: iconDocument,
  fearless: iconFearless,
};

function insertIcon(element: HTMLElement, svg: string): void {
  const icon = parseSvgString(svg);
  if (icon) element.insertBefore(icon, element.firstChild);
}

function createLinkIcon(element: HTMLElement, type: ElementType): void {
  const existingIcon = extractIconElement({ element });
  if (existingIcon) {
    element.insertBefore(existingIcon, element.firstChild);
    return;
  }

  const href = element.getAttribute('href');
  const isExternalTab = element.getAttribute('target') === '_blank';
  const isDownload = element.getAttribute('download') !== null;
  const isMail = href?.includes('mailto:');

  if (isMail) {
    insertIcon(element, ICONS.email);
  } else if (isExternalTab) {
    insertIcon(element, ICONS.newWindow);
  } else if (isDownload) {
    insertIcon(element, ICONS.document);
  } else if (type === 'secondary') {
    insertIcon(element, ICONS.fearless);
  }
}

function createElement(type: ElementType, props: ElementProps) {
  const { element, isThemeGold, isThemeDark, isSizeLarge, elementStyles } = props;

  // Apply icon modification before building
  createLinkIcon(element, type);

  // Select appropriate builder based on type and theme
  let builder: ReturnType<typeof actionPresets.primary>;

  if (type === 'primary') {
    builder = isSizeLarge ? actionPresets.primaryLarge() : actionPresets.primary();
  } else if (type === 'secondary') {
    if (isThemeGold) {
      builder = actionPresets.secondaryGold();
    } else if (isThemeDark) {
      builder = actionPresets.secondaryWhite();
    } else if (isSizeLarge) {
      builder = actionPresets.secondaryLarge();
    } else {
      builder = actionPresets.secondary();
    }
  } else {
    // outline
    if (isThemeDark) {
      builder = actionPresets.outlineWhite();
    } else if (isSizeLarge) {
      builder = actionPresets.outlineLarge();
    } else {
      builder = actionPresets.outline();
    }
  }

  // Build with custom element and optional styles
  const presetStyles = builder.getStyles();

  return new ElementBuilder(element)
    .withStyles(presetStyles as any)
    .withStylesIf(!!elementStyles, elementStyles || {})
    .build();
}

const createPlainText = (props: OptionProps) => {
  const { isThemeDark, isTypeSecondary, plainText } = props;

  if (!plainText) return null;

  const baseStyles = {
    element: {
      ...(isThemeDark
        ? elementStyles.text.link.white
        : elementStyles.text.link.red),
      marginTop: `${token.spacing.min}`,
    },
  };

  const secondaryStyles = {
    element: {
      marginLeft: `${token.spacing.lg}`,
      alignSelf: 'baseline',
    },
  };

  return new ElementBuilder(plainText)
    .withStyles(baseStyles)
    .withStylesIf(!!isTypeSecondary, secondaryStyles)
    .build();
};

export const primary = (props: ElementProps) => createElement('primary', props);
export const secondary = (props: ElementProps) =>
  createElement('secondary', props);
export const outline = (props: ElementProps) => createElement('outline', props);

export const options = (props: OptionProps) => {
  const { plainText, isTypePrimary, isTypeSecondary, isTypeOutline } = props;

  // Build the action element
  let actionModel;
  if (isTypePrimary) {
    actionModel = primary(props);
  } else if (isTypeSecondary) {
    actionModel = secondary(props);
  } else if (isTypeOutline) {
    actionModel = outline(props);
  }

  if (!actionModel) {
    return new ElementBuilder().build();
  }

  // If no plain text, return action as-is
  if (!plainText) {
    return actionModel;
  }

  // Build plain text wrapper with action and text
  const plainTextElement = createPlainText(props);
  if (!plainTextElement) return actionModel;

  // Build container with inline styles and preserve child ElementModel styles
  return new ElementBuilder()
    .withStyles({
      element: {
        display: 'grid',
        gap: token.spacing.sm,
        ...(!isTypeSecondary && { alignItems: 'center' }),
      },
    })
    .withChild(actionModel)
    .withChild(plainTextElement)
    .build();
};
