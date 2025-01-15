import { ProductsResponse } from "../types/Product";

export const fetchProducts = async () => {
    try {
        const res = await fetch("/products.json")
        if (!res.ok) {
            throw new Error;
        }
        const data: ProductsResponse = await res.json()
        return data.products;
    } catch (error) {
        console.error(error);
    }
}