import Image from "next/image";
import Slider from "../components/login-slider/Slider";

export default function LoginPage() {
    return (

        <div className=" flex min-h-[100vh]  ">

            <div className="  w-[36%]  mx-auto flex-center bg-white ">
                <div className=" w-8/12 h-10/12 ">

                    {/* Logo */}
                    <div className="relative bg-white w-[220px] aspect-[3/1] mx-auto  mb-28 ">
                        <Image
                            src="/image/logo.jpg"
                            alt="logo"
                            fill
                            className="object-contain shrink-0"
                        />
                    </div>

                    {/* Title */}
                    <h2 className="text-[32px] font-semibold text-center">Login to your account</h2>
                    <p className="text-center  text-custom-grey-500 text-lg font-medium mt-1">
                        Welcome back, please enter your details
                    </p>

                    {/* Form */}
                    <form className="mt-6 space-y-4">

                        {/* Username */}
                        <div className=" flex items-center border border-custom-grey-300 space-x-2  px-4 py-3">
                            <img src="/icons/user-name.svg" alt="" className=" size-7 " />
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full placeholder:text-custom-grey-400 font-medium outline-none "
                            />
                        </div>


                        {/* Password */}
                        <div className="relative  flex items-center border border-custom-grey-300 space-x-2  px-4 py-3">
                            <img src="/icons/password.svg" alt="" className=" size-7 " />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full placeholder:text-custom-grey-400 font-medium outline-none"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                👁
                            </button>
                        </div>

                        {/* Remember + Forgot Password */}
                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" />
                                <span>Remember for 30 days</span>
                            </label>

                            <button type="button" className="text-indigo-600 hover:underline">
                                Forgot password
                            </button>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
                        >
                            Login
                        </button>
                    </form>

                    {/* Sign Up */}
                    <p className="text-center text-gray-600 mt-6">
                        Don’t have an account?
                        <a href="#" className="text-indigo-600 font-medium hover:underline ml-1">
                            Sign up
                        </a>
                    </p>

                </div>

            </div>

            <div className=" w-[62%] ">
                <Slider />
            </div>
        </div>
    );
}
