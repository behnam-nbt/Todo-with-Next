import React, { useState } from 'react';
import { LuPencil } from "react-icons/lu";
import EditTodoModal from './EditTodoModal';

function Tasks({ data, fetchTodos, next, back }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const changeStatus = async (id, status) => {
        const res = await fetch("/api/todos", {
            method: "PATCH",
            body: JSON.stringify({ id, status }),
            headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();
        if (data.status === "success") fetchTodos();
    };

    const openEditModal = (todo) => {
        setSelectedTodo(todo);
        setIsEditOpen(true);
    };

    return (
        <>
            <ul className="space-y-2">
                {data?.map((todo) => {
                    if (!todo || !todo.status) return null;
                    return (
                        <li key={todo._id} className="p-3 border rounded-lg shadow relative">
                            {/* Open edit modal on click */}
                            <span
                                className='absolute top-2 right-2 cursor-pointer'
                                onClick={() => openEditModal(todo)}
                            >
                                <LuPencil />
                            </span>
                            <div className='p-2 border-b'>
                                <span
                                    className={`font-semibold ${todo.status === "done"
                                        ? "text-green-500"
                                        : todo.status === "review"
                                            ? "text-purple-500"
                                            : todo.status === "todo"
                                                ? "text-yellow-500"
                                                : todo.status === "inProgress"
                                                    ? "text-blue-500"
                                                    : "text-gray-700"
                                        }`}
                                >
                                    {todo.title}
                                </span>

                            </div>
                            <div className='flex justify-between items-center mt-3'>
                                {back ? (<button onClick={() => changeStatus(todo._id, back)} className='bg-red-400 text-sm px-2 py-1 rounded-sm text-white'>Back</button>) : null}
                                {next ? (<button onClick={() => changeStatus(todo._id, next)} className='bg-green-400 text-sm px-2 py-1 rounded-sm text-white'>Next</button>) : null}
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Show Edit Todo Modal */}
            {isEditOpen && <EditTodoModal setIsOpen={setIsEditOpen} fetchTodos={fetchTodos} todo={selectedTodo} />}
        </>
    );
}

export default Tasks;
