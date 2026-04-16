import axios from "axios";

async function fetchData(url, method = "GET", body = {}, headers = {}) {
    try {
        const response = await axios({
            url: String(url).toLowerCase(),
            method,
            data: body,
            headers,
            withCredentials: true
        });

        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}

export default fetchData;