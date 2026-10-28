/**
 * Tests for Events Fetch Strategy
 *
 * @group strategies
 */

import { eventsFetchStrategy } from '../../../source/strategies/fetch/events';

jest.mock('@universityofmaryland/web-utilities-library/network', () => ({
  fetchGraphQL: jest.fn(),
}));

import { fetchGraphQL } from '@universityofmaryland/web-utilities-library/network';

const mockFetchGraphQL = fetchGraphQL as jest.MockedFunction<
  typeof fetchGraphQL
>;

describe('eventsFetchStrategy.fetchCategoryNames', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchGraphQL.mockResolvedValue({
      data: { categories: [{ title: 'Arts' }] },
    });
  });

  it('should fetch from the calendar API by default', async () => {
    const names = await eventsFetchStrategy.fetchCategoryNames(
      ['arts'],
      'token',
    );

    expect(names).toEqual(['Arts']);
    expect(mockFetchGraphQL).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://calendar.umd.edu/graphql' }),
    );
  });

  it('should fetch from apiUrl when one is passed', async () => {
    await eventsFetchStrategy.fetchCategoryNames(
      ['arts'],
      'token',
      'https://staging.test.com/graphql',
    );

    expect(mockFetchGraphQL).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://staging.test.com/graphql' }),
    );
  });
});
