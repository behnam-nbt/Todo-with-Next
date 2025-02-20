'use client'
import React, { useEffect, useState } from 'react'
import ProfileForm from '../module/ProfileForm';
import ProfileData from '../module/ProfileData';

function ProfilePage() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState(null); // Change from array to null

    // Fetch profile data on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/profile");
                const responseData = await res.json();

                if (responseData.status === "success") {
                    setData(responseData.data);
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        fetchProfile();
    }, []);

    const submitHandler = async () => {
        try {
            const res = await fetch("/api/profile", {
                method: "POST",
                body: JSON.stringify({ name, lastName, password }),
                headers: { "Content-Type": "application/json" }
            });

            const responseData = await res.json();
            if (responseData.status === "success" && responseData.data.name && responseData.data.lastName) {
                setData(responseData.data); // Update state with new data
            }
        } catch (error) {
            console.error("Error submitting profile data:", error);
        }
    };

    return (
        <div>
            {data ? <ProfileData data={data} /> :
                <ProfileForm
                    name={name} setName={setName}
                    lastName={lastName} setLastName={setLastName}
                    password={password} setPassword={setPassword}
                    submitHandler={submitHandler}
                />
            }
        </div>
    );
}

export default ProfilePage;
