export interface Packet {
  _id: string;
  name: string;
  description: string;
  status: string;
}
export class Packet implements Packet {
  constructor() {}
}
