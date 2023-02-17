import "dotenv/config";
import { DataFetcher } from "./services/DataFetcher";
import { DataStore } from "./services/DataStore";

const vessels = await DataFetcher.fetchVessels();
DataStore.storeInFile(
  JSON.stringify({ updatedDate: new Date().toISOString(), vessels }),
  "vessels.json",
);
