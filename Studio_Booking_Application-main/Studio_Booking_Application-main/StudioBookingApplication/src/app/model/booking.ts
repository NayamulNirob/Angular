import { Studio } from "./studio";

export class Booking {
  studio!: string;
  date!: string;
  time!: string;
  user!: { name: string; email: string };
}