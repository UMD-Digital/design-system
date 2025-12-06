import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import * as layoutStyles from '@universityofmaryland/web-styles-library/layout';
import * as animation from '@universityofmaryland/web-styles-library/animation';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import { parseSvgString } from '@universityofmaryland/web-utilities-library/media';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import {
  extractIconElement,
  wrapTextNodeInSpan,
} from '@universityofmaryland/web-utilities-library/dom';
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

  return new ElementBuilder(plainText)
    .styled(
      typography.sans.compose('min', { theme: isThemeDark ? 'dark' : 'light' }),
    )
    .withStyles({
      element: {
        textDecoration: 'underline',

        ...(isTypeSecondary && {
          marginLeft: `${token.spacing.lg}`,
          alignSelf: 'baseline',
        }),
      },
    })
    .build();
};

const createElement = (type: ElementType, props: ElementProps) => {
  createLinkIcon(props.element, type);

  const size = props.isSizeLarge ? 'large' : 'normal';
  let styleObject;

  if (type === 'primary') {
    styleObject = elementStyles.action.primary.composePrimary({ size });
  } else if (type === 'secondary') {
    let color: 'default' | 'white' | 'gold' = 'default';
    if (props.isThemeGold) {
      color = 'gold';
    } else if (props.isThemeDark) {
      color = 'white';
    }
    styleObject = {
      ...elementStyles.action.secondary.composeSecondary({
        size,
        color,
      }),
      ...animation.line.slideUnderRed,
    };
  } else if (type === 'outline') {
    const color = props.isThemeDark ? 'white' : 'default';
    styleObject = elementStyles.action.outline.composeOutline({ size, color });
  }

  const element = new ElementBuilder(props.element)
    .styled(styleObject!)
    .withStylesIf(!!props.elementStyles, props.elementStyles || {});

  if (type === 'secondary') {
    element.withModifier((el) => {
      wrapTextNodeInSpan(el);
    });
  }

  return element.build();
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

            ['& > *']: {
              marginBottom: '0 !important',
              ...(!isTypeSecondary && { justifySelf: 'center' }),
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
