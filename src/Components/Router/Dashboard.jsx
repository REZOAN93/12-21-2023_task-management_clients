import React, { useContext } from 'react';
import { VscRequestChanges } from "react-icons/vsc";
import { FaBookmark, FaCalendar, FaDonate, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaVoicemail } from 'react-icons/fa';
import { SiCampaignmonitor } from "react-icons/si";
import { NavLink, Outlet } from 'react-router-dom';
import { MdAdd, MdBookmarkAdded, MdDataset, MdEmail, MdManageAccounts } from "react-icons/md";
import Header from '../Shared/Header/Header';
import useAdmin from '../Hooks/useAdmin/useAdmin';
import { AiFillProfile } from 'react-icons/ai';
import { AuthContext } from '../Context/AuthProvider';


const Dashboard = () => {
    const { user} = useContext(AuthContext);
    console.log(user)
    //TODO get is admin value from the data Base
    const [isAdmin] = useAdmin();
    // const isAdmin=true;
    return (
        <div>
            <div className=' border-b-2 border-[#0097B2]'>
                <Header></Header>
            </div>
            <div className='flex'>
                <div className=' w-64 min-h-screen bg-[#0097B2]'>
                    <ul className='menu p-2 pt-5 space-y-1'>
                        {
                            isAdmin ? <>
                                <li><NavLink to="/dashboard/createNewTasks"><MdAdd /> Create New Tasks</NavLink></li>
                                <li><NavLink to="/dashboard/previoustask"><MdBookmarkAdded />Personal Tasks Details</NavLink></li>
                                <li><NavLink to="/dashboard/managetask"><MdManageAccounts />Task Management</NavLink></li>
                                <li><NavLink to="/dashboard/profileinfo"><AiFillProfile />Profile</NavLink></li>
                                {/* <li><NavLink to="/dashboard/adoptionrequest"><VscRequestChanges /> Adoption Request</NavLink></li>
                                <li><NavLink to="/dashboard/createDonation"><MdAdd /> Create Donation Campaign</NavLink></li>
                                <li><NavLink to="/dashboard/myDonationCampaigns"><MdBookmarkAdded /> My Donation Campaigns</NavLink></li>
                                <li><NavLink to="/dashboard/paymenthistroy"><FaDonate /> My Donations</NavLink></li> */}
                                <li><NavLink to="/dashboard/allusers"><FaUsers /> All Users</NavLink></li>
                                {/* <li><NavLink to="/dashboard/allPets"><MdDataset /> All Pets</NavLink></li>
                                <li><NavLink to="/dashboard/alldonationcampaigns"><SiCampaignmonitor /> All Donation Campaigns</NavLink></li> */}
                            </> : <>
                                <li><NavLink to="/dashboard/createNewTasks"><MdAdd /> Create New Tasks</NavLink></li>
                                <li><NavLink to="/dashboard/previoustask"><MdBookmarkAdded />Personal Tasks Details</NavLink></li>
                                <li><NavLink to="/dashboard/managetask"><MdManageAccounts />Task Management</NavLink></li>
                                <li><NavLink to="/dashboard/profileinfo"><AiFillProfile />Profile</NavLink></li>
                                {/*<li><NavLink to="/dashboard/adoptionrequest"><VscRequestChanges /> Adoption Request</NavLink></li>
                                <li><NavLink to="/dashboard/createDonation"><MdAdd /> Create Donation Campaign</NavLink></li>
                                <li><NavLink to="/dashboard/myDonationCampaigns"><MdBookmarkAdded /> My Donation Campaigns</NavLink></li>
                                <li><NavLink to="/dashboard/paymenthistroy"><FaDonate /> My Donations</NavLink></li> */}
                            </>
                        }
                        <div className=' divider'></div>
                        {/* Shared NavLink */}
                        <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>

                    </ul>
                    <div className=' flex flex-col bg-slate-100 m-3 rounded-lg items-center justify-center'>
                        <img className=' rounded-full w-32 h-32' src={user.photoURL} alt="" />
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className=' flex-1'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;