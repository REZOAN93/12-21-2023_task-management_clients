import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Benifits = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200
        });
    }, [])
    const { user, userSignOut } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [slider, setSlider] = useState([])
    useEffect(() => {
        axiosPublic.get('/benifit')
            .then(res => setSlider(res.data))
    }, [axiosPublic])
    return (
        <div>
            <div className=" grid grid-cols-2 p-20 gap-5">
                {
                    slider?.map(na => <>
                        <div data-aos="zoom-in-down">
                            <p className=" bg-[#0097B2] text-center text-white font-bold text-xl py-2">{na.userType}</p>
                            <div className=" grid grid-cols-2 gap-2 text-justify">
                                <div className=" w-full h-full">
                                    <img className=" w-full h-full" src={na.image} alt="" />
                                </div>
                                <div>
                                    <p className=" text-base h-28 pt-3">{na.description}</p>
                                    <ul className="py-3 text-sm">
                                        <li>1. {na.benefit1}</li>
                                        <li>2. {na.benefit2}</li>
                                        <li>3. {na.benefit3}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>)
                }
            </div>
        </div>
    );
};

export default Benifits;