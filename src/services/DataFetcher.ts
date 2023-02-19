import { Endpoint } from "../configs/ApiConfig";
import { FileSystem } from "../infrastructure/FileSystem";
import { Http } from "../infrastructure/Http";
import { Schedule, Vessel } from "../model/Types";
import { useApiEndpoint } from "../utils/ApiUtils";

export class DataFetcher {
  static async fetchAllAndStore() {
    const vessels = await DataFetcher.fetchVessels();

    await FileSystem.save(
      "vessels.json",
      JSON.stringify({ updatedDate: new Date().toISOString(), vessels }),
    );

    for await (const schedule of vessels.map((vessel) =>
      DataFetcher.fetchSchedules(vessel),
    )) {
      await FileSystem.save(
        `schedule/${schedule.vessel.imo}.json`,
        JSON.stringify({ updatedDate: new Date().toISOString(), schedule }),
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
