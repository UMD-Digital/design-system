import { graphql } from '../../../source/helpers/network/fetch';

global.fetch = jest.fn();
global.console.error = jest.fn();

describe('Network Fetch Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('graphql function', () => {
    const mockQuery = 'query { test }';
    const mockUrl = 'https://api.example.com/graphql';
    const mockToken = 'test-token';
    const mockVariables = { related: ['test1', 'test2'] };

    test('calls fetch with correct parameters', async () => {
      const mockResponse = {
        json: jest.fn().mockResolvedValue({ data: { test: 'success' } }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      await graphql({
        query: mockQuery,
        url: mockUrl,
        token: mockToken,
        variables: mockVariables,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        mockUrl,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${mockToken}`,
          },
          body: JSON.stringify({
            query: mockQuery,
            variables: mockVariables,
          }),
        }),
      );
    });

    test('returns data on successful fetch', async () => {
      const mockData = { data: { test: 'success' } };
      const mockResponse = {
        json: jest.fn().mockResolvedValue(mockData),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await graphql({
        query: mockQuery,
        url: mockUrl,
        token: mockToken,
      });

      expect(result).toEqual(mockData);
    });

    test('handles GraphQL errors', async () => {
      const mockErrors = [{ message: 'GraphQL Error' }];
      const mockResponse = {
        json: jest.fn().mockResolvedValue({ errors: mockErrors }),
      };
      (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await graphql({
        query: mockQuery,
        url: mockUrl,
        token: mockToken,
      });

      expect(console.error).toHaveBeenCalledWith('GraphQL Error');
      expect(result).toBeUndefined();
    });

    test('handles fetch errors', async () => {
      const mockError = new Error('Network Error');
      (global.fetch as jest.Mock).mockRejectedValue(mockError);

      const result = await graphql({
        query: mockQuery,
        url: mockUrl,
        token: mockToken,
      });

      expect(console.error).toHaveBeenCalledWith(mockError);
      expect(result).toBe(mockError);
    });
  });
});
