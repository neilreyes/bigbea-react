import React, { createContext, useReducer } from "react";
import ProductsReducer from "./ProductsReducer";
import axios from 'axios';

const initialState = {
    products: {
        data: [],
        offset: 0,
        perPage: 10,
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
	
	const getProducts = async () => {
		try {
			const res = await axios.get(
                "/wp-json/wp/v2/bbear_products?page=1&_fields=id,title,link,featured_media,author,slug,featured_media_urls"
            );
			
			dispatch({
                type: "GET_PRODUCTS",
                payload: {
                    data: res.data,
                    totalPages: res.headers["x-wp-totalpages"],
					total: res.headers["x-wp-total"],
					currentPage: 1
                },
            });

		} catch (error) {
			dispatch({
				type: "PRODUCT_ERROR",
				payload: error
			})
		}
	}
	// Pagination Next
	const getProductsNext = async (currentPage) =>{
		dispatch({
			type: "GET_PRODUCTS_NEXT",
			payload: {
				currentPage: currentPage + 1
			}
		})
	}
	// Pagination Prev
	const getProductsPrev = async (currentPage) => {
		dispatch({
			type: "GET_PRODUCTS_PREV",
			payload: {
				currentPage: currentPage - 1,
			},
		});
	}

	return (
		<ProductsContext.Provider
			value={{
				products: state.products,
				product: state.product,
				loading: state.loading,
				error: state.error,
				getProducts,
				getProductsNext,
				getProductsPrev
			}}
		>
			{children}
		</ProductsContext.Provider>
	)
}