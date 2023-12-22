import React from 'react';
import useAxiosSecure from '../Hooks/UseAxiosSecure/useAxiosSecure';

import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth/useAuth';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import useAxiosPublic from '../Hooks/useAxiosPublic/useAxiosPublic';


const TaskManagement = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    // const [pause, setPause] = useState(false)

    const { data: taskList = [], refetch } = useQuery({
        queryKey: ['previousTask'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/previousTask?email=${user?.email}`)
            return res.data
        }
    })
    console.log(taskList)

    const handleDeleteUser = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "The Task information is Delete ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/taskInformation/${id}`)
                    .then(res => {
                        if (res?.data?.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "the Task has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className='pb-10'>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL#</th>
                                <th>Task_name</th>
                                <th>Deadlines</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                taskList?.map((na, index) => <>
                                    <tr>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <div className="font-bold text-base">Task Name: {na?.task_name}</div>
                                                    <div>
                                                        {/* <div className="text-sm opacity-50">Description: {na?.description}</div> */}
                                                        <div className="text-sm opacity-50">priority: {na?.priority}</div>
                                                        <div className="text-sm opacity-50">Task Status: {na?.task_status}</div>
                                                        <div className="text-sm">Date Added: <span className=" font-bold text-emerald-800">{na?.date_added}</span></div>
                                                        {/* <div className="text-sm opacity-50">Task Added By: {na?.taskAddedby}</div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td> <p>{na.deadlines}</p></td>

                                        {/* <td>
                            {na?.adoption_status === 'Adopted' ? (
                                <button onClick={() => handlePause(na._id, na.adoption_status)} className='btn bg-red-200 hover:bg-red-500'>
                                    Click for Cancel Adoption?
                                </button>
                            ) : (
                                <button onClick={() => handlePause(na._id, na.adoption_status)} className='btn w-34 border-none hover:bg-[#54e0ec] bg-[#adf6fc]'>
                                    Click for Adopt
                                </button>
                            )}
                        </td> */}
                                        <td><Link className="btn btn-ghost text-2xl text-green-700" to={`/dashboard/updateItems/${na._id}`}><FaEdit /></Link></td>
                                        <td><button onClick={() => handleDeleteUser(na._id)} className=' bg-slate-300 p-2 text-xl rounded-full text-red-700'><FaTrashAlt /></button></td>
                                    </tr></>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TaskManagement;