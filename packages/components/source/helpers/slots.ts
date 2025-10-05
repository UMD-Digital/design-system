export const observer = ({
  element,
  shadowDom,
  slots,
  createShadowDom,
}: {
  element: HTMLElement;
  shadowDom: ShadowRoot;
  slots: { [key: string]: string };
  createShadowDom: ({ element }: { element: any }) => void;
}) => {
  const isProduction = process?.env?.NODE_ENV === 'production';

  if (isProduction) return;

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      const ReloadElement = () => {
        shadowDom.innerHTML = '';
        createShadowDom({ element });
      };

      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'styled') {
          ReloadElement();
        }
      }

      if (mutation.type === 'childList') {
        ReloadElement();
      }
    });
  });

  Object.values(slots).forEach((slotName) => {
    const slot = element.querySelector(
      `[slot="${slotName}"]`,
    ) as HTMLSlotElement;

    if (slot) {
      observer.observe(slot, { attributes: true, childList: true });
    }
  });
};
