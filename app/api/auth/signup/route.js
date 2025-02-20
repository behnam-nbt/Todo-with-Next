import { NextResponse } from "next/server";
import connectDB from "@/utils/DB";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";

export async function POST(req, res) {
    await connectDB();

    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ status: "Failed", message: "Fill the all fields!" }, { status: 422 });
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return NextResponse.json({ status: "Failed", message: "This User has already existed!" }, { status: 422 });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({ email: email, password: hashedPassword })

        return NextResponse.json({ status: "success", message: "User created successfully!" });

    } catch (error) {
        console.log("Error in connecting to server", error);
        return NextResponse.json({ status: "Failed", message: "Error in connecting to DB" }, { status: 500 });
    }
}