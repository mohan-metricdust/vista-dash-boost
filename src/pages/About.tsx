import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const About = () => {
    return (
        <div>
            <Header /> 
            <div className="no-bottom no-top">
      <div id="top"></div>

      <section id="subheader" className="text-light jarallax">
        <img src="images/background/4.webp" className="jarallax-img" alt="" />
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-8 offset-lg-2">
              <div className="subtitle s2 wow fadeInUp mb-3">About Us</div>
              <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">Tailored software solutions. Amplifying digital experiences.</h2>
              <ul className="crumb">
                <li><a href="index.html">Home</a></li>
                <li className="active">About Us</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="padding60 sm-padding40 rounded-30 jarallax text-light">
                <img src="images/background/2.webp" className="jarallax-img" alt="" style={{ filter: "brightness(60%)" }} />
                <div className="row">
                  <div className="col-lg-12">
                    <div className="subtitle s2 wow fadeInUp mb-3">Our Vision</div>
                    <h2 className="mb20 wow fadeInUp" data-wow-delay=".2s">With a customer-centric approach, we transform and amplify your digital presence. Our products help you enhance ease of accessibility and streamline your operations. Our multi-domain expertise and purpose-driven technology drives your business growth.</h2>
                    <a className="btn-main" href="#" rel="noopener noreferrer">Let's Connect</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="site-timeline-content">
                {/* Article */}
                <div className="de-timeline-article odd">
                  <div className="site-center-line"></div>
                  <div className="content-left-container">
                    <div className="owl-single-dots owl-carousel owl-theme">
                      <div className="item"><img src="images/timeline/About_Img1.jpg" alt="Start of Startup" /></div>
                    </div>
                  </div>
                  <div className="content-right-container">
                    <div className="year__">
                      <div className="d-line"></div>
                      <h4 className="de-timeline-year">2020</h4>
                    </div>
                    <div className="content-right">
                      <h3 className="de-timeline-title">Company Inception</h3>
                      <p>In the year 2020, a group of like-minded tech enthusiasts founded MetricDust. With a shared passion for technology, we embarked on a journey to establish a firm that would provide innovative solutions to the ever-evolving world of information technology.</p>
                    </div>
                  </div>
                  <div className="meta-dot"></div>
                </div>
                {/* // Article */}
                {/* Article */}
                <div className="de-timeline-article even">
                  <div className="site-center-line"></div>
                  <div className="content-left-container">
                    <div className="year__">
                      <div className="d-line"></div>
                      <h4 className="de-timeline-year">2022</h4>
                    </div>
                    <div className="content-right">
                      <h3 className="de-timeline-title">InHouse Product Development</h3>
                      <p>The services provided to various clients were being widely appreciated. Simultaneously, we decided to launch a proprietary software product that would compete with the big tech company offerings in the real estate market.</p>
                    </div>
                  </div>
                  <div className="content-right-container">
                    <div className="owl-single-dots owl-carousel owl-theme">
                      <div className="item"><img src="images/timeline/About_Img2.jpg" alt="Product Launch" /></div>
                    </div>
                  </div>
                  <div className="meta-dot"></div>
                </div>
                {/* // Article */}
                {/* Article */}
                <div className="de-timeline-article odd">
                  <div className="site-center-line"></div>
                  <div className="content-left-container">
                    <div className="owl-single-dots owl-carousel owl-theme">
                      <div className="item"><img src="images/timeline/About_Img3.jpg" alt="Team Expansion" /></div>
                    </div>
                  </div>
                  <div className="content-right-container">
                    <div className="year__">
                      <div className="d-line"></div>
                      <h4 className="de-timeline-year">2023</h4>
                    </div>
                    <div className="content-right">
                      <h3 className="de-timeline-title">Team Expansion</h3>
                      <p>In 2023, we celebrated our 3rd year in the industry. The expansion of the company was necessary to accommodate the project requirements. We are now joined by 10 of our ever-growing roster of talented professionals.</p>
                    </div>
                  </div>
                  <div className="meta-dot"></div>
                </div>
                {/* // Article */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark-1 text-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="subtitle s2 wow fadeInUp mb-3">Who are we</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Our Team</h2>
            </div>
          </div>
          <div className="row" style={{ textAlign: "center" }}>
            <div className="col-lg-3 col-md-6 text-center mb-sm-20">
              <div className="bg-dark-3 rounded-30 mb20">
                <img src="images/team/Lohith.png" className="img-fluid" alt="" />
              </div>
              <h4 className="mb-0">Lohith Ravi</h4>
              <div>Seattle, USA</div>
              <div className="social-icons s2 mt-2" style={{ display: "block !important" }}>
                <p style={{ textAlign: "center" }}><a href="https://www.linkedin.com/in/lookforlohith/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a></p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 text-center mb-sm-20">
              <div className="bg-dark-3 rounded-30 mb20">
                <img src="images/team/Satish.png" className="img-fluid" alt="" />
              </div>
              <h4 className="mb-0">Satish A G</h4>
              <div>Bengaluru, India</div>
              <div className="social-icons s2 mt-2" style={{ display: "block !important" }}>
                <p style={{ textAlign: "center" }}><a href="https://www.linkedin.com/in/satish-ag/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a></p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 text-center mb-sm-20">
              <div className="bg-dark-3 rounded-30 mb20">
                <img src="images/team/Lakshmi.png" className="img-fluid" alt="" />
              </div>
              <h4 className="mb-0">Lakshmi</h4>
              <div>United Kingdom</div>
              <div className="social-icons s2 mt-2" style={{ display: "block !important" }}>
                <p style={{ textAlign: "center" }}><a href="https://www.linkedin.com/in/lakshmi-gb-0877a8161/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a></p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 text-center mb-sm-20">
              <div className="bg-dark-3 rounded-30 mb20">
                <img src="images/team/Bhargav.png" className="img-fluid" alt="" />
              </div>
              <h4 className="mb-0">Bhargav</h4>
              <div>Seattle, USA</div>
              <div className="social-icons s2 mt-2" style={{ display: "block !important" }}></div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row align-items-center gx-5">
            <div className="col-lg-6 mb-sm-20 position-relative">
              <div className="images-deco-1">
                <img src="images/misc/1.webp" className="d-img-1 wow zoomIn" data-wow-delay="0s" alt="" />
                <div className="d-img-3 bg-color wow zoomIn" data-wow-delay=".6s" data-jarallax-element="-50"></div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="subtitle s2 wow fadeInUp mb-3">Customer Centric Solutions</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">Your Dream Team of Passionate Innovators</h2>
              <p className="wow fadeInUp">Building a product transcends technology. It is a commitment to deliver great experiences by comprehending user pain points. Drive your business growth with industry best practices & future-enabled technology. We ideate solutions, best suited to your business need.The importance of your digital transformation is reflected in our promise to deliver solutions through a user-friendly approach. Partner with us to make it a reality.</p>
              <div className="spacer-10"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
        </div>
    )
}

export default About;