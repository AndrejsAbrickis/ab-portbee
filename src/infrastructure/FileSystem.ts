import { writeFile } from "fs/promises";

export class FileSystem {
  static save(path: string, data: string) {
    writeFile(path, data);
  }
}
