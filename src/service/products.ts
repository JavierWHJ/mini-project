import ProductData from "../utils/products";

export class ProductsService {
    getAllProducts = () => {
        return ProductData
    }

    getProductsByCategory = (category: string) => {
        const products = ProductData
        return products.filter(product => product.category === category)
    }

    sortProductsByPrice = () => {
        return ProductData.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
    }
}