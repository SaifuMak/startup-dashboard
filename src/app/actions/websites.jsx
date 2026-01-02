'use client'

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


export const getSiteDetails = async (websiteUrl) => {
    try {
        const response = await AXIOS_INSTANCE.get(`v1/site-detail`, {
            params: { host: websiteUrl }
        });
        // console.log((await response).data);

        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || "Something went wrong",
        };
    }
}

export const updateSiteStatus = async (websiteUrl, status) => {
    try {
        const response = await AXIOS_INSTANCE.patch(`v1/update-website-status`, {
            host: websiteUrl,
            website_status: status
        });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || "Something went wrong",
        };
    }
}



// export const updateSiteTheme = async (websiteUrl, theme) => {
//     try {
//         const response = await AXIOS_INSTANCE.patch(`v1/update-website-theme`, {
//             host: websiteUrl,
//             theme: theme
//         });
//         return { success: true, data: response.data };
//     } catch (error) {
//         return {
//             success: false,
//             error: error.response?.data || "Something went wrong",
//         };
//     }
// }


export const uploadLogo = async (websiteUrl, formData) => {
    try {
        const response = await AXIOS_INSTANCE.post(`v1/upload-site-logo`, formData, {
            params: {
                host: websiteUrl
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || "Something went wrong",
        };
    }
}


export const uploadFavicon = async (websiteUrl, formData) => {
    try {
        const response = await AXIOS_INSTANCE.post(`v1/upload-site-favicon`, formData, {
            params: {
                host: websiteUrl
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || "Something went wrong",
        };
    }
}


export const updateSiteColors = async (websiteUrl, colors) => {
    try {
        const response = await AXIOS_INSTANCE.patch(`v1/update-website-colors`, {
            host: websiteUrl,
            color_settings: colors
        });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || "Something went wrong",
        };
    }
}

export const updateSiteTypography = async (websiteUrl, typography) => {
    try {
        const response = await AXIOS_INSTANCE.patch(`v1/update-website-typography`, {
            host: websiteUrl,
            typography_settings: typography
        });
        return { success: true, data: response.data };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || "Something went wrong",
        };
    }
}


updateSiteTypography