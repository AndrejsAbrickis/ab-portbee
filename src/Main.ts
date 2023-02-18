import "dotenv/config";
import { DataFetcher } from "./services/DataFetcher";
import { DataStore } from "./services/DataStore";

const vessels = await DataFetcher.fetchVessels();
DataStore.storeInFile(
  JSON.stringify({ updatedDate: new Date().toISOString(), vessels }),
  "vessels.json",
);

vessels.forEach(async (vessel) => {
  const schedule = await DataFetcher.fetchSchedules(vessel);

  DataStore.storeInFile(
    JSON.stringify({ updatedDate: new Date().toISOString(), schedule }),
    `schedule/${vessel.imo}.json`,
  );
});
