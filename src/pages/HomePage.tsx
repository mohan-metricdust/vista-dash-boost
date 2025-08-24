import React, { useEffect } from "react";
import '../css/bootstrap.min.css'
import '../css/plugins.css'
import '../css/swiper.css'
import '../css/style.css';
import '../css/coloring.css';
import '../css/colors/scheme-01.css'
import AIimage from '../../public/images/tech-stack/1_AI.webp';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import Demo from "@/components/Demo";
import AIPoweredServices from "@/components/AIPoweredServices";
import { GlobeDemo } from "@/components/GlobeDemo";
import MetricDustVisualizer from "@/MetricDustVisualizer";
import Loader from "@/components/Loader";
export default function HomePage() {

    return (
        <div id="wrapper">
            {/* <div id="de-loader"></div> */}
            <Header />
            <div className="no-bottom no top">
                <section className="text-light no-top no-bottom position-relative z-1000">
                   <HeroSlider />
                </section>

                

                <section className="text-light bg-dark-1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="subtitle s2 wow fadeInUp mb-3">What can MetricDust do for you?</div>
                            <h2 className="wow fadeInUp" data-wow-delay=".2s">Our offerings</h2>
                        </div>

                        <div className="col-lg-3 col-md-6 wow fadeInRight" data-wow-delay=".2s">
                            <div>
                                <img src="images/svg/embedded-live-content-svgrepo-com.svg" className="w-80px mb20" alt="Our offering- software development" />
                                <h5>Software Development</h5>
                                <hr className="s2" />
                                <p>Personalized software solutions aligned to your business needs.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 wow fadeInRight" data-wow-delay="0s">
                            <div>
                                <img src="images/svg/collaboration-svgrepo-com.svg" className="w-80px mb20" alt="Cost effective IT services " />
                                <h5>E2E IT Services</h5>
                                <hr className="s2" />
                                <p>Cost effective design & maintainence of your IT/Cloud infrastructure.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 wow fadeInRight" data-wow-delay=".4s">
                            <div>
                                <img src="images/svg/lock-svgrepo-com.svg" className="w-80px mb20" alt="AI service logo" />
                                <h5>Data & AI</h5>
                                <hr className="s2" />
                                <p>Gain actionable business insights & enhance customer experience.</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 wow fadeInRight" data-wow-delay=".6s">
                            <div>
                                <img src="images/svg/data-check-svgrepo-com.svg" className="w-80px mb20" alt="Quantum Computing" />
                                <h5>Quantum Computing</h5>
                                <hr className="s2" />
                                <p>Future-proof your business & improve 1.5x business efficiency.</p>
                            </div>
                        </div>
                        <div className="spacer-20"></div>
                        <div className="col-lg-12 text-center">
                            <a className="btn-line" href="services.html" rel="noopener">View All Services</a>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{paddingBottom:"50px !important"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 mb-sm-20 position-relative">
                            <div className="de_count wow fadeInUp">
                                <h3><span className="timer" data-to="15" data-speed="3000"></span>+</h3>
                                <h5>Projects Completed</h5>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-sm-20 position-relative">
                            <div className="de_count wow fadeInUp">
                                <h3><span className="timer" data-to="10" data-speed="3000"></span>+</h3>
                                <h5>Global Clients</h5>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-sm-20 position-relative">
                            <div className="de_count wow fadeInUp">
                                <h3><span className="timer" data-to="99" data-speed="3000"></span>%</h3>
                                <h5>Customer Satisfication</h5>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6 mb-sm-20 position-relative">
                            <div className="de_count wow fadeInUp">
                                <h3><span className="timer" data-to="3" data-speed="3000"></span>+</h3>
                                <h5>Year of Experiences</h5>
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* AIPOWEREDSERVICES */}
            <AIPoweredServices />

            <section>
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="subtitle wow fadeInUp mb-3">Work with us</div>
                            <h2 className="wow fadeInUp" data-wow-delay=".2s">Our Promise</h2>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-sm-6 mb-sm-20 wow fadeInRight" data-wow-delay=".2s">
                            <div className="de-step-s1 text-dark">
                                <div className="d-number wow rotateIn" data-wow-delay=".2s">1</div>
                                <h4>Versatile Applications</h4>
                                <p className="">Employing user-centric design to build robust applications. <br />That are
                                    enterprise ready from the MVP stage.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-sm-20 wow fadeInRight" data-wow-delay=".4s">
                            <div className="de-step-s1 text-dark">
                                <div className="d-number wow rotateIn" data-wow-delay=".4s">2</div>
                                <h4>E2E Product Delivery</h4>
                                <p className="">From ideation to delivery, we ensure solutions par excellence.<br />Breaking
                                    it into research, design, build & test. </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-sm-20 wow fadeInRight" data-wow-delay=".6s">
                            <div className="de-step-s1 text-dark">
                                <div className="d-number wow rotateIn" data-wow-delay=".6s">3</div>
                                <h4>Future-Forward Solutions</h4>
                                <p className="">Products that are built to scale with faster time-to-market.<br />Acheived
                                    through indepth data analysis of your domain. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-dark-1 text-light">
                <div className="container">
                    <div className="row align-items-center gx-5">
                        <div className="col-lg-6 mb-sm-20 position-relative">
                            <div className="images-deco-1">
                                <img src="images/misc/Home_Img1.jpg" loading="lazy" className="d-img-1 wow zoomIn"
                                    data-wow-delay="0s" alt="Software development services" />
                                <img src="images/misc/Home_Img2.jpg" className="d-img-2 wow zoomIn" data-wow-delay=".5s"
                                    data-jarallax-element="100" alt="Ideas to grow your business" />
                                <div className="d-img-3 bg-color wow zoomIn" data-wow-delay=".6s"
                                    data-jarallax-element="-50"></div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="subtitle s2 wow fadeInUp mb-3">Faster, Smarter, Efficient</div>
                            <h2 className="wow fadeInUp" data-wow-delay=".2s">E2E solutions customized for your business
                            </h2>
                            <p className="wow fadeInUp">With more than IT at our core. We are your allies in mapping your
                                digital journey. Driven by the endless possibilities of future, we leverage technology
                                to help you navigate the dynamic IT domain and manage complexities. Our team of
                                professionals streamline your business by building solutions that are cost-effective and
                                disruptive. </p>
                            <hr className="s2" />
                            <div className="spacer-10"></div>
                            <a className="btn-line mb10" href="services.html" rel="noopener">Our Services</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-dark-2 text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-light">
                            <div className="subtitle s2 mb20">Tech Stack</div>
                            <h2 className="wow fadeInUp">Our Expertise</h2>
                            <div className="spacer-20"></div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" data-jarallax-element="-100">
                    <div className="row">
                        <div className="owl-carousel owl-theme wow fadeInUp" id="testimonial-carousel">
                            <div className="item">
                                <div className="de_testi s2">
                                    <blockquote className="no-padding">
                                        <div className="de_testi_by">
                                                {/* <h5 style={{color:'black'}}>FrontEnd</h5> */}
                                            <img alt="Artificial Integlligence tech stack" src="images/tech-stack/1_AI.webp" />
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                            <div className="item">
                                <div className="de_testi s2">
                                    <blockquote className="no-padding">
                                        <div className="de_testi_by">
                                                {/* <h5 style={{color:'black'}}>Backend</h5> */}
                                            <img alt="Frontend tech stack" src="images/tech-stack/2_FrontEnd.webp" />
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                            <div className="item">
                                <div className="de_testi s2">
                                    <blockquote className="no-padding">
                                        <div className="de_testi_by">
                                                {/* <h5 style={{color:"black"}}>Cloud</h5> */}
                                            
                                            <img alt="Backend tech stack" src="images/tech-stack/3_BackEnd.webp" />
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                            <div className="item">
                                <div className="de_testi s2">
                                    <blockquote className="no-padding">
                                        <div className="de_testi_by">
                                                {/* <h5 style={{color:'black'}}>AI Models</h5> */}
                                            <img alt="Cloud services tech stack" src="images/tech-stack/5_Cloud.webp" />
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                            <div className="item">
                                <div className="de_testi s2">
                                    <blockquote className="no-padding">
                                        <div className="de_testi_by">
                                                {/* <h5 style={{color:'black'}}>Web 3.0</h5> */}
                                            <img alt="Database we use" src="images/tech-stack/4_Databases.webp" />
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                            <div className="item">
                                <div className="de_testi s2">
                                    <blockquote className="no-padding">
                                        <div className="de_testi_by">
                                                {/* <h5 style={{color:'black'}}>Web 3.0</h5> */}
                                            <img alt="CMS Tech Stack" src="images/tech-stack/6_CMS.webp" />
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                            </div>
                            <div className="item">
                                <div className="de_testi s2">
                                    <blockquote>
                                        <div className="de_testi_by">
                                            <div>
                                                {/* <h5 style={{color:'black'}}>FrontEnd</h5> */}
                                            </div>
                                            <img alt="" src="images/tech-stack/1.JPG" />
                                        </div>
                                    </blockquote>
                                </div>
                            </div>
                    </div>
                </div>
            </section>
            
                <Footer />
            </div>

        </div>
    );
}

