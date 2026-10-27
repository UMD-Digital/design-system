import { fetchREST } from '../../source/network/fetchREST';

describe('fetchREST', () => {
  let mockFetch: jest.Mock;

  beforeEach(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send a JSON GET request to the given url', async () => {
    mockFetch.mockResolvedValue({ ok: true });

    await fetchREST({ url: 'https://gateway.example.com/v1/feed' });

    expect(mockFetch).toHaveBeenCalledWith(
      'https://gateway.example.com/v1/feed',
      {
        method: 'GET',
        headers: { Accept: 'application/json' },
      },
    );
  });

  it('should return the fetch response untouched', async () => {
    const response = { ok: false, status: 503 };
    mockFetch.mockResolvedValue(response);

    const result = await fetchREST({ url: 'https://gateway.example.com' });

    expect(result).toBe(response);
  });

  it('should propagate network errors', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'));

    await expect(
      fetchREST({ url: 'https://gateway.example.com' }),
    ).rejects.toThrow('Network error');
  });
});
