import CardModel from './_model';

/**
 * Standard Card
 * 
 * A versatile card component for displaying content with optional images, actions, and themes.
 * Supports multiple display modes including block, list, and transparent variations.
 * 
 * ## Custom Element
 * `<umd-element-card>`
 * 
 * ## Slots
 * - `headline` - Card title (required, accepts: h2-h6, p)
 * - `text` - Card content (accepts: p)
 * - `eyebrow` - Small text above headline
 * - `image` - Card image
 * - `actions` - Action buttons or links
 * - `date` - Date information
 * 
 * ## Attributes
 * - `data-theme` - Theme styling options:
 *   - `dark` - Dark theme styling
 *   - `light` - Light theme styling
 * - `data-visual` - Visual display options:
 *   - `transparent` - Transparent background
 *   - `aligned` - Aligned content layout
 *   - `bordered` - Add border styling
 * - `data-visual-transparent` - Visual display options:
 *   - `true` - Transparent background
 * - `data-visual-image-aligned` - Visual display options:
 *   - `true` - Aligned content layout
 *   - `list` - List display format
 * 
 * @example
 * ```html
 * <!-- Basic card -->
 * <umd-element-card>
 *   <h3 slot="headline">Research Breakthrough</h3>
 *   <p slot="text">Scientists discover new method for sustainable energy.</p>
 * </umd-element-card>
 * ```
 * 
 * @example
 * ```html
 * <!-- Card with image and actions -->
 * <umd-element-card>
 *   <img slot="image" src="campus.jpg" alt="Campus view">
 *   <p slot="eyebrow">Campus News</p>
 *   <h3 slot="headline">New Student Center Opens</h3>
 *   <p slot="text">State-of-the-art facility welcomes students.</p>
 *   <div slot="actions">
 *     <a href="/read-more">Read More</a>
 *   </div>
 * </umd-element-card>
 * ```
 * 
 * @example
 * ```html
 * <!-- List layout with dark theme -->
 * <umd-element-card data-theme="dark" data-visual="list">
 *   <h4 slot="headline">Quick Links</h4>
 *   <p slot="text">Access important resources and tools.</p>
 * </umd-element-card>
 * ```
 * 
 * @category Components
 * @since 1.0.0
 */
export default CardModel({ tagName: 'umd-element-card' });