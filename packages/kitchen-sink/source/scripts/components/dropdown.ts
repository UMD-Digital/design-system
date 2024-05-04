require('styles/dependencies/dropdown.css');

const DROPDOWN_SUCCINCT = 'succinct';
const DROPDOWN_NORMAL = 'normal';
const DROPDOWN_VERBOSE = 'verbose';
const DROPDOWN_IDS = [DROPDOWN_SUCCINCT, DROPDOWN_NORMAL, DROPDOWN_VERBOSE];

const HeadlineSlot = ({ type }: { type?: string }) => {
  const isLarge = type === DROPDOWN_VERBOSE;
  const isSmall = type === DROPDOWN_SUCCINCT;
  const headlineSlots = Array.from(
    document.querySelectorAll('[slot="headline"]'),
  ) as HTMLSlotElement[];
  const textLarge =
    'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Iacut Quis Nostrud Quamie Amet Consectetur Adipiscing Iacute Quis';
  const textNormal = 'Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit ';
  const textSmall = 'Lorem Ipsum Dolor Sit Amet ';
  let text = textNormal;

  if (isLarge) text = textLarge;
  if (isSmall) text = textSmall;

  headlineSlots.forEach((slot) => {
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
  const isLarge = type === DROPDOWN_VERBOSE;
  const isSmall = type === DROPDOWN_SUCCINCT;
  const bodySlots = Array.from(
    document.querySelectorAll('[slot="body"]'),
  ) as HTMLSlotElement[];
  const textSlots = Array.from(
    document.querySelectorAll('[slot="text"]'),
  ) as HTMLSlotElement[];
  const slots = [...bodySlots, ...textSlots];

  const richTextLarge = `<p>Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit <strong>Duis reprehen</strong><i>eu fugiat</i>. Lorem Ipsum Dolor Sit <a href="/">Excepteur occaecat</a>, voluptate Consectetur Adipiscing Elit. Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit voluptate Consectetur Adipiscing Elit</p><p>Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Lorem Ipsum Dolor Sit Amet Consectetur</p>`;
  const richTextNormal = `<p>Lorem Ipsum Consectetur Adipiscing Elit <strong>Duis reprehen</strong> Adipiscing <i>eu fugiat</i>. Lorem Ipsum Dolor Sit <a href="/">Excepteur occaecat</a>, voluptate Adipiscing Elit.</p>`;
  const richTextSmall = `<p>Lorem Ipsum Consectetur Adipis <a href="/">Excepteur occaecat</a> Adipiscing Elit.</p>`;
  const textLarge =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Heri, inquam, ludis commissis ex urbe profectus veni ad vesperum. Fortitudinis quaedam praecepta sunt ac paene leges, quae effeminari virum vetant in dolore. Ut optime, secundum naturam affectum esse possit. Quis tibi ergo istud dabit praeter Pyrrhonem, Aristonem eorumve similes, quos tu non probas? ';
  const textNormal =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.';
  const textSmall =
    'Lorem Ipsum Dolor Sit Amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ';
  let text = textNormal;

  if (isLarge) text = textLarge;
  if (isSmall) text = textSmall;

  slots.forEach((slot) => {
    const isRichText = slot.classList.contains('umd-rich-text');
    const setSlot = (content: string) => {
      slot.innerHTML = `${content}`;
    };

    if (isRichText) {
      text = isLarge ? richTextLarge : isSmall ? richTextSmall : richTextNormal;
    }

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
