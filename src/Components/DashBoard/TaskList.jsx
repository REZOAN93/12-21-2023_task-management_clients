import React, { useContext, useEffect, useState } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { FaPenAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth/useAuth';
import useAxiosPublic from '../Hooks/useAxiosPublic/useAxiosPublic';



const TaskList = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    let [tasks, setTasks] = useState([]);

    // const { data: taskList = [], refetch } = useQuery({
    //     queryKey: ['previousTask'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get(`/previousTask?email=${user?.email}`)
    //         return res.data
    //     }
    // });

    useEffect(() => {
        axiosPublic.get(`/previousTask?email=${user?.email}`)
            .then(res => {
                setTasks(res.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, [axiosPublic, user?.email]);

    let moveTask = async (id, newStatus) => {
        try {
            let updatedTasks = tasks.map(task => {
                if (task._id === id) {
                    task.status = newStatus;
                }
                return task;
            });
            setTasks(updatedTasks);
            toast('Task updated successfully', { duration: 3000, type: 'success' });

            await axiosPublic.put(`/updateTask/${id}`, { status: newStatus });
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    let calculateDaysToDeadline = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const timeDiff = deadlineDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysDiff;
    };

    // let handleDelete = (id) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: 'Once Deleted, you cannot revert this!',
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#05386B',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, Delete!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axios.delete(`https://ssc-techno-task-management-server.vercel.app/deleteTask/${id}`)
    //                 .then(res => {
    //                     console.log(res.data);
    //                     if (res.data.deletedCount > 0) {
    //                         toast.success("Task Deleted Successfully");
    //                         // Update the state after successful deletion
    //                         setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    //                     }
    //                 })
    //                 .catch(error => {
    //                     console.error("Error :", error);
    //                     toast.error('Error', 'Failed to delete Task');
    //                 });
    //         }
    //     });
    // }

    let TodoTask = ({ task, index }) => {
        let [, drag] = useDrag({
            type: ItemTypes.TASK,
            item: { id: task._id, status: task.status },
        });

        return (
            <div ref={drag} key={index} className='p-4 my-2 bg-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-grab shadow-lg'>
                <div className='flex justify-between items-center'>
                    <div className='w-[75%]'>
                        <h1 className='text-2xl font-bold text-[#363636]'>{index + 1}. {task?.title}</h1>
                        <h3 className='text-xl font-semibold text-[#363636]'>{task?.description}</h3>
                        <h3 className='text-lg font-semibold text-red-500'>Days to Deadline: {calculateDaysToDeadline(task?.deadline)}</h3>
                        <h3 className={`text-lg font-bold rounded-full px-3 w-fit capitalize ${task?.priority === 'high' ? 'bg-red-500' : (task?.priority === 'moderate' ? 'bg-yellow-500' : 'bg-green-400')}`}>
                            {task?.priority} Priority
                        </h3>
                    </div>
                    {/* <div className='flex gap-4 flex-col'>
                        <div onClick={() => handleDelete(task._id)} className='w-25% bg-red-500 text-white p-2 rounded-full cursor-pointer'>
                            <FaTrash className='text-2xl' />
                        </div>

                        <Link to={`/updateTask/${task._id}`}>
                            <div className='w-25% bg-slate-800 text-white p-2 rounded-full cursor-pointer'>
                                <FaPenAlt className='text-2xl' />
                            </div>
                        </Link>
                    </div> */}
                </div>
            </div>
        );
    };

    let OngoingTask = ({ task, index }) => {
        let [, drag] = useDrag({
            type: ItemTypes.TASK,
            item: { id: task._id, status: task.status },
        });

        return (
            <div ref={drag} key={index} className='p-4 my-2 bg-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-grab shadow-lg'>
                <div className='flex justify-between items-center'>
                    <div className='w-[75%]'>
                        <h1 className='text-2xl font-bold text-[#363636]'>{index + 1}. {task?.title}</h1>
                        <h3 className='text-xl font-semibold text-[#363636]'>{task?.description}</h3>
                        <h3 className='text-lg font-semibold text-red-500'>Days to Deadline: {calculateDaysToDeadline(task?.deadline)}</h3>
                        <h3 className={`text-lg font-bold rounded-full px-3 w-fit capitalize ${task?.priority === 'high' ? 'bg-red-500' : (task?.priority === 'moderate' ? 'bg-yellow-500' : 'bg-green-400')}`}>
                            {task?.priority} Priority
                        </h3>
                    </div>
                    <div className='flex gap-4 flex-col'>
                        <div onClick={() => handleDelete(task._id)} className='w-25% bg-red-500 text-white p-2 rounded-full cursor-pointer'>
                            <FaTrash className='text-2xl' />
                        </div>

                        <Link to={`/updateTask/${task._id}`}>
                            <div className='w-25% bg-slate-800 text-white p-2 rounded-full cursor-pointer'>
                                <FaPenAlt className='text-2xl' />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    let CompletedTask = ({ task, index }) => {
        let [, drag] = useDrag({
            type: ItemTypes.TASK,
            item: { id: task._id, status: task.status },
        });

        return (
            <div ref={drag} key={index} className='p-4 my-2 bg-white rounded-lg transition duration-300 ease-in-out transform hover:scale-105 cursor-grab shadow-lg'>
                <div className='flex justify-between items-center'>
                    <div className='w-[75%]'>
                        <h1 className='text-2xl font-bold text-[#363636]'>{index + 1}. {task?.title}</h1>
                        <h3 className='text-xl font-semibold text-[#363636]'>{task?.description}</h3>
                        <h3 className='text-lg font-semibold text-red-500'>Days to Deadline: {calculateDaysToDeadline(task?.deadline)}</h3>
                        <h3 className={`text-lg font-bold rounded-full px-3 w-fit capitalize ${task?.priority === 'high' ? 'bg-red-500' : (task?.priority === 'moderate' ? 'bg-yellow-500' : 'bg-green-400')}`}>
                            {task?.priority} Priority
                        </h3>
                    </div>
                    <div className='flex gap-4 flex-col'>
                        <div onClick={() => handleDelete(task._id)} className='w-25% bg-red-500 text-white p-2 rounded-full cursor-pointer'>
                            <FaTrash className='text-2xl' />
                        </div>

                        <Link to={`/updateTask/${task._id}`}>
                            <div className='w-25% bg-slate-800 text-white p-2 rounded-full cursor-pointer'>
                                <FaPenAlt className='text-2xl' />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    };

    let [, dropTodo] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => moveTask(item.id, 'todo'),
    });

    let [, dropOngoing] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => moveTask(item.id, 'ongoing'),
    });

    let [, dropCompleted] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => moveTask(item.id, 'completed'),
    });

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-[90%] mx-auto my-6 rounded-lg'>
            <div ref={dropTodo} className='todo bg-gradient-to-bl from-[#C5CA55] to-[#73772d] rounded-xl py-2 px-3'>
                <h2 className='text-center text-3xl font-bold'>Todos</h2>
                {
                    tasks.length === 0 ?
                        <div className='text-2xl text-center font-semibold mt-2'>
                            No Tasks added yet
                        </div>
                        :
                        tasks.filter(task => task.status === 'todo').map((todo, index) => <TodoTask key={index} task={todo} index={index} />)
                }
            </div>

            <div ref={dropOngoing} className='ongoing bg-gradient-to-bl from-[#55CA5A] to-[#338b38] rounded-xl py-2 px-3'>
                <h2 className='text-center text-3xl font-bold'>Ongoing</h2>
                {
                    tasks.length === 0 ?
                        <div className='text-2xl text-center font-semibold mt-2'>
                            No Tasks added yet
                        </div>
                        :
                        tasks.filter(task => task.status === 'ongoing').map((ongoing, index) => <OngoingTask key={index} task={ongoing} index={index} />)
                }
            </div>

            <div ref={dropCompleted} className='completed bg-gradient-to-bl from-[#eb8560] to-[#a55132] rounded-xl py-2 px-3'>
                <h2 className='text-center text-3xl font-bold'>Completed</h2>
                {
                    tasks.length === 0 ?
                        <div className='text-2xl text-center font-semibold mt-2'>
                            No Tasks added yet
                        </div>
                        :
                        tasks.filter(task => task.status === 'completed').map((completed, index) => <CompletedTask key={index} task={completed} index={index} />)
                }
            </div>
        </div>
    );
};

export default TaskList;