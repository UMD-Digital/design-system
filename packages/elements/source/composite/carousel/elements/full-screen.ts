import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { combineStyles } from '@universityofmaryland/web-utilities-library/styles';
import { close_large as iconCloseLarge } from '@universityofmaryland/web-icons-library/controls';
import { layout } from 'atomic';

type TypeFixedFullScreenProps = {
  content: HTMLElement;
  callback: () => void;
};

type FullScreenModel = {
  element: HTMLElement;
  styles: string;
  events: {
    show: () => void;
    hide: () => void;
  };
};

export const createCompositeCarouselFullScreen = ({ content }: TypeFixedFullScreenProps) => {
  const modal = layout.overlay.modal({ content });
  const modalEvents = modal.events;

  const closeButtonModel = new ElementBuilder('button')
    .withClassName('carousel-fixed-screen-button')
    .withAttribute('type', 'button')
    .withAria({ label: 'Close' })
    .withHTML(iconCloseLarge)
    .withStyles({
      element: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        [`@media (${token.media.queries.tablet.min})`]: {
          top: 'calc(10vh - 22px)',
          right: 'calc(10vw - 22px)',
        },
        '& svg': {
          fill: token.color.white,
          width: '20px',
          height: '20px',
        },
      },
    })
    .on('click', () => {
      if (!modalEvents) {
        return;
      }
      modalEvents.hide();
    })
    .build();

  modal.element.appendChild(closeButtonModel.element);

  const show = modalEvents ? modalEvents.show : () => {};
  const hide = modalEvents ? modalEvents.hide : () => {};

  return {
    element: modal.element,
    styles: combineStyles(modal.styles, closeButtonModel.styles),
    events: { show, hide },
  } as FullScreenModel;
};
