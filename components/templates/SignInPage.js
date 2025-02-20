'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();
    const { status } = useSession();

    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false
        });

        if (!res.error) router.push('/');
    };

    useEffect(() => {
        if (status === "authenticated") {
            router.replace('/');
        }
    }, [status, router]);

    return (
        <div className="flex max-h-screen justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
                <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h1>
                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label htmlFor='email' className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            id='email' 
                            name='email' 
                            type='email' 
                            placeholder='Enter your email' 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor='password' className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            id='password' 
                            name='password' 
                            type='password' 
                            placeholder='Enter your password' 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-4">Do not have an account? <Link href="/register" className="text-blue-600 hover:underline">Create</Link></p>
            </div>
        </div>
    );
}

export default SignInPage;
