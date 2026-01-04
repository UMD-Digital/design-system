import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { createCompositeFooterRowLogo as createRowLogo } from './row-logo';
import { createCompositeFooterRowLinks as createRowLinks } from './row-links';
import { MainSectionProps } from '../../_types';
import { type UMDElement } from '../../../../_types';

const createVisualContainer = (
  props: Pick<
    MainSectionProps,
    'isTypeVisual' | 'isTypeSimple' | 'slotVisualImage'
  >,
): UMDElement | undefined => {
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

  const gradientElement = new ElementBuilder()
    .withClassName('umd-footer-background-image-graident')
    .withStyles({
      element: {
        display: 'block',
        position: 'absolute',
        left: 0,
        top: '2px',
        width: '500vw',
        height: '100px',
        background: `linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, #e4edf9 100%)`,
      },
    })
    .build();

  const img = document.createElement('img');
  img.setAttribute('src', imageSrc);
  img.setAttribute('alt', altText);

  const imageElement = new ElementBuilder(img)
    .withClassName('umd-footer-background-image')
    .withStyles({
      element: {
        width: '100% !important',
        objectFit: 'cover !important',
        display: 'block !important',
        objectPosition: 'center',
      },
    })
    .build();

  return new ElementBuilder()
    .withClassName('umd-footer-background-image-container')
    .withStyles({
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
    })
    .withChildren(gradientElement, imageElement)
    .build();
};

const CreateMainSectionElement = (props: MainSectionProps): UMDElement => {
  const { isTypeMega, isTypeVisual } = props;
  const logoRow = createRowLogo(props);
  const visualContainerElement = createVisualContainer(props);
  const linksRowElement = (isTypeMega || isTypeVisual) && createRowLinks(props);

  const container = new ElementBuilder().withClassName(
    'umd-footer-main-container',
  );

  if (visualContainerElement) {
    container.withChild(visualContainerElement);
  }

  container.withChild(logoRow);

  if (linksRowElement) {
    container.withChild(linksRowElement);
  }

  return container.build();
};

export const createCompositeFooterMainSection = CreateMainSectionElement;
