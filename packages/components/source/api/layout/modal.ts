import { layout } from '@universityofmaryland/web-elements-library/atomic';
import { Attributes, Slots, Register } from 'model';
import { CreateComponentFunction, LayoutProps } from '../../_types';

interface ModalProps extends LayoutProps {
  content: HTMLElement | null;
  context: HTMLElement;
  callback: () => void;
}

const tagName = 'umd-element-modal';

const createComponent: CreateComponentFunction = (element) => {
  const callback = () => {
    element.setAttribute(
      Attributes.names.layout.hidden,
      Attributes.values.state.TRUE,
    );
  };

  const props: ModalProps = {
    content: Slots.content.default({ element, isDefaultStyling: false }),
    isHidden: Attributes.isLayout.hidden({ element }),
    context: element,
    callback,
  };

  return layout.overlay.modal(props);
};

const attributes = Attributes.handler.common.visualShowHide({
  onShow: (element) => element.events?.show(),
  onHide: (element) => element.events?.hide(),
});

/**
 * Modal
 *
 * A modal overlay component that displays content in a focused dialog window.
 * Includes backdrop, close functionality, and proper focus management for accessibility.
 * The modal can be controlled programmatically through observed attributes.
 *
 * ## Custom Element
 * `<umd-element-modal>`
 *
 * ## Slots
 * - Default slot - Content to display inside the modal
 *
 * ## Attributes
 * - `data-layout-hidden` - Initial visibility state:
 *   - `true` - Modal starts hidden
 *   - Absence implies visible
 *
 * ## Observed Attributes
 * - `data-visual-open` - Shows the modal when set to "true"
 * - `data-visual-closed` - Hides the modal when set to "true"
 *
 * @example
 * ```html
 * <!-- Basic modal -->
 * <umd-element-modal data-layout-hidden="true">
 *   <h2>Welcome</h2>
 *   <p>This is modal content.</p>
 *   <button>Close</button>
 * </umd-element-modal>
 * ```
 *
 * @example
 * ```html
 * <!-- Programmatic control -->
 * <button id="open-modal">Open Modal</button>
 * <umd-element-modal id="my-modal" data-layout-hidden="true">
 *   <div class="modal-content">
 *     <h2>Important Information</h2>
 *     <p>Please read this carefully...</p>
 *     <button id="close-modal">I Understand</button>
 *   </div>
 * </umd-element-modal>
 *
 * <script>
 *   const modal = document.getElementById('my-modal');
 *   document.getElementById('open-modal').addEventListener('click', () => {
 *     modal.setAttribute('data-visual-open', 'true');
 *   });
 *   document.getElementById('close-modal').addEventListener('click', () => {
 *     modal.setAttribute('data-visual-closed', 'true');
 *   });
 * </script>
 * ```
 *
 * @example
 * ```html
 * <!-- Form modal -->
 * <umd-element-modal data-layout-hidden="true">
 *   <form>
 *     <h2>Contact Us</h2>
 *     <label>
 *       Name:
 *       <input type="text" name="name" required>
 *     </label>
 *     <label>
 *       Email:
 *       <input type="email" name="email" required>
 *     </label>
 *     <textarea name="message" placeholder="Your message"></textarea>
 *     <button type="submit">Send</button>
 *   </form>
 * </umd-element-modal>
 * ```
 *
 * @category Components
 * @since 1.0.0
 */
export default Register.webComponent({
  tagName,
  attributes,
  createComponent,
});
