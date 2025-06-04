import { SubCategories } from "./subcategoriesmodel";
import { Supplier } from "./Supplier";




export class Product {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  productCode!: string;
  purchaseDate!: Date;
  quantity!: number;
  tax!: number;
  paid!: number;
  due!: number;
  totalPrice!: number;
  image!: string;
  sizes!: string;
  supplier: Supplier = new Supplier();
  subCategories: SubCategories = new SubCategories();
}
