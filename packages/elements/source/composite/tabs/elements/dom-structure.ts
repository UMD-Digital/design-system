const ATTRIBUTE_BUTTON_TITLE = 'data-title';

const ATTRIBUTE_ARIA_EXPANDED = 'aria-expanded';
const ATTRIBUTE_ARIA_CONTROLS = 'aria-controls';

const ELEMENT_TABS_CONTENT_WRAPPER = 'tabs-content-wrapper';
const ELEMENT_TABS_BUTTON_WRAPPER = 'tabs-button-wrapper';

const CreateButtons = ({ tabs }: { tabs: HTMLElement[] }) =>
  tabs.map((tab, index) => {
    const title = tab.getAttribute(ATTRIBUTE_BUTTON_TITLE);

    if (!title) return;

    const tabButtonWrapper = document.createElement('div');
    const tabButton = document.createElement('button');

    tabButton.setAttribute(ATTRIBUTE_ARIA_EXPANDED, 'false');
    tabButton.setAttribute(ATTRIBUTE_ARIA_CONTROLS, index.toString());
    tabButton.innerHTML = title;
    tabButtonWrapper.classList.add(ELEMENT_TABS_BUTTON_WRAPPER);
    tabButtonWrapper.appendChild(tabButton);

    return tabButtonWrapper;
  });

const ModifyTabsDomStrcuture = ({
  markup,
}: {
  markup: Element | HTMLElement | HTMLSlotElement;
}) => {
  const container = document.createElement('div');

  container.innerHTML = markup.innerHTML;
  container.classList.add(ELEMENT_TABS_CONTENT_WRAPPER);

  const tabs = Array.from(
    container.querySelectorAll(':scope > *'),
  ) as HTMLElement[];
  const buttons = CreateButtons({ tabs });

  tabs.forEach((tab, index) => {
    const buttonWrapper = buttons[index] as HTMLDivElement;
    const button = buttonWrapper.querySelector('button');
    if (buttonWrapper) container.insertBefore(buttonWrapper, tab);

    if (button) {
      const ref = `${button.innerHTML.replace(/\s/g, '')}-${index}`;
      button.setAttribute(ATTRIBUTE_ARIA_CONTROLS, ref);
      tab.setAttribute('id', ref);
    }
  });

  return container;
};

export default {
  ModifyElement: ModifyTabsDomStrcuture,
};
