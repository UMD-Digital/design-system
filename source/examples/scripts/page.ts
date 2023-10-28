const Alerts = () => {
  const elements = Array.from(document.querySelectorAll('umd-element-alert'));

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

    setTimeout(() => {
      element.setAttribute('type', 'alert');
      element.setAttribute('icon', 'false');
    }, 2000);

    setTimeout(() => {
      element.setAttribute('type', 'emergency');
      element.setAttribute('icon', 'true');
    }, 4000);

    setTimeout(() => {
      element.setAttribute('type', 'notification');
    }, 6000);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  Alerts();
});
