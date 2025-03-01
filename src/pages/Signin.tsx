import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrainCog, ArrowLeft } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export function Signin() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin(event: React.FormEvent) {
        event.preventDefault(); // Prevents page reload

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        try {
            const response = await axios.post(
                BACKEND_URL + "/api/v1/signin",
                { username, password }, // ✅ Corrected key from `email` to `username`
                { withCredentials: true }
            );

            const jwt = response.data?.token;
            if (!jwt) {
                throw new Error("Token not found in response");
            }

            localStorage.setItem("token", jwt);
            navigate("/dashboard"); // Redirect after successful login
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Signin failed:", error.response?.data || error.message);
                alert(error.response?.data?.message || "Signin failed. Please check your credentials.");
            } else {
                console.error("An unexpected error occurred:", error);
                alert("An unexpected error occurred. Please try again.");
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-indigo-950 flex flex-col overflow-hidden">
            <div className="container mx-auto px-4 py-6">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-purple-100 dark:border-gray-700">
                    <div className="flex justify-center mb-6">
                        <BrainCog className="h-8 w-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                            BrainApp
                        </span>
                    </div>

                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Welcome back</h1>

                    <form className="space-y-4" onSubmit={signin}>
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                ref={usernameRef}
                                placeholder="Enter your username"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                ref={passwordRef}
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 shadow-lg transition-all duration-300"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
