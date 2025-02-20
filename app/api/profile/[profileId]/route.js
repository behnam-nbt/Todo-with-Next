import { NextResponse } from "next/server";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import connectDB from "@/utils/DB";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(req, { params }) {
    await connectDB();

    try {
        const session = await getServerSession(authOptions);
        console.log("Session:", session);

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ status: "Failed", message: "You are not logged in!" }, { status: 401 });
        }

        const user = await User.findById(session.user.id);  // Use session.user.id
        if (!user) {
            return NextResponse.json({ status: "Failed", message: "User does not exist!" }, { status: 404 });
        }

        const { profileId } = await params;
        if (user._id.toString() !== profileId) {
            return NextResponse.json({ status: "Failed", message: "Unauthorized action!" }, { status: 403 });
        }

        const { name, lastName, email } = await req.json();

        // Update user profile
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        await user.save();

        return NextResponse.json({ status: "Success", message: "User updated successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Error in API Route:", error);
        return NextResponse.json({ status: "Failed", message: "Error updating user!" }, { status: 500 });
    }
}
