/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
// import { useUpdateUserMutation } from '@/redux/features/auth/authApi';
import { Textarea } from '@/components/ui/textarea';
import { setUser } from '@/redux/features/userSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/redux/hook';

interface UpdatedData {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    password: string;
    image: string;
  }
  
  const UpdateProfile = () => {
    const { user } = useAppSelector((state) => state.user);
  
    // Handle missing fields safely
    const { register, handleSubmit, formState: { errors } } = useForm<UpdatedData>();
    const navigate = useNavigate();
    // const [updateUser] = useUpdateUserMutation();
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState(user?.image || '');


    const onSubmit = async (userData: any) => {
        const toastId = toast.loading("Please wait...");
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('email', userData.email);
            formData.append('phone', userData.phone);
            formData.append('address', userData.address);
            formData.append('password', userData.password);
            if (userData.image && typeof userData.image !== 'string') {
                formData.append('image', userData.image[0]);
            }

            // const data = await updateUser(formData).unwrap();
            // const user = data.data;

            if (!user) {
                throw new Error('Unexpected response format');
            }
            dispatch(setUser(user));
            toast.success('Profile updated successfully!');
            navigate('/dashboard');
        } catch (err: any) {
            console.error("Error:", err);
            toast.error(err.data?.message || "Please try again.");
        } finally {
            toast.dismiss(toastId);
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImagePreview(URL.createObjectURL(event.target.files[0]));
        }
        // Update form state with image file
        event.target.files && register('image').onChange(event);
    };

    return (
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-10 lg:px-8">
            <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <h2 className="text-center text-3xl font-bold leading-tight text-black">
                    Update Profile
                </h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="name" className="text-base font-medium text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border bg-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Full Name"
                                    id="name"
                                    {...register('name', { required: 'Name is required' })}
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-base font-medium text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border bg-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    placeholder="Email"
                                    id="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Enter a valid email address'
                                        }
                                    })}
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="text-base font-medium text-gray-900">
                                Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border bg-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Phone number"
                                    id="phone"
                                    {...register('phone', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^\+?[0-9]\d{1,14}$/i,
                                            message: 'Enter a valid phone number'
                                        }
                                    })}
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="address" className="text-base font-medium text-gray-900">
                                Address
                            </label>
                            <div className="mt-2">
                                <Textarea
                                    className="flex h-10 w-full rounded-md border bg-white border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Address"
                                    id="address"
                                    {...register('address', {
                                        required: 'Address is required',
                                        minLength: {
                                            value: 5,
                                            message: 'Address must be at least 5 characters long'
                                        }
                                    })}
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
                            </div>
                        </div>

                        {/* <div>
                            <label htmlFor="password" className="text-base font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border bg-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Password"
                                    id="password"
                                    {...register('password')}
                                />
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>
                        </div> */}

                        <div>
                            <label htmlFor="image" className="text-base font-medium text-gray-900">
                                Profile Image
                            </label>
                            <div className="mt-2 ">
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="image"
                                    className="cursor-pointer"
                                >
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Profile Preview" className="w-32 h-36 mx-auto bg-gray-200 flex items-center justify-center rounded-md" />
                                    ) : (
                                        <div className="w-32 h-36 mx-auto bg-gray-200 flex items-center justify-center rounded-md">
                                            <span className="text-gray-500 text-center">Upload Image</span>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                            >
                                Save
                                <ArrowRight className="ml-2" size={16} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
