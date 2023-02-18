import { env } from "process";

const baseUrl = env.API_URL

const enum Endpoint {
  vessels = "vessels",
  schedule = "schedule",
}

export { Endpoint, baseUrl };
