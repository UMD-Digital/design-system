/**
 * Tests for GraphQL Fetch Strategy Factory
 *
 * @group strategies
 */

import { createGraphQLFetchStrategy } from '../../../source/strategies/fetch/graphql';

// Mock fetchGraphQL
jest.mock('@universityofmaryland/web-utilities-library/network', () => ({
  fetchGraphQL: jest.fn(),
}));

import { fetchGraphQL } from '@universityofmaryland/web-utilities-library/network';

const mockFetchGraphQL = fetchGraphQL as jest.MockedFunction<typeof fetchGraphQL>;

describe('createGraphQLFetchStrategy', () => {
  const mockTransformResponse = jest.fn((data) => data?.data?.entries || null);
  const mockTransformCount = jest.fn((data) => data?.data?.count || 0);

  const testStrategy = createGraphQLFetchStrategy({
    endpoint: 'https://test.com/graphql',
    queries: {
      entries: 'query GetEntries { entries }',
      count: 'query GetCount { count }',
    },
    transformResponse: mockTransformResponse,
    transformCount: mockTransformCount,
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchCount', () => {
    it('should fetch count successfully', async () => {
      mockFetchGraphQL.mockResolvedValue({
        data: { count: 10 },
      });

      const result = await testStrategy.fetchCount({
        token: 'test-token',
      });

      expect(result).toBe(10);
      expect(mockFetchGraphQL).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://test.com/graphql',
          query: 'query GetCount { count }',
        })
      );
    });

    it('should return null on error', async () => {
      mockFetchGraphQL.mockResolvedValue({
        message: 'Error',
      });

      const result = await testStrategy.fetchCount({
        token: 'test-token',
      });

      expect(result).toBeNull();
    });

    it('should handle fetch exception', async () => {
      mockFetchGraphQL.mockRejectedValue(new Error('Network error'));

      const result = await testStrategy.fetchCount({
        token: 'test-token',
      });

      expect(result).toBeNull();
    });
  });

  describe('fetchEntries', () => {
    it('should fetch entries successfully', async () => {
      const mockEntries = [{ id: 1 }, { id: 2 }];
      mockFetchGraphQL.mockResolvedValue({
        data: { entries: mockEntries },
      });

      const result = await testStrategy.fetchEntries({
        token: 'test-token',
      });

      expect(result).toEqual(mockEntries);
      expect(mockFetchGraphQL).toHaveBeenCalledWith(
        expect.objectContaining({
          url: 'https://test.com/graphql',
          query: 'query GetEntries { entries }',
        })
      );
    });

    it('should return null on error', async () => {
      mockFetchGraphQL.mockResolvedValue({
        message: 'Error',
      });

      const result = await testStrategy.fetchEntries({
        token: 'test-token',
      });

      expect(result).toBeNull();
    });
  });

  describe('composeApiVariables', () => {
    it('should compose basic variables', () => {
      const props = {
        token: 'test-token',
        numberOfRowsToStart: 2,
        numberOfColumnsToShow: 3,
        getOffset: () => 0,
      };

      const result = testStrategy.composeApiVariables(props);

      expect(result).toMatchObject({
        token: 'test-token',
        limit: 6, // 2 * 3
        offset: 0,
      });
    });

    it('should include categories', () => {
      const props = {
        token: 'test-token',
        numberOfRowsToStart: 2,
        numberOfColumnsToShow: 3,
        getOffset: () => 0,
        categories: ['sports', 'arts'],
      };

      const result = testStrategy.composeApiVariables(props);

      expect(result).toMatchObject({
        related: ['sports', 'arts'],
      });
    });

    it('should use custom composeVariables', () => {
      const customCompose = jest.fn((base) => ({
        ...base,
        custom: 'value',
      }));

      const customStrategy = createGraphQLFetchStrategy({
        endpoint: 'https://test.com/graphql',
        queries: { entries: 'query' },
        transformResponse: mockTransformResponse,
        transformCount: mockTransformCount,
        composeVariables: customCompose,
      });

      const props = {
        token: 'test-token',
        numberOfRowsToStart: 2,
        getOffset: () => 0,
      };

      const result = customStrategy.composeApiVariables(props);

      expect(customCompose).toHaveBeenCalled();
      expect(result).toHaveProperty('custom', 'value');
    });
  });
});
