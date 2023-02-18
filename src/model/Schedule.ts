import { PortCall } from "./PortCall";
import { Vessel } from "./Vessel";

export interface Schedule {
  vessel: Vessel;
  portCalls: PortCall[];
}
