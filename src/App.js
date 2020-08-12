import React from "react";
import Navbar from './comps/layouts/Navbar';
import Products from './comps/layouts/products/Products';
import Product from './comps/layouts/product/Product'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ProductsProvider} from "./context/ProductsContext";

function App() {
    return (
        <ProductsProvider>
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Products} />
                    <Route exact path='/products/:slug' component={Product} />
                    <Route 
                        component={() => {
                            return "Not found";
                        }}
                    />
                </Switch>
            </BrowserRouter>
        </ProductsProvider>
    );
}

export default App;
