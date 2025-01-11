import * as Utility from 'utilities';
import { ElementModel } from 'model';

interface ElmentProps {
  element: HTMLElement;
  isThemeDark?: boolean;
  isThemeGold?: boolean;
  isSizeLarge?: boolean;
  elementStyles?: Record<string, any>;
}

interface OptionProps extends ElmentProps {
  isTypePrimary?: boolean;
  isTypeSecondary?: boolean;
  isTypeOutline?: boolean;
  plainText?: HTMLElement | null;
}

const TYPE_PRIMARY = 'primary';
const TYPE_SECONDARY = 'secondary';
const TYPE_OUTLINE = 'outline';

const CreateLinkIcon = ({
  element,
  type,
  isLink,
}: {
  element: HTMLElement;
  type: string;
  isLink: boolean;
}) => {
  const icon = Utility.markup.get.icon({ element });
  const isExternalTab = element.getAttribute('target') === '_blank';
  const isDownload = element.getAttribute('download') !== null;
  const isMail = element.getAttribute('href')?.includes('mailto:');

  if (icon) {
    element.insertBefore(icon, element.firstChild);
    return;
  }

  if (isMail && isLink) {
    // To Do - add space for small icon
    const mailIcon = Utility.markup.create.svgFromString(
      Utility.asset.icon.EMAIL,
    );
    if (mailIcon) element.insertBefore(mailIcon, element.firstChild);
    return;
  }

  if (isExternalTab && isLink) {
    const windowIcon = Utility.markup.create.svgFromString(
      Utility.asset.icon.NEW_WINDOW,
    );
    if (windowIcon) element.insertBefore(windowIcon, element.firstChild);
    return;
  }

  if (isDownload && isLink) {
    const documentIcon = Utility.markup.create.svgFromString(
      Utility.asset.icon.DOCUMENT,
    );
    if (documentIcon) element.insertBefore(documentIcon, element.firstChild);
    return;
  }

  if (type === TYPE_SECONDARY) {
    const fearlessIcon = Utility.markup.create.svgFromString(
      Utility.asset.icon.FEARLESS,
    );
    if (fearlessIcon) element.insertBefore(fearlessIcon, element.firstChild);
    return;
  }
};

export const primary = ({
  element,
  isSizeLarge,
  isThemeGold,
  elementStyles,
}: ElmentProps) => {
  CreateLinkIcon({ element, type: TYPE_PRIMARY, isLink: true });

  if (isThemeGold) {
    const white = ElementModel.actions.primaryWhite({
      element,
      elementStyles,
    });

    return {
      element: white.element,
      styles: white.styles,
    };
  }

  if (isSizeLarge) {
    const large = ElementModel.actions.primaryLarge({
      element,
      elementStyles,
    });

    return {
      element: large.element,
      styles: large.styles,
    };
  }

  const normal = ElementModel.actions.primary({
    element,
    elementStyles,
  });

  return {
    element: normal.element,
    styles: normal.styles,
  };
};

export const secondary = ({
  element,
  isSizeLarge,
  isThemeDark,
  isThemeGold,
  elementStyles,
}: ElmentProps) => {
  CreateLinkIcon({ element, type: TYPE_SECONDARY, isLink: true });

  if (isThemeDark) {
    const white = ElementModel.actions.secondaryWhite({
      element,
      elementStyles,
    });

    return {
      element: white.element,
      styles: white.styles,
    };
  }

  if (isThemeGold) {
    const white = ElementModel.actions.secondaryGold({
      element,
      elementStyles,
    });

    return {
      element: white.element,
      styles: white.styles,
    };
  }

  if (isSizeLarge) {
    const large = ElementModel.actions.secondaryLarge({
      element,
      elementStyles,
    });

    return {
      element: large.element,
      styles: large.styles,
    };
  }

  const normal = ElementModel.actions.secondary({
    element,
    elementStyles,
  });

  return {
    element: normal.element,
    styles: normal.styles,
  };
};

export const outline = ({
  element,
  isSizeLarge,
  isThemeDark,
  elementStyles,
}: ElmentProps) => {
  CreateLinkIcon({ element, type: TYPE_OUTLINE, isLink: true });

  if (isThemeDark) {
    const white = ElementModel.actions.outlineWhite({
      element,
      elementStyles,
    });

    return {
      element: white.element,
      styles: white.styles,
    };
  }

  if (isSizeLarge) {
    const large = ElementModel.actions.outlineLarge({
      element,
      elementStyles,
    });

    return {
      element: large.element,
      styles: large.styles,
    };
  }

  const normal = ElementModel.actions.outline({
    element,
    elementStyles,
  });

  return {
    element: normal.element,
    styles: normal.styles,
  };
};

export const options = (props: OptionProps) => {
  const { isTypePrimary, isTypeSecondary, isTypeOutline, plainText } = props;
  const container = document.createElement('div');
  // const hasPlainText = plainTextElement.length > 0;
  let styles = '';

  if (isTypePrimary) {
    const primaryElement = primary(props);
    container.appendChild(primaryElement.element);
    styles = primaryElement.styles;
  }

  if (isTypeSecondary) {
    const secondaryElement = secondary(props);
    container.appendChild(secondaryElement.element);
    styles = secondaryElement.styles;
  }

  if (isTypeOutline) {
    const outlineElement = outline(props);
    container.appendChild(outlineElement.element);
    styles = outlineElement.styles;
  }

  // if (hasPlainText) {
  //   const plainTextSlot = Node.slot({ type: PLAIN_TEXT });
  //   plainTextSlot.classList.add(CTA_PLAIN_TEXT_SLOT);
  //   container.setAttribute(ATTRIBUTE_PLAIN_TEXT, 'true');
  //   container.appendChild(plainTextSlot);
  // }

  return {
    element: container,
    styles,
  };
};
