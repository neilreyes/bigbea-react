import React, { useEffect, useContext } from "react";
import { Container, Grid } from "@material-ui/core";
import { Pagination } from '@material-ui/lab';
import ProductEntry from './ProductEntry';
import Spinner from '../Spinner';
import { ProductsContext } from '../../../context/ProductsContext';

const Products = () => {
	const { loading, getProducts, getProductsNext, products } = useContext(ProductsContext);

	useEffect(() => {
		getProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (e) => {
		console.log(e)
	}

    return (
        <Container style={{ marginTop: "100px" }}>
            {loading ? (
                <>
                    <Spinner />
                </>
            ) : (
                <>
                    {products !== null && (
                        <Grid container spacing={3}>
                            {products.data.map((product) => (
                                <ProductEntry
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </Grid>
                    )}
					<Pagination count={products.totalPages} onChange={handleChange}/>
                </>
            )}
        </Container>
    );
};

export default Products;
