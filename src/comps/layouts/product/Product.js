import React,  { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link as RouterLink } from "react-router-dom";
import { Button, Container, Divider, CircularProgress, Typography, Link } from '@material-ui/core'
import Spinner from '../Spinner';

const Product = ({ match }) => {
    const [product, setProduct] = useState({
		success: false,
		lenth: null,
        data: null,
        loading: true,
    });

    const fetch = async () => {
        try {
			const res = await axios.get(
                `/wp-json/wp/v2/bbear_products?slug=${match.params.slug}`
            );

            return setProduct({
				success: true,
				length: res.data.length,
                data: res.data[0],
                loading: false,
            });
		} catch (error) {
			console.error(error)
		}
    };

    useEffect(() => {
		fetch()
		// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

	return (
        <Container style={{ marginTop: "100px" }}>
            {product.loading ? (
                <>
                    <Spinner/>
                </>
            ) : (
                <>
                    {product.length > 0 ? (
                        <>
                            <Button
                                variat='primary'
                                to='/'
                                component={RouterLink}>
                                Back
                            </Button>
                            <Divider />
                            <Typography
                                variant='h2'
                                dangerouslySetInnerHTML={{
                                    __html: product.data.title.rendered,
                                }}
                            />
                            <Typography
                                variant='body1'
                                dangerouslySetInnerHTML={{
                                    __html:
                                        product.data.acf.product_details
                                            .description,
                                }}
                            />
                        </>
                    ) : (
                        <>{"Not found"}</>
                    )}
                </>
            )}
        </Container>
    );
};

Product.propTypes = {
	match: PropTypes.object.isRequired,
}

export default Product
