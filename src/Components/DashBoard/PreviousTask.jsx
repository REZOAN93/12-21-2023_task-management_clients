
const PreviousTask = () => {
    return (
        <div>
            <div className=" grid grid-cols-3 gap-3 p-3">
                <div className="  rounded-lg h-64 bg-lime-100">
                    <h1 className=" font-bold text-lg text-center pt-2">To Do List</h1>
                </div>
                <div className="  rounded-lg h-64 bg-slate-100">
                    <h1 className=" font-bold text-lg text-center pt-2">Ongoing List</h1>
                </div>
                <div className="  rounded-lg h-64 bg-emerald-100">
                    <h1 className=" font-bold text-lg text-center pt-2">Completed List</h1>
                </div>
            </div>
        </div>
    );
};

export default PreviousTask;