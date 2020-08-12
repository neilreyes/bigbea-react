import React, { createContext, useReducer } from "react";
import ProductsReducer from "./ProductsReducer";
import axios from 'axios';

const initialState = {
    products: {
        data: [],
        offset: 0,
        perPage: 20,
        currentPage: 1,
        total: 0,
        totalPages: 0,
    },
    product: null,
    loading: true,
    error: null,
};

export const ProductsContext = createContext(initialState)

export const ProductsProvider = ({children}) => {

	const [state, dispatch] = useReducer(ProductsReducer, initialState)
	
	const getProducts = async (
        currentPage = state.products.currentPage,
        perPage = state.products.perPage
    ) => {
        try {
            const res = await axios.get("/wp-json/wp/v2/bbear_products", {
                params: {
                    page: currentPage,
                    per_page: perPage,
                    _fields:
                        "id,title,link,featured_media,author,slug,featured_media_urls",
                },
			});

            dispatch({
                type: "GET_PRODUCTS",
                payload: {
                    perPage: state.products.perPage,
                    data: res.data,
                    totalPages: parseInt(res.headers["x-wp-totalpages"]),
                    total: parseInt(res.headers["x-wp-total"]),
                    currentPage,
                },
            });
        } catch (error) {
            dispatch({
                type: "PRODUCT_ERROR",
                payload: error,
            });
        }
    };

	return (
		<ProductsContext.Provider
			value={{
				products: state.products,
				product: state.product,
				loading: state.loading,
				error: state.error,
				getProducts,
			}}
		>
			{children}
		</ProductsContext.Provider>
	)
}