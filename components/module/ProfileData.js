import Link from 'next/link';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

function ProfileData({ data }) {
    console.log(data);
    const [name, setName] = useState(data?.name || '');
    const [lastName, setLastName] = useState(data?.lastName || '');
    const [email, setEmail] = useState(data?.email || '');

    const submitHandler = async (e) => {
        e.preventDefault();

        const res = await fetch(`/api/profile/${data.id}`, {
            method: "PUT",
            body: JSON.stringify({ name, lastName, email }),
            headers: { "Content-type": "application/json" }
        });

        const responseData = await res.json(); // ✅ Renamed to avoid conflict
        if (responseData.status === "Success") {
            toast.success("Data updated successfully!");
        }
    };

    return (
        <div className='max-w-screen-md mx-auto'>
            <h2 className='text-center font-semibold text-zinc-700 text-xl mb-4'>Profile Information</h2>
            <form onSubmit={submitHandler} className="space-y-4">
                <div>
                    <input
                        id='name'
                        name='name'
                        type='text'
                        value={name} // ✅ Use state variable
                        placeholder='Enter your name'
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        id='lastName'
                        name='lastName'
                        type='text'
                        value={lastName} // ✅ Use state variable
                        placeholder='Enter your last name'
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        id='email'
                        name='email'
                        type='email'
                        value={email} // ✅ Use state variable
                        placeholder='Enter your email'
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Save
                    </button>
                    <Link
                        href="/"
                        className="text-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
                    >
                        back
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default ProfileData;
