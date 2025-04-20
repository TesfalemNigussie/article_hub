'use client';
import Image from 'next/image';
import Link from 'next/link';
import ArticleHubLogo from '@/assets/article_hub_logo.png';
import { useEffect, useRef, useState } from 'react';
import { getUserFromLocalStorage, removeUserFromLocalStorage } from '@/util/local.storage.utils';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth.hook';

export default function Navbar({ showLoginButton = true }: { showLoginButton?: boolean }) {

    const router = useRouter()

    const dropdownRef = useRef<HTMLDivElement>(null);

    const [showDropdown, setShowDropdown] = useState(false);
    const { isUserLoggedIn, logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-dark-10 sticky top-0 z-50 border-b border-dark-15">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/">
                    <Image src={ArticleHubLogo} alt="Article Hub Logo" className="w-48" />
                </Link>

                {showLoginButton && (
                    isUserLoggedIn ? (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setShowDropdown((prev) => !prev)}
                                className="cursor-pointer text-white px-4 py-2 rounded-lg font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
                                </svg>
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-dark-8 shadow-lg rounded-md z-50">
                                    <ul className="text-sm text-white">
                                        <li>
                                            <Link
                                                href="/profile/my-articles"
                                                className="block px-4 py-4 hover:bg-dark-15 rounded-lg"
                                            >
                                                My Articles
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="cursor-pointer block px-4 py-4 hover:bg-dark-15 rounded-lg w-full text-start"
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="bg-yellow-55 px-5 py-2 rounded-lg text-black font-semibold"
                        >
                            Login
                        </Link>
                    )
                )}

            </div>
        </nav>
    );
}

