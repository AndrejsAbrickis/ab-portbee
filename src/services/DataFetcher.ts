import { Endpoint } from "../configs/ApiConfig";
import { Http } from "../infrastructure/Http";
import { Schedule } from "../model/Schedule";
import { Vessel } from "../model/Vessel";
import { useApiEndpoint } from "../utils/ApiUtils";
import { DataStore } from "./DataStore";

export class DataFetcher {
  static async fetchAllAndStore() {
    const vessels = await DataFetcher.fetchVessels();
    await DataStore.storeInFile(
      JSON.stringify({ updatedDate: new Date().toISOString(), vessels }),
      "vessels.json",
    );

    for await (const schedule of vessels.map((vessel) =>
      DataFetcher.fetchSchedules(vessel),
    )) {
      await DataStore.storeInFile(
        JSON.stringify({ updatedDate: new Date().toISOString(), schedule }),
        `schedule/${schedule.vessel.imo}.json`,
      );
    }

    return Promise.resolve();
  }

  static fetchVessels(): Promise<Vessel[]> {
    return Http.get(useApiEndpoint(Endpoint.vessels));
  }

  static fetchSchedules(vessel: Vessel): Promise<Schedule> {
    return Http.get(useApiEndpoint(Endpoint.schedule, vessel.imo));
  }
}
