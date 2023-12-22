import { useDrag, useDrop } from "react-dnd";

const DraggableTask = ({ task, index, moveTask }) => {
    const [{ isDragging }, drag] = useDrag({
        type: "TASK",
        item: { index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "TASK",
        hover: (item) => {
            console.log(`Hover called for task: ${item.index} to index: ${index}`);
            if (item.index !== index) {
                moveTask(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div ref={(node) => drag(drop(node))} className={`p-2 bg-green-200 m-5 rounded-lg ${isDragging ? "opacity-50" : ""}`}>
            <div className="flex justify-between">
                <p className="font-bold">Task Name: {task.task_name}</p>
                <p className="font-bold bg-green-300 text-white px-2 rounded-lg"> Task #{index + 1}</p>
            </div>
            <p>Deadline: {task.deadlines}</p>
            <p>Priority: {task.priority}</p>
            <p>Created: {task.date_added}</p>
        </div>
    );
};

export default DraggableTask;
