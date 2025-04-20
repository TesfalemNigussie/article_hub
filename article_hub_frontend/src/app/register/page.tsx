"use client";

import { useState } from "react";
import NavBar from "@/components/navbar";
import Link from "next/link";
import { register } from "@/api/user";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

    const router = useRouter();

    const [error, setError] = useState<string | null>()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setError(null);

        try {
            const { firstName, lastName, email, password } = formData;
            await register({ firstName, lastName, emailAddress: email, password });

            router.push('/login');

        } catch (error) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <section>
            <header className="py-4 font-family-inter text-gray-60 font-sm flex items-center justify-center space-x-4">
                <span>Subscribe to our Newsletter For New & latest Blogs and Resources</span>
                <svg width="14" height="14" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.75 4.25L20 4.25C20.1989 4.25 20.3897 4.32902 20.5303 4.46967C20.671 4.61032 20.75 4.80109 20.75 5V16.25C20.75 16.6642 20.4142 17 20 17C19.5858 17 19.25 16.6642 19.25 16.25V6.81066L5.53033 20.5303C5.23744 20.8232 4.76256 20.8232 4.46967 20.5303C4.17678 20.2374 4.17678 19.7626 4.46967 19.4697L18.1893 5.75L8.75 5.75C8.33579 5.75 8 5.41421 8 5C8 4.58579 8.33579 4.25 8.75 4.25Z" fill="#FFD11A" />
                </svg>
            </header>

            <NavBar showLoginButton={false} />

            <div className="flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md space-y-8 bg-dark-15 p-8 rounded-lg shadow-lg">
                    <div className="text-center">
                        <h1 className="text-3xl font-kumbh font-bold text-white">Welcome</h1>
                        <p className="mt-2 text-gray-60">Sign up to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-60">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    autoComplete="first-name"
                                    required
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-3 bg-dark-10 border border-dark-20 rounded-md text-white placeholder-gray-60"
                                />
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-60">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    autoComplete="last-name"
                                    required
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-3 bg-dark-10 border border-dark-20 rounded-md text-white placeholder-gray-60"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-60">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-3 bg-dark-10 border border-dark-20 rounded-md text-white placeholder-gray-60"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-60">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full p-3 bg-dark-10 border border-dark-20 rounded-md text-white placeholder-gray-60"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center p-3 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-55"
                            >
                                Sign up
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                                <strong className="font-bold">Oops! </strong>
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                    </form>

                    <div className="text-center text-sm text-gray-60">
                        Have an account?{' '}
                        <Link href="/login" className="font-medium text-yellow-55">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
