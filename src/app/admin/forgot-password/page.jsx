'use client'
import Image from "next/image";
import Slider from "../../components/login-slider/Slider";
import { AiOutlineCheck } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import AXIOS_INSTANCE from "../../lib/axios";
import LoaderIcon from "../../components/general-components/LoaderIcon";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import { BsArrowLeft } from "react-icons/bs";
import Link from "next/link";
import OverlayLoader from "../../components/general-components/OverlayLoader";

export default function ForgotPasswordPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const [sliderReady, setSliderReady] = useState(false);

    const router = useRouter();



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

            <div className=" w-full  xl:w-[36%]  lg:w-[45%] mx-auto flex-center bg-white ">
                <div className=" w-11/12  lg:w-9/12 xl:w-8/12 lg:h-10/12 ">

                    {/* Logo */}
                    <div className="relative bg-white w-[220px] aspect-[3/1] mx-auto  max-md:mt-10 mb-16 md:mb-28 ">
                        <Image
                            src="/image/logo.jpg"
                            alt="logo"
                            fill
                            className="object-contain shrink-0"
                        />
                    </div>

                    {/* Title */}
                    <h2 className="lg:text-[32px] text-2xl font-semibold text-center">Forgot password?</h2>
                    <p className="text-center  text-custom-grey-500 lg:text-lg font-medium mt-1">
                        Enter your email and we’ll send you a reset link.
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

                        <button
                            type="submit"
                            className="w-full mt-7 bg-custom-primary-500 flex-center text-lg text-white h-[54px] rounded-sm "
                        >
                            {isLoading ? <LoaderIcon className='text-xl font-medium animate-spin text-white' /> : 'Reset password'}
                        </button>
                    </form>

                    <Link href='/admin/login' className="text-center  w-fit hover:cursor-pointer flex items-center space-x-1 transition-colors duration-300 mx-auto hover:text-black/70 text-custom-grey-500 text-base font-medium mt-6">
                        <BsArrowLeft className=" text-lg" /><span className="">Back to login</span>
                    </Link>
                </div>
            </div>

            <div className=" w-full max-md:hidden bg-slate-100 xl:w-[62%] lg:w-[55%] ">
                <Slider onReady={() => setSliderReady(true)} />
            </div>

            {!sliderReady && <OverlayLoader />}
        </div>
    );
}
