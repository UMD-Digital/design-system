import { type EventEntry } from 'types/data';

export const createEventImageConfig = (
  entry: Pick<EventEntry, 'image' | 'url'>,
) => {
  const imageUrl = entry.image?.[0]?.url;
  const altText = entry.image?.[0]?.alt;

  if (!imageUrl || !altText) {
    return null;
  }

  return {
    imageUrl,
    altText,
    linkUrl: entry.url,
    linkLabel: 'University of Maryland Event',
  };
};
