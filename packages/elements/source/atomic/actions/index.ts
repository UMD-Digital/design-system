import * as Utility from 'utilities';
import { ElementModel } from 'model';

interface ElementProps {
  element: HTMLElement;
  isThemeDark?: boolean;
  isThemeGold?: boolean;
  isSizeLarge?: boolean;
  elementStyles?: Record<string, any>;
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
  email: Utility.asset.icon.EMAIL,
  newWindow: Utility.asset.icon.NEW_WINDOW,
  document: Utility.asset.icon.DOCUMENT,
  fearless: Utility.asset.icon.FEARLESS,
};

function insertIcon(element: HTMLElement, svg: string): void {
  const icon = Utility.markup.create.svgFromString(svg);
  if (icon) element.insertBefore(icon, element.firstChild);
}

function createLinkIcon(element: HTMLElement, type: ElementType): void {
  const existingIcon = Utility.markup.get.icon({ element });
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
      gold: ElementModel.actions.primaryWhite,
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

export const primary = (props: ElementProps) => createElement('primary', props);
export const secondary = (props: ElementProps) =>
  createElement('secondary', props);
export const outline = (props: ElementProps) => createElement('outline', props);

export function options(
  props: ElementProps & {
    isTypePrimary?: boolean;
    isTypeSecondary?: boolean;
    isTypeOutline?: boolean;
    plainText?: HTMLElement | null;
  },
) {
  const container = document.createElement('div');
  let styles = '';

  if (props.isTypePrimary) {
    const result = primary(props);
    container.appendChild(result.element);
    styles = result.styles;
  } else if (props.isTypeSecondary) {
    const result = secondary(props);
    container.appendChild(result.element);
    styles = result.styles;
  } else if (props.isTypeOutline) {
    const result = outline(props);
    container.appendChild(result.element);
    styles = result.styles;
  }

  return { element: container, styles };
}
