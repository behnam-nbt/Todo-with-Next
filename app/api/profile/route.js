import connectDB from "@/utils/DB";
import { NextResponse } from "next/server";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { verifyPassword } from "@/utils/auth";

export async function POST(req) {
    await connectDB();

    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ status: "Failed", message: "You are not logged in!" }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ status: "Failed", message: "User does not exist!" }, { status: 404 });
        }

        const { name, lastName, password } = await req.json();
        const isValid = await verifyPassword(password);
        if (!isValid) {
            return NextResponse.json({ status: "Failed", message: "password is incorrect!" }, { status: 422 });
        }
        user.name = name;
        user.lastName = lastName;
        user.save();

        return NextResponse.json({ status: "success", message: "User data added successfully!", data: { name, lastName, email: session.user.email } });

    } catch (error) {
        console.error("Error in API Route:", error);
        return NextResponse.json({ status: "Failed", message: "Error in connecting to DB!" }, { status: 500 });
    }
}

export async function GET(req) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return NextResponse.json({ status: "Failed", message: "You are not logged in!" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ status: "Failed", message: "User does not exist!" }, { status: 404 });
    }

    return NextResponse.json({
        status: "success",
        data: { name: user.name, lastName: user.lastName, email: user.email, id: user._id }
    }, { status: 200 });
}