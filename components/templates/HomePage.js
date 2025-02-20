'use client'
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaPlus } from "react-icons/fa6";
import AddTodoModal from '../module/AddTodoModal';
import Tasks from '../module/Tasks';
import { useRouter } from 'next/navigation';

function HomePage() {
    const [todos, setTodos] = useState({
        todo: [],
        inProgress: [],
        review: [],
        done: [],
    });
    const [isopen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [authError, setAuthError] = useState(null);

    const router = useRouter();

    const openModalHandler = () => {
        setIsOpen(true);
    };

    // Function to fetch todos and group them by status
    const fetchTodos = async () => {
        try {
            const res = await fetch("/api/todos");
            const data = await res.json();
            if (res.status === 401) { // Unauthorized error
                setAuthError("You are not logged in. Please log in to view your tasks.");
                router.push("/login");
            }
            if (res.ok) {
                const groupedTodos = {
                    todo: data.todos.filter(todo => todo.status === 'todo'),
                    inProgress: data.todos.filter(todo => todo.status === 'inProgress'),
                    review: data.todos.filter(todo => todo.status === 'review'),
                    done: data.todos.filter(todo => todo.status === 'done'),
                };
                setTodos(groupedTodos);  // Set the grouped todos
            } else {
                setAuthError("Failed to connect to the server. Please try again later.");
            }
        } catch (error) {
            toast.error("Error fetching todos!");
        } finally {
            setLoading(false);
        }
    };

    // Function to add a new todo
    const addTodo = (newTodo) => {
        if (!newTodo || !newTodo.status) {
            return;
        }

        setTodos(prevTodos => {
            const updatedTodos = { ...prevTodos };
            const status = newTodo.status || 'todo'; // Default to "todo"

            if (!updatedTodos[status]) {
                updatedTodos[status] = [];
            }

            updatedTodos[status] = [...updatedTodos[status], newTodo]; // Ensure immutability
            return updatedTodos;
        });
    };


    useEffect(() => {
        fetchTodos();  // Initial fetch
    }, []);

    return (
        <div>
            <button onClick={openModalHandler} className="absolute right-10 bottom-8 p-4 rounded-full bg-blue-600 shadow-2xl cursor-pointer">
                <FaPlus className="text-white" />
            </button>
            {isopen && <AddTodoModal setIsOpen={setIsOpen} addTodo={addTodo} fetchTodos={fetchTodos} />}
            {authError ? (
                <div className="p-4 bg-red-500 text-white text-center rounded-md shadow-md">
                    {authError}
                </div>
            ) : (
                <>
                    <div className='grid grid-cols-4 gap-10'>
                        <div className='bg-white rounded-md shadow-lg overflow-hidden'>
                            <p className='bg-yellow-500 text-center text-white p-1'>Todo</p>
                            <div className='p-2'>
                                <Tasks data={todos.todo} fetchTodos={fetchTodos} next="inProgress" />
                            </div>
                        </div>
                        <div className='rounded-md shadow-lg overflow-hidden'>
                            <p className='bg-blue-500 text-center text-white p-1'>In Progress</p>
                            <div className='p-2'>
                                <Tasks data={todos.inProgress} fetchTodos={fetchTodos} back="todo" next="review" />
                            </div>
                        </div>
                        <div className='rounded-md shadow-lg overflow-hidden'>
                            <p className='bg-purple-500 text-center text-white p-1'>Review</p>
                            <div className='p-2'>
                                <Tasks data={todos.review} fetchTodos={fetchTodos} back="inProgress" next="done" />
                            </div>
                        </div>
                        <div className='rounded-md shadow-lg overflow-hidden'>
                            <p className='bg-green-500 text-center text-white p-1'>Done</p>
                            <div className='p-2'>
                                <Tasks data={todos.done} fetchTodos={fetchTodos} back="review" />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default HomePage;
