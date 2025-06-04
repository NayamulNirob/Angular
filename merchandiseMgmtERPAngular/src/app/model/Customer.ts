import { Country } from "./countrymodel";



export class Customer {
  id!: number;
  name!: string;
  email!: string;
  phone!: string;
  address!: string;
  createdAt!: Date;
  updatedAt!: Date;
  contactPerson!: string;
  country!: string;
  organigation!: string;
  countryObj: Country = new Country();
}
