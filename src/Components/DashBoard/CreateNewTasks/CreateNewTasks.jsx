import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic/useAxiosPublic';
import useAuth from '../../Hooks/useAuth/useAuth';
import useAxiosSecure from '../../Hooks/UseAxiosSecure/useAxiosSecure';


const CreateNewTasks = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
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
        axiosSecure.post('/addtaskbyuser', taskData)
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
        <div className="text-black px-10 py-5">
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



// import { useFormik } from 'formik';
// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

// const AddNewPat = () => {

//     const formik = useFormik({
//         initialValues: {
//             image: '',
//             lastName: '',
//             email: '',
//         },
//         onSubmit: async (values) => {
//             // alert(JSON.stringify(values, null, 2));
//             // console.log(JSON.stringify(values, null, 2))
//             const imageFile = { image: data.image[0] }
//             const res = await axiosPublic.post(image_hosting_Api, imageFile, {
//                 headers: {
//                     'content-type': 'multipart/form-data'
//                 }
//             })


//             console.log(values)
//         },
//     });
//     return (
//         <div>
//             <div className="card w-full bg-base-100">

//                 <form className="card-body" onSubmit={formik.handleSubmit}>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text font-bold">Upload the Pet Image</span>
//                         </label>
//                         <input id="image" name="image" type="file" onChange={formik.handleChange} value={formik.values.image} className="file-input w-full" required />
//                     </div>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Email</span>
//                         </label>
//                         <input id="lastName" name="lastName" type="text" onChange={formik.handleChange} value={formik.values.lastName} placeholder="email" className="input input-bordered" required />

//                     </div>
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Email</span>
//                         </label>
//                         <input id="email" name="email" type="email" onChange={formik.handleChange} value={formik.values.email} placeholder="email" className="input input-bordered" required />
//                     </div>

//                     <div className="form-control mt-6">
//                         <button type="submit" className="btn btn-primary">Submit</button>
//                     </div>
//                 </form>

//             </div>

//         </div>
//     );
// };

// export default AddNewPat;