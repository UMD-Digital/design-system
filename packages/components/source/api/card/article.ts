import CardModel from './_model';
import type { ComponentRegistration } from '../_types';

// Tag name for the article card component
const tagName = 'umd-element-article';

/**
 * Article Card
 *
 * A specialized card component optimized for displaying article and news content.
 * Inherits all features from the standard card with article-specific semantics.
 *
 * ## Custom Element
 * `<umd-element-article>`
 *
 * ## Slots
 * - `headline` - Article title (required, accepts: h2-h6, p)
 * - `text` - Article excerpt or summary (accepts: p)
 * - `eyebrow` - Category or section label
 * - `image` - Article featured image
 * - `actions` - Read more links or sharing options
 * - `date` - Publication date
 *
 * ## Attributes
 * - `data-theme` - Theme styling options:
 *   - `dark` - Dark theme styling
 *   - `light` - Light theme styling
 * - `data-display` - Display mode options:
 *   - `list` - List display format
 * - `data-visual` - Visual display options:
 *   - `transparent` - Transparent background
 *   - `aligned` - Aligned content layout
 *   - `bordered` - Add border styling
 *
 *
 * @example
 * ```html
 * <!-- Basic article card -->
 * <umd-element-article>
 *   <p slot="eyebrow">Faculty Research</p>
 *   <h3 slot="headline">Professor Wins Nobel Prize in Physics</h3>
 *   <p slot="text">Groundbreaking work in quantum computing recognized.</p>
 *   <p slot="date">December 10, 2023</p>
 * </umd-element-article>
 * ```
 *
 * @example
 * ```html
 * <!-- Article with image and actions -->
 * <umd-element-article>
 *   <img slot="image" src="research-lab.jpg" alt="Research laboratory">
 *   <p slot="eyebrow">Science & Technology</p>
 *   <h2 slot="headline">New Climate Research Center Opens</h2>
 *   <p slot="text">
 *     The facility will advance understanding of climate change impacts
 *     and develop sustainable solutions.
 *   </p>
 *   <p slot="date">November 15, 2023</p>
 *   <div slot="actions">
 *     <a href="/full-article">Read Full Article</a>
 *     <a href="/share">Share</a>
 *   </div>
 * </umd-element-article>
 * ```
 *
 * @example
 * ```html
 * <!-- List layout article -->
 * <umd-element-article data-display="list" data-theme="light">
 *   <h4 slot="headline">Campus Sustainability Initiative</h4>
 *   <p slot="text">New programs reduce carbon footprint by 30%.</p>
 *   <p slot="date">October 5, 2023</p>
 * </umd-element-article>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
const registration: ComponentRegistration = CardModel({ tagName });

export default registration;
