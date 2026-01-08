/**
 * Expert Bio Feed (Refactored with Element Builder)
 *
 * Displays a single expert's profile with summary.
 * Uses element builder pattern for clean, declarative construction.
 *
 * @module feeds/experts/bio
 */

import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { person } from '@universityofmaryland/web-elements-library/composite';
import { LoadingState, Announcer } from '../../states';
import { expertsFetchStrategy } from '../../strategies/fetch/experts';
import {
  mapExpertToBioProps,
  buildFullName,
} from '../../strategies/display/experts';
import { styles as styleUtilities } from '../../helpers';
import { type ExpertEntry } from 'types/data';
import { type BioProps } from './_types';
import { type ElementModel } from '../../_types';

// ============================================================================
// PURE HELPER FUNCTIONS
// ============================================================================

/**
 * Create base props for fetch strategy
 *
 * @param token - API authentication token
 * @param expertId - Expert ID to fetch
 * @returns Base props object for strategy's composeApiVariables
 */
const createFetchProps = (token: string, expertId: string) => ({
  token,
  limit: 1,
  offset: 0,
  ids: [expertId],
});

/**
 * Create accessibility announcer for loaded expert
 *
 * @param expert - Expert entry
 * @returns Announcer element model
 */
const createSuccessAnnouncer = (expert: ExpertEntry): Announcer => {
  const fullName = buildFullName(expert);
  const message = `Loaded profile for ${fullName}`;
  return new Announcer({ message });
};

// ============================================================================
// STATE MANAGER CLASS
// ============================================================================

/**
 * Manages bio feed state and shadow DOM synchronization
 *
 * Encapsulates style accumulation and shadow DOM updates.
 * Provides immutable-style API for adding styles.
 */
class BioFeedState {
  private stylesArray: string[] = [];
  private shadowRoot: ShadowRoot | null = null;

  /**
   * Initialize state with initial styles
   *
   * @param initialStyles - Initial CSS styles
   */
  constructor(initialStyles: string) {
    this.stylesArray.push(initialStyles);
  }

  /**
   * Add styles to the accumulated styles
   *
   * @param styles - CSS styles to add
   */
  addStyles(styles: string): void {
    this.stylesArray.push(styles);
  }

  /**
   * Set shadow root reference for style updates
   *
   * @param shadow - Shadow root element
   */
  setShadowRoot(shadow: ShadowRoot): void {
    this.shadowRoot = shadow;
  }

  /**
   * Update shadow DOM styles
   *
   * @returns Promise that resolves when styles are updated
   */
  async updateShadowStyles(): Promise<void> {
    if (!this.shadowRoot) return;
    await styleUtilities.setShadowStyles({
      shadowRoot: this.shadowRoot,
      styles: this.getStyles(),
    });
  }

  /**
   * Get accumulated styles as single string
   *
   * @returns Combined CSS styles
   */
  getStyles(): string {
    return this.stylesArray.join('\n');
  }

  /**
   * Get shadow root callback for events
   *
   * @returns Callback function for shadow root
   */
  getShadowCallback(): (shadow: ShadowRoot) => void {
    return (shadow) => this.setShadowRoot(shadow);
  }
}

// ============================================================================
// RENDERING FUNCTIONS
// ============================================================================

/**
 * Render successful bio with expert data
 *
 * @param container - Container element to render into
 * @param expert - Expert entry data
 * @param state - State manager instance
 * @param isThemeDark - Dark theme flag
 * @returns Promise that resolves when rendering is complete
 */
const renderSuccess = async (
  container: HTMLElement,
  expert: ExpertEntry,
  state: BioFeedState,
  isThemeDark: boolean,
): Promise<void> => {
  const bioProps = mapExpertToBioProps(expert, 'small', isThemeDark);
  const bioElement = person.bio.small(bioProps);
  const announcer = createSuccessAnnouncer(expert);
  const children = [bioElement.element, announcer.getElement()];

  children.forEach((child) => container.appendChild(child));

  state.addStyles(bioElement.styles);
  await state.updateShadowStyles();
};

/**
 * Error types for expert bio feed
 */
type BioErrorType = 'not_found' | 'graphql_error' | 'invalid_request';

/**
 * Log error to console with specific warning message
 *
 * @param errorType - Type of error that occurred
 * @param expertId - Expert ID that was requested
 * @param error - Optional error object for GraphQL errors
 */
const logError = (
  errorType: BioErrorType,
  expertId: string,
  error?: any,
): void => {
  switch (errorType) {
    case 'not_found':
      console.warn(
        `[Expert Bio Feed] No expert found with ID "${expertId}". ` +
          `Please verify the expert ID is correct and the expert exists in the system.`,
      );
      break;
    case 'graphql_error':
      console.warn(
        `[Expert Bio Feed] GraphQL error occurred while fetching expert "${expertId}". ` +
          `Check network connection and API availability.`,
        error,
      );
      break;
    case 'invalid_request':
      console.warn(
        `[Expert Bio Feed] Invalid request for expert "${expertId}". ` +
          `Ensure both data-token and data-id attributes are provided.`,
      );
      break;
  }
};

// ============================================================================
// MAIN EXPORT
// ============================================================================

/**
 * Create an expert bio feed
 *
 * Fetches and displays a single expert's bio with summary.
 * Uses element builder pattern for clean construction.
 *
 * @param props - Feed configuration
 * @returns ElementModel with bio element, styles, and events
 *
 * @example
 * ```typescript
 * const bio = expertBio({
 *   token: 'my-token',
 *   expertId: 'john-doe',
 * });
 * ```
 *
 * @example
 * ```typescript
 * // With dark theme
 * const bio = expertBio({
 *   token: 'my-token',
 *   expertId: 'jane-smith',
 *   isThemeDark: true,
 * });
 * ```
 */
export const expertsBio = (props: BioProps): ElementModel => {
  const { token, expertId, isThemeDark = false } = props;

  // Create container using ElementBuilder
  const containerBuilder = new ElementBuilder('div').withClassName(
    'expert-bio-feed',
  );

  // Get element for manipulation (non-destructive)
  const container = containerBuilder.getElement();

  // Initialize state management
  const loading = new LoadingState({ isThemeDark });
  const state = new BioFeedState(loading.styles);

  /**
   * Fetch expert data and render
   */
  const initialize = async (): Promise<void> => {
    loading.show(container);

    try {
      const fetchProps = createFetchProps(token, expertId);
      const variables = expertsFetchStrategy.composeApiVariables(fetchProps);
      const entries = await expertsFetchStrategy.fetchEntries(variables);

      loading.hide();

      if (!entries || entries.length === 0) {
        logError('not_found', expertId);
        return;
      }

      await renderSuccess(container, entries[0], state, isThemeDark);
    } catch (error) {
      loading.hide();
      logError('graphql_error', expertId, error);
    }
  };

  // Start initialization
  initialize();

  // Build and return element model
  const model = containerBuilder.build();

  return {
    element: model.element,
    get styles() {
      return state.getStyles();
    },
    events: {
      callback: state.getShadowCallback(),
    },
  };
};
