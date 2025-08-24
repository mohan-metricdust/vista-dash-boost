import React from "react";
import { GlobeDemo } from "./GlobeDemo";
import "./Footer.css";

const Footer = () => {
  return (
    <footer >
        <div className="container">
            <div className="row gx-5">
                <div className="col-lg-6">
                    <GlobeDemo />
                </div>
                <div className="col-lg-3" style={{display: 'flex', alignItems: 'center'}}>
                    <div className="widget">
                        <h5>Our Services</h5>
                        <ul>
                            <li><i className="fa-solid fa-cloud"></i> &nbsp;&nbsp;<a href="#">Cloud Infrastructure</a></li>
                            <li><i className="fa-regular fa-snowflake"></i> &nbsp;&nbsp;<a href="#">AI Integration</a></li>
                            <li><i className="fa-solid fa-wand-magic-sparkles"></i> &nbsp;&nbsp;<a href="#">ML Solutions</a></li>
                            <li><i className="fa-solid fa-microchip"></i> &nbsp;&nbsp;<a href="#">Quantum Computing</a></li>
                            <li><i className="fa-solid fa-sitemap"></i> &nbsp;&nbsp;<a href="#">BlockChain Apps</a></li>
                            <li><i className="fa-solid fa-shield-halved"></i> &nbsp;&nbsp;<a href="#">CyberSecurity</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3" style={{display: 'flex', alignItems: 'center'}}>
                    <div className="widget">
                        <h5>Get In Touch</h5>
                        <div className="de-icon-text mb20">
                            <img src="/images/svg/phone-svgrepo-com-white.svg" className="" alt="call us" />
                            <div className="d-text">
                                <h4>Phone</h4>
                                +1 425-900-9663
                            </div>
                        </div>
                        <div className="de-icon-text mb20">
                            <img src="/images/svg/email-address-svgrepo-com-white.svg" className="" alt="Reach out with an email" />
                            <div className="d-text">
                                <h4>Email</h4>
                                lohith@metricdust.com
                            </div>
                        </div>
                        <div className="de-icon-text">
                            <img src="/images/svg/map-pin-svgrepo-com-white.svg" className="" alt="Our address" />
                            <div className="d-text">
                                <h4>Address</h4>
                                108 Union Ave, Snohomish, WA 98290
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="subfooter">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="de-flex">
                            <div className="de-flex-col">
                                Copyright 2024-25 | Designed with passion
                            </div>
                            <ul className="menu-simple">
                                <li><a href="#">Terms &amp; Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;