export type VariablesType = {
  related?: string[];
};

const FetchGraphQL = async ({
  query,
  url,
  variables,
  token,
}: {
  query: string;
  url: string;
  token: string;
  variables?: VariablesType;
}) => {
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
      responseData.errors.forEach((error: any) => console.error(error.message));
      return;
    }

    return responseData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  FetchGraphQL,
};
