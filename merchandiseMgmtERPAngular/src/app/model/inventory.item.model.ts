import { Product } from "./Product";
import { WareHouse } from "./warehouse.model";

export class InventoryItem {

    id!: number;
    stock!: number;
    // location!: string;
    // description!: string;
    // price!: number;

    warehouse: WareHouse = new WareHouse();
    product: Product = new Product();
}