import { useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/UseAxiosSecure/useAxiosSecure";
import useAuth from "../Hooks/useAuth/useAuth";
import { Link } from "react-router-dom";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const PreviousTask = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [previousTask, setPerviousTask] = useState([])
    const [expandedTask, setExpandedTask] = useState(null);

    useEffect(() => {
        axiosSecure.get(`/previousTask?email=${user?.email}`)
            .then(res => {
                setPerviousTask(res.data)
            })
    }, [axiosSecure, user?.email])

    const todolistTask = previousTask.filter(na => na.task_status === 'todolist')
    const onGoingTask = previousTask.filter(na => na.task_status === 'ongoing')
    const completedTask = previousTask.filter(na => na.task_status === 'completed')

    console.log(todolistTask)
    console.log(onGoingTask)
    console.log(completedTask)

    // const handleShowDetails = (na) => {
    //     setExpandedTask(na.id);
    // };

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <div className=" grid grid-cols-3 gap-3 p-3">
                    <div className="  rounded-lg bg-lime-100">
                        <h1 className=" font-bold text-lg text-center pt-2 border-b-2 border-black">To do List</h1>
                        {
                            todolistTask.map((na, index) => <>
                                <div className=" p-2 bg-green-200 m-5 rounded-lg">
                                    <div className=" flex justify-between">
                                        <p className=" font-bold">Task Name: {na.task_name}</p>
                                        <p className=" font-bold bg-green-300 text-white px-2 rounded-lg"> Task #{index + 1}</p>
                                    </div>
                                    {/* <p className="text-justify"><span className="font-bold ">Description:</span> {expandedTask === na.id ? na.description : na.description.slice(0,80) + '...'}</p>
                                {na?.description.length >= 100 && (
                                    <button className=" text-red-700 font-bold" onClick={() => handleShowDetails(na)}>more</button>
                                )} */}
                                    {/* <p className=" text-justify"><span className=" font-bold">Description:</span> {na.description}</p> */}
                                    <p>Deadline: {na.deadlines}</p>

                                    <p>Priority: {na.priority}</p>
                                    <p>Created: {na.date_added}</p>

                                    {/* <p>{na.task_status}</p> */}

                                    {/* <p>{na.taskAddedby}</p> */}
                                </div>
                            </>)
                        }
                    </div>
                    <div className="  rounded-lg h-64 bg-slate-100">
                        <h1 className=" font-bold text-lg text-center pt-2 border-b-2 border-black">Ongoing List</h1>

                        {
                            onGoingTask.map((na, index) => <>
                                <div className=" p-2 bg-green-200 m-5 rounded-lg">
                                    <div className=" flex justify-between">
                                        <p className=" font-bold">Task Name: {na.task_name}</p>
                                        <p className=" font-bold bg-green-300 text-white px-2 rounded-lg"> Task #{index + 1}</p>
                                    </div>
                                    {/* <p className="text-justify"><span className="font-bold ">Description:</span> {expandedTask === na.id ? na.description : na.description.slice(0,80) + '...'}</p>
                                {na?.description.length >= 100 && (
                                    <button className=" text-red-700 font-bold" onClick={() => handleShowDetails(na)}>more</button>
                                )} */}
                                    {/* <p className=" text-justify"><span className=" font-bold">Description:</span> {na.description}</p> */}
                                    <p>Deadline: {na.deadlines}</p>

                                    <p>Priority: {na.priority}</p>
                                    <p>Created: {na.date_added}</p>

                                    {/* <p>{na.task_status}</p> */}

                                    {/* <p>{na.taskAddedby}</p> */}
                                </div>
                            </>)
                        }
                    </div>
                    <div className="  rounded-lg h-64 bg-emerald-100">
                        <h1 className=" font-bold text-lg text-center pt-2 border-b-2 border-black">Completed List</h1>

                        {
                            onGoingTask.map((na, index) => <>
                                <div className=" p-2 bg-green-200 m-5 rounded-lg">
                                    <div className=" flex justify-between">
                                        <p className=" font-bold">Task Name: {na.task_name}</p>
                                        <p className=" font-bold bg-green-300 text-white px-2 rounded-lg"> Task #{index + 1}</p>
                                    </div>
                                    {/* <p className="text-justify"><span className="font-bold ">Description:</span> {expandedTask === na.id ? na.description : na.description.slice(0,80) + '...'}</p>
                                {na?.description.length >= 100 && (
                                    <button className=" text-red-700 font-bold" onClick={() => handleShowDetails(na)}>more</button>
                                )} */}
                                    {/* <p className=" text-justify"><span className=" font-bold">Description:</span> {na.description}</p> */}
                                    <p>Deadline: {na.deadlines}</p>

                                    <p>Priority: {na.priority}</p>
                                    <p>Created: {na.date_added}</p>

                                    {/* <p>{na.task_status}</p> */}

                                    {/* <p>{na.taskAddedby}</p> */}
                                </div>
                            </>)
                        }
                    </div>
                </div>
            </DndProvider>
        </div>
    );
};

export default PreviousTask;