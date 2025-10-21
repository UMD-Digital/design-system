import ElementBuilder from '@universityofmaryland/web-builder-library';
import createRowLogo, { type RowLogoProps } from './row-logo';
import createRowLinks, { type RowLinksProps } from './row-links';
import { BaseProps } from '../../_types';
import { type ElementVisual } from '../../../../_types';

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
    imageSrc = new URL(
      '../../assets/visual-default.jpg',
      import.meta.url as any,
    ).href;
  }

  if (!imageSrc || !altText) return;

  const gradientElement = ElementBuilder.create.div({
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

  const imageElement = ElementBuilder.create.element({
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

  return ElementBuilder.create.div({
    className: 'umd-footer-background-image-container',
    children: [gradientElement, imageElement],
    elementStyles: {
      element: {
        position: 'relative',
        paddingTop: '100px',

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
  logoRow: ElementVisual,
  visualContainerElement?: ElementVisual,
  linksRowElement?: ElementVisual,
): ElementVisual => {
  return ElementBuilder.create.div({
    className: 'umd-footer-main-container',
    children: [visualContainerElement, logoRow, linksRowElement].filter(
      Boolean,
    ) as ElementVisual[],
  });
};

export default (props: MainSectionProps): ElementVisual => {
  const { isTypeMega, isTypeVisual } = props;

  const logoRow = createRowLogo(props);
  const visualContainerElement = createVisualContainer(props);
  const linksRowElement = (isTypeMega || isTypeVisual) && createRowLinks(props);

  return createContainer(
    logoRow,
    visualContainerElement,
    linksRowElement || undefined,
  );
};
