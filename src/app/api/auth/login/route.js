import AXIOS_INSTANCE from "@/app/lib/axios";

export const handleLogin = async (email,password) => {
        // e.preventDefault();

        try {
            const payload = {
                email: email,
                password: password,
            };

            const res = await AXIOS_INSTANCE.post("auth-service/login/", payload, {
            });

            console.log("LOGIN SUCCESS:", res.data);
             return res
            
        } catch (error) {
            console.error("Incorrect Email or Password", error.response?.data || error);
        }
    };
