import { useLoaderData, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
// import SectionTitle from '../../../SectionTitle/SectionTitle';
import { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';
import useAuth from '../../Hooks/useAuth/useAuth';

const UpdateItems = () => {
    const dbData = useLoaderData()
    console.log(dbData)
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
        const task_status = dbData?.task_status;
        const date_added = dbData?.date_added;
        const taskAddedby = dbData?.taskAddedby;
        const taskData = { task_name, description, deadlines, priority, task_status, date_added, taskAddedby }
        console.log(taskData)

        axiosPublic.patch(`/updateTask/${dbData?._id}`, taskData)
            .then(res => {
                console.log(res.data)
                if (res?.data?.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Updated the task Information Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate('/dashboard/managetask')

                }
            })
    }


    return (
        <div className="text-black px-10 py-5">
            <form onSubmit={handleSubmit(onSubmit)} className=' px-2 py-3'>
                <p className=' text-center text-black text-2xl lg:text-3xl font-bold'>Update the Task</p>
                <div className=' flex gap-10'>
                    <div className="form-control  w-full">
                        <label className="label">
                            <span className="label-text font-bold text-black">Task Title</span>
                        </label>
                        <input type="text" defaultValue={dbData.task_name} placeholder="Enter the task Title" {...register("task_name", { required: true })} className="input input-bordered" />
                        {errors.task_name && <span className='text-red-700 font-bold'>Please Enter the Task Title</span>}
                    </div>
                </div>

                <div className=' flex gap-5 mt-3'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold ">Description</span>
                        </label>
                        <input type="text" defaultValue={dbData.description} placeholder="Enter Description" {...register("description", { required: true })} className="input input-bordered" />
                        {errors.description && <span className='text-red-700 font-bold'>Please Enter the Description</span>}
                    </div>
                </div>
                <div className='flex gap-5 mt-3'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold ">Deadlines</span>
                        </label>
                        <input type="date" defaultValue={dbData.deadlines} placeholder="Enter Deadline" {...register("deadlines", { required: true })} className="input input-bordered" />
                        {errors.deadlines && <span className='text-red-700 font-bold'>Please Enter the deadlines</span>}
                    </div>

                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text font-bold">Select the Priority</span>
                        </label>
                        {/* <Select {...register("pet_category")} options={options} /> */}

                        <select defaultValue={dbData?.priority} className="input input-bordered" {...register("priority")}>
                            <option value="" disabled selected>Select Priority</option>
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>

                <div className="form-control mt-5">
                    <input className="text-white py-2 rounded-lg text-2xl hover:bg-black cursor-pointer font-bold bg-gray-700" type="submit" value="Updated Task" />
                    {error ? (<><p className=" text-red-600 text-sm text-center mt-2">{error}</p></>) : ("")}
                </div>
            </form>

        </div>
        // <div className="text-black px-10 py-5">
        //     <form onSubmit={handleSubmit(onSubmit)} className=' px-2 py-1'>
        //         <p className=' text-center text-black text-2xl lg:text-3xl pb-4 font-bold'>Update the Task Information</p>
        //         <div className=' flex gap-10'>
        //             <div className="form-control  w-full">
        //                 <label className="label">
        //                     <span className="label-text font-bold text-black">Pet Name</span>
        //                 </label>
        //                 <input type="text" defaultValue={dbData?.pet_name} placeholder="Enter the Pet Name" {...register("pet_name", { required: true })} className="input input-bordered" />
        //                 {errors.pet_name && <span className='text-red-700 font-bold'>Please Enter the Pet Name</span>}
        //             </div>
        //             <div className="form-control w-full">
        //                 <label className="label">
        //                     <span className="label-text font-bold text-black">Pet Age</span>
        //                 </label>
        //                 <input type="number" defaultValue={dbData?.pet_age} placeholder="Enter the Pet Age" {...register("pet_age", { required: true })} className="input input-bordered" />
        //                 {errors.pet_age && <span className='text-red-700 font-bold'>Please Enter the Pet Age</span>}
        //             </div>
        //         </div>
        //         <div className=' flex gap-10 mt-3'>
        //             <div className="form-control  w-full">
        //                 <label className="label">
        //                     <span className="label-text font-bold text-black">Pet Location</span>
        //                 </label>
        //                 <input type="text" defaultValue={dbData?.pet_location} placeholder="Enter the Pet Location" {...register("pet_location", { required: true })} className="input input-bordered" />
        //                 {errors.pet_location && <span className='text-red-700 font-bold'>Please Enter the pet_location</span>}
        //             </div>

        //         </div>
        //         <div className=' flex gap-5 mt-3'>
        //             <div className="form-control w-full">
        //                 <label className="label">
        //                     <span className="label-text font-bold ">Short Description</span>
        //                 </label>
        //                 <input type="text" defaultValue={dbData?.short_description} placeholder="Enter Short Description" {...register("short_description", { required: true })} className="input input-bordered" />
        //                 {errors.short_description && <span className='text-red-700 font-bold'>Please Enter the Short Description</span>}
        //             </div>
        //         </div>
        //         <div className="form-control mt-3">
        //             <label className="label">
        //                 <span className="label-text font-bold">Select the Pet Category</span>
        //             </label>
        //             {/* <Select {...register("pet_category")} options={options} /> */}

        //             <select defaultValue={dbData?.pet_category} className="input input-bordered" {...register("pet_category")}>
        //                 <option value="" disabled selected>Select Category</option>
        //                 <option value="Cats">Adorable Cats</option>
        //                 <option value="Dogs">Playful Dogs</option>
        //                 <option value="Rabbits">Cheerful Rabbits</option>
        //                 <option value="Aquatic">Aquatic Friends</option>
        //                 <option value="Reptile">Reptile Companions</option>
        //                 <option value="Rodents">Cheerful Rodents</option>
        //             </select>
        //         </div>

        //         <div className="form-control w-full mt-3">
        //             <label className="label">
        //                 <span className="label-text font-bold ">Long Description</span>
        //             </label>
        //             <textarea {...register("long_description", { required: true })} defaultValue={dbData?.long_description} className="textarea textarea-bordered" placeholder="Enter Long Description"></textarea>
        //             {/* <input type="text" placeholder=""  className="input input-bordered" /> */}
        //             {errors.long_description && <span className='text-red-700 font-bold'>Please Enter the Long Description</span>}
        //         </div>
        //         <div className="form-control mt-2">
        //             <input className="text-white py-2 rounded-lg text-2xl hover:bg-black cursor-pointer font-bold bg-gray-700" type="submit" value="Update the Pet" />
        //             {error ? (<><p className=" text-red-600 text-sm text-center mt-2">{error}</p></>) : ("")}
        //         </div>
        //     </form>
        // </div>
    );
};

export default UpdateItems;