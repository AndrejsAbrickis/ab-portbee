import { existsSync, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import { dirname } from "path";

export class FileSystem {
  static save(path: string, data: string): Promise<void> {
    if (!existsSync(path)) {
      mkdirSync(dirname(path), { recursive: true });
    }

    return writeFile(path, data);
  }
}
