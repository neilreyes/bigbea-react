import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import {
    Card,
    CardActions,
    CardActionArea,
	CardContent,
	CardMedia,
    Typography,
	Button,
	Grid,
	makeStyles
} from "@material-ui/core";
import { Skeleton } from '@material-ui/lab'

const useStyle = makeStyles({
	media:{
		height: 300,
	}
});

const ProductEntry = ({product}) => {

	const [loading, setLoading] = useState(true);
	const classes = useStyle();

	const { title, slug, featured_media_urls: {medium} } = product;



	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 1000);
	}, [])

	return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardActionArea>
                    <RouterLink to={`/products/${slug}`}>
                        {loading ? (
                            <Skeleton
                                animation='wave'
                                variant='rect'
                                width={"100%"}
                                height={"300px"}
                            />
                        ) : (
                            <CardMedia
                                className={classes.media}
                                image={medium}
                            />
                        )}

                        <CardContent>
                            {loading ? (<Skeleton animation='wave' variant='rect' width={'100%'} height={10}/>) : (<Typography
                                gutterBottom
                                component='h2'
                                variant='body1'
                                dangerouslySetInnerHTML={{
                                    __html: title.rendered,
                                }}
                                style={{
                                    textDecoration: "none",
                                    textAlign: "center",
                                }}
                            />)}
                        </CardContent>
                    </RouterLink>
                </CardActionArea>
                
            </Card>
        </Grid>
    );
}

ProductEntry.propTypes = {
	product: PropTypes.object.isRequired,
}

export default ProductEntry
