import React from 'react'
import { CircularProgress, Grid } from "@material-ui/core";

const Spinner = () => {
	return (
        <Grid container justify='center'>
            <CircularProgress/>
        </Grid>
    );
}

export default Spinner
