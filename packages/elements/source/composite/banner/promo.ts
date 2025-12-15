import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import * as token from '@universityofmaryland/web-token-library';
import * as typography from '@universityofmaryland/web-styles-library/typography';
import * as elementStyles from '@universityofmaryland/web-styles-library/element';
import { imageFromSvg } from '@universityofmaryland/web-utilities-library/media';
import { theme } from '@universityofmaryland/web-utilities-library/theme';
import { seal as logoSeal } from '@universityofmaryland/web-icons-library/logos';
import { type ElementModel } from '../../_types';
import { wrapTextNodeInSpan } from '@universityofmaryland/web-utilities-library';

type TypeBannerPromoProps = {
  headline?: HTMLElement | null;
  text?: HTMLElement | null;
  actions?: HTMLElement | null;
  isThemeDark?: boolean;
  includeSeal?: boolean;
};

const SMALL = 650;
const ELEMENT_NAME = 'umd-element-banner-promo';

const createHeadline = (
  props: Pick<TypeBannerPromoProps, 'headline' | 'isThemeDark'>,
): ElementModel | null => {
  const { headline, isThemeDark } = props;
  if (!headline) return null;

  const headlineStyles = {
    ...typography.sans.compose('extralarge', {
      theme: theme.fontColor(isThemeDark),
    }),
  };

  return new ElementBuilder(headline)
    .withClassName('banner-promo-headline')
    .styled(headlineStyles)
    .withStyles({
      element: {
        textTransform: 'uppercase',
        fontWeight: 800,
      },
    })
    .withModifier((el) => wrapTextNodeInSpan(el))
    .build();
};

const createText = (
  props: Pick<TypeBannerPromoProps, 'text' | 'isThemeDark'>,
): ElementModel | null => {
  const { text, isThemeDark } = props;
  if (!text) return null;

  return new ElementBuilder(text)
    .withClassName('banner-promo-rich-text')
    .styled(
      elementStyles.text.rich.composeSimple({
        theme: theme.fontColor(isThemeDark),
      }),
    )
    .withStyles({
      element: {
        marginTop: token.spacing.min,

        ...(!isThemeDark && {
          color: token.color.black,

          ['& *']: {
            color: token.color.black,
          },
        }),
      },
    })
    .build();
};

const createActions = (
  props: Pick<TypeBannerPromoProps, 'actions'>,
): ElementModel | null => {
  const { actions } = props;
  if (!actions) return null;

  return new ElementBuilder(actions)
    .withClassName('banner-promo-actions')
    .withStyles({
      element: {
        [`@container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px)`]: {
          marginTop: token.spacing.sm,
        },
        [`@container ${ELEMENT_NAME} (min-width: ${SMALL}px)`]: {
          maxWidth: '30%',
          marginLeft: token.spacing.md,
        },
      },
    })
    .build();
};

const createTextContainer = (
  props: Pick<TypeBannerPromoProps, 'headline' | 'text' | 'isThemeDark'>,
): ElementModel => {
  const { headline, text, isThemeDark } = props;
  const headlineElement = createHeadline({ headline, isThemeDark });
  const textElement = createText({ text, isThemeDark });
  const children = [headlineElement, textElement].filter(
    Boolean,
  ) as ElementModel[];

  return new ElementBuilder()
    .withClassName('banner-promo-text-container')
    .withChildren(...children)
    .withStyles({
      element: {
        [`@container ${ELEMENT_NAME} (min-width: ${SMALL}px)`]: {
          width: '70%',
        },
      },
    })
    .build();
};

const createWrapper = (
  props: Pick<
    TypeBannerPromoProps,
    'headline' | 'text' | 'actions' | 'isThemeDark'
  >,
): ElementModel => {
  const { actions } = props;
  const textContainer = createTextContainer(props);
  const actionsElement = createActions({ actions });
  const children = [textContainer, actionsElement].filter(
    Boolean,
  ) as ElementModel[];

  return new ElementBuilder()
    .withClassName('banner-promo-wrapper')
    .withChildren(...children)
    .withStyles({
      element: {
        zIndex: 9,
        position: 'relative',

        [`@container ${ELEMENT_NAME} (min-width: ${SMALL}px)`]: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      },
    })
    .build();
};

const createSeal = (isThemeDark: boolean): ElementModel => {
  const image = imageFromSvg({ SVG: logoSeal.white });
  image.alt = 'University of Maryland Seal';

  return new ElementBuilder(image)
    .withClassName('banner-promo-seal')
    .withStyles({
      element: {
        position: 'absolute',
        right: '-50px',
        top: '-40px',
        height: '231px',
        width: '234px',
        maxWidth: '234px',
        maxHeight: '231px',
        objectFit: 'contain',
        display: 'block',

        ...(isThemeDark && {
          opacity: 0.2,
        }),

        [`@container ${ELEMENT_NAME} (max-width: ${SMALL - 1}px)`]: {
          display: 'none',
        },
      },
    })
    .build();
};

const createContainer = (
  props: Pick<TypeBannerPromoProps, 'isThemeDark' | 'includeSeal'> & {
    content: ElementModel;
  },
): ElementModel => {
  const { isThemeDark, includeSeal, content } = props;
  const children: ElementModel[] = [];

  if (includeSeal) {
    children.push(createSeal(isThemeDark ?? false));
  }

  children.push(content);

  return new ElementBuilder()
    .withClassName('banner-promo-container')
    .withChildren(...children)
    .withModifier((element) => {
      if (isThemeDark) element.setAttribute('theme', 'dark');
    })
    .withStyles({
      element: {
        padding: `${token.spacing.lg} ${token.spacing.lg}`,
        backgroundColor: token.color.gold,
        position: 'relative',

        [`@container ${ELEMENT_NAME} (min-width: ${SMALL}px)`]: {
          padding: token.spacing.xl,
        },

        ...(isThemeDark && {
          backgroundColor: token.color.black,
        }),
      },
    })
    .build();
};

export default (props: TypeBannerPromoProps) => {
  const wrapper = createWrapper(props);
  const container = createContainer({
    ...props,
    content: wrapper,
  });

  return new ElementBuilder()
    .withClassName('banner-promo-declaration')
    .withChild(container)
    .withStyles({
      element: {
        container: `${ELEMENT_NAME} / inline-size`,
        overflow: 'hidden',
        position: 'relative',
      },
    })
    .build();
};
