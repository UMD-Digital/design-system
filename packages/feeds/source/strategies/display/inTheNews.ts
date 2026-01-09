import { card } from '@universityofmaryland/web-elements-library/composite';
import {
  createTextWithLink,
  createTextContainer,
  createTimeElement,
} from '@universityofmaryland/web-utilities-library/elements';
import { DisplayStrategy, CardMappingOptions } from '../../factory/core/types';
import { ElementModel } from '../../_types';
import { InTheNewsEntry } from 'types/data';

const extractLinkUrl = (entry: InTheNewsEntry): string =>
  entry.externalLink?.link || entry.url || '#';

const extractSummaryText = (entry: InTheNewsEntry): string | null => {
  if (!entry.summary) return null;
  return entry.summary.plainText || entry.summary.html || null;
};

const formatDate = (dateString?: string): string => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
};

const createHeadlineElement = (entry: InTheNewsEntry): HTMLElement | null =>
  createTextWithLink({
    text: entry.title,
    url: extractLinkUrl(entry),
    openInNewTab: true,
  });

const createSummaryElement = (entry: InTheNewsEntry): HTMLElement | null => {
  const summary = extractSummaryText(entry);
  if (!summary) return null;
  return createTextContainer({ text: summary, allowHTML: true });
};

const createAttributionElement = (entry: InTheNewsEntry): HTMLElement | null => {
  if (!entry.attribution) return null;
  return createTextContainer({ text: entry.attribution });
};

const createDateElement = (entry: InTheNewsEntry): HTMLElement | null => {
  const dateString = entry.postDate || entry.dateCreated;
  if (!dateString) return null;

  const formattedDate = formatDate(dateString);
  if (!formattedDate) return null;

  return createTimeElement({ datetime: dateString, displayText: formattedDate });
};

export const inTheNewsDisplayStrategy: DisplayStrategy<InTheNewsEntry> = {
  layoutType: 'list',

  mapEntryToCard: (
    entry: InTheNewsEntry,
    options: CardMappingOptions,
  ): ElementModel => {
    const { isThemeDark = false } = options;

    return card.list({
      headline: createHeadlineElement(entry),
      text: createSummaryElement(entry),
      date: createDateElement(entry),
      eyebrow: createAttributionElement(entry),
      isThemeDark,
      isAligned: false,
    });
  },
};
