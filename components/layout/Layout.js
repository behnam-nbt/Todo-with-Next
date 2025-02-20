'use client'
import { LuListTodo } from "react-icons/lu";
import { CiLogin, CiCreditCard2 } from "react-icons/ci";
import { BsListNested } from "react-icons/bs";
import Link from 'next/link'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from "next-auth/react";

function Layout({ children }) {
    const { status } = useSession();
    return (
        <>
            <header className='h-32 text-white text=white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-br-lg rounded-bl-lg p-4 flex justify-between items-center'>
                <div>
                    <span><LuListTodo className="text-white text-3xl mx-auto" /></span>
                    <span className="font-bold text-sm">Todo App</span>
                </div>
                {status === "authenticated" ? (
                    <button className="bg-white px-5 py-1 text-zinc-700 rounded-md" onClick={() => signOut()}>logout</button>
                ) : (
                    <Link href="/login"><CiLogin className="text-3xl text-white font-extrabold" /></Link>
                )}
            </header>
            <div className="grid grid-cols-[1fr_5fr] p-1">
                <aside className="bg-white shadow-lg border border-zinc-200 rounded-md h-[550px] p-4">
                    <h1 className='font-semibold text-xl text-zinc-800 text-center mb-3'>Welcome🖐️</h1>
                    <ul>
                        <li className="flex justify-start items-center text-zinc-500 text-[0.9rem] mb-2"><span className="mr-1"><BsListNested /></span><Link href="/">Todos</Link></li>
                        <li className="flex justify-start items-center text-zinc-500 text-[0.9rem] mb-2"><span className="mr-1"><CiCreditCard2 /></span><Link href="/profile">Profile</Link></li>
                    </ul>
                </aside>
                <div className="p-4">{children}</div>
                <ToastContainer position="bottom-right" />
            </div>
        </>
    )
}

export default Layout