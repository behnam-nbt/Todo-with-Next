import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Ensure path is correct
import User from "@/models/User";
import connectDB from "@/utils/DB";
import { sortTodos } from "@/utils/sortTodos";

export async function POST(req) {
    await connectDB();

    try {
        const { title, status } = await req.json();
        if (!title || !status) {
            return NextResponse.json({ status: "Failed", message: "Invalid Data!" });
        }

        // Get session using proper App Router syntax
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ status: "Failed", message: "You are not logged in!" }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ status: "Failed", message: "User does not exist!" }, { status: 404 });
        }

        user.todos.push({ title, status });
        await user.save();

        return NextResponse.json({ status: "Success", message: "Todo created!" });

    } catch (error) {
        console.error("Error in API Route:", error);
        return NextResponse.json({ status: "Failed", message: "Error in connecting to DB!" }, { status: 500 });
    }
}

export async function GET(req) {
    await connectDB();

    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ status: "Failed", message: "You are not logged in!" }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ status: "Failed", message: "User does not exist!" }, { status: 404 });
        }

        const todos = Array.isArray(user.todos) ? user.todos : [];

        const sortedTodos = sortTodos(todos);
        const flattenedTodos = Object.values(sortedTodos).flat();

        return NextResponse.json({ status: "Success", todos: flattenedTodos }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ status: "Failed", message: "Error fetching todos!" }, { status: 500 });
    }
}

export async function PATCH(req) {
    await connectDB();
    try {
        const { id, status } = await req.json();
        if (!id || !status) {
            return NextResponse.json({ status: "Failed", message: "Invalid data!" }, { status: 422 });
        }

        const result = await User.updateOne({ "todos._id": id }, { $set: { "todos.$.status": status } });
        return NextResponse.json({ status: "success", message: "Todo updated successfully!" }, { status: 200 });
    } catch (error) {
        console.error("Error in API Route:", error);
        return NextResponse.json({ status: "Failed", message: "Error in connecting to DB!" }, { status: 500 });
    }
}
