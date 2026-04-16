import { toast } from "sonner";
import fetchData from "../../hooks/fetchData";
import { category } from "../api";
const { READ_API } = category;

export function viewCategory() {
    return async function () {
        try {
            const response = await fetchData(READ_API, 'GET');
            return response;
        } catch (error) {
            console.log(error.message);
            toast.error(`${(error.response?.data?.mes)}`);
        }
    }
}