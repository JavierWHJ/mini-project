import React from 'react'
import ProductDto from '../../../shared/dto/Product'
import { Container, Card, Row, Col } from 'react-bootstrap'

interface IProps {
    product: ProductDto
}

const ProductCardComponent = (props: IProps) => {
    return (
        <Container>
            <Card.Link href={`/product/${props.product.title}`}>
                <Card className="p-4">
                    <Card.Body>
                        <Col>
                            <Card.Title>
                                {props.product.title}
                            </Card.Title>
                        </Col>
                        <Col>
                            {props.product.brand}
                        </Col>
                        <Col>
                            {props.product.category}
                        </Col>
                        <Col>
                            {props.product.price}
                        </Col>
                    </Card.Body>
                </Card>
            </Card.Link>
        </Container>
    )
}

export default ProductCardComponent