// const DisplayEntries = (props: TypeDisplayEntries) => {
//   const {
//     isTypeGrid,
//     isTypeOverlay,
//     isTypeFeatured,
//     getContainer,
//     setOffset,
//     feedData,
//     isThemeDark,
//     isTransparent,
//     isLayoutReversed,
//   } = props;
//   const container = getContainer();
//   const grid = container.querySelector(
//     `#${ID_GRID_LAYOUT_CONTAINER}`,
//   ) as HTMLDivElement;

//   const displayEntries = FeedDisplay.CreateElement({
//     entries: feedData,
//     isTypeGrid,
//     isTypeOverlay,
//     isTypeFeatured,
//     isThemeDark,
//     isTransparent,
//   });

//   setOffset(displayEntries.length);

//   if (isLayoutReversed) grid.setAttribute('data-reversed', '');

//   feedElements.loader.remove({ container });
//   feedElements.buttonLazyLoad.remove({ container });
//   displayEntries.forEach((entry) => {
//     if (entry) grid.appendChild(entry);
//   });
//   feedElements.buttonLazyLoad.display(MakeLazyLoadVariables(props));
// };

// const LoadMoreEntries = async (props: TypeFeedProps) => {
//   const { getContainer, getOffset } = props;
//   const container = getContainer();
//   const currentCount = getOffset();

//   feedElements.buttonLazyLoad.remove({ container });
//   feedElements.loader.display({ container });
//   Fetch.Entries({
//     variables: MakeApiVariables(props),
//   }).then((feedData) => {
//     DisplayEntries({ ...props, feedData: feedData.entries });

//     feedElements.ariaLive.update({
//       container,
//       message: `Showing ${
//         currentCount + feedData.entries.length
//       } of ${props.getTotalEntries()} articles`,
//     });
//   });
// };

// const CreateFeed = async (props: TypeFeedProps) => {
//   const {
//     getContainer,
//     numberOfColumnsToShow,
//     setTotalEntries,
//     isTypeOverlay,
//     isLazyLoad,
//   } = props;
//   const container = getContainer();
//   let count = 1;
//   let isTypeGap = true;

//   if (numberOfColumnsToShow) {
//     count = numberOfColumnsToShow;
//   }

//   Fetch.Entries({
//     variables: MakeApiVariables(props),
//   }).then((feedData) => {
//     const totalEntries = feedData.count;

//     if (totalEntries === 0) {
//       feedElements.noResults.display({ container, ...NoResultsContent });
//       container.appendChild(
//         feedElements.ariaLive.create({
//           message: NoResultsContent.message,
//         }),
//       );

//       return;
//     }

//     const showAmount = count * props.numberOfRowsToStart;
//     const message = isLazyLoad
//       ? `Showing ${showAmount} of ${totalEntries} articles`
//       : `Showing ${showAmount} articles`;

//     if (isTypeOverlay) isTypeGap = false;

//     setTotalEntries(totalEntries);

//     const grid = feedElements.grid({ count, isTypeGap });
//     grid.element.setAttribute('id', ID_GRID_LAYOUT_CONTAINER);
//     container.appendChild(grid.element);
//     // styles += grid.styles;
//     DisplayEntries({ ...props, feedData: feedData.entries });

//     container.appendChild(
//       feedElements.ariaLive.create({
//         message,
//       }),
//     );
//   });
// };
