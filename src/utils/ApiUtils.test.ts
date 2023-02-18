import "process";
import { expect, test, vi } from "vitest";
import { Endpoint } from "../configs/ApiConfig";
import { useApiEndpoint } from "./ApiUtils";

vi.mock("process", () => ({
  env: { API_URL: "https://localhost/api/v2" },
}));

test("it generates correct API url when parameter is not passed", () => {
  const actual = useApiEndpoint(Endpoint.vessels);

  expect(actual).toBe("https://localhost/api/v2/vessels");
});

test("it generates correct API url when parameter is passed", () => {
  const actual = useApiEndpoint(Endpoint.schedule, 7);

  expect(actual).toBe("https://localhost/api/v2/schedule/7");
});

test("it generates API url when invalid parameter is passed", () => {
  const actual = useApiEndpoint(Endpoint.schedule, null);

  expect(actual).toBe("https://localhost/api/v2/schedule");
});
