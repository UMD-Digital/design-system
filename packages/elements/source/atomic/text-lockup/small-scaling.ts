// import * as Styles from '@universityofmaryland/web-styles-library';
// import * as Utility from 'utilities';
// import { ElementModel } from 'model';
// import {
//   createEyebrow,
//   createActions,
//   eyebrowStyles,
//   headlineStyles,
//   textStyles,
//   dateStyles,
// } from './small';

// export type TypeTextLockupSmallScaling = {
//   headline?: HTMLElement | null;
//   eyebrow?: HTMLElement | null;
//   text?: HTMLElement | null;
//   date?: HTMLElement | null;
//   actions?: HTMLElement | null;
//   isThemeDark?: boolean;
// };

// const ELEMENT_SCALABLE_FONT_CONTAINER = 'scaling-font-block-container';

// const containerStyles = {
//   className: ELEMENT_SCALABLE_FONT_CONTAINER,
//   container: 'inline-size',
//   zIndex: '9',
//   position: 'relative',
// };

// const eyebrowStyleObject = Styles.typography.elements.fonts.eyebrow;
// const headlineStyleObject = Styles.typography.sans.scalingFonts.larger;
// const textStyleObject = Styles.element.text.rich.simpleScaling;
// const dateStyleObject = Styles.typography.sans.scalingFonts.min;
// const actionStyleObject = Styles.layout.grid.inline.tabletRows;

// export const styles = `
//   ${Utility.styles.getStyleStringFromJssObject(eyebrowStyleObject)}
//   ${Utility.styles.getStyleStringFromJssObject(headlineStyleObject)}
//   ${Utility.styles.getStyleStringFromJssObject(textStyleObject)}
//   ${Utility.styles.getStyleStringFromJssObject(dateStyleObject)}
//   ${Utility.styles.getStyleStringFromJssObject(actionStyleObject)}

//   ${Utility.styles.parseNestedJSStoCSS(
//     eyebrowStyles,
//     eyebrowStyleObject.className,
//   )}

//   ${Utility.styles.parseNestedJSStoCSS(
//     headlineStyles,
//     headlineStyleObject.className,
//   )}

//   ${Utility.styles.parseNestedJSStoCSS(textStyles, textStyleObject.className)}
//   ${Utility.styles.parseNestedJSStoCSS(dateStyles, dateStyleObject.className)}
// `;

// export const elements = {
//   container: ELEMENT_SCALABLE_FONT_CONTAINER,
//   eyebrow: eyebrowStyleObject.className,
//   headline: headlineStyleObject.className,
//   text: textStyleObject.className,
//   date: dateStyleObject.className,
//   actions: actionStyleObject.className,
// };

// export default ({
//   eyebrow,
//   headline,
//   text,
//   actions,
//   date,
//   isThemeDark,
// }: TypeTextLockupSmallScaling) => {
//   const container = document.createElement('div');
//   let styles = `
//     ${Utility.styles.getStyleStringFromJssObject(containerStyles)}
//   `;

//   container.classList.add(ELEMENT_SCALABLE_FONT_CONTAINER);

//   if (eyebrow) {
//     const styledEyebrow = createEyebrow({ eyebrow, isThemeDark });
//     container.appendChild(styledEyebrow.element);
//     styles += styledEyebrow.styles;
//   }

//   if (headline) {
//     const styledHeadline = ElementModel.headline.sansScalingLarge({
//       element: headline,
//       elementStyles: headlineStyles,
//       isThemeDark,
//     });
//     container.appendChild(styledHeadline.element);
//     styles += styledHeadline.styles;
//   }

//   if (text) {
//     const styledText = ElementModel.richText.simpleScaling({
//       element: text,
//       elementStyles: textStyles,
//       isThemeDark,
//     });

//     container.appendChild(styledText.element);
//     styles += styledText.styles;
//   }

//   if (date) {
//     const styledDate = ElementModel.headline.sansScalingMin({
//       element: date,
//       elementStyles: dateStyles,
//       isThemeDark,
//     });

//     container.appendChild(styledDate.element);
//     styles += styledDate.styles;
//   }

//   if (actions) {
//     const styledActions = createActions({ actions });
//     container.appendChild(styledActions.element);
//     styles += styledActions.styles;
//   }

//   return { element: container, styles };
// };
