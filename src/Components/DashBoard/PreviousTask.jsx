import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DraggableTask from './DraggableTask';
import useAxiosPublic from '../Hooks/useAxiosPublic/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../Hooks/useAuth/useAuth';

const PreviousTask = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    const axiosPublic = useAxiosPublic();
    const {user} = useAuth()
    const [taskList, setTaskList] = useState([]); // State to manage taskList

    const { data: taskListData, refetch } = useQuery({
        queryKey: ['previousTask'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/previousTask?email=${user?.email}`);
            return res.data;
        },
    });

    // Update taskList state when data changes
    useEffect(() => {
        setTaskList(taskListData || []);
    }, [taskListData]);

    const moveTask = async (fromIndex, toIndex) => {
        const updatedTasks = [...taskList];
        const [movedTask] = updatedTasks.splice(fromIndex, 1);
        const updatedTask = {
            ...movedTask,
            task_status: getTargetStatus(toIndex),
        };
        updatedTasks.splice(toIndex, 0, updatedTask);
        setTaskList(updatedTasks);

        try {
            await axiosPublic.put(`/updateTask/${movedTask?._id}`, updatedTask);
            console.log('API request successful');
            await refetch();
        } catch (error) {
            console.error('Error in Axios request:', error);
        }
    };

    const getTargetStatus = (index) => {
        // Implement your logic to determine the target status based on the index
        // For example, if index < 2, return 'todolist', if index < 4, return 'ongoing', else return 'completed'
        return index < 0 ? 'todolist' : index < 0 ? 'ongoing' : 'completed';
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <div className="grid grid-cols-3 gap-3 p-3">
                    <div data-aos="zoom-in-right" className="rounded-lg bg-lime-100">
                        <h1 className="font-bold text-lg text-center pt-2 border-b-2 border-black">
                            To do List
                        </h1>
                        {taskList
                            .filter((task) => task.task_status === 'todolist')
                            .map((task, index) => (
                                <DraggableTask
                                    key={task._id}
                                    task={task}
                                    index={index}
                                    moveTask={(toIndex) => moveTask(index, toIndex)}
                                />
                            ))}
                    </div>

                    <div data-aos="zoom-in-right" className="rounded-lg bg-slate-100">
                        <h1 className=" font-bold text-lg text-center pt-2 border-b-2 border-black">
                            Ongoing List
                        </h1>
                        {taskList
                            .filter((task) => task.task_status === 'ongoing')
                            .map((task, index) => (
                                <DraggableTask
                                    key={task._id}
                                    task={task}
                                    index={index}
                                    moveTask={(toIndex) => moveTask(index, toIndex)}
                                />
                            ))}
                    </div>

                    <div data-aos="zoom-in-right" className="rounded-lg bg-emerald-100">
                        <h1 className=" font-bold text-lg text-center pt-2 border-b-2 border-black">
                            Completed List
                        </h1>
                        {taskList
                            .filter((task) => task.task_status === 'completed')
                            .map((task, index) => (
                                <DraggableTask
                                    key={task._id}
                                    task={task}
                                    index={index}
                                    moveTask={(toIndex) => moveTask(index, toIndex)}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </DndProvider>
    );
};

export default PreviousTask;