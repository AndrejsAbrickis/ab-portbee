import { Endpoint } from "../configs/ApiConfig";
import { Http } from "../infrastructure/Http";
import { Vessel } from "../model/Vessel";
import { useApiEndpoint } from "../utils/ApiUtils";

export class DataFetcher {
  static fetchVessels(): Promise<Vessel[]> {
    return Http.get(useApiEndpoint(Endpoint.vessels));
  }
}
