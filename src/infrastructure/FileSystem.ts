import { existsSync, mkdirSync, readdirSync, readFileSync } from "fs";
import { writeFile } from "fs/promises";
import { dirname, join } from "path";
import { dataDirPath } from "../configs/AppConfig";

export class FileSystem {
  static save(fileName: string, data: string): Promise<void> {
    const filePath = join(dataDirPath, fileName);
    const dirPath = dirname(filePath);

    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true });
    }

    return writeFile(filePath, data);
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
