//   if (isTypeFeatured) {
//     if (entries.length >= 3) {
//       const entriesCopy = entries.slice(0, 3);

//       const overlayCard = Composite.card.overlay.image({
//         ...CommonDisplay({ entry: entriesCopy[0], isThemeDark }),
//         backgroundImage: CreateImage({ images: entriesCopy[0].image }),
//       })?.element;

//       if (overlayCard) {
//         overlayCard.classList.add('umd-grid-column-double');
//         overlayCard.classList.add('size-large');
//       }

//       entriesCopy.shift();

//       const standardCards = entriesCopy.map((entry) =>
//         standardCardType({ entry }),
//       );

//       return [overlayCard, ...standardCards];
//     } else {
//       return entries.map((entry) => standardCardType({ entry }));
//     }
//   }
