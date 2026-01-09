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

const getAttributionText = (entry: InTheNewsEntry): string | null => {
  // Priority: expert name > author > attribution
  const expertName = formatExpertName(entry);
  if (expertName) return expertName;

  if (entry.author) return entry.author;

  return entry.attribution || null;
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

    console.log(
      card.list({
        ...commonProps,
        isAligned: false,
      }),
    );

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
