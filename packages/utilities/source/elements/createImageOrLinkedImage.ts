/**
 * Creates an image element, optionally wrapped in a secure external link
 *
 * Creates an HTMLImageElement with proper accessibility attributes.
 * If a link URL is provided, wraps the image in an anchor element.
 * By default, links open in a new tab with security attributes.
 *
 * @param imageUrl - The source URL for the image
 * @param altText - Alt text for accessibility (required for WCAG compliance)
 * @param linkUrl - Optional URL to wrap the image in a link
 * @param linkLabel - Optional aria-label for the link (recommended when provided)
 * @param openInNewTab - Whether to open link in new tab with security attributes (default: true)
 * @returns HTMLImageElement or HTMLAnchorElement containing the image
 *
 * @example
 * ```typescript
 * // Simple image
 * const image = createImageOrLinkedImage({
 *   imageUrl: '/images/photo.jpg',
 *   altText: 'Team photo from 2024'
 * });
 * document.body.appendChild(image);
 *
 * // Image wrapped in link (opens in new tab)
 * const linkedImage = createImageOrLinkedImage({
 *   imageUrl: '/images/expert.jpg',
 *   altText: 'Dr. Jane Smith headshot',
 *   linkUrl: '/experts/jane-smith',
 *   linkLabel: 'View Dr. Jane Smith profile'
 * });
 * document.body.appendChild(linkedImage);
 *
 * // Same-tab link
 * const sameTabImage = createImageOrLinkedImage({
 *   imageUrl: '/images/event.jpg',
 *   altText: 'Event banner',
 *   linkUrl: '/events/friday-flower-power',
 *   openInNewTab: false
 * });
 * ```
 *
 * @category elements
 */
export const createImageOrLinkedImage = ({
  imageUrl,
  altText,
  linkUrl,
  linkLabel,
  openInNewTab = true,
}: {
  imageUrl: string;
  altText: string;
  linkUrl?: string;
  linkLabel?: string;
  openInNewTab?: boolean;
}): HTMLImageElement | HTMLAnchorElement => {
  const image = document.createElement('img');
  image.src = imageUrl;
  image.alt = altText;

  if (linkUrl) {
    const link = document.createElement('a');
    link.setAttribute('href', linkUrl);

    if (openInNewTab) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }

    if (linkLabel) {
      link.setAttribute('aria-label', linkLabel);
    }

    link.appendChild(image);
    return link;
  }

  return image;
};
