import React from 'react'
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

const useStyle = makeStyles({
	media:{
		height: 300,
	}
});

const ProductEntry = ({product}) => {
	const classes = useStyle();

	const { title, slug, featured_media_urls } = product;

	return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardActionArea>
                    <RouterLink to={`/products/${slug}`}>
                        <CardMedia
                            className={classes.media}
                            image={featured_media_urls.medium}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
								component='h2'
								variant='body1'
                                dangerouslySetInnerHTML={{
                                    __html: title.rendered,
								}}
								style={{
									textDecoration: 'none',
									textAlign: 'center'
								}}
                            />
                        </CardContent>
                    </RouterLink>
                </CardActionArea>
                <CardActions>
                    <Button
                        variant='contained'
                        to={`/products/${slug}`}
                        component={RouterLink}
						fullWidth={true}
						variant='text'>
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
