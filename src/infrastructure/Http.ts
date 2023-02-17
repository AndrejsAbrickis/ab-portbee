export class Http {
  static async get(url: URL) {
    const response = await fetch(url);

    return await response.json();
  }
}
