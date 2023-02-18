export class PortCall {
  arrival!: string;
  departure!: string;
  createdDate!: string;
  isOmitted!: boolean;
  service!: string;
  port!: { id: string; name: string };
  logEntries!: {
    updatedField: string;
    arrival: null | string;
    departure: null | string;
    isOmitted: boolean | null;
    createdDate: string;
  };
}
