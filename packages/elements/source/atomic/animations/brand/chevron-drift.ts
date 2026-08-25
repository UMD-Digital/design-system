import * as token from '@universityofmaryland/web-token-library';
import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { isPreferredReducedMotion } from '@universityofmaryland/web-utilities-library/accessibility';

interface AnimationChevronDriftProps {
  sizedContainer: HTMLElement;
  completedCallback?: () => void;
  isAnimationOnLoad?: boolean;
}

const CLASS_CHEVRON = 'chevron-drift-arrow';

// Timing and drift behavior mirror the forward.umd.edu campaign hero
// (university-relations-system: forward-hero.ts)
const CHEVRON_SLIDE_DURATION = 600;
const SPEED_VARIANCE_AMPLITUDE = 0.35;
const SPEED_VARIANCE_PERIOD_MS = 12000;
const SHAPE = 0.25;
const BASE_SPEED = 0.008;
const WRAP_GAP = 90;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

const CHEVRON_PERCENT_OFFSETS = {
  mobile: [-0.93, -0.7, -0.33, -0.07, 0.33, 0.57],
  tablet: [-0.79, -0.43, -0.11, 0.2, 0.35, 0.65],
} as const;

const createChevronSvg = (color: string) =>
  `<svg class="${CLASS_CHEVRON}" aria-hidden="true" width="358" height="709" viewBox="0 0 358 709" fill="none" xmlns="http://www.w3.org/2000/svg"><line y1="-0.5" x2="504.386" y2="-0.5" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 0 707.461)" stroke="${color}" /><line x1="0.353553" y1="-4.80811" x2="357.008" y2="351.846" stroke="${color}" /></svg>`;

type ChevronState = {
  chevronElement: SVGSVGElement;
  startingPlacement: number;
  baseSpeed: number;
  width: number;
  phaseOffsetVariance: number;
  frequencyMultiplier: number;
};

export const createAnimationChevronDrift = ({
  sizedContainer,
  completedCallback,
  isAnimationOnLoad = true,
}: AnimationChevronDriftProps) =>
  (() => {
    let driftAnimationFrameId: number | null = null;
    let hasStarted = false;

    const container = new ElementBuilder()
      .withClassName('chevron-drift-container')
      .withHTML(
        [
          token.color.gold,
          token.color.red,
          token.color.gold,
          token.color.red,
          token.color.gold,
          token.color.red,
        ]
          .map(createChevronSvg)
          .join(''),
      )
      .withStyles({
        element: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 1,
          pointerEvents: 'none',

          [`& .${CLASS_CHEVRON}`]: {
            position: 'absolute',
            top: '50%',
            left: '-150vw',
            transform: 'translateY(-50%)',
            width: 'auto',
            height: 'clamp(339px, 80vw, 714px)',
          },
        },
      });

    const containerEl = container.getElement() as HTMLDivElement;

    const getWindowWidth = () =>
      sizedContainer.clientWidth ||
      window.innerWidth ||
      document.documentElement.clientWidth;

    const getPlacement = () =>
      getWindowWidth() < 768
        ? CHEVRON_PERCENT_OFFSETS.mobile
        : CHEVRON_PERCENT_OFFSETS.tablet;

    const getChevrons = () =>
      Array.from(
        containerEl.querySelectorAll<SVGSVGElement>(`.${CLASS_CHEVRON}`),
      );

    const placeStatically = () => {
      const placement = getPlacement();
      const windowWidth = getWindowWidth();

      getChevrons().forEach((svg, index) => {
        const percent = placement[index % placement.length];
        svg.style.transition = 'none';
        svg.style.left = `${percent * windowWidth}px`;
      });
    };

    const startAnimation = () => {
      if (hasStarted) return;
      hasStarted = true;

      if (isPreferredReducedMotion()) {
        placeStatically();
        completedCallback?.();
        return;
      }

      const chevrons = getChevrons();
      const placement = getPlacement();
      const windowWidth = getWindowWidth();
      const states: ChevronState[] = [];
      let lastTime = performance.now();

      chevrons.forEach((chevron, index) => {
        const percent = placement[index % placement.length];
        const chevronStartingPoint = percent * windowWidth;
        const width = chevron.getBoundingClientRect().width;

        states.push({
          chevronElement: chevron,
          startingPlacement: chevronStartingPoint,
          baseSpeed: BASE_SPEED,
          width,
          phaseOffsetVariance: (index * GOLDEN_ANGLE) % (Math.PI * 2),
          frequencyMultiplier:
            0.7 + 0.6 * (index / Math.max(1, chevrons.length - 1)),
        });

        chevron.style.transition = `left ${CHEVRON_SLIDE_DURATION}ms ease-out ${
          (1.2 - index * 0.2) * 1000
        }ms`;

        setTimeout(() => {
          chevron.style.left = `${chevronStartingPoint}px`;
          chevron.addEventListener(
            'transitionend',
            () => (chevron.style.transition = ''),
            { once: true },
          );
        }, 0);
      });

      const drift = (now: number) => {
        const driftTime = now - lastTime;
        lastTime = now;
        const omega = (2 * Math.PI) / SPEED_VARIANCE_PERIOD_MS;

        states.forEach((state) => {
          const dwellNearExtremes = Math.sin(
            omega * now * state.frequencyMultiplier + state.phaseOffsetVariance,
          );
          const shaped =
            Math.sign(dwellNearExtremes) *
            Math.pow(Math.abs(dwellNearExtremes), SHAPE);
          const factor = 1 + SPEED_VARIANCE_AMPLITUDE * shaped;
          const clamped = Math.max(0.65, Math.min(1.35, factor));

          state.startingPlacement += state.baseSpeed * driftTime * clamped;

          if (state.startingPlacement > getWindowWidth() + state.width) {
            const leftmost = Math.min(...states.map((c) => c.startingPlacement));
            state.startingPlacement = leftmost - state.width - WRAP_GAP;
          }

          state.chevronElement.style.left = `${state.startingPlacement}px`;
        });

        driftAnimationFrameId = requestAnimationFrame(drift);
      };

      // The first chevron carries the longest slide-in delay, so its
      // transitionend marks the end of the entrance sequence.
      chevrons[0].addEventListener(
        'transitionend',
        () => {
          lastTime = performance.now();
          driftAnimationFrameId = requestAnimationFrame(drift);
          completedCallback?.();
        },
        { once: true },
      );
    };

    const eventLoad = () => {
      if (isAnimationOnLoad) {
        startAnimation();
        return;
      }

      const scrollEvent = () => {
        const containerPosition = containerEl.getBoundingClientRect();
        const top = containerPosition.top;

        if (top < window.innerHeight && window.scrollY !== 0) {
          startAnimation();
          window.removeEventListener('scroll', scrollEvent);
        }
      };

      window.addEventListener('scroll', scrollEvent);
    };

    const destroy = () => {
      if (driftAnimationFrameId !== null) {
        cancelAnimationFrame(driftAnimationFrameId);
        driftAnimationFrameId = null;
      }
    };

    const built = container
      .withEvents({ load: eventLoad })
      .build();

    return {
      ...built,
      destroy,
    };
  })();
