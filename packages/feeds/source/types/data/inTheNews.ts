import { BaseEntry } from '../core';

export interface InTheNewsSummary {
  html?: string;
  rawHtml?: string;
  markdown?: string;
  plainText?: string;
}

export interface InTheNewsExternalLink {
  link?: string;
}

export interface InTheNewsEntry extends BaseEntry {
  uid?: string;
  status?: string;
  enabled?: boolean;
  type?: string;
  postDate?: string;
  expiryDate?: string;
  dateUpdated?: string;
  dateCreated?: string;
  summary?: InTheNewsSummary;
  externalLink?: InTheNewsExternalLink;
  attribution?: string;
}
