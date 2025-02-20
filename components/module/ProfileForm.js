function ProfileForm({ name, setName, lastName, setLastName, password, setPassword, submitHandler  }) {
    return (
        <div className="flex justify-center max-h-screen">
            <form className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-blue-300">
                <h2 className="text-xl font-semibold text-blue-600 text-center mb-6">Profile</h2>

                <div className="mb-4">
                    <label className="block text-blue-700 text-sm font-medium mb-2">First Name</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter your first name"
                        className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-blue-700 text-sm font-medium mb-2">Last Name</label>
                    <input
                        type="text"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Enter your last name"
                        className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-blue-700 text-sm font-medium mb-2">Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter your password"
                        className="w-full p-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    onClick={submitHandler}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ProfileForm