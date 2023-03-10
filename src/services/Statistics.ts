import { quantile } from "d3-array";
import prettyMilliseconds from "pretty-ms";
import { scheduleDirPath } from "../configs/AppConfig";
import { FileSystem } from "../infrastructure/FileSystem";
import { PortCall, Schedule } from "../model/Types";

export class Statistics {
  ports = new Map();
  portsStatistics = new Map<string, number[]>();

  constructor() {
    this.#generate();
  }

  async #generate() {
    const portCalls = Array.from(this.#getPortCalls().values()).flat();

    portCalls.forEach((portCall) => {
      if (portCall.isOmitted) {
        return;
      }

      const { port } = portCall;
      let portCallDurations: number[] = [];

      if (this.portsStatistics.has(port.id)) {
        portCallDurations = this.portsStatistics.get(port.id) ?? [];
      }

      const duration = this.#getPortCallDuration(portCall);

      this.portsStatistics.set(port.id, [...portCallDurations, duration]);
      this.ports.set(port.id, port);
    });
  }

  #getPortCalls(): Map<number, PortCall[]> {
    const portCalls: Map<number, PortCall[]> = new Map();
    const scheduleFiles = FileSystem.getFilesInDir(scheduleDirPath);

    scheduleFiles.forEach(async (file) => {
      const data = FileSystem.getFileContentString(scheduleDirPath, file);
      const { schedule }: { updatedDate: string; schedule: Schedule } =
        JSON.parse(data);

      portCalls.set(schedule.vessel.imo, schedule.portCalls);
    });

    return portCalls;
  }

  #getPortCallDuration({ arrival, departure }: PortCall) {
    return new Date(departure).getTime() - new Date(arrival).getTime();
  }

  get #sortedByPortCalls() {
    return [...this.portsStatistics.entries()].sort(
      ([_aKey, aValue], [_bKey, bValue]) => bValue.length - aValue.length,
    );
  }

  get #sortedWithPercentiles() {
    return this.#sortedByPortCalls.map(([portId, portCalls]) => ({
      port: this.ports.get(portId),
      portCalls,
      p5: quantile(portCalls, 0.05),
      p20: quantile(portCalls, 0.2),
      p50: quantile(portCalls, 0.5),
      p75: quantile(portCalls, 0.75),
      p90: quantile(portCalls, 0.9),
    }));
  }

  get top() {
    return [
      this.#sortedWithPercentiles.at(0),
      this.#sortedWithPercentiles.at(1),
      this.#sortedWithPercentiles.at(2),
      this.#sortedWithPercentiles.at(3),
      this.#sortedWithPercentiles.at(4),
    ]
      .filter(Boolean)
      .map((p) => ({
        portName: p?.port.name,
        portCallCount: p?.portCalls.length,
      }));
  }

  get bottom() {
    return [
      this.#sortedWithPercentiles.at(-1),
      this.#sortedWithPercentiles.at(-2),
      this.#sortedWithPercentiles.at(-3),
      this.#sortedWithPercentiles.at(-4),
      this.#sortedWithPercentiles.at(-5),
    ]
      .filter(Boolean)
      .map((p) => ({
        portName: p?.port.name,
        portCallCount: p?.portCalls.length,
      }));
  }

  get all() {
    return this.#sortedWithPercentiles.map((portCallStats) => ({
      portName: portCallStats.port.name,
      portCallCount: portCallStats.portCalls.length,
      durationP5: prettyMilliseconds(portCallStats.p5 ?? 0),
      durationP20: prettyMilliseconds(portCallStats.p20 ?? 0),
      durationP50: prettyMilliseconds(portCallStats.p50 ?? 0),
      durationP75: prettyMilliseconds(portCallStats.p75 ?? 0),
      durationP90: prettyMilliseconds(portCallStats.p90 ?? 0),
    }));
  }
}
