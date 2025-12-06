import { layout } from '@universityofmaryland/web-elements-library/composite';
import { createSlot } from '@universityofmaryland/web-utilities-library/elements';
import { Attributes, Slots, Register } from '@universityofmaryland/web-model-library';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-sticky-columns';

const slots: SlotConfiguration = {
  [`sticky-column`]: {
    required: true,
  },
  [`static-column`]: {
    required: true,
  },
};

const attributes = Attributes.handler.combine(
  Attributes.handler.observe.visuallyPosition({
    callback: (element, topPosition) =>
      element.events?.setPosition({ value: topPosition }),
  }),
  // Deprecated
  Attributes.handler.observe.visuallyPosition({
    name: Attributes.names.deprecated.layout.LAYOUT_STICKY_TOP,
    callback: (element, topPosition) =>
      element.events?.setPosition({ value: topPosition }),
  }),
);

const createComponent: CreateComponentFunction = (element) =>
  layout.stickyColumns({
    stickyColumn: createSlot(Slots.name.STICKY_COLUMN),
    staticColumn: createSlot(Slots.name.STATIC_COLUMN),
    isStickyLast: !Attributes.isVisual.stickyFirst({ element }),
    topPosition: Attributes.getValue.topPosition({ element }),
  });

/**
 * Sticky Columns
 *
 * A two-column layout component where one column remains sticky during scroll while
 * the other scrolls normally. Useful for keeping navigation, table of contents, or
 * supplementary information visible while scrolling through main content.
 *
 * ## Custom Element
 * `<umd-element-sticky-columns>`
 *
 * ## Slots
 * - `sticky-column` - Content that remains fixed during scroll (required)
 * - `static-column` - Content that scrolls normally (required)
 *
 * ## Attributes
 * - `data-visual` - Column order options:
 *   - `sticky-first` - Sticky column appears first (left on desktop)
 *
 * ## Observed Attributes
 * - `data-visual-position` - Sets the top position offset for the sticky column (in pixels)
 *
 * @example
 * ```html
 * <!-- Basic sticky columns with navigation -->
 * <umd-element-sticky-columns>
 *   <nav slot="sticky-column">
 *     <ul>
 *       <li><a href="#section1">Section 1</a></li>
 *       <li><a href="#section2">Section 2</a></li>
 *       <li><a href="#section3">Section 3</a></li>
 *     </ul>
 *   </nav>
 *   <article slot="static-column">
 *     <section id="section1">...</section>
 *     <section id="section2">...</section>
 *     <section id="section3">...</section>
 *   </article>
 * </umd-element-sticky-columns>
 * ```
 *
 * @example
 * ```html
 * <!-- Sticky column first with custom offset -->
 * <umd-element-sticky-columns data-visual="sticky-first" data-visual-position="100">
 *   <aside slot="sticky-column">
 *     <h3>Quick Facts</h3>
 *     <ul>
 *       <li>Founded: 1856</li>
 *       <li>Students: 40,000+</li>
 *       <li>Location: College Park, MD</li>
 *     </ul>
 *   </aside>
 *   <main slot="static-column">
 *     <h1>About the University</h1>
 *     <p>Long content about the university...</p>
 *   </main>
 * </umd-element-sticky-columns>
 * ```
 *
 * @example
 * ```html
 * <!-- Dynamic sticky position adjustment -->
 * <umd-element-sticky-columns id="sticky-layout">
 *   <div slot="sticky-column">Sticky content</div>
 *   <div slot="static-column">Scrollable content</div>
 * </umd-element-sticky-columns>
 *
 * <script>
 *   // Adjust sticky position based on header height
 *   const stickyLayout = document.getElementById('sticky-layout');
 *   const headerHeight = document.querySelector('header').offsetHeight;
 *   stickyLayout.setAttribute('data-visual-position', headerHeight + 20);
 * </script>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
  attributes,
});

export default registration;
