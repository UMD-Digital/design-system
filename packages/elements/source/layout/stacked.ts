import { ElementBuilder } from '@universityofmaryland/web-builder-library';
import { token, layout } from '@universityofmaryland/web-styles-library';

import { type ElementModel } from '../_types';

export interface StackedLayoutProps {
  isThemeDark?: boolean;
  gap?: string;
  showDividers?: boolean;
  dividerColor?: string;
}

/**
 * Creates a stacked vertical layout with optional dividers
 *
 * Provides a vertical stack layout using CSS Grid with configurable
 * spacing and optional dividing borders between items.
 *
 * @param props - Configuration for stacked layout
 * @returns ElementModel with stacked layout container and styles
 *
 * @example
 * ```typescript
 * const stackedLayout = stacked({
 *   isThemeDark: false,
 *   showDividers: true
 * });
 *
 * // Add items to the container
 * stackedLayout.element.appendChild(item1);
 * stackedLayout.element.appendChild(item2);
 *
 * // Inject into DOM
 * document.body.appendChild(stackedLayout.element);
 * document.head.appendChild(createStyleElement(stackedLayout.styles));
 * ```
 */
export default function stacked({
  isThemeDark = false,
  gap = token.spacing.md,
  showDividers = true,
  dividerColor,
}: StackedLayoutProps = {}): ElementModel {
  const defaultDividerColor = isThemeDark
    ? token.color.gray.dark
    : token.color.gray.light;

  const borderColor = dividerColor || defaultDividerColor;

  const dividerStyles = showDividers
    ? {
        [` > *:not(:last-child)`]: {
          paddingBottom: gap,
          marginBottom: gap,
          borderBottom: `1px solid ${borderColor}`,
        },
      }
    : {};

  return new ElementBuilder()
    .styled(layout.grid.stacked)
    .withStyles({
      element: {
        gridGap: gap,
        [` > *`]: {
          containerType: 'inline-size',
        },
        ...dividerStyles,
      },
    })
    .build();
}
