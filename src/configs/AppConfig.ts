import { join } from "path";
import { cwd } from "process";

const appRootDir = cwd();
const dataDir = "data";
const scheduleDirPath = join(appRootDir, dataDir, "schedule");

export { appRootDir, dataDir, scheduleDirPath };
