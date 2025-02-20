'use client'
import React, { useState } from 'react';
import { VscListSelection } from "react-icons/vsc";
import { TbProgressCheck } from "react-icons/tb";
import RadioButton from '../element/RadioButton';
import { toast } from 'react-toastify';

function EditTodoModal({ setIsOpen, fetchTodos, todo }) {
    const [title, setTitle] = useState(todo.title);
    const [status, setStatus] = useState(todo.status);

    const EditTodoHandler = async () => {
        try {
            const res = await fetch(`/api/todos/edit/${todo._id}`, {
                method: "PUT",
                body: JSON.stringify({ title, status }),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                return;
            }

            const text = await res.text(); // Read raw response
            if (!text) {
                return;
            }

            const data = JSON.parse(text); // Parse only if not empty

            if (data.status === "Success") {
                toast.success("Todo updated successfully!");
                setIsOpen(false);
                fetchTodos(); // Refresh todos
            } else {
                toast.error(data.message || "Failed to update Todo.");
            }
        } catch (error) {
            toast.error("Error updating Todo. Please try again.");
            console.error("EditTodoHandler Error:", error);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh]">
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                >
                    ×
                </button>
                <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>

                {/* Title Input */}
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Status Input */}
                <RadioButton status={status} setStatus={setStatus} value="todo" title="Todo">
                    <VscListSelection />
                </RadioButton>
                <RadioButton status={status} setStatus={setStatus} value="inProgress" title="In Progress">
                    <TbProgressCheck />
                </RadioButton>
                <RadioButton status={status} setStatus={setStatus} value="review" title="Review">
                    <TbProgressCheck />
                </RadioButton>
                <RadioButton status={status} setStatus={setStatus} value="done" title="Done">
                    <TbProgressCheck />
                </RadioButton>

                {/* Update Todo Button */}
                <button
                    onClick={EditTodoHandler}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-600 transition mt-4"
                >
                    Update
                </button>
            </div>
        </div>
    );
}

export default EditTodoModal;
