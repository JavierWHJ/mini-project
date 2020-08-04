import React, { useState, useEffect } from 'react';
import ProductDto from '../../../shared/dto/Product';
import ProductCardComponent from '../components/ProductCardComponent';
import InfiniteScroll from 'react-infinite-scroll-component';
import classnames from 'classnames';
import Spinner from 'react-bootstrap/Spinner';
import { useRouter } from 'next/router';
import axios from 'axios';

interface IProps {
    products: ProductDto[]
}

const ProductsContainer = (props: IProps) => {

    const router = useRouter();

    const maxLength = 9
    const additionalItems = 6
    const [index, setIndex] = useState(9);
    const [additionalProductsLength, setAdditionalProductsLength] = useState()
    const [products, setProducts] = useState(props.products);
    const [displayedProducts, setDisplayedProducts] = useState(props.products.slice(0,maxLength))
    const [hasMore, setHasMore] = useState(products.length - displayedProducts.length > 6);

    useEffect(() => {
        if (!router.query.category) return 

        axios.post('/api/products/getProducts', {category: router.query.category})
            .then(res => {
                setProducts(res.data)
                setDisplayedProducts(res.data.slice(0, maxLength));
                setIndex(res.data.length < 9 ? res.data.length : 9)
                setHasMore(products.length - displayedProducts.length > 6)
            })
    }, [router.query.category])
    
    const changeData = () => {
        const newProducts = props.products.slice(index,index+additionalItems)
        setAdditionalProductsLength(newProducts.length)
        setDisplayedProducts(displayedProducts.concat(newProducts))
        const newIndex = index + additionalItems
        setIndex(newIndex)
        setHasMore(newIndex < props.products.length)
    }

    const renderProducts = (products: ProductDto[]) => {
        return products.map(product => {
            return <ProductCardComponent key={product.title} product={product}/>
        })
    }
    
    return (
        <div className="container my-5">
            <InfiniteScroll
                dataLength={additionalProductsLength ? additionalProductsLength : maxLength}
                next={changeData}
                hasMore={hasMore}
                loader={<div className={classnames('text-center')}>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>}>
            {renderProducts(displayedProducts)}
            </InfiniteScroll>
        </div>
    );
}

export default ProductsContainer;
