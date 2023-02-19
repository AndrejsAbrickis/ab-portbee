import { join } from "path";
import { cwd } from "process";

const appRootDir = cwd();
const dataDirPath = join(appRootDir, "data");
const scheduleDirPath = join(dataDirPath, "schedule");

export { dataDirPath, scheduleDirPath };
