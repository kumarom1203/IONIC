import { Product } from "./product.model";

export interface Shop {
    shop_name: string;
    product: Product[];
}