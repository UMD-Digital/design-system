import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { withViewTimelineAnimation } from '@universityofmaryland/web-utilities-library/styles';

const ICON_CHEVRON_BIG = `<svg width="252" height="306" aria-hidden="true" viewBox="0 0 252 306" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M126 0H0L126 152.706L0 305.411H126L252 152.706L126 0Z" /></svg>`;
const ICON_CHEVRON_SMALL = `<svg width="144" height="202" aria-hidden="true"  viewBox="0 0 144 202" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M60.3972 0H0L83.6028 100.765L0 201.529H60.3972L144 100.765L60.3972 0Z" /></svg>`;

const KEYFRAMES = `
  @keyframes chevron-one {
    from { transform: translateX(-80%); }
    to { transform: translateX(40%); }
  }

  @keyframes chevron-two {
    from { transform: translateX(-40%); }
    to { transform: translateX(24%); }
  }

  @keyframes chevron-three {
    from { transform: translateX(-30%); }
    to { transform: translateX(60%); }
  }
`;

export const createAnimationChevronScroll = () =>
  (() => {
    const firstChevron = new ElementBuilder()
      .withClassName('brand-logo-first-chevron')
      .withHTML(ICON_CHEVRON_SMALL)
      .withStyles({
        element: {
          top: '0',
          transform: 'translateX(-80%)',
          '& svg': {
            fill: token.color.gold,
            height: '7vw',
            width: '5vw',
            [`@media (${token.media.queries.highDef.min})`]: {
              height: '202px',
              width: '144px',
            },
          },
          ...withViewTimelineAnimation({
            transform: 'translateX(40%)',
            animation: 'chevron-one forwards',
            animationTimeline: 'view()',
            animationRangeStart: 'cover',
            animationRangeEnd: 'contain',
          }),
        },
      })
      .build();

    const secondChevron = new ElementBuilder()
      .withClassName('brand-logo-second-chevron')
      .withHTML(ICON_CHEVRON_BIG)
      .withStyles({
        element: {
          top: '10%',
          zIndex: 99,
          transform: 'translateX(-40%)',
          '& svg': {
            fill: token.color.red,
            height: '10vw',
            width: '8.2vw',
            [`@media (${token.media.queries.highDef.min})`]: {
              height: '306px',
              width: '252px',
            },
          },
          [`@media (${token.media.queries.highDef.min})`]: {
            top: '95px',
          },
          ...withViewTimelineAnimation({
            transform: 'translateX(24%)',
            animation: 'chevron-two forwards',
            animationTimeline: 'view()',
            animationRangeStart: 'cover',
            animationRangeEnd: 'contain',
          }),
        },
      })
      .build();

    const thirdChevron = new ElementBuilder()
      .withClassName('brand-logo-third-chevron')
      .withHTML(ICON_CHEVRON_BIG)
      .withStyles({
        element: {
          top: '25%',
          transform: 'translateX(-30%)',
          '& svg': {
            fill: token.color.black,
            height: '10vw',
            width: '8.2vw',
            [`@media (${token.media.queries.highDef.min})`]: {
              height: '306px',
              width: '252px',
            },
          },
          [`@media (${token.media.queries.highDef.min})`]: {
            top: '195px',
          },
          ...withViewTimelineAnimation({
            transform: 'translateX(60%)',
            animation: 'chevron-three forwards',
            animationTimeline: 'view()',
            animationRangeStart: '0',
            animationRangeEnd: '100vh',
          }),
        },
      })
      .build();

    const container = new ElementBuilder()
      .withClassName('brand-logo-container')
      .withStyles({
        element: {
          position: 'relative',
          height: '50vw',
          width: '100vw',
          '& > *': {
            position: 'absolute',
            height: '100%',
            right: '0',
            transform: 'none',
          },
        },
      })
      .withChildren(firstChevron, secondChevron, thirdChevron)
      .build();

    container.styles += KEYFRAMES;

    return container;
  })();
