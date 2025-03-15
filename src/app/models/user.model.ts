export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  available: boolean;
  packets: string[];
  }
export class User implements User {
    constructor() {}
}
