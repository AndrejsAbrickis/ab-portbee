import { expect, test, vi } from "vitest";
import { Endpoint } from "../configs/ApiConfig";
import { useApiEndpoint } from "./ApiUtils";

vi.mock("../configs/ApiConfig", async () => {
  return {
    Endpoint: { vessels: "vessels" },
    baseUrl: "https://localhost/api/v2/",
  };
});

test("it generates correct API url", () => {
  const actual = useApiEndpoint(Endpoint.vessels).href;

  expect(actual).toBe("https://localhost/api/v2/vessels");
});
