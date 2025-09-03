import { token } from '@universityofmaryland/web-styles-library';
import { ElementModel } from 'model';
import createRowLogo, { type RowLogoProps } from './row-logo';
import createRowLinks, { type RowLinksProps } from './row-links';
import { REFERENCES } from '../../globals';
import { BaseProps } from '../../_types';
import { type ElementVisual } from '../../../../_types';

const { IS_THEME_LIGHT, IS_VERSION_SIMPLE, IS_VERSION_VISUAL } = REFERENCES;

export interface MainSectionProps
  extends BaseProps,
    RowLinksProps,
    RowLogoProps {
  slotVisualImage: HTMLImageElement | null;
}

const createVisualContainer = (
  props: Pick<
    MainSectionProps,
    'isTypeVisual' | 'isTypeSimple' | 'slotVisualImage'
  >,
): ElementVisual | undefined => {
  const { isTypeVisual, isTypeSimple, slotVisualImage } = props;
  const isShowVisualImage = isTypeVisual || isTypeSimple;
  if (!isShowVisualImage) return;

  let altText: string | null = null;
  let imageSrc: string | null = null;

  if (slotVisualImage) {
    const source = slotVisualImage.getAttribute('src');
    const alt = slotVisualImage.getAttribute('alt');

    if (typeof source === 'string' && source.length > 0) {
      imageSrc = source;
    }
    if (typeof alt === 'string' && alt.length > 0) {
      altText = alt;
    }
  } else if (isTypeVisual) {
    altText = 'The University of Maryland Campus';
    imageSrc = require('../../assets/visual-default.jpg').default;
  }

  if (!imageSrc || !altText) return;

  const gradientElement = ElementModel.createDiv({
    className: 'umd-footer-background-image-graident',
    elementStyles: {
      element: {
        display: 'block',
        position: 'absolute',
        left: 0,
        top: '2px',
        width: '500vw',
        height: '100px',
        background: `linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, #e4edf9 100%)`,
      },
    },
  });

  const imageElement = ElementModel.create({
    element: document.createElement('img'),
    className: 'umd-footer-background-image',
    elementStyles: {
      element: {
        width: '100% !important',
        objectFit: 'cover !important',
        display: 'block !important',
        objectPosition: 'center',
      },
    },
  });
  imageElement.element.setAttribute('src', imageSrc);
  imageElement.element.setAttribute('alt', altText);

  return ElementModel.createDiv({
    className: 'umd-footer-background-image-container',
    children: [gradientElement, imageElement],
    elementStyles: {
      element: {
        position: 'relative',
        [`& img`]: {
          width: '100% !important',
          objectFit: 'cover !important',
          display: 'block !important',
          objectPosition: 'center',
        },
      },
    },
  });
};

const createContainer = (
  props: MainSectionProps,
  logoRow: ElementVisual,
  visualContainerElement?: ElementVisual,
  linksRowElement?: ElementVisual,
): ElementVisual => {
  return ElementModel.createDiv({
    className: 'umd-footer-main-container',
    children: [
      ...(visualContainerElement ? [visualContainerElement] : []),
      logoRow,
      ...(linksRowElement ? [linksRowElement] : []),
    ],
    elementStyles: {
      element: {
        [`.umd-footer-element-wrapper p,
           .umd-footer-element-wrapper a,
           .umd-footer-element-wrapper span`]: {
          color: token.color.white,
        },

        [`.umd-footer-element-wrapper${IS_THEME_LIGHT} p,
           .umd-footer-element-wrapper${IS_THEME_LIGHT} a,
           .umd-footer-element-wrapper${IS_THEME_LIGHT} span`]: {
          color: token.color.gray.dark,
        },

        [`.umd-footer-element-wrapper${IS_VERSION_VISUAL} .umd-footer-background-image-container,
           .umd-footer-element-wrapper${IS_VERSION_SIMPLE} .umd-footer-background-image-container`]:
          {
            paddingTop: '100px',
          },
      },
    },
  });
};

export default (props: MainSectionProps): ElementVisual => {
  const logoRow = createRowLogo(props);
  const visualContainerElement = createVisualContainer(props);
  const linksRowElement =
    props.isTypeMega || props.isTypeVisual ? createRowLinks(props) : undefined;

  return createContainer(
    props,
    logoRow,
    visualContainerElement,
    linksRowElement,
  );
};
