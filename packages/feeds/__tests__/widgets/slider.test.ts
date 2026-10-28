/**
 * Tests for slider feed endpoints
 *
 * @group widgets
 */

import { eventsSlider } from '../../source/feeds/events/slider';
import { academicSlider } from '../../source/feeds/academic/slider';

jest.mock('@universityofmaryland/web-utilities-library/network', () => ({
  fetchGraphQL: jest.fn(),
}));

import { fetchGraphQL } from '@universityofmaryland/web-utilities-library/network';

const mockFetchGraphQL = fetchGraphQL as jest.MockedFunction<
  typeof fetchGraphQL
>;

describe('Slider feed endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchGraphQL.mockResolvedValue({ data: { entries: { events: [] } } });
  });

  it.each([
    ['events', eventsSlider, 'https://calendar.umd.edu/graphql'],
    ['academic', academicSlider, 'https://provost.umd.edu/graphql'],
  ])('%s slider should fetch from its default endpoint', (_, feed, url) => {
    feed({ token: 'test-token' });

    expect(mockFetchGraphQL).toHaveBeenCalledWith(
      expect.objectContaining({ url }),
    );
  });

  it.each([
    ['events', eventsSlider],
    ['academic', academicSlider],
  ])('%s slider should fetch from apiUrl when one is passed', (_, feed) => {
    feed({ token: 'test-token', apiUrl: 'https://staging.test.com/graphql' });

    expect(mockFetchGraphQL).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://staging.test.com/graphql' }),
    );
  });
});
