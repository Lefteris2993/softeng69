import React from "react";
import "./about.scss";
import logo from './logo.jpeg';

export const About = ({
    children
}) => {
    return (
        <div >
            {/* {children} */}
            <img src={logo} alt="Logo" />
            <div className="about-us-text">
               Eos (Electric charging Operating Software) is a software designed for you! Now you can charge your vehicle from anywhere and receive helpful stats!
            </div>        
            {children}
        </div>
    )
}
