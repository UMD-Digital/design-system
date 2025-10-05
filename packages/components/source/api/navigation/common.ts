import { navigation } from '@universityofmaryland/web-elements-library/composite';
import { createSlot } from '@universityofmaryland/web-utilities-library/elements';

const DRAWER_SLOTS = {
  PRIMARY_SLIDE_LINKS: 'primary-slide-links',
  PRIMARY_SLIDE_SECONDARY_LINKS: 'primary-slide-secondary-links',
  PRIMARY_SLIDE_CONTENT: 'primary-slide-content',
  CHILDREN_SLIDES: 'children-slides',
};

export const SLOTS = {
  ...DRAWER_SLOTS,
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
  const allSlots = Array.from(element.querySelectorAll(':scope > [slot]'));

  const primarySlideSlot = allSlots.find(
    (slot) => slot.getAttribute('slot') === PRIMARY_SLIDE_CONTENT,
  ) as HTMLSlotElement;
  const primarySlideLinksSlot = allSlots.find(
    (slot) => slot.getAttribute('slot') === PRIMARY_SLIDE_LINKS,
  ) as HTMLSlotElement;
  const primarySlidesSecondaryLinksSlot = allSlots.find(
    (slot) => slot.getAttribute('slot') === PRIMARY_SLIDE_SECONDARY_LINKS,
  ) as HTMLSlotElement;
  const childrenSlidesSlot = allSlots.find(
    (slot) => slot.getAttribute('slot') === CHILDREN_SLIDES,
  ) as HTMLSlotElement;

  const childrenSlotContent = allSlots.filter((element) => {
    return !Object.values(DRAWER_SLOTS).find(
      (value) => value == element.getAttribute('slot'),
    );
  });

  const hasPrimarySlideContent =
    primarySlideSlot && primarySlideSlot.children.length > 0;
  const primarySlideContent = hasPrimarySlideContent
    ? createSlot(PRIMARY_SLIDE_CONTENT)
    : null;

  let primarySlideLinks;
  let primarySlidesSecondaryLinks;
  let childrenSlides;
  let childrenSlideContent: Array<HTMLSlotElement> = [];

  if (primarySlideLinksSlot) {
    primarySlideLinks = primarySlideLinksSlot.cloneNode(true) as HTMLElement;
  }

  if (primarySlidesSecondaryLinksSlot) {
    primarySlidesSecondaryLinks = primarySlidesSecondaryLinksSlot.cloneNode(
      true,
    ) as HTMLElement;
  }

  if (childrenSlidesSlot) {
    childrenSlides = childrenSlidesSlot.cloneNode(true) as HTMLElement;
  }

  if (childrenSlotContent) {
    childrenSlotContent.forEach((element) => {
      const type = element.getAttribute('slot');
      if (type) {
        const reference = createSlot(type);
        childrenSlideContent.push(reference);
      }
    });
  }

  return {
    primarySlideLinks,
    primarySlidesSecondaryLinks,
    childrenSlides,
    primarySlideContent,
    childrenSlideContent,
  };
};

export const MakeNavDrawer = (props: TypeNavDrawerRequirements) => {
  const { element, displayType } = props;
  return navigation.elements.drawer.CreateElement({
    ...MakeSliderData(props),
    context: element,
    displayType,
  });
};

export const MakeNavSlider = (props: TypeSliderRequirements) =>
  navigation.elements.slider.CreateElement({
    ...MakeSliderData(props),
    displayType: 'interior-nav',
  });
