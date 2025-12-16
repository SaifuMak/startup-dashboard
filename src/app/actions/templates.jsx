'use client'

import AXIOS_INSTANCE from "../lib/axios";

export const getTemplatesByCategory = async (siteType) => {
    try {
        const response = await AXIOS_INSTANCE.get(`v1/templates`, {
            params: { site_type: siteType }
        });

        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || "Something went wrong",
        };
    }
}

export const updateSiteTheme = async (data) => {
    try {
        const response = await AXIOS_INSTANCE.patch(`v1/update-website-theme`, data);
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || "Something went wrong",
        };
    }
}
