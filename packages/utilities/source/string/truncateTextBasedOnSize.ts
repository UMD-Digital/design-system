import { truncateText } from './truncateText';

/**
 * Truncates HTML text content based on container size with responsive breakpoints.
 * Applies different text length limits based on the container width, making it
 * suitable for responsive layouts where text truncation needs vary by viewport size.
 *
 * @param text - The HTML string to truncate
 * @param size - The container size in pixels
 * @param breakpointLarge - The pixel width at which to apply large text size (default: 400)
 * @param breakpointMax - The pixel width at which to apply max text size (default: 600)
 * @param textSizeSmall - Character limit for small containers (default: 220)
 * @param textSizeLarge - Character limit for large containers (default: 260)
 * @param textSizeMax - Character limit for max-width containers (default: 280)
 * @returns The truncated HTML string with ellipsis if text was truncated
 *
 * @example
 * ```typescript
 * const html = '<p>This is a very long text that needs responsive truncation</p>';
 *
 * // Small container (< 400px)
 * const small = truncateTextBasedOnSize({ text: html, size: 300 });
 * // Truncated to 220 characters
 *
 * // Large container (>= 400px)
 * const large = truncateTextBasedOnSize({ text: html, size: 500 });
 * // Truncated to 260 characters
 *
 * // Max container (>= 600px)
 * const max = truncateTextBasedOnSize({ text: html, size: 700 });
 * // Truncated to 280 characters
 * ```
 *
 * @category string
 */
export const truncateTextBasedOnSize = ({
  text,
  size,
  breakpointLarge = 400,
  breakpointMax = 600,
  textSizeSmall = 220,
  textSizeLarge = 260,
  textSizeMax = 280,
}: {
  text: string;
  size: number;
  breakpointLarge?: number;
  breakpointMax?: number;
  textSizeSmall?: number;
  textSizeLarge?: number;
  textSizeMax?: number;
}): string => {
  const isContainerLarge = size >= breakpointLarge;
  const isContainerMax = size >= breakpointMax;
  let textSize = textSizeSmall;

  if (isContainerLarge) textSize = textSizeLarge;
  if (isContainerMax) textSize = textSizeMax;

  return truncateText({ text, maxTextSize: textSize });
};