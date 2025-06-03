import { Composite } from '@universityofmaryland/web-elements-library';
import { Attributes, Slots } from 'model';
import { Markup } from 'utilities';
import { CommonPathwayData } from './common';
import {
  CreateComponentFunction,
} from '../_types';
import { createComponentRegistration } from '../../model/utilities/register';

const { SlotWithDefaultStyling } = Markup.create;

/**
 * Tag name for the pathway highlight web component
 */
const tagName = 'umd-element-pathway-highlight';

/**
 * Creates a pathway highlight component with the provided configuration
 */
const createComponent: CreateComponentFunction = (element) =>
  Composite.pathway.highlight({
    ...CommonPathwayData({
      element,
    }),
    quote: SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.HIGHLIGHT,
    }),
    attribution: SlotWithDefaultStyling({
      element,
      slotRef: Slots.name.HIGHLIGHT_ATTRIBUTION,
    }),
    isThemeDark: Attributes.isTheme.dark({ element }),
  });

/**
 * Pathway Highlight
 *
 * A pathway component that emphasizes a featured quote or testimonial alongside
 * standard pathway content. Combines narrative elements with highlighted user voices
 * to create compelling calls-to-action.
 *
 * ## Custom Element
 * `<umd-element-pathway-highlight>`
 *
 * ## Slots
 * - `eyebrow` - Small text above headline (optional, accepts: text elements)
 * - `headline` - Main heading (optional, accepts: heading elements)
 * - `text` - Descriptive body text (optional, accepts: text elements)
 * - `actions` - Call-to-action links or buttons (optional, accepts: a, button)
 * - `highlight` - Featured quote or testimonial text (optional, accepts: text elements)
 * - `highlight-attribution` - Attribution for the quote (optional, accepts: text elements)
 *
 * ## Attributes
 * - `data-theme` - Color theme of the component:
 *   - `dark` - Dark background with light text
 *
 * @example
 * ```html
 * <!-- Basic pathway with highlight -->
 * <umd-element-pathway-highlight>
 *   <span slot="eyebrow">Student Success</span>
 *   <h2 slot="headline">Transform Your Future</h2>
 *   <p slot="text">Join thousands of students who have found their path at UMD.</p>
 *   <blockquote slot="highlight">
 *     "The opportunities here changed my life. I found mentors, research
 *     experiences, and a community that supported my dreams."
 *   </blockquote>
 *   <cite slot="highlight-attribution">Sarah Chen, Class of 2023</cite>
 *   <a slot="actions" href="/apply">Start Your Journey</a>
 * </umd-element-pathway-highlight>
 * ```
 *
 * @example
 * ```html
 * <!-- Dark theme with multiple actions -->
 * <umd-element-pathway-highlight data-theme="dark">
 *   <h2 slot="headline">Alumni Impact</h2>
 *   <p slot="text">Our graduates go on to lead in every field imaginable.</p>
 *   <p slot="highlight">
 *     "My UMD education gave me the foundation to launch a company that's
 *     now helping millions of people worldwide."
 *   </p>
 *   <span slot="highlight-attribution">Dr. James Wilson, '08, CEO of TechCorp</span>
 *   <div slot="actions">
 *     <a href="/alumni-stories">Read More Stories</a>
 *     <a href="/give">Support Students</a>
 *   </div>
 * </umd-element-pathway-highlight>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export default createComponentRegistration({
  tagName,
  createComponent,
});
