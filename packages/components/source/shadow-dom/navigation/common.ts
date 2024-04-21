import { MarkupCreate } from 'utilities';
import { NavigationElements } from 'elements';

const { Node } = MarkupCreate;

export const SLOTS = {
  PRIMARY_SLIDE_LINKS: 'primary-slide-links',
  PRIMARY_SLIDE_SECONDARY_LINKS: 'primary-slide-secondary-links',
  PRIMARY_SLIDE_CONTENT: 'primary-slide-content',
  CHILDREN_SLIDES: 'children-slides',
};

type TypeSliderRequirements = {
  element: HTMLElement;
  PRIMARY_SLIDE_CONTENT: string;
  PRIMARY_SLIDE_LINKS: string;
  PRIMARY_SLIDE_SECONDARY_LINKS: string;
  CHILDREN_SLIDES: string;
};

type TypeNavDrawerRequirements = TypeSliderRequirements & {
  displayType?: string;
};

export const MakeSliderData = ({
  element,
  PRIMARY_SLIDE_CONTENT,
  PRIMARY_SLIDE_LINKS,
  PRIMARY_SLIDE_SECONDARY_LINKS,
  CHILDREN_SLIDES,
}: TypeSliderRequirements) => {
  const primarySlideSlot = element.querySelector(
    `[slot="${PRIMARY_SLIDE_CONTENT}"]`,
  ) as HTMLSlotElement;
  const primarySlideLinks = element.querySelector(
    `[slot="${PRIMARY_SLIDE_LINKS}"]`,
  ) as HTMLSlotElement;
  const primarySlidesSecondaryLinks = element.querySelector(
    `[slot="${PRIMARY_SLIDE_SECONDARY_LINKS}"]`,
  ) as HTMLSlotElement;
  const childrenSlides = element.querySelector(
    `[slot="${CHILDREN_SLIDES}"]`,
  ) as HTMLSlotElement;
  const hasPrimarySlideContent =
    primarySlideSlot && primarySlideSlot.children.length > 0;
  const primarySlideContent = hasPrimarySlideContent
    ? Node.slot({
        type: PRIMARY_SLIDE_CONTENT,
      })
    : null;

  return {
    primarySlideLinks,
    primarySlidesSecondaryLinks,
    childrenSlides,
    primarySlideContent,
  };
};

export const MakeNavDrawer = (props: TypeNavDrawerRequirements) => {
  const { element, displayType } = props;
  return NavigationElements.Drawer.CreateElement({
    ...MakeSliderData(props),
    context: element,
    displayType,
  });
};

export const MakeNavSlider = (props: TypeSliderRequirements) =>
  NavigationElements.Slider.CreateElement({
    ...MakeSliderData(props),
    displayType: 'interior-nav',
  });
