import { join } from "path";
import { appRootDir, dataDir } from "../configs/AppConfig";
import { FileSystem } from "../infrastructure/FileSystem";

export class DataStore {
  static storeInFile(data: string, fileName: string): Promise<void> {
    return FileSystem.save(join(appRootDir, dataDir, fileName), data);
  }
}
