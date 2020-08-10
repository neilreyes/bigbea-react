import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Button, Toolbar, IconButton, Typography, Box, Grid } from '@material-ui/core'
import { Link as RouterLink } from 'react-router-dom'

const Navbar = props => {
	return (
        <AppBar position='fixed'>
            <Toolbar>
                <Grid container direction="row" justify="space-between">
                    <Typography variant='h6' className={""}>
                        BigBear Catalog
                    </Typography>
                    <nav>
                        <Button color='inherit' to='/' component={RouterLink}>
                            Products
                        </Button>
                    </nav>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

Navbar.propTypes = {

}

export default Navbar
