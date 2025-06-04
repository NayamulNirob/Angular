import { ProductCategory } from "./productcategorymodel";

export class SubCategories{
    id!: number;
    name!: string;
    productCategory:ProductCategory = new ProductCategory();
}