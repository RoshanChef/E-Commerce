import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Services/Operation/authApi";


function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.auth);


  


    function onSubmit(data) {
        const { email, password } = data;
        dispatch(login(email, password, navigate))
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">

            {/* Card */}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

                {/* Logo / Title */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-semibold">Login</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Welcome back! Please enter your details
                    </p>
                </div>

                {/* Form */}
                <div className="flex flex-col gap-4">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Email */}
                        <label className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                {...register("email", { required: true })}
                                type="email"
                                placeholder="Enter your email"
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg outline-none
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />
                        </label>

                        {/* Password */}

                        <div className="flex flex-col gap-1 mt-2">
                            <label className="relative block">
                                {/* Icon */}
                                <Lock
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    size={18}
                                />

                                {/* Input Field */}
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    type="password"
                                    placeholder="Enter your password"
                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg outline-none transition-all
        ${errors.password
                                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                                            : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        }`}
                                />
                            </label>

                            {/* Error Message */}
                            {errors.password && (
                                <span className="text-xs text-red-500 ml-1 transition-all">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>


                        {/* Options */}
                        <div className="flex justify-between select-none items-center text-sm mt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="accent-blue-600" />
                                <span className="text-gray-600">Remember me</span>
                            </label>
                            <Link to={'/forget'}>
                                <button className="text-blue-600 hover:underline cursor-pointer">
                                    Forgot password?
                                </button>
                            </Link>
                        </div>

                        {/* Button */}
                        {loading ? (

                            <div class="flex justify-center gap-2 text-white mt-6  w-full bg-blue-600 place-items-center overflow-x-scroll rounded-lg px-4 py-2 lg:overflow-visible">
                                <svg class="w-4 h-4 text-gray-300 animate-spin" viewBox="0 0 64 64" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                    <path
                                        d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path
                                        d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                        stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
                                    </path>
                                </svg>
                                Wait ..
                            </div>
                        ) : (<button type="submit"
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg
                        transition font-medium cursor-pointer"
                        >
                            Login
                        </button>)}
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500 mt-4">
                        Don’t have an account?{" "}
                        <Link to={'/signup'} className="text-blue-600 cursor-pointer hover:underline">
                            Sign up
                        </Link>
                    </p>

                </div>

            </div>
        </div >
    );
}

export default Login;