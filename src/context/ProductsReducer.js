export default (state, action) => {
	const { type, payload, pagination, total } = action;

	switch (type) {
		case "LOADING":
			return {
				...state,
				loading: false
			}

        case "GET_PRODUCTS":
            return {
                ...state,
                products: payload,
                loading: false,
            };

        case "GET_PRODUCT":
            return {
                ...state,
                product: payload,
                loading: false,
            };

        case "PRODUCT_ERROR":
            return {
                ...state,
                products: [],
                product: null,
                loading: false,
                error: payload,
            };

        case "CLEAR_ERROR":
            return {
                ...state,
                error: null,
            };

        case "CLEAR_PRODUCT":
            return {
                ...state,
                product: null,
                loading: false,
            };

        default:
            break;
    }
}