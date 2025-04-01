import { Category } from './category.model';

export interface Packet {
  _id: string;
  name: string;
  description: string;
  status: string;
  categories: Category[]; // Lista de categorías
  seleccionado?: boolean;
}

export class Packet implements Packet {
  constructor() {
    this.seleccionado = false;
    this.categories = [];
  }
}