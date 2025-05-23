import * as Styles from '@universityofmaryland/web-styles-library';
import {
  Atomic,
  Composite,
  Utilities,
} from '@universityofmaryland/web-elements-library';

type TypeSlideFeedResponse = {
  title: string;
  startMonth: string;
  startDay: string;
  endMonth?: string;
  endDay?: string;
};

const { FetchGraphQL } = Utilities.network;

export default ({
  token,
  query,
  url,
  categories,
  isThemeDark,
  headline,
  actions,
}: {
  token: string;
  query: string;
  url: string;
  categories?: string | null;
  isThemeDark?: boolean;
  headline?: HTMLElement | null;
  actions?: HTMLElement | null;
}) => {
  const dataSlider = document.createElement('div');
  const slider = Composite.slider.events({
    isThemeDark,
    dataSlider,
    headline,
    actions,
  });
  let variables: any = { startDate: new Date().toDateString() };
  let shadowRoot: ShadowRoot | null = null;

  const setShadowStyles = async ({
    shadowRoot,
    styles,
  }: {
    shadowRoot: ShadowRoot;
    styles: string;
  }) => {
    const styleElement = document.createElement('style');
    const optimizedCss = await Styles.utilities.transform.css.removeDuplicates(
      styles,
    );
    styleElement.textContent = optimizedCss;
    shadowRoot.appendChild(styleElement);
  };

  const callback = (shadow: ShadowRoot) => {
    shadowRoot = shadow;
  };

  const loadEvents = async () => {
    if (categories) {
      const related = categories.split(',');
      variables.related = related;
    }

    const fetchVariables = {
      query,
      url,
      token,
      variables,
    };

    const feedData = await FetchGraphQL(fetchVariables);

    const slides: { element: HTMLElement; styles: string }[] =
      feedData?.data?.entries?.events.map(
        (data: TypeSlideFeedResponse, i: number) => {
          const headline = document.createElement('p');
          headline.textContent = data.title;

          const dateSign = Atomic.events.sign({
            startMonth: data.startMonth,
            startDay: data.startDay,
            endDay: data.endDay,
            endMonth: data.endMonth,
            isThemeDark,
          });
          const textLockup = Atomic.textLockup.date({
            headline,
            isThemeDark,
            dateSign,
          });

          if (i === 0) {
            slider.styles += textLockup.styles;
            slider.styles += dateSign.styles;
          }

          return textLockup;
        },
      );

    slides?.forEach((slide) => dataSlider.appendChild(slide.element));

    if (shadowRoot) setShadowStyles({ shadowRoot, styles: slider.styles });
    setTimeout(() => {
      slider.events.load();
    }, 100);
  };

  loadEvents();

  return {
    ...slider,
    events: {
      callback,
    },
  };
};
