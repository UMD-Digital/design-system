/**
 * Type definition for GraphQL query variables
 */
export type GraphQLVariables = {
  related?: string[];
  [key: string]: any;
};

/**
 * Executes a GraphQL query with authentication and error handling
 *
 * Makes a POST request to a GraphQL endpoint with bearer token authentication.
 * Handles errors and returns the response data or error object.
 *
 * @param query - The GraphQL query string
 * @param url - The GraphQL endpoint URL
 * @param token - Bearer token for authentication
 * @param variables - Optional variables for the GraphQL query
 * @returns Promise resolving to response data or error
 *
 * @example
 * ```typescript
 * const data = await fetchGraphQL({
 *   query: `
 *     query GetUser($id: ID!) {
 *       user(id: $id) {
 *         name
 *         email
 *       }
 *     }
 *   `,
 *   url: 'https://api.example.com/graphql',
 *   token: 'your-bearer-token',
 *   variables: { id: '123' }
 * });
 * ```
 *
 * @category network
 */
export const fetchGraphQL = async ({
  query,
  url,
  variables,
  token,
}: {
  query: string;
  url: string;
  token: string;
  variables?: GraphQLVariables;
}): Promise<any> => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const body = JSON.stringify({
    query,
    variables,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    const responseData = await response.json();

    if (responseData.errors) {
      responseData.errors.forEach((error: any) =>
        console.error(error.message),
      );
      return responseData;
    }

    return responseData;
  } catch (error) {
    console.error(error);
    return error;
  }
};