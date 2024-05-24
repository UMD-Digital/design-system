require('styles/dependencies/dropdown.css');

const DROPDOWN_SUCCINCT = 'succinct';
const DROPDOWN_NORMAL = 'normal';
const DROPDOWN_VERBOSE = 'verbose';

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
  const isVerbose = type === DROPDOWN_VERBOSE;
  const isNormal = type === DROPDOWN_NORMAL;
  const isSuccinct = type === DROPDOWN_SUCCINCT;

  const maxiumString =
    'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Iacut Quis Nostrud Quamie Amet Consectetur Adipiscing Iacute Quis. Quis Nostrud Quamie ';
  let text = maxiumString.slice(0, 20);

  if (isVerbose) text = maxiumString.slice(0, 60);
  if (isSuccinct) text = maxiumString.slice(0, 10);

  if (isLargeBucket && isVerbose) text = maxiumString.slice(0, 60);
  if (isLargeBucket && isNormal) text = maxiumString.slice(0, 30);
  if (isLargeBucket && isSuccinct) text = maxiumString.slice(0, 8);

  if (isMediumBucket && isVerbose) text = maxiumString.slice(0, 110);
  if (isMediumBucket && isNormal) text = maxiumString.slice(0, 60);
  if (isMediumBucket && isSuccinct) text = maxiumString.slice(0, 20);

  if (isSmallBucket && isVerbose) text = maxiumString.slice(0, 100);
  if (isSmallBucket && isNormal) text = maxiumString.slice(0, 50);
  if (isSmallBucket && isSuccinct) text = maxiumString.slice(0, 8);

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
  const isVerbose = type === DROPDOWN_VERBOSE;
  const isNormal = type === DROPDOWN_NORMAL;
  const isSuccinct = type === DROPDOWN_SUCCINCT;

  const richTextLarge = `<p>Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit <strong>Duis reprehen</strong><i>eu fugiat</i>. Lorem Ipsum Dolor Sit <a href="/">Excepteur occaecat</a>, voluptate Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit voluptate Consectetur Adipiscing Elit</p>`;
  const richTextNormal = `<p>Lorem Ipsum Consectetur Elit <strong>Duis reprehen</strong>. Lorem Ipsum Dolor Sit <a href="/">Excepteur occaecat</a>, voluptate Adipiscing Elit.</p>`;
  const richTextSmall = `<p>Lorem Ipsum Consectetur Adipis <a href="/">Excepteur occaecat</a> Adipiscing Elit Lorem Ipsum Consectetur.</p> `;

  let text = richTextNormal;

  if (isVerbose) text = richTextLarge;
  if (isSuccinct) text = richTextSmall;

  if (isLargeBucket && isVerbose) text = `${richTextLarge} ${richTextNormal}`;
  if (isLargeBucket && isNormal) text = `${richTextNormal} ${richTextNormal}`;
  if (isLargeBucket && isSuccinct) text = `${richTextNormal} ${richTextSmall}`;

  if (isMediumBucket && isVerbose) text = `${richTextLarge} ${richTextSmall}`;
  if (isMediumBucket && isNormal) text = `${richTextNormal} ${richTextSmall}`;
  if (isMediumBucket && isSuccinct) text = richTextSmall;

  if (isSmallBucket && isVerbose) text = richTextNormal;
  if (isSmallBucket && isNormal) text = richTextSmall;
  if (isSmallBucket && isSuccinct) text = richTextSmall;

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
  const isVerbose = type === DROPDOWN_VERBOSE;
  const isNormal = type === DROPDOWN_NORMAL;
  const isSuccinct = type === DROPDOWN_SUCCINCT;

  const maxiumString =
    'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Iacut Quis Nostrud Quamie Amet Consectetur Adipiscing Iacute Quis. Quis Nostrud Quamie   Quis Nostrud Quamie Amet Consectetur Adipiscing Iacute Quis. Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Iacut Quis Nostrud Quamie Amet Consectetur Adipiscing Iacute Quis. Quis Nostrud Quamie   Quis Nostrud Quamie Amet Consectetur Adipiscing Iacute Quis.';
  let text = maxiumString.slice(0, 100);

  if (isVerbose) text = maxiumString.slice(0, 200);
  if (isSuccinct) text = maxiumString.slice(0, 50);

  if (isLargeBucket && isVerbose) text = maxiumString.slice(0, 700);
  if (isLargeBucket && isNormal) text = maxiumString.slice(0, 300);
  if (isLargeBucket && isSuccinct) text = maxiumString.slice(0, 10);

  if (isMediumBucket && isVerbose) text = maxiumString.slice(0, 500);
  if (isMediumBucket && isNormal) text = maxiumString.slice(0, 250);
  if (isMediumBucket && isSuccinct) text = maxiumString.slice(0, 20);

  if (isSmallBucket && isVerbose) text = maxiumString.slice(0, 400);
  if (isSmallBucket && isNormal) text = maxiumString.slice(0, 200);
  if (isSmallBucket && isSuccinct) text = maxiumString.slice(0, 10);

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
  const isVerbose = type === DROPDOWN_VERBOSE;
  const isSuccinct = type === DROPDOWN_SUCCINCT;
  const slots = Array.from(
    document.querySelectorAll('[slot="eyebrow"]'),
  ) as HTMLSlotElement[];

  const textVerbose = 'Optional Eyebrow Long Text';
  const textNormal = 'Optional Eyebrow';
  const textSuccinct = 'Optional';
  let text = textNormal;

  if (isVerbose) text = textVerbose;
  if (isSuccinct) text = textSuccinct;

  slots.forEach((slot) => {
    const setSlot = (content: string) => {
      slot.innerHTML = `${content}`;
    };

    setSlot(text);
  });
};

const ContentOptions = () => {
  const dropdown = document.getElementById(
    'content-variation-js',
  ) as HTMLSelectElement | null;

  const UpdateSlotContent = () => {
    const type = dropdown ? dropdown.value : DROPDOWN_NORMAL;
    HeadlineSlot({ type });
    RichTextSlot({ type });
    Eyebrow({ type });
  };

  if (dropdown) {
    dropdown.addEventListener('change', UpdateSlotContent);
  }

  UpdateSlotContent();
};

export default () => {
  ContentOptions();
};
