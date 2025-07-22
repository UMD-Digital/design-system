import { Atomic, Composite } from '@universityofmaryland/web-elements-library';
import { Slots, Register, Lifecycle } from 'model';
import { CreateComponentFunction, SlotConfiguration } from '../../_types';

/**
 * Tag name for the media gif web component
 */
const tagName = 'umd-element-media-gif';

/**
 * Media GIF
 *
 * An accessible GIF component that provides play/pause controls for animated GIFs.
 * Enhances user experience by allowing control over animation playback, reducing
 * distractions and improving accessibility for users with motion sensitivities.
 *
 * ## Custom Element
 * `<umd-element-media-gif>`
 *
 * ## Slots
 * - `image` - The media image to display (required, accepts: img)
 *
 * @example
 * ```html
 * <!-- Basic inline image -->
 * <umd-element-media-gif>
 *   <img slot="image" src="campus.jpg" alt="Campus view" />
 * </umd-element-media-gif>
 * ```
 *
 * @category Components
 * @since 1.12.10
 */
const slots: SlotConfiguration = {
  image: {
    allowedElements: ['img', 'a'],
  },
};

/**
 * Creates a media gif component with the provided configuration
 */
const createComponent: CreateComponentFunction = (element) =>
  Composite.media.elements.gif({
    image: Slots.assets.image({ element }) as HTMLImageElement,
  });

/**
 * Media GIF
 *
 * An accessible GIF component that provides play/pause controls for animated GIFs.
 * Enhances user experience by allowing control over animation playback, reducing
 * distractions and improving accessibility for users with motion sensitivities.
 *
 * ## Custom Element
 * `<umd-element-media-gif>`
 *
 * ## Slots
 * - `image` - The media image to display (required, accepts: img)
 *
 * @example
 * ```html
 * <!-- Basic inline image -->
 * <umd-element-media-gif>
 *   <img slot="image" src="campus.jpg" alt="Campus view" />
 * </umd-element-media-gif>
 * ```
 *
 * @category Components
 * @since 1.12.10
 */
export default Register.webComponent({
  tagName,
  slots,
  createComponent,
  onReady: Lifecycle.hooks.loadOnConnect,
});
