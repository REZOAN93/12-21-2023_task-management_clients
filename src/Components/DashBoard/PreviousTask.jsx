import { useEffect } from "react";
import useAuth from "../Hooks/useAuth/useAuth";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DraggableTask from "./DraggableTask";
import useAxiosPublic from "../Hooks/useAxiosPublic/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const PreviousTask = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200
        });
    }, [])

    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: taskList = [], refetch } = useQuery({
        queryKey: ['previousTask'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/previousTask?email=${user?.email}`)
            return res.data
        }
    });

    const moveTask = async (fromIndex, toIndex, targetStatus) => {
        console.log("Move task called with:", fromIndex, toIndex, targetStatus);
        const updatedTasks = [...taskList];
        const [movedTask] = updatedTasks.splice(fromIndex, 1);

        // Update the task status only for the moved task
        const updatedTask = {
            ...movedTask,
            task_status: targetStatus,
        };

        updatedTasks.splice(toIndex, 0, updatedTask);

        console.log("Updated task:", updatedTask);

        // Update MongoDB status for the moved task
        try {
            await axiosPublic.put(`/updateTask/${movedTask?._id}`, updatedTask);
            console.log("API request successful");
            await refetch();  // Refetch the data to reflect the changes
        } catch (error) {
            console.error("Error in Axios request:", error);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <div className="grid grid-cols-3 gap-3 p-3">
                    {/* To Do List */}
                    <div data-aos="zoom-in-right" className="rounded-lg bg-lime-100">
                        <h1 className="font-bold text-lg text-center pt-2 border-b-2 border-black">To do List</h1>
                        {taskList
                            .filter(task => task.task_status === 'todolist')
                            .map((task, index) => (
                                <DraggableTask key={task._id} task={task} index={index} moveTask={(toIndex) => moveTask(index, toIndex, 'todolist')} />
                            ))}
                    </div>

                    {/* Ongoing List */}
                    <div data-aos="zoom-in-right" className="rounded-lg bg-slate-100">
                        <h1 className=" font-bold text-lg text-center pt-2 border-b-2 border-black">Ongoing List</h1>
                        {taskList
                            .filter(task => task.task_status === 'ongoing')
                            .map((task, index) => (
                                <DraggableTask key={task._id} task={task} index={index} moveTask={(toIndex) => moveTask(index, toIndex, 'ongoing')} />
                            ))}
                    </div>

                    {/* Completed List */}
                    <div data-aos="zoom-in-right" className="rounded-lg bg-emerald-100">
                        <h1 className=" font-bold text-lg text-center pt-2 border-b-2 border-black">Completed List</h1>
                        {taskList
                            .filter(task => task.task_status === 'completed')
                            .map((task, index) => (
                                <DraggableTask key={task._id} task={task} index={index} moveTask={(toIndex) => moveTask(index, toIndex, 'completed')} />
                            ))}
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default PreviousTask;