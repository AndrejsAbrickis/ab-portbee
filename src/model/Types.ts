type Schedule = {
  vessel: Vessel;
  portCalls: PortCall[];
};

type Vessel = {
  imo: number;
  name: string;
};

type Port = {
  id: string;
  name: string;
};

type PortCall = {
  arrival: string;
  departure: string;
  createdDate: string;
  isOmitted: boolean;
  service: string;
  port: Port;
  logEntries: {
    updatedField: string;
    arrival: null | string;
    departure: null | string;
    isOmitted: boolean | null;
    createdDate: string;
  };
};

export { Schedule, Port, PortCall, Vessel };
