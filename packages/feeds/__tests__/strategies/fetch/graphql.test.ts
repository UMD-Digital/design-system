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

  describe('apiUrl override', () => {
    it('should fetch from apiUrl instead of the default endpoint', async () => {
      mockFetchGraphQL.mockResolvedValue({ data: { entries: [] } });

      await testStrategy.fetchEntries({
        token: 'test-token',
        apiUrl: 'https://staging.test.com/graphql',
      });

      expect(mockFetchGraphQL).toHaveBeenCalledWith(
        expect.objectContaining({ url: 'https://staging.test.com/graphql' }),
      );
    });

    it('should use apiUrl for count queries', async () => {
      mockFetchGraphQL.mockResolvedValue({ data: { count: 1 } });

      await testStrategy.fetchCount({
        token: 'test-token',
        apiUrl: 'https://staging.test.com/graphql',
      });

      expect(mockFetchGraphQL).toHaveBeenCalledWith(
        expect.objectContaining({ url: 'https://staging.test.com/graphql' }),
      );
    });

    it('should not send apiUrl as a query variable', async () => {
      mockFetchGraphQL.mockResolvedValue({ data: { entries: [] } });

      await testStrategy.fetchEntries({
        token: 'test-token',
        limit: 3,
        apiUrl: 'https://staging.test.com/graphql',
      });

      const { variables } = mockFetchGraphQL.mock.calls[0][0] as any;
      expect(variables).not.toHaveProperty('apiUrl');
      expect(variables).toMatchObject({ token: 'test-token', limit: 3 });
    });

    it('should carry apiUrl through composeApiVariables', () => {
      const result = testStrategy.composeApiVariables({
        token: 'test-token',
        numberOfRowsToStart: 1,
        apiUrl: 'https://staging.test.com/graphql',
      });

      expect(result).toHaveProperty('apiUrl', 'https://staging.test.com/graphql');
    });

    it('should carry apiUrl through custom composeVariables', () => {
      const customStrategy = createGraphQLFetchStrategy({
        endpoint: 'https://test.com/graphql',
        queries: { entries: 'query' },
        transformResponse: mockTransformResponse,
        transformCount: mockTransformCount,
        composeVariables: ({ token, limit }) => ({ token, limit }),
      });

      const result = customStrategy.composeApiVariables({
        token: 'test-token',
        numberOfRowsToStart: 1,
        apiUrl: 'https://staging.test.com/graphql',
      });

      expect(result).toHaveProperty('apiUrl', 'https://staging.test.com/graphql');
    });

    it('should omit apiUrl when none is passed', () => {
      const result = testStrategy.composeApiVariables({
        token: 'test-token',
        numberOfRowsToStart: 1,
      });

      expect(result).not.toHaveProperty('apiUrl');
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
