import { baseUrl, Endpoint } from "../configs/ApiConfig";

const useApiEndpoint = (
  endpoint: Endpoint,
  parameter: string | number | null = null,
) => {
  return [baseUrl, endpoint, parameter].filter(Boolean).join("/");
};

export { useApiEndpoint };
