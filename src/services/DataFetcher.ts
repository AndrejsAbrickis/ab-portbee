import { Endpoint } from "../configs/ApiConfig";
import { Http } from "../infrastructure/Http";
import { Vessel } from "../model/Vessel";
import { useApiEndpoint } from "../utils/ApiUtils";
import { DataStore } from "./DataStore";

export class DataFetcher {
  static async fetchAllAndStore() {
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
  }

  static fetchVessels(): Promise<Vessel[]> {
    return Http.get(useApiEndpoint(Endpoint.vessels));
  }

  static fetchSchedules(vessel: Vessel): Promise<Vessel[]> {
    return Http.get(useApiEndpoint(Endpoint.schedule, vessel.imo));
  }
}
