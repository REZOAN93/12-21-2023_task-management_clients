import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import {useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';
import useAuth from '../../Hooks/useAuth/useAuth';
import AOS from 'aos';
import 'aos/dist/aos.css';


const CreateNewTasks = () => {
    useEffect(() => {
        AOS.init({
          duration: 1200
         });
      }, [])
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dateString = new Date();
    const year = dateString.getFullYear();
    const month = String(dateString.getMonth() + 1).padStart(2, "0");
    const day = String(dateString.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;


    const onSubmit = async (data) => {
        const task_name = data.task_name;
        const description = data.description;
        const deadlines = data.deadlines;
        const priority = data.priority;
        const task_status = 'todolist';
        const date_added = formattedDate;
        const taskAddedby = user.email;
        const taskData = { task_name, description, deadlines, priority, task_status, date_added, taskAddedby }
        console.log(taskData)
        axiosPublic.post('/addtaskbyuser', taskData)
            .then(res => {
                if (res?.data?.acknowledged === true) {
                    navigate('/dashboard/previoustask')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Added Task Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    return (
        <div data-aos="zoom-in-down" className="text-black px-10 py-5">
            <form onSubmit={handleSubmit(onSubmit)} className=' px-2 py-3'>
                <p className=' text-center text-black text-2xl lg:text-3xl font-bold'>Add New Task</p>
                <div className=' flex gap-10'>
                    <div className="form-control  w-full">
                        <label className="label">
                            <span className="label-text font-bold text-black">Task Title</span>
                        </label>
                        <input type="text" placeholder="Enter the task Title" {...register("task_name", { required: true })} className="input input-bordered" />
                        {errors.task_name && <span className='text-red-700 font-bold'>Please Enter the Task Title</span>}
                    </div>
                </div>

                <div className=' flex gap-5 mt-3'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold ">Description</span>
                        </label>
                        <input type="text" placeholder="Enter Description" {...register("description", { required: true })} className="input input-bordered" />
                        {errors.description && <span className='text-red-700 font-bold'>Please Enter the Description</span>}
                    </div>
                </div>
                <div className='flex gap-5 mt-3'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold ">Deadlines</span>
                        </label>
                        <input type="date" placeholder="Enter Deadline" {...register("deadlines", { required: true })} className="input input-bordered" />
                        {errors.deadlines && <span className='text-red-700 font-bold'>Please Enter the deadlines</span>}
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-bold">Select the Priority</span>
                        </label>
                        {/* <Select {...register("pet_category")} options={options} /> */}

                        <select className="input input-bordered" {...register("priority")}>
                            <option value="" disabled selected>Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>

                <div className="form-control mt-5">
                    <input className="text-white py-2 rounded-lg text-2xl hover:bg-black cursor-pointer font-bold bg-gray-700" type="submit" value="Add New Task" />
                    {error ? (<><p className=" text-red-600 text-sm text-center mt-2">{error}</p></>) : ("")}
                </div>
            </form>

        </div>

    );
};

export default CreateNewTasks;