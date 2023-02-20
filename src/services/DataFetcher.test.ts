import { afterAll, beforeAll, describe, expect, test, vi } from "vitest";
import { FileSystem } from "../infrastructure/FileSystem";
import { Schedule, Vessel } from "../model/Types";
import { DataFetcher } from "./DataFetcher";

const VESSELS_RESPONSE: Vessel[] = [
  { imo: 9303807, name: "ABIDJAN EXPRESS" },
  { imo: 9314935, name: "AS CAROLINA" },
];

const SCHEDULE_RESPONSE_1: Schedule = {
  vessel: VESSELS_RESPONSE[0],
  portCalls: [],
};

const SCHEDULE_RESPONSE_2: Schedule = {
  vessel: VESSELS_RESPONSE[1],
  portCalls: [],
};

describe("DataFetcher.fetchAllAndStore", () => {
  beforeAll(() => {
    const date = new Date(2023, 1, 20);
    vi.useFakeTimers();
    vi.setSystemTime(date);
  });

  afterAll(() => {
    vi.useRealTimers;
  });

  test("it should fetch and save Vessels and Schedule for each vessel", async () => {
    const saveSpy = vi.spyOn(FileSystem, "save").mockResolvedValue();
    vi.spyOn(DataFetcher, "fetchVessels").mockResolvedValue(VESSELS_RESPONSE);
    vi.spyOn(DataFetcher, "fetchSchedules")
      .mockResolvedValueOnce(SCHEDULE_RESPONSE_1)
      .mockResolvedValueOnce(SCHEDULE_RESPONSE_2);

    await DataFetcher.fetchAllAndStore();

    expect(saveSpy).toBeCalledTimes(3);
    expect(saveSpy.mock.calls[0]).toEqual(
      expect.arrayContaining(["vessels.json"]),
    );
    expect(saveSpy.mock.calls[1]).toEqual(
      expect.arrayContaining(["schedule/9303807.json"]),
    );
    expect(saveSpy.mock.calls[2]).toEqual(
      expect.arrayContaining(["schedule/9314935.json"]),
    );
  });
});
