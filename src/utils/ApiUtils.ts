import { baseUrl, Endpoint } from "../configs/ApiConfig";

const useApiEndpoint = (endpoint: Endpoint) => {
  console.log({ baseUrl });

  return new URL(endpoint, baseUrl);
};

export { useApiEndpoint };
