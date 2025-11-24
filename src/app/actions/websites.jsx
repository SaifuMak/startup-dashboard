
import AXIOS_INSTANCE from "../lib/axios";

export const getUserSites = async () => {
    try {
        const response = await AXIOS_INSTANCE.get(`v1/get-user-sites/`);
        return { success: true, data: response.data };

    } catch (error) {
        return {
            success: false,
            error: error.response?.data || "Something went wrong",
        };

    } finally {
    }
}
