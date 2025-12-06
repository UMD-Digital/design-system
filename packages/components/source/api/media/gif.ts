import { media } from '@universityofmaryland/web-elements-library/composite';
import { Slots, Register, Lifecycle } from '@universityofmaryland/web-model-library';
import { CreateComponentFunction, SlotConfiguration } from '../../_types';

const tagName = 'umd-element-media-gif';

const slots: SlotConfiguration = {
  image: {
    allowedElements: ['img', 'a'],
  },
};

const createComponent: CreateComponentFunction = (element) =>
  media.elements.gif({
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
