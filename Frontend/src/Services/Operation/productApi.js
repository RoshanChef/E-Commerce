import fetchData from "../../hooks/fetchData";
import { toast } from "sonner";
import { product, auth } from "../api";

const { CREATE_API } = product;
const { ADD_API, VIEW_API } = auth;

export function createProduct(payload) {
    return async function () {
        try {
            const response = await fetchData(CREATE_API, 'POST', payload);
            console.log(response);
            toast.success('inserted successfully');
            return response;
        } catch (error) {
            console.log(error.message);
            toast.error(error.response);
        }
    }
}

export function add_To_Cart(navigate, product_id) {
    return async function () {
        try {
            const response = await fetchData(ADD_API, 'POST', { id: product_id });

            if (response) {
                navigate('/addToCart', {
                    state: { product }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export function viewCart() {
    return async function () {
        try {
            const response = await fetchData(VIEW_API, 'GET');
            if (response) {
                return response;
            }
        } catch (error) {
            console.log(error);
            toast.error('something went wrong');
        }
    }
}
