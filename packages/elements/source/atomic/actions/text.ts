import * as token from '@universityofmaryland/web-styles-library/token';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import { parseSvgString } from '@universityofmaryland/web-utilities-library/media';
import { extractIconElement } from '@universityofmaryland/web-utilities-library/dom';
import { external_link as iconExternalLink } from '@universityofmaryland/web-icons-library/controls';
import { email as iconEmail } from '@universityofmaryland/web-icons-library/communication';
import { document as iconDocument } from '@universityofmaryland/web-icons-library/files';
import { fearless as iconFearless } from '@universityofmaryland/web-icons-library/brand';
import { ElementModel } from 'model';

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

function createElementWithStyle(
  actionFn: (props: ElementProps) => { element: HTMLElement; styles: string },
  props: ElementProps,
) {
  const result = actionFn({
    element: props.element,
    elementStyles: props.elementStyles,
  });
  return { element: result.element, styles: result.styles };
}

function createElement(type: ElementType, props: ElementProps) {
  createLinkIcon(props.element, type);

  const actions: Actions = {
    primary: {
      default: ElementModel.actions.primary,
      large: ElementModel.actions.primaryLarge,
    },
    secondary: {
      default: ElementModel.actions.secondary,
      large: ElementModel.actions.secondaryLarge,
      dark: ElementModel.actions.secondaryWhite,
      gold: ElementModel.actions.secondaryGold,
    },
    outline: {
      default: ElementModel.actions.outline,
      large: ElementModel.actions.outlineLarge,
      dark: ElementModel.actions.outlineWhite,
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
}

const createPlainTextContainer = (props: OptionProps) => {
  const { isTypeSecondary } = props;

  return ElementModel.layout.gridStacked({
    element: document.createElement('div'),
    elementStyles: isTypeSecondary ? {} : { element: { alignItems: 'center' } },
  });
};

const createPlainText = (props: OptionProps) => {
  const { isThemeDark, isTypeSecondary, plainText } = props;
  const plainTextStyles = {
    element: {
      ...(isThemeDark
        ? elementStyles.text.link.white
        : elementStyles.text.link.red),
      marginTop: `${token.spacing.min}`,
    },
  };

  const plainTextSecondaryStyles = {
    element: {
      ...(isThemeDark
        ? elementStyles.text.link.white
        : elementStyles.text.link.red),
      marginTop: `${token.spacing.min}`,
      marginLeft: `${token.spacing.lg}`,
      alignSelf: 'baseline',
    },
  };

  if (plainText) {
    return ElementModel.headline.sansMin({
      element: plainText,
      isThemeDark,
      elementStyles: isTypeSecondary
        ? plainTextSecondaryStyles
        : plainTextStyles,
    });
  }
};

export const primary = (props: ElementProps) => createElement('primary', props);
export const secondary = (props: ElementProps) =>
  createElement('secondary', props);
export const outline = (props: ElementProps) => createElement('outline', props);

export const options = (props: OptionProps) => {
  const { plainText, isTypePrimary, isTypeSecondary, isTypeOutline } = props;
  const container = document.createElement('div');
  let styles = '';

  if (isTypePrimary) {
    const result = primary(props);
    container.appendChild(result.element);
    styles = result.styles;
  }

  if (isTypeSecondary) {
    const result = secondary(props);
    container.appendChild(result.element);
    styles = result.styles;
  }

  if (isTypeOutline) {
    const result = outline(props);
    container.appendChild(result.element);
    styles = result.styles;
  }

  if (plainText) {
    const plainTextContainer = createPlainTextContainer(props);
    const plainTextElement = createPlainText(props);
    if (!plainTextElement) return { element: container, styles };

    plainTextContainer.element.innerHTML = container.innerHTML;
    plainTextContainer.element.appendChild(plainTextElement.element);
    container.innerHTML = '';

    container.appendChild(plainTextContainer.element);

    styles += plainTextContainer.styles;
    styles += plainTextElement.styles;
  }

  return { element: container, styles };
};
