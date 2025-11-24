// 'use server'

import AXIOS_INSTANCE from "../lib/axios";
import { redirect } from "next/navigation";

export const Logout = async () => {
  try {
    const response = await AXIOS_INSTANCE.post(`auth-service/logout/`, {});
    redirect("/admin/login");

  } catch (error) {

  } finally {
  }
}


export const Login = async (payload) => {
  try {

    const res = await AXIOS_INSTANCE.post("auth-service/login/", payload, {
    });
    return { success: true, data: res.data };

  } catch (error) {
    return {
      success: false,
      error: error.response?.data || "Something went wrong",
    };
  }

}

 export const LoginStatus = async () => {
    try {
      await AXIOS_INSTANCE.get("auth-service/check-auth/");
      return { success: true, data: null };

    } catch (error) {
      return { success: false, data: null };
    } 
  };
