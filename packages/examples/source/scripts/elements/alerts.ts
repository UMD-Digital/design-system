export const AlertsTest = () => {
  const elements = Array.from(document.querySelectorAll('umd-element-alert'));
  const firstElement = elements[0];

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes') {
        if (mutation.attributeName === 'closed') {
          console.log('closed callback received');
        }
      }
    });
  });

  elements.forEach((element) => {
    observer.observe(element, { attributes: true });
  });

  if (firstElement) {
    setTimeout(() => {
      firstElement.setAttribute('type', 'alert');
      firstElement.setAttribute('icon', 'false');
    }, 2000);

    setTimeout(() => {
      firstElement.setAttribute('type', 'emergency');
      firstElement.setAttribute('icon', 'true');
    }, 4000);

    setTimeout(() => {
      firstElement.setAttribute('type', 'notification');
    }, 6000);
  }
};
