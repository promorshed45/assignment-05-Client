/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight } from "lucide-react";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/redux/features/userSlice";

interface FieldValues {
    email: string;
    password: string;
}


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>();

    const [loginUser] = useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const initialValues = {
        email: "",
        password: "",
    };
    type TFormValues = typeof initialValues;

    const onSubmit = async (userData: TFormValues) => {

        try {
            const data = await loginUser(userData).unwrap();
            const { token } = data;
            const user = data.data;

            dispatch(setToken(token));
            dispatch(setUser(user));
            toast.success("Successfully logged in", {
                description: "Welcome back!",
            });
            navigate("/dashboard");
        } catch (err: any) {
            console.error("Error:", err);
            toast.error(err.data?.message || "Unknown error occurred");
        }
    };

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-10 lg:px-8">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="flex justify-center">
                        <Link to="/">
                            <img alt="Elite Car Wash" className="w-32 h-20" src={logo} />
                        </Link>
                    </div>
                    <h2 className="text-center text-3xl font-bold leading-tight text-black">
                        Sign in to your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-rose-500 transition-all duration-200 hover:underline"
                        >
                            Create a new account
                        </Link>
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="text-base font-medium text-gray-900"
                                >
                                    Email
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Enter a valid email address",
                                            },
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="text-base font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        {...register("password", {
                                            required: "Password is required",
                                        })}
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Login <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-3 space-y-3">
                        <button
                            type="button"
                            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                        >
                            <span className="mr-2 inline-block">
                                <svg
                                    className="h-6 w-6 text-rose-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                                </svg>
                            </span>
                            Sign in with Google
                        </button>
                        <button
                            type="button"
                            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                        >
                            <span className="mr-2 inline-block">
                                <svg
                                    className="h-6 w-6 text-[#2563EB]"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                                </svg>
                            </span>
                            Sign in with Facebook
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
