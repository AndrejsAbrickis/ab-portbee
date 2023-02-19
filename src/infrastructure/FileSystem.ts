import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { dirname, join } from "path";

export class FileSystem {
  static save(path: string, data: string): Promise<void> {
    if (!existsSync(path)) {
      mkdirSync(dirname(path), { recursive: true });
    }

    return writeFile(path, data);
  }

  static getFilesInDir(dirPath: string): string[] {
    if (!existsSync(dirPath)) {
      return [];
    }

    return readdirSync(dirPath);
  }

  static getFileContentString(dirPath: string, fileName: string): string {
    return readFileSync(join(dirPath, fileName), "utf8");
  }
}
