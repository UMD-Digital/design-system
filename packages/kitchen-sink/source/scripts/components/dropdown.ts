require('styles/dependencies/dropdown.css');

const DROPDOWN_SUCCINCT = 'succinct';
const DROPDOWN_NORMAL = 'normal';
const DROPDOWN_VERBOSE = 'verbose';
const DROPDOWN_IDS = [DROPDOWN_SUCCINCT, DROPDOWN_NORMAL, DROPDOWN_VERBOSE];

const SMALL_CONTENT_ELEMENTS = [
  'umd-element-slider-events',
  'umd-element-events-date',
  'umd-element-stat',
];
const MEDIUM_CONTENT_ELEMENTS = [
  'umd-element-accordion-item',
  'umd-element-alert-page',
  'umd-element-alert-site',
];
const LARGE_CONTENT_ELEMENTS = [
  'umd-element-hero',
  'umd-element-hero-minimal',
  'umd-element-hero-logo',
  'umd-element-pathway',
  'umd-element-pathway-highlight',
  'umd-element-carousel-cards',
  'umd-element-quote',
  'umd-element-section-intro',
];

const isTypeInBucket = (element: HTMLElement, bucket: string[]) =>
  bucket.some((name) => name === element.nodeName.toLowerCase());

const HeadlineTextMap = ({
  type,
  element,
}: {
  type?: string;
  element: HTMLElement;
}) => {
  const elementParent = element.parentElement as HTMLElement;
  const isSmallBucket = isTypeInBucket(elementParent, SMALL_CONTENT_ELEMENTS);
  const isMediumBucket = isTypeInBucket(elementParent, MEDIUM_CONTENT_ELEMENTS);
  const isLargeBucket = isTypeInBucket(elementParent, LARGE_CONTENT_ELEMENTS);
  const isLarge = type === DROPDOWN_VERBOSE;
  const isNormal = type === DROPDOWN_NORMAL;
  const isSmall = type === DROPDOWN_SUCCINCT;

  const maxiumString =
    'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Iacut Quis Nostrud Quamie Amet Consectetur Adipiscing Iacute Quis. Quis Nostrud Quamie ';
  let text = maxiumString.slice(0, 20);

  if (isLarge) text = maxiumString.slice(0, 60);
  if (isSmall) text = maxiumString.slice(0, 10);

  if (isLargeBucket && isLarge) text = maxiumString;
  if (isLargeBucket && isNormal) text = maxiumString.slice(0, 80);
  if (isLargeBucket && isSmall) text = maxiumString.slice(0, 40);

  if (isMediumBucket && isLarge) text = maxiumString.slice(0, 60);
  if (isMediumBucket && isNormal) text = maxiumString.slice(0, 30);
  if (isMediumBucket && isSmall) text = maxiumString.slice(0, 8);

  if (isSmallBucket && isLarge) text = maxiumString.slice(0, 100);
  if (isSmallBucket && isNormal) text = maxiumString.slice(0, 50);
  if (isSmallBucket && isSmall) text = maxiumString.slice(0, 8);

  return text;
};

const RichTextMap = ({
  type,
  element,
}: {
  type?: string;
  element: HTMLElement;
}) => {
  const elementParent = element.parentElement as HTMLElement;
  const isSmallBucket = isTypeInBucket(elementParent, SMALL_CONTENT_ELEMENTS);
  const isMediumBucket = isTypeInBucket(elementParent, MEDIUM_CONTENT_ELEMENTS);
  const isLargeBucket = isTypeInBucket(elementParent, LARGE_CONTENT_ELEMENTS);
  const isLarge = type === DROPDOWN_VERBOSE;
  const isNormal = type === DROPDOWN_NORMAL;
  const isSmall = type === DROPDOWN_SUCCINCT;

  const richTextLarge = `<p>Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit <strong>Duis reprehen</strong><i>eu fugiat</i>. Lorem Ipsum Dolor Sit <a href="/">Excepteur occaecat</a>, voluptate Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit voluptate Consectetur Adipiscing Elit</p>`;
  const richTextNormal = `<p>Lorem Ipsum Consectetur Elit <strong>Duis reprehen</strong>. Lorem Ipsum Dolor Sit <a href="/">Excepteur occaecat</a>, voluptate Adipiscing Elit.</p>`;
  const richTextSmall = `<p>Lorem Ipsum Consectetur Adipis <a href="/">Excepteur occaecat</a> Adipiscing Elit Lorem Ipsum Consectetur.</p> `;

  let text = richTextNormal;

  if (isLarge) text = richTextLarge;
  if (isSmall) text = richTextSmall;

  if (isLargeBucket && isLarge) text = `${richTextLarge} ${richTextNormal}`;
  if (isLargeBucket && isNormal) text = `${richTextNormal} ${richTextNormal}`;
  if (isLargeBucket && isSmall) text = `${richTextNormal} ${richTextSmall}`;

  if (isMediumBucket && isLarge) text = `${richTextLarge} ${richTextSmall}`;
  if (isMediumBucket && isNormal) text = `${richTextNormal} ${richTextSmall}`;
  if (isMediumBucket && isSmall) text = richTextSmall;

  if (isSmallBucket && isLarge) text = richTextNormal;
  if (isSmallBucket && isNormal) text = richTextSmall;
  if (isSmallBucket && isSmall) text = richTextSmall;

  return text;
};

const BodyTextMap = ({
  type,
  element,
}: {
  type?: string;
  element: HTMLElement;
}) => {
  const elementParent = element.parentElement as HTMLElement;
  const isSmallBucket = isTypeInBucket(elementParent, SMALL_CONTENT_ELEMENTS);
  const isMediumBucket = isTypeInBucket(elementParent, MEDIUM_CONTENT_ELEMENTS);
  const isLargeBucket = isTypeInBucket(elementParent, LARGE_CONTENT_ELEMENTS);
  const isLarge = type === DROPDOWN_VERBOSE;
  const isNormal = type === DROPDOWN_NORMAL;
  const isSmall = type === DROPDOWN_SUCCINCT;

  const maxiumString =
    'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Iacut Quis Nostrud Quamie Amet Consectetur Adipiscing Iacute Quis. Quis Nostrud Quamie   Quis Nostrud Quamie Amet Consectetur Adipiscing Iacute Quis. Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Iacut Quis Nostrud Quamie Amet Consectetur Adipiscing Iacute Quis. Quis Nostrud Quamie   Quis Nostrud Quamie Amet Consectetur Adipiscing Iacute Quis.';
  let text = maxiumString.slice(0, 100);

  if (isLarge) text = maxiumString.slice(0, 200);
  if (isSmall) text = maxiumString.slice(0, 50);

  if (isLargeBucket && isLarge) text = maxiumString.slice(0, 400);
  if (isLargeBucket && isNormal) text = maxiumString.slice(0, 200);
  if (isLargeBucket && isSmall) text = maxiumString.slice(0, 140);

  if (isMediumBucket && isLarge) text = maxiumString.slice(0, 250);
  if (isMediumBucket && isNormal) text = maxiumString.slice(0, 170);
  if (isMediumBucket && isSmall) text = maxiumString.slice(0, 100);

  if (isSmallBucket && isLarge) text = maxiumString.slice(0, 140);
  if (isSmallBucket && isNormal) text = maxiumString.slice(0, 80);
  if (isSmallBucket && isSmall) text = maxiumString.slice(0, 60);

  return text;
};

const HeadlineSlot = ({ type }: { type?: string }) => {
  const headlineSlots = Array.from(
    document.querySelectorAll('[slot="headline"]'),
  ) as HTMLSlotElement[];

  headlineSlots.forEach((slot) => {
    const text = HeadlineTextMap({ type, element: slot });
    const hasLink = slot.querySelector('a') || slot.nodeName === 'A';
    const setSlot = (content: string) => {
      slot.innerHTML = `${content}`;
    };

    if (hasLink) {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = text;
      setSlot(link.outerHTML);
    } else {
      setSlot(text);
    }
  });
};

const RichTextSlot = ({ type }: { type?: string }) => {
  const bodySlots = Array.from(
    document.querySelectorAll('[slot="body"]'),
  ) as HTMLSlotElement[];
  const textSlots = Array.from(
    document.querySelectorAll('[slot="text"]'),
  ) as HTMLSlotElement[];
  const slots = [...bodySlots, ...textSlots];
  let text = '';

  slots.forEach((slot) => {
    const isRichText = slot.classList.contains('umd-rich-text');
    const setSlot = (content: string) => {
      slot.innerHTML = `${content}`;
    };

    if (isRichText) {
      text = RichTextMap({ type, element: slot });
    } else {
      text = BodyTextMap({ type, element: slot });
    }

    setSlot(text);
  });
};

const Eyebrow = ({ type }: { type?: string }) => {
  const isLarge = type === DROPDOWN_VERBOSE;
  const isSmall = type === DROPDOWN_SUCCINCT;
  const slots = Array.from(
    document.querySelectorAll('[slot="eyebrow"]'),
  ) as HTMLSlotElement[];

  const textLarge = 'Optional Eyebrow Long Text';
  const textNormal = 'Optional Eyebrow';
  const textSmall = 'Optional';
  let text = textNormal;

  if (isLarge) text = textLarge;
  if (isSmall) text = textSmall;

  slots.forEach((slot) => {
    const setSlot = (content: string) => {
      slot.innerHTML = `${content}`;
    };

    setSlot(text);
  });
};

const ContentOptionsWithJS = () => {
  const dropdown = document.getElementById(
    'content-variation-js',
  ) as HTMLSelectElement | null;

  if (!dropdown) return;

  const UpdateSlotContent = () => {
    const type = dropdown.value;
    HeadlineSlot({ type });
    RichTextSlot({ type });
    Eyebrow({ type });
  };

  if (dropdown) {
    dropdown.addEventListener('change', () => {
      UpdateSlotContent();
    });
  }

  UpdateSlotContent();
};

// To Be Removed when elements are refactored to JS

const ElementNames = [
  'umd-element-carousel-cards',
  'umd-element-events-date-slider',
];

const ShowSubElements = ({ container }: { container: HTMLElement }) => {
  const hiddenElements = Array.from(
    container.querySelectorAll('[resize]'),
  ) as HTMLDivElement[];

  hiddenElements.forEach((element) => {
    const isTogglableElement = ElementNames.some(
      (name) => name === element.nodeName.toLowerCase(),
    );

    if (isTogglableElement) {
      element.setAttribute('resize', 'true');
    }

    // Edge Case for Accordion

    if (element.nodeName.toLowerCase() === 'umd-element-accordion-item') {
      const isOpen = element.getAttribute('state') === 'open';
      if (isOpen) {
        element.setAttribute('resize', 'true');
      }
    }
  });
};

const UpdateHTMLSlotContent = () => {
  const dropdownSelection = document.getElementById(
    'content-variation',
  ) as HTMLSelectElement | null;

  const toggleContentVisibility = (selectedId: string): void => {
    const selectedContainer = document.getElementById(
      selectedId,
    ) as HTMLDivElement;

    const display = () => {
      DROPDOWN_IDS.forEach((id) => {
        const container = document.getElementById(id) as HTMLDivElement;

        if (selectedContainer !== container) {
          container.setAttribute('aria-hidden', 'true');
        } else {
          container.setAttribute('aria-hidden', 'false');
          ShowSubElements({ container });
        }
      });
    };

    if (selectedContainer) display();
  };

  if (dropdownSelection) {
    dropdownSelection.addEventListener('change', (event: Event) => {
      const selectElement = event.target as HTMLSelectElement;
      toggleContentVisibility(selectElement.value);
    });
  }
};

export default () => {
  ContentOptionsWithJS();
  UpdateHTMLSlotContent();
};
