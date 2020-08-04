import React from 'react';
import Head from 'next/head'
import { NextComponentType, NextPageContext, GetServerSideProps } from "next";
import ProductsService from '../../service/products';
import ProductDto from '../../shared/dto/Product';

interface IProps {
    product: ProductDto
}

export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
    const { query, req, res } = context

    const title = query.title as string;

    const product: ProductDto = await ProductsService.getProduct(title);

    return {
        props: {
            product: product
        }
    }
}

const Product = (props: IProps) => {
    const {title, brand, category, price} = props.product;

    return (
        <div className="container mt-5">
            <h1>{title}</h1>
            <h2>{brand}</h2>
            <h3>{category}</h3>
            <h3>{price}</h3>
        </div>
    );
}

export default Product;
