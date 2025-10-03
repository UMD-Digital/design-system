import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Register, Slots, Lifecycle } from 'model';
import { Markup } from 'helpers';
import {
  CreateComponentFunction,
  ComponentRegistration,
  SlotConfiguration,
} from '../../_types';

const tagName = 'umd-element-tabs';

/**
 * Tabs Display
 *
 * A tabbed interface component that organizes content into selectable panels.
 * Supports responsive behavior with automatic overflow handling and sticky positioning.
 * Ideal for organizing related content into easily navigable sections.
 *
 * ## Custom Element
 * `<umd-element-tabs>`
 *
 * ## Slots
 * - `tabs` - Container with tab structure (required, accepts: div with specific markup)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 * - `data-sticky-position` - Top position offset for sticky behavior (in pixels)
 *
 * ## Observed Attributes
 * - `resize` - Triggers recalculation of tab layout
 *
 * ## Tab Structure
 * The tabs slot expects a specific HTML structure:
 * ```html
 * <div slot="tabs">
 *   <div class="tab" data-tab="tab1">Tab 1 Label</div>
 *   <div class="tab" data-tab="tab2">Tab 2 Label</div>
 *   <div class="panel" data-panel="tab1">Tab 1 Content</div>
 *   <div class="panel" data-panel="tab2">Tab 2 Content</div>
 * </div>
 * ```
 *
 * @example
 * ```html
 * <!-- Basic tabs -->
 * <umd-element-tabs>
 *   <div slot="tabs">
 *     <div class="tab" data-tab="overview">Overview</div>
 *     <div class="tab" data-tab="requirements">Requirements</div>
 *     <div class="tab" data-tab="curriculum">Curriculum</div>
 *
 *     <div class="panel" data-panel="overview">
 *       <h3>Program Overview</h3>
 *       <p>Learn about our comprehensive program...</p>
 *     </div>
 *     <div class="panel" data-panel="requirements">
 *       <h3>Admission Requirements</h3>
 *       <ul>
 *         <li>Bachelor's degree</li>
 *         <li>3.0 GPA minimum</li>
 *       </ul>
 *     </div>
 *     <div class="panel" data-panel="curriculum">
 *       <h3>Course Curriculum</h3>
 *       <p>Our curriculum includes...</p>
 *     </div>
 *   </div>
 * </umd-element-tabs>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with sticky positioning -->
 * <umd-element-tabs data-theme="dark" data-sticky-position="80">
 *   <div slot="tabs">
 *     <div class="tab" data-tab="about">About</div>
 *     <div class="tab" data-tab="research">Research</div>
 *     <div class="tab" data-tab="publications">Publications</div>
 *     <div class="tab" data-tab="contact">Contact</div>
 *
 *     <div class="panel" data-panel="about">
 *       <h2>About the Lab</h2>
 *       <p>Our research lab focuses on...</p>
 *     </div>
 *     <div class="panel" data-panel="research">
 *       <h2>Current Research</h2>
 *       <p>We are investigating...</p>
 *     </div>
 *     <div class="panel" data-panel="publications">
 *       <h2>Recent Publications</h2>
 *       <ul>
 *         <li>Publication 1 (2024)</li>
 *         <li>Publication 2 (2023)</li>
 *       </ul>
 *     </div>
 *     <div class="panel" data-panel="contact">
 *       <h2>Contact Information</h2>
 *       <p>Email: lab@umd.edu</p>
 *     </div>
 *   </div>
 * </umd-element-tabs>
 * ```
 *
 * @example
 * ```html
 * <!-- Course information tabs -->
 * <umd-element-tabs>
 *   <div slot="tabs">
 *     <div class="tab" data-tab="description">Description</div>
 *     <div class="tab" data-tab="objectives">Learning Objectives</div>
 *     <div class="tab" data-tab="schedule">Schedule</div>
 *     <div class="tab" data-tab="assignments">Assignments</div>
 *
 *     <div class="panel" data-panel="description">
 *       <h3>Course Description</h3>
 *       <p>This course introduces students to...</p>
 *     </div>
 *     <div class="panel" data-panel="objectives">
 *       <h3>Learning Objectives</h3>
 *       <ol>
 *         <li>Understand fundamental concepts</li>
 *         <li>Apply theoretical knowledge</li>
 *         <li>Develop practical skills</li>
 *       </ol>
 *     </div>
 *     <div class="panel" data-panel="schedule">
 *       <h3>Course Schedule</h3>
 *       <table>
 *         <tr><td>Week 1</td><td>Introduction</td></tr>
 *         <tr><td>Week 2</td><td>Core Concepts</td></tr>
 *       </table>
 *     </div>
 *     <div class="panel" data-panel="assignments">
 *       <h3>Assignments</h3>
 *       <p>All assignments due by 11:59 PM on specified dates.</p>
 *     </div>
 *   </div>
 * </umd-element-tabs>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const slots: SlotConfiguration = {
  tabs: {
    required: true,
  },
};

const attributes = Attributes.handler.common.resize((element) =>
  element.events?.resize(),
);

const createComponent: CreateComponentFunction = (element) => {
  const isThemeDark = Attributes.isTheme.dark({ element });
  const slot = Markup.create.Node.slot({ type: Slots.name.TABS });
  const markup = element.querySelector(`[slot="${Slots.name.TABS}"]`);

  const modifyDom = () => {
    if (!markup) return;

    const updateDom = Composite.tabs.elements.DomStrcuture.ModifyElement({
      markup,
    });

    markup.innerHTML = '';
    markup.appendChild(updateDom);
  };

  modifyDom();

  return Composite.tabs.standard({
    isThemeDark,
    tabsContainer: markup?.children[0] as HTMLElement,
    shadowContent: slot,
    topPosition: Attributes.getValue.topPosition({
      element,
    }),
  });
};

/**
 * Tabs Display
 *
 * A tabbed interface component that organizes content into selectable panels.
 * Supports responsive behavior with automatic overflow handling and sticky positioning.
 * Ideal for organizing related content into easily navigable sections.
 *
 * ## Custom Element
 * `<umd-element-tabs>`
 *
 * ## Slots
 * - `tabs` - Container with tab structure (required, accepts: div with specific markup)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 * - `data-sticky-position` - Top position offset for sticky behavior (in pixels)
 *
 * ## Observed Attributes
 * - `resize` - Triggers recalculation of tab layout
 *
 * ## Tab Structure
 * The tabs slot expects a specific HTML structure:
 * ```html
 * <div slot="tabs">
 *   <div class="tab" data-tab="tab1">Tab 1 Label</div>
 *   <div class="tab" data-tab="tab2">Tab 2 Label</div>
 *   <div class="panel" data-panel="tab1">Tab 1 Content</div>
 *   <div class="panel" data-panel="tab2">Tab 2 Content</div>
 * </div>
 * ```
 *
 * @example
 * ```html
 * <!-- Basic tabs -->
 * <umd-element-tabs>
 *   <div slot="tabs">
 *     <div class="tab" data-tab="overview">Overview</div>
 *     <div class="tab" data-tab="requirements">Requirements</div>
 *     <div class="tab" data-tab="curriculum">Curriculum</div>
 *
 *     <div class="panel" data-panel="overview">
 *       <h3>Program Overview</h3>
 *       <p>Learn about our comprehensive program...</p>
 *     </div>
 *     <div class="panel" data-panel="requirements">
 *       <h3>Admission Requirements</h3>
 *       <ul>
 *         <li>Bachelor's degree</li>
 *         <li>3.0 GPA minimum</li>
 *       </ul>
 *     </div>
 *     <div class="panel" data-panel="curriculum">
 *       <h3>Course Curriculum</h3>
 *       <p>Our curriculum includes...</p>
 *     </div>
 *   </div>
 * </umd-element-tabs>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with sticky positioning -->
 * <umd-element-tabs data-theme="dark" data-sticky-position="80">
 *   <div slot="tabs">
 *     <div class="tab" data-tab="about">About</div>
 *     <div class="tab" data-tab="research">Research</div>
 *     <div class="tab" data-tab="publications">Publications</div>
 *     <div class="tab" data-tab="contact">Contact</div>
 *
 *     <div class="panel" data-panel="about">
 *       <h2>About the Lab</h2>
 *       <p>Our research lab focuses on...</p>
 *     </div>
 *     <div class="panel" data-panel="research">
 *       <h2>Current Research</h2>
 *       <p>We are investigating...</p>
 *     </div>
 *     <div class="panel" data-panel="publications">
 *       <h2>Recent Publications</h2>
 *       <ul>
 *         <li>Publication 1 (2024)</li>
 *         <li>Publication 2 (2023)</li>
 *       </ul>
 *     </div>
 *     <div class="panel" data-panel="contact">
 *       <h2>Contact Information</h2>
 *       <p>Email: lab@umd.edu</p>
 *     </div>
 *   </div>
 * </umd-element-tabs>
 * ```
 *
 * @example
 * ```html
 * <!-- Course information tabs -->
 * <umd-element-tabs>
 *   <div slot="tabs">
 *     <div class="tab" data-tab="description">Description</div>
 *     <div class="tab" data-tab="objectives">Learning Objectives</div>
 *     <div class="tab" data-tab="schedule">Schedule</div>
 *     <div class="tab" data-tab="assignments">Assignments</div>
 *
 *     <div class="panel" data-panel="description">
 *       <h3>Course Description</h3>
 *       <p>This course introduces students to...</p>
 *     </div>
 *     <div class="panel" data-panel="objectives">
 *       <h3>Learning Objectives</h3>
 *       <ol>
 *         <li>Understand fundamental concepts</li>
 *         <li>Apply theoretical knowledge</li>
 *         <li>Develop practical skills</li>
 *       </ol>
 *     </div>
 *     <div class="panel" data-panel="schedule">
 *       <h3>Course Schedule</h3>
 *       <table>
 *         <tr><td>Week 1</td><td>Introduction</td></tr>
 *         <tr><td>Week 2</td><td>Core Concepts</td></tr>
 *       </table>
 *     </div>
 *     <div class="panel" data-panel="assignments">
 *       <h3>Assignments</h3>
 *       <p>All assignments due by 11:59 PM on specified dates.</p>
 *     </div>
 *   </div>
 * </umd-element-tabs>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = Register.webComponent({
  tagName,
  slots,
  createComponent,
  attributes: [attributes],
  afterConnect: Lifecycle.hooks.loadOnConnect,
});

export default registration;
