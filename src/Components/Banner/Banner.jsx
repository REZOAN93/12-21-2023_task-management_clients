import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './Banner.css';
import { useContext, useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic/useAxiosPublic';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { AwesomeButton, AwesomeButtonShare } from "react-awesome-button";
import AOS from 'aos';
import 'aos/dist/aos.css';



const Banner = () => {
    useEffect(() => {
        AOS.init({
          duration: 1200
         });
      }, [])
    const { user, userSignOut } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [slider, setSlider] = useState([])
    useEffect(() => {
        axiosPublic.get('/slider')
            .then(res => setSlider(res.data))
    }, [axiosPublic])

    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="swiper"
            >
                {
                    slider?.map(na => <>
                        <SwiperSlide key={na._id} className=' w-full h-64 lg:h-[500px]' >
                            <div data-aos="zoom-in-up" className=''>
                                <img className=' w-full h-64 lg:h-[500px]' src={na.image} alt="" />
                                <div className='w-full bg-gradient-to-r from-slate-400 absolute top-0 text-center space-y-5 lg:space-y-16 pt-20 h-full'>
                                    <p className=' font-bold text-white text-xl lg:text-6xl'>{na.title}</p>
                                    <p className=' w-2/3 lg:w-1/2 mx-auto lg:font-bold text-white lg:text-3xl'>{na.subtitle}</p>
                                    <div className='mt-20'>
                                    {
                                        user?.email ? "" : <><NavLink className="px-10 py-1 btn text-white bg-[#0097B2] hover:bg-[#5ad9f0] hover:text-black font-semibold text-xl glass" to={'/dashboard/createNewTasks'}>Let's Explore</NavLink></>
                                    }
                                    </div>
                                    <div className=' mt-20'>
                                        {user === true ? (
                                            <NavLink className="px-10 py-2 btn text-white bg-[#0097B2] hover:bg-[#5ad9f0] hover:text-black font-semibold text-3xl glass" to={'/dashboard/createNewTasks'}>Let's Explore</NavLink>
                                        ) : user ? (

                                            <NavLink className="px-10 py-2 hover:bg-[#5ad9f0] hover:text-black  rounded-lg text-white font-semibold text-3xl bg-[#0097B2]" to={'/dashboard/createNewTasks'}>Let's Explore</NavLink>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </>)
                }
            </Swiper>
        </div>
    );
};

export default Banner;