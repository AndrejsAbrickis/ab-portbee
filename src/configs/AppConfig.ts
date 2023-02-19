import { join } from "path";
import { cwd } from "process";

const appRootDir = cwd();
const dataDir = "data";
const dataDirPath = join(appRootDir, dataDir);
const scheduleDirPath = join(dataDirPath, "schedule");

export { appRootDir, dataDir, scheduleDirPath };
