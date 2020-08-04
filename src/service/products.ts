import ProductData from "../utils/products";

class ProductsService {
    getAllProducts = () => {
        return ProductData
    }

    getProduct = async (title: string) => {
        return ProductData.find(product => product.title === title)
    }

    getProductsByCategory = async (category: string) => {
        return ProductData.filter(product => product.category === category)
    }

    sortProductsByPrice = async () => {
        return ProductData.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
    }
    
    getCategories = async () => {
        return Array.from(new Set(ProductData.map(data => data.category))) 
    }
}

export default new ProductsService()