'use client'
import Image from "next/image";
import { AiOutlineCheck } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";
import LoaderIcon from "@/app/components/general-components/LoaderIcon";
import Slider from "@/app/components/login-slider/Slider";
import AXIOS_INSTANCE from "@/app/lib/axios";
import { Login } from "@/app/actions/auth";
import OverlayLoader from "@/app/components/general-components/OverlayLoader";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { confirmChangePassword } from "@/app/actions/auth";


export default function ResetPasswordPage() {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false)
    const [sliderReady, setSliderReady] = useState(false);

    const [isPasswordNotMatching, setIsPasswordNotMatching] = useState(false)

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const router = useRouter();

    const passwordMatchChecking = () => {

        if (confirmPassword && confirmPassword !== password) {
            setIsPasswordNotMatching(true)
            return false
        }
        setIsPasswordNotMatching(false)
        return true
    }

    const handleConfirm = async (e) => {
        e.preventDefault();
        toast.dismiss()

        if (isPasswordNotMatching) return
        setIsLoading(true)

        const payload = {
            token: token,
            password: password,
        };

        const res = await confirmChangePassword(payload)
        if (res.success) {
            toast.success(res.data.message)

            router.push('/admin/login')
        }
        else {
            toast.error(res.error)
        }
        setIsLoading(false)
    };

    useEffect(() => {
        passwordMatchChecking();
    }, [password, confirmPassword]);


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
                    <h2 className="lg:text-[32px] text-2xl font-semibold text-center">Reset your password</h2>
                    <p className="text-center  text-custom-grey-500 lg:text-lg font-medium mt-1">
                        Enter and confirm your new password.
                    </p>

                    {/* Form */}
                    <form onSubmit={handleConfirm} className="lg:mt-10 mt-8 space-y-4">

                        {/* Password */}
                        <div className="relative  flex items-center border rounded-sm border-custom-grey-300 lg:placeholder:text-lg space-x-2  px-4 py-3">
                            <img src="/icons/password.svg" alt="" className=" size-6 " />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value.trim())}
                                required
                                className="w-full placeholder:text-custom-grey-400 text-custom-grey-500 font-medium outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? (
                                    <FiEye className="w-5 h-5" />

                                ) : (
                                    <FiEyeOff className="w-5 h-5" />

                                )}
                            </button>
                        </div>


                        <div className="relative  flex items-center border rounded-sm border-custom-grey-300 lg:placeholder:text-lg space-x-2  px-4 py-3">
                            <img src="/icons/password.svg" alt="" className=" size-6 " />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value.trim())}
                                required
                                className="w-full placeholder:text-custom-grey-400 text-custom-grey-500 font-medium outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >

                                {showConfirmPassword ? (
                                    <FiEye className="w-5 h-5" />

                                ) : (
                                    <FiEyeOff className="w-5 h-5" />

                                )}
                            </button>
                        </div>

                        {isPasswordNotMatching && <p className=" leading-0 text-sm text-red-500">Passwords are not matching</p>}


                        <button
                            type="submit"
                            className="w-full mt-7 bg-custom-primary-500 flex-center text-lg text-white h-[54px] rounded-sm "
                        >
                            {isLoading ? <LoaderIcon className='text-xl font-medium animate-spin text-white' /> : 'Reset Password'}
                        </button>
                    </form>

                    {/* Sign Up */}
                    <p className="text-center  text-custom-grey-500 text-base font-medium mt-5 lg:mt-6">
                        Did the link expire?
                        <a href="/admin/forgot-password" className=" text-custom-primary-500 font-medium hover:underline ml-1">
                            Get a new one
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
