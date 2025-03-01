import { useRef } from "react";  
import axios from "axios";  
import { BACKEND_URL } from "../config";  
import { Link, useNavigate } from "react-router-dom";  
import { BrainCog, ArrowLeft } from "lucide-react";  

export function Signup() {  
    const usernameRef = useRef<HTMLInputElement>(null);  
    const emailRef = useRef<HTMLInputElement>(null);  
    const passwordRef = useRef<HTMLInputElement>(null);  
    const navigate = useNavigate();  

    async function signup(event: React.FormEvent) {  
        event.preventDefault(); // Prevents page reload on form submission  

        const username = usernameRef.current?.value;  
        const email = emailRef.current?.value;  
        const password = passwordRef.current?.value;  

        try {  
            await axios.post(BACKEND_URL + "/api/v1/signup", {  
                username,  
                email,  
                password,  
            });  

            alert("You have signed up!");  
            navigate("/signin"); // Redirect to signin after successful signup  
        } catch (error) {  
          if (axios.isAxiosError(error)) {  
            console.error("Signup failed:", error.response?.data || error.message);  
            alert(error.response?.data?.message || "Signup failed. Please try again.");
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

                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Create your account</h1>  

                    <form className="space-y-4" onSubmit={signup}>  
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
                                required  
                            />  
                        </div>  

                        <div className="space-y-2">  
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">  
                                Email  
                            </label>  
                            <input  
                                id="email"  
                                type="email"  
                                ref={emailRef}  
                                placeholder="Enter your email"  
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"  
                                required  
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
                                placeholder="Create a password"  
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"  
                                required  
                            />  
                        </div>  

                        <button  
                            type="submit"  
                            className="w-full py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 shadow-lg shadow-purple-500/30 transition-all duration-300 hover:shadow-purple-500/50">  
                            Create Account  
                        </button>  
                    </form>  

                    <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">  
                        Already have an account?  
                        <Link to="/signin" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium">  
                            Sign in  
                        </Link>  
                    </div>  
                </div>  
            </div>  
        </div>  
    );  
}  
