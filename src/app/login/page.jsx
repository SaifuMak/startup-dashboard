'use client'
import Image from "next/image";
import Slider from "../components/login-slider/Slider";
import { AiOutlineCheck } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import AXIOS_INSTANCE from "../lib/axios";
import LoaderIcon from "../components/general-components/LoaderIcon";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import Link from "next/link";
import OverlayLoader from "../components/general-components/OverlayLoader";

export default function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();
    const [sliderReady, setSliderReady] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();
        toast.dismiss()

        setIsLoading(true)

        try {
            const payload = {
                email: email,
                password: password,
            };

            const res = await AXIOS_INSTANCE.post("auth-service/login/", payload, {
            });
            router.push('/admin/dashboard')
            toast.success("Login Success")

        } catch (error) {
            toast.error("Incorrect Email or Password")
            // console.error("Incorrect Email or Password", error.response?.data || error);
        }
        finally {
            setIsLoading(false)
        }
    };


     return (

        <div className=" flex max-lg:flex-col min-h-[100vh]  ">

            <div className=" w-full   xl:w-[36%]  lg:w-[45%] mx-auto  flex-center max-lg:mt-10 bg-white ">
                <div className=" w-11/12  lg:w-9/12 xl:w-8/12 lg:h-10/12 ">

                    {/* Logo */}
                    <div className="relative bg-white w-[220px] aspect-[3/1] mx-auto mb-10  lg:mb-28 ">
                        <Image
                            src="/image/logo.jpg"
                            alt="logo"
                            fill
                            className="object-contain shrink-0"
                        />
                    </div>

                    {/* Title */}
                    <h2 className="lg:text-[32px] text-2xl font-semibold text-center">Login to your account</h2>
                    <p className="text-center  text-custom-grey-500 lg:text-lg font-medium mt-1">
                        Welcome back, please enter your details
                    </p>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="lg:mt-10 mt-8 space-y-4">

                        {/* Username */}
                        <div className=" flex items-center border rounded-sm border-custom-grey-300 space-x-2  px-4 py-3">
                            <img src="/icons/user-name.svg" alt="" className=" size-6 " />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full placeholder:text-custom-grey-400  text-custom-grey-500 lg:placeholder:text-lg font-medium outline-none "
                            />
                        </div>


                        {/* Password */}
                        <div className="relative  flex items-center border rounded-sm border-custom-grey-300 lg:placeholder:text-lg space-x-2  px-4 py-3">
                            <img src="/icons/password.svg" alt="" className=" size-6 " />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full placeholder:text-custom-grey-400 text-custom-grey-500 font-medium outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <FiEyeOff className="w-5 h-5" />
                                ) : (
                                    <FiEye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                        {/* 
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" className="peer hidden" />

                            <div className="w-5 h-5 rounded border border-custom-grey-300 flex items-center justify-center 
                                  ">
                                <AiOutlineCheck className=" text-sm text-custom-primary-500" />
                            </div>

                            <span className="">Remember for 30 days</span>
                        </label> */}

                        <div className=" w-full flex justify-end">
                            <Link href='/forgot-password' className=" font-medium text-custom-grey-500 hover:underline hover:cursor-pointer">Forgot password</Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full mt-7 bg-custom-primary-500 flex-center text-lg text-white h-[54px] rounded-sm "
                        >
                            {isLoading ? <LoaderIcon className='text-xl font-medium animate-spin text-white' /> : 'Login'}
                        </button>
                    </form>

                    {/* Sign Up */}
                    <p className="text-center  text-custom-grey-500 text-base font-medium mt-5 lg:mt-6">
                        Don’t have an account?
                        <a href="#" className=" text-custom-primary-500 font-medium hover:underline ml-1">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>


            <div className=" w-full max-lg:hidden xl:w-[62%] lg:w-[55%] ">
                <Slider onReady={() => setSliderReady(true)} />
            </div>
            {!sliderReady && <OverlayLoader />}

        </div>
    );
}
