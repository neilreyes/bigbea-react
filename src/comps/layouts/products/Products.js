import React, { useEffect, useContext } from "react";
import { Box, Container, Grid } from "@material-ui/core";
import { Pagination } from '@material-ui/lab';
import ProductEntry from './ProductEntry';
import Spinner from '../Spinner';
import { ProductsContext } from '../../../context/ProductsContext';

const Products = () => {
	const { loading, getProducts, products } = useContext(ProductsContext);

	useEffect(() => {
		getProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (e, page) => {
		e.preventDefault();
		getProducts(page);
		window.scrollTo(0,0);
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
                    <Box container mt="20px" mb="20px" display='flex' justifyContent='center'>
                        <Pagination
                            count={parseInt(products.totalPages)}
                            page={parseInt(products.currentPage)}
                            onChange={handleChange}
                        />
                    </Box>
                </>
            )}
        </Container>
    );
};

export default Products;
