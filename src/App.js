import React from "react";
import Navbar from './comps/layouts/Navbar';
import Products from './comps/layouts/products/Products';
import Product from './comps/layouts/product/Product'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <Switch>
					<Route exact path='/' component={Products} />
					<Route exact path='/products/:slug' component={Product} />
					<Route path='*' component={()=>{"Not found"}} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
