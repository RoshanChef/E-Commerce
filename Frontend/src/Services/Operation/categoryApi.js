import { toast } from "sonner";
import fetchData from "../../hooks/fetchData";
import { category } from "../api";
const { READ_API, CREATE_CAT_API, VIEW_COUPONS_API } = category;

export async function viewCategory() {
    try {
        const response = await fetchData(READ_API, 'GET');
        return response.categories;
    } catch (error) {
        console.log(error.message);
        toast.error(`${(error.response?.data?.mes)}`);
    }
}

export async function createCategory(category) {
    try {
        const response = await fetchData(CREATE_CAT_API, 'POST', { category });
        return response;
    } catch (error) {
        console.log(error.message);
        toast.error(`${(error.response?.data?.mes)}`);
    }
}



export async function viewCoupons() {
    try {
        const response = await fetchData(VIEW_COUPONS_API, 'GET');
        return response;
    } catch (error) {
        console.log(error.message);
        toast.error(`${(error.response?.data?.mes)}`);
    }
}

// Create a new coupon
export async function createCoupons(couponData) {
    try {
        const response = await fetchData('POST', couponData);

        console.log('CREATE COUPON API RESPONSE:', response);

        if (!response.data.success) {
            throw new Error(response.data.message || 'Failed to create coupon');
        }

        return response.data.data;
    } catch (error) {
        console.error('Create Coupon Error:', error);
        throw error;
    }
}

// Delete a coupon
export async function deleteCoupon(couponId) {
    try {
        const response = await fetchData('DELETE', { couponId });
        if (!response.data.success) {
            throw new Error(response.data.message || 'Failed to delete coupon');
        }

        return response.data.data;
    } catch (error) {
        console.error('Delete Coupon Error:', error);
        throw error;
    }
}