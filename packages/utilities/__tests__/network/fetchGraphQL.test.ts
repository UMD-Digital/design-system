import { fetchGraphQL } from '../../source/network/fetchGraphQL';

describe('fetchGraphQL', () => {
  let mockFetch: jest.Mock;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe('happy path', () => {
    it('should make successful GraphQL query', async () => {
      const mockResponse = {
        data: {
          user: {
            id: '123',
            name: 'Test User',
          },
        },
      };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      const result = await fetchGraphQL({
        query: 'query { user { id name } }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
      });

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer test-token',
        },
        body: JSON.stringify({
          query: 'query { user { id name } }',
          variables: undefined,
        }),
      });
    });

    it('should include variables in request', async () => {
      const mockResponse = { data: { user: { id: '123' } } };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      const variables = { id: '123', name: 'Test' };

      await fetchGraphQL({
        query: 'query($id: ID!) { user(id: $id) { name } }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
        variables,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/graphql',
        expect.objectContaining({
          body: JSON.stringify({
            query: 'query($id: ID!) { user(id: $id) { name } }',
            variables,
          }),
        }),
      );
    });

    it('should include bearer token in Authorization header', async () => {
      const mockResponse = { data: {} };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      await fetchGraphQL({
        query: 'query { test }',
        url: 'https://api.example.com/graphql',
        token: 'my-secret-token',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/graphql',
        expect.objectContaining({
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer my-secret-token',
          },
        }),
      );
    });

    it('should use POST method', async () => {
      const mockResponse = { data: {} };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      await fetchGraphQL({
        query: 'query { test }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/graphql',
        expect.objectContaining({
          method: 'POST',
        }),
      );
    });

    it('should set Content-Type header', async () => {
      const mockResponse = { data: {} };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      await fetchGraphQL({
        query: 'query { test }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/graphql',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        }),
      );
    });
  });

  describe('error handling', () => {
    it('should handle GraphQL errors in response', async () => {
      const mockResponse = {
        errors: [
          { message: 'Field not found' },
          { message: 'Invalid query' },
        ],
        data: null,
      };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      const result = await fetchGraphQL({
        query: 'query { invalid }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
      });

      expect(result).toEqual(mockResponse);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Field not found');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid query');
      expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');

      mockFetch.mockRejectedValue(networkError);

      const result = await fetchGraphQL({
        query: 'query { test }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
      });

      expect(result).toBe(networkError);
      expect(consoleErrorSpy).toHaveBeenCalledWith(networkError);
    });

    it('should handle fetch throwing error', async () => {
      const fetchError = new Error('Fetch failed');

      mockFetch.mockImplementation(() => {
        throw fetchError;
      });

      const result = await fetchGraphQL({
        query: 'query { test }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
      });

      expect(result).toBe(fetchError);
      expect(consoleErrorSpy).toHaveBeenCalledWith(fetchError);
    });

    it('should handle JSON parsing error', async () => {
      mockFetch.mockResolvedValue({
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      const result = await fetchGraphQL({
        query: 'query { test }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
      });

      expect(result).toBeInstanceOf(Error);
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    it('should return response even with errors', async () => {
      const mockResponse = {
        errors: [{ message: 'Partial error' }],
        data: { user: { id: '123' } },
      };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      const result = await fetchGraphQL({
        query: 'query { user { id } }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
      });

      expect(result).toEqual(mockResponse);
      expect(result.data).toBeDefined();
      expect(result.errors).toBeDefined();
    });
  });

  describe('edge cases', () => {
    it('should handle empty query string', async () => {
      const mockResponse = { data: {} };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      const result = await fetchGraphQL({
        query: '',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
      });

      expect(result).toEqual(mockResponse);
    });

    it('should handle empty variables object', async () => {
      const mockResponse = { data: {} };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      await fetchGraphQL({
        query: 'query { test }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
        variables: {},
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/graphql',
        expect.objectContaining({
          body: JSON.stringify({
            query: 'query { test }',
            variables: {},
          }),
        }),
      );
    });

    it('should handle null token', async () => {
      const mockResponse = { data: {} };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      await fetchGraphQL({
        query: 'query { test }',
        url: 'https://api.example.com/graphql',
        token: null as any,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/graphql',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer null',
          }),
        }),
      );
    });

    it('should handle variables with related array', async () => {
      const mockResponse = { data: {} };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      const variables = {
        related: ['item1', 'item2'],
        other: 'value',
      };

      await fetchGraphQL({
        query: 'query { test }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
        variables,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/graphql',
        expect.objectContaining({
          body: JSON.stringify({
            query: 'query { test }',
            variables,
          }),
        }),
      );
    });

    it('should handle complex nested variables', async () => {
      const mockResponse = { data: {} };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      const variables = {
        user: {
          name: 'Test',
          address: {
            city: 'New York',
            zip: '10001',
          },
        },
      };

      await fetchGraphQL({
        query: 'mutation { createUser }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
        variables,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/graphql',
        expect.objectContaining({
          body: JSON.stringify({
            query: 'mutation { createUser }',
            variables,
          }),
        }),
      );
    });

    it('should handle different URL formats', async () => {
      const mockResponse = { data: {} };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      await fetchGraphQL({
        query: 'query { test }',
        url: 'http://localhost:3000/api/graphql',
        token: 'test-token',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/graphql',
        expect.any(Object),
      );
    });
  });

  describe('response handling', () => {
    it('should return data when no errors', async () => {
      const mockResponse = {
        data: {
          users: [
            { id: '1', name: 'User 1' },
            { id: '2', name: 'User 2' },
          ],
        },
      };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      const result = await fetchGraphQL({
        query: 'query { users { id name } }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
      });

      expect(result).toEqual(mockResponse);
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should log each error message individually', async () => {
      const mockResponse = {
        errors: [
          { message: 'Error 1' },
          { message: 'Error 2' },
          { message: 'Error 3' },
        ],
      };

      mockFetch.mockResolvedValue({
        json: async () => mockResponse,
      });

      await fetchGraphQL({
        query: 'query { test }',
        url: 'https://api.example.com/graphql',
        token: 'test-token',
      });

      expect(consoleErrorSpy).toHaveBeenCalledTimes(3);
      expect(consoleErrorSpy).toHaveBeenNthCalledWith(1, 'Error 1');
      expect(consoleErrorSpy).toHaveBeenNthCalledWith(2, 'Error 2');
      expect(consoleErrorSpy).toHaveBeenNthCalledWith(3, 'Error 3');
    });
  });
});