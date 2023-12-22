import { useContext } from 'react';
import {FaHome } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { MdAdd, MdBookmarkAdded, MdManageAccounts } from "react-icons/md";
import Header from '../Shared/Header/Header';
import { AiFillProfile } from 'react-icons/ai';
import { AuthContext } from '../Context/AuthProvider';


const Dashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div>
            <div className=' border-b-2 border-[#0097B2]'>
                <Header></Header>
            </div>
            <div className='flex'>

                <div className=' w-64 min-h-screen bg-[#0097B2]'>
                    <div className=' flex flex-col bg-slate-100 m-3 rounded-lg items-center justify-center'>
                        <img className=' rounded-full w-24 h-24 mt-2' src={user.photoURL} alt="" />
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                    </div>
                    <ul className='menu p-2 pt-5 space-y-1'>
                        <li><NavLink to="/dashboard/createNewTasks"><MdAdd /> Create New Tasks</NavLink></li>
                        <li><NavLink to="/dashboard/previoustask"><MdBookmarkAdded />Personal Tasks Details</NavLink></li>
                        <li><NavLink to="/dashboard/managetask"><MdManageAccounts />Task Management</NavLink></li>
                        <li><NavLink to="/dashboard/profileinfo"><AiFillProfile />Profile</NavLink></li>
                        {/* <li><NavLink to="/dashboard/previoustasks"><AiFillProfile />Personal Tasks Details</NavLink></li> */}
                        <div className=' divider'></div>
                        {/* Shared NavLink */}
                        <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>
                    </ul>

                </div>
                <div className=' flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;