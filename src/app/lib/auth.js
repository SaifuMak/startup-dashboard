import AXIOS_INSTANCE from "./axios";


export async function login(formData) {
    const res = await AXIOS_INSTANCE.post("/auth/login/", formData);
    return res.data;
}