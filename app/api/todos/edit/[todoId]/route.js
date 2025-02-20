import { NextResponse } from "next/server";
import connectDB from "@/utils/DB";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { todoId } = await params;
        const { title, status } = await req.json();

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ status: "Failed", message: "You are not logged in!" }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ status: "Failed", message: "User does not exist!" }, { status: 404 });
        }

        const updatedUser = await User.updateOne(
            { email: session.user.email, "todos._id": todoId },
            {
                $set: {
                    "todos.$.title": title ?? user.todos.find(t => t._id.toString() === todoId).title,
                    "todos.$.status": status ?? user.todos.find(t => t._id.toString() === todoId).status
                }
            }
        );

        if (updatedUser.modifiedCount === 0) {
            return NextResponse.json({ status: "Failed", message: "Update failed!" }, { status: 500 });
        }

        return NextResponse.json({ status: "Success", message: "Todo updated successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Error in API Route:", error);
        return NextResponse.json({ status: "Failed", message: "Error updating todo!" }, { status: 500 });
    }
}
