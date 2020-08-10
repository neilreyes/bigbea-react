import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import {
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    Typography,
	Button,
	Grid,
	makeStyles
} from "@material-ui/core";
import axios from 'axios';

const useStyle = makeStyles({
	media:{
		height: 300,
	}
});

const ProductEntry = ({product}) => {
	const classes = useStyle();

	const {
		title,
		excerpt,
		slug
	} = product

	const fetchFeaturedImage = async (id) => {
		const res = await axios.get(`/wp-json/wp/v2/media/${product.featured_media}?_fields=guid,mime_type,media_details`)

		return setFeaturedImage({
			data: res.data,
			loading: false,
			success: true
		})
	}

	const [featuredImage, setFeaturedImage] = useState({
        data: {},
        loading: true,
        success: null,
    });

	useEffect(() => {
		fetchFeaturedImage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
        <Grid item xs={12} sm={6} lg={3}>
            <Card>
                <CardActionArea>
                    {featuredImage.loading ? (
                        <>
                            ...
                        </>
                    ) : (
                        <>
                            {console.log(
                                featuredImage.data.media_details.sizes.medium
                                    .source_url
                            )}
                            <img
                                src={
                                    featuredImage.data.media_details.sizes
                                        .medium.source_url
                                }
                                alt=''
                            />
                        </>
                    )}
                    <CardContent>
                        <Typography
                            gutterBottom
                            component='h2'
                            dangerouslySetInnerHTML={{
                                __html: title.rendered,
                            }}
                        />
                        <Typography
                            dangerouslySetInnerHTML={{
                                __html: excerpt.rendered,
                            }}
                        />
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button
                        variant='contained'
                        color='primary'
                        to={`/products/${slug}`}
                        component={RouterLink}>
                        Learn more
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

ProductEntry.propTypes = {
	product: PropTypes.object.isRequired,
}

export default ProductEntry
