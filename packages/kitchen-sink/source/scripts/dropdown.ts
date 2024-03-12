require('styles/dependencies/dropdown.css');

const ElementNames = [
  'umd-element-carousel-cards',
  'umd-element-events-date-slider',
];

const HideSubElements = ({ container }: { container: HTMLElement }) => {
  const hiddenElements = Array.from(
    container.querySelectorAll(`[aria-hidden]`),
  ) as HTMLDivElement[];

  hiddenElements.forEach((element) => {
    const isTogglableElement = ElementNames.some(
      (name) => name === element.nodeName.toLowerCase(),
    );

    if (isTogglableElement) {
      element.setAttribute('aria-hidden', 'true');
    }
  });
};

const ShowSubElements = ({ container }: { container: HTMLElement }) => {
  const hiddenElements = Array.from(
    container.querySelectorAll(`[aria-hidden]`),
  ) as HTMLDivElement[];

  hiddenElements.forEach((element) => {
    const isTogglableElement = ElementNames.some(
      (name) => name === element.nodeName.toLowerCase(),
    );

    if (isTogglableElement) {
      element.setAttribute('aria-hidden', 'false');
    }

    // Edge Case for Accordion

    if (element.nodeName.toLowerCase() === 'umd-element-accordion-item') {
      const isOpen = element.hasAttribute('isopen');
      if (isOpen) element.setAttribute('aria-hidden', 'false');
    }
  });
};

const DropdownVariations = () => {
  const dropdownSelection = document.getElementById(
    'content-variation',
  ) as HTMLSelectElement | null;

  const toggleContentVisibility = (selectedId: string): void => {
    const selectedContainer = document.getElementById(
      selectedId,
    ) as HTMLDivElement;

    const display = () => {
      const ID_SUCCINCT = 'content-succinct';
      const ID_NORMAL = 'content-normal';
      const ID_VERBOSE = 'content-verbose';
      const IDS = [ID_SUCCINCT, ID_NORMAL, ID_VERBOSE];

      IDS.forEach((id) => {
        const container = document.getElementById(id) as HTMLDivElement;

        if (selectedContainer !== container) {
          container.setAttribute('aria-hidden', 'true');
          HideSubElements({ container });
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

document.addEventListener('DOMContentLoaded', () => {
  DropdownVariations();
});
