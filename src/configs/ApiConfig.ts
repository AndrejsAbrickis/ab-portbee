const baseUrl = process.env.API_URL;

const enum Endpoint {
  vessels = "vessels",
  schedule = "schedule",
}

export { Endpoint, baseUrl };
