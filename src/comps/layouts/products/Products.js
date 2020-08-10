import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Container, CircularProgress, Grid } from "@material-ui/core";
import ProductEntry from './ProductEntry'
import Spinner from '../Spinner';

const Products = (props) => {

	const fetch = async () => {
		const res = await axios.get(
            "/wp-json/wp/v2/bbear_products?_fields=id,title,excerpt,link,featured_media,author,slug"
        );
		
		return setProducts({
			loading: false,
			success: true,
			products: res.data
		})
	}

	const [products, setProducts] = useState({
		products: [],
		loading: true,
		success: false,
	})

	useEffect(() => {
		fetch()
	}, []);

    return (
        <Container style={{ marginTop: "100px" }}>
            {products.loading ? (
                <>
                    <Spinner />
                </>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {products.products.map((product) => (
                            <ProductEntry key={product.id} product={product} />
                        ))}
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default Products;
