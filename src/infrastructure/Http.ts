export class Http {
  static async get(url: string) {
    const response = await fetch(url);

    return await response.json();
  }
}
