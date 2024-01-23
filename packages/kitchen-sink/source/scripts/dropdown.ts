require('styles/dependencies/dropdown.css');

const DropdownVariations = () => {
  const ID_SUCCINCT = 'content-succinct';
  const ID_NORMAL = 'content-normal';
  const ID_VERBOSE = 'content-verbose';
  const IDS = [ID_SUCCINCT, ID_NORMAL, ID_VERBOSE];

  const hideAllContent = (): void => {
    IDS.forEach((id: string) => {
      const contentDiv: HTMLElement | null = document.getElementById(id);
      if (contentDiv) {
        contentDiv.setAttribute('aria-hidden', 'true');
      }
    });
  };

  const toggleContentVisibility = (selectedId: string): void => {
    hideAllContent();

    const selectedContentDiv: HTMLElement | null =
      document.getElementById(selectedId);
    if (selectedContentDiv) {
      selectedContentDiv.setAttribute('aria-hidden', 'false');
    }
  };

  const dropdownSelection = document.getElementById(
    'content-variation',
  ) as HTMLSelectElement | null;

  if (dropdownSelection) {
    toggleContentVisibility(dropdownSelection.value);

    dropdownSelection.addEventListener('change', (event: Event) => {
      const selectElement = event.target as HTMLSelectElement;
      toggleContentVisibility(selectElement.value);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DropdownVariations();
});
