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

const getAttributionText = (entry: InTheNewsEntry): string | null => {
  return entry.attribution || null;
};

const getAuthorText = (entry: InTheNewsEntry): string | null => {
  return entry.author || null;
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
  const author = getAuthorText(entry);
  const expertName = formatExpertName(entry);
  const hasName = author || expertName;

  if (hasName && summary) {
    const combinedSummary = `${expertName ? expertName : author} | ${summary}`;
    return createTextContainer({ text: combinedSummary, allowHTML: true });
  }

  if (summary && !expertName) {
    return createTextContainer({ text: summary, allowHTML: true });
  }

  return null;
};

const formatExpertName = (entry: InTheNewsEntry): string | null => {
  const expert = entry.expert?.[0];
  if (!expert) return null;

  const nameParts = [
    expert.firstName,
    expert.middleName,
    expert.lastName,
  ].filter(Boolean);

  return nameParts.length > 0 ? nameParts.join(' ') : expert.title || null;
};

const createAttributionElement = (
  entry: InTheNewsEntry,
): HTMLElement | null => {
  const attributionText = getAttributionText(entry);
  if (!attributionText) return null;
  return createTextContainer({ text: attributionText });
};

const createDateElement = (entry: InTheNewsEntry): HTMLElement | null => {
  const dateString = entry.postDate || entry.dateCreated;
  if (!dateString) return null;

  const formattedDate = formatDate(dateString);
  if (!formattedDate) return null;

  return createTimeElement({
    datetime: dateString,
    displayText: formattedDate,
  });
};

export const inTheNewsDisplayStrategy: DisplayStrategy<InTheNewsEntry> = {
  layoutType: 'grid',

  mapEntryToCard: (
    entry: InTheNewsEntry,
    options: CardMappingOptions,
  ): ElementModel => {
    const {
      isThemeDark = false,
      isTransparent = false,
      isAligned = true,
      cardType = 'block',
    } = options;

    const commonProps = {
      headline: createHeadlineElement(entry),
      text: createSummaryElement(entry),
      date: createDateElement(entry),
      eyebrow: createAttributionElement(entry),
      isThemeDark,
    };

    if (cardType === 'list') {
      return card.list({
        ...commonProps,
        isAligned: false,
      });
    }

    return card.block({
      ...commonProps,
      isAligned,
      isTransparent,
    });
  },
};
