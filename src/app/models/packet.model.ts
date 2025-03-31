export interface Packet {
  _id: string;
  name: string;
  description: string;
  status: string;
  seleccionado?: boolean;
}
export class Packet implements Packet {
  constructor() {
    this.seleccionado = false;
  }
}
