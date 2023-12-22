import React from 'react';
import img1 from '../../../assets/logo.png'
import { AiFillLinkedin } from "react-icons/ai";
import { FaGithub } from "react-icons/fa6";
import { FaFacebook } from 'react-icons/fa';
import { MdContactMail } from 'react-icons/md';

const Footer = () => {
    return (
        <div className=' text-white'>
            <div className='grid lg:grid-cols-2 '>
                <div className='bg-[#adf6fc] lg:p-20 space-y-2 text-black  text-center'>
                    <div className=' justify-between text-left px-3 lg:px-0 items-center'>
                        <div>
                            <img className='' src={img1} alt="" />
                        </div>
                        <div>
                            <p className=' text-xl'>CONTACT US</p>
                            <p className=' font-bold text-xl mt-3'>REZOAN Task Managements Platform</p>
                            <p>Pahartoli, Chattogram, Bangladesh</p>
                            <p>+880-1518-971705</p>
                            <p>Mon - Fri: 08:00 - 22:00</p>
                            <p>Sat - Sun: 10:00 - 23:00</p>
                            <div className=' flex text-3xl text-[#0097B2] mt-2 gap-2'>
                                <a href="https://www.linkedin.com/in/rezoansarwar"><AiFillLinkedin /></a>
                                <a href="https://www.linkedin.com/in/rezoansarwar"><FaGithub /></a>
                                <a href="https://www.facebook.com/profile.php?id=100027420303406"><FaFacebook /></a>
                                <a href="https://rezoan-2c3be.web.app/"><MdContactMail /></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex bg-[#1f7077] flex-col lg:space-y-2 items-center pl-10 lg:pt-32'>
                    <footer className="footer text-neutral-content">
                        <nav>
                            <header className="footer-title">Get Started</header>
                            <a href="/features" className="link link-hover">Features</a>
                            <a href="/pricing" className="link link-hover">Pricing</a>
                            <a href="/signup" className="link link-hover">Sign Up</a>
                            <a href="/login" className="link link-hover">Login</a>
                        </nav>
                        <nav>
                            <header className="footer-title">Resources</header>
                            <a href="/blog" className="link link-hover">Blog</a>
                            <a href="/help-center" className="link link-hover">Help Center</a>
                            <a href="/contact-us" className="link link-hover">Contact Us</a>
                        </nav>
                        <nav>
                            <header className="footer-title">Company</header>
                            <a href="/about" className="link link-hover">About Us</a>
                            <a href="/careers" className="link link-hover">Careers</a>
                            <a href="/privacy-policy" className="link link-hover">Privacy Policy</a>
                            <a href="/terms-of-service" className="link link-hover">Terms of Service</a>
                        </nav>
                    </footer>
                    
                </div>

            </div>
            <footer className="footer footer-center p-4 bg-[#151515] text-white">
                <aside>
                    <p>Copyright © 2024 - All right reserved by Rezoan Task Management</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;