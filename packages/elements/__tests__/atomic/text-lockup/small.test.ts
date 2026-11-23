import * as animationStyles from '@universityofmaryland/web-styles-library/animation';
import { createTextLockupSmall } from '../../../source/atomic/text-lockup/small';
import '../../composite/test-helpers/setup';

jest.mock('@universityofmaryland/web-styles-library/animation', () => ({
  line: {
    composeSlideUnder: jest.fn(() => ({
      className: 'umd-animation-line-slide-black',
    })),
  },
}));

jest.mock('@universityofmaryland/web-styles-library/element', () => ({
  event: { meta: { container: { className: 'umd-event-meta-container' } } },
  text: {
    rich: { composeSimple: jest.fn(() => ({ className: 'mock-rich' })) },
    decoration: { ribbon: { className: 'mock-ribbon' } },
  },
}));

jest.mock('@universityofmaryland/web-styles-library/layout', () => ({
  grid: { inline: { tabletRows: { className: 'mock-grid-inline' } } },
}));

const composeSlideUnder = jest.mocked(animationStyles.line.composeSlideUnder);

describe('Text Lockup Small — headline hover animation', () => {
  beforeEach(() => {
    composeSlideUnder.mockClear();
  });

  it('applies the slide-under animation when the headline contains a link', () => {
    const headline = document.createElement('p');
    const link = document.createElement('a');

    link.href = 'https://example.com';
    link.textContent = 'Linked headline';
    headline.appendChild(link);

    createTextLockupSmall({ headline });

    expect(composeSlideUnder).toHaveBeenCalledTimes(1);
  });

  it('applies the slide-under animation when the headline is a link', () => {
    const headline = document.createElement('a');

    headline.href = 'https://example.com';
    headline.textContent = 'Linked headline';

    createTextLockupSmall({ headline });

    expect(composeSlideUnder).toHaveBeenCalledTimes(1);
  });

  it('does not apply the slide-under animation when the headline has no link', () => {
    const headline = document.createElement('p');
    const span = document.createElement('span');

    span.textContent = 'Students from 49 states and 124 countries';
    headline.appendChild(span);

    createTextLockupSmall({ headline });

    expect(composeSlideUnder).not.toHaveBeenCalled();
  });
});
