import { Product } from "./product";
import { Status } from "./status";

export interface Command {
  id: number;
  orderNumber: string;
  products: Product[];
  date: Date;
  status: Status;
  email: string;
}
