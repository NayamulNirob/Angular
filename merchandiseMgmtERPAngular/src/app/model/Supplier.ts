import { Country } from "./countrymodel";



export class Supplier {
  id!: number;
  name!: string;
  contactPerson!: string;
  email!: string;
  phone!: string;
  address!: string;
  createdAt!: Date;
  updatedAt!: Date;
  status!: string;
  organization!: string;
  country: Country = new Country();
}
