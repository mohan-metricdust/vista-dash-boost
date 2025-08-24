import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const Services = () => {
    return(
    <div>
        <Header />
        <div className="no-bottom no-top" >
      <div id="top"></div>
      {/* section begin */}
      <section id="subheader" className="text-light jarallax">
        <img src="images/background/3.webp" className="jarallax-img" alt="" />
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-8 offset-lg-2">
              <div className="subtitle s2 wow fadeInUp mb-3">Our services</div>
              <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">What can MetricDust do for you?</h2>
              <ul className="crumb">
                <li><a href="index.html">Home</a></li>
                <li className="active">Services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* section close */}

      <section>
        <div className="container">
          <div className="row g-4 mt-100 mb-40 sm-mt-0 z-1000">
            <div className="spacer-single d-lg-none d-sm-block"></div>
            <div className="col-lg-3 col-md-6">
              <div>
                <img src="images/services/WebDev.jpg" className="img-fullwidth rounded-20 mb20" alt="" />
                <h4>Web Development</h4>
                <hr className="s2" />
                <p>- Cost effective web solutions<br />
                  - to discover new revenue streams & <br />
                  - Streamline user accessibility .
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div>
                <img src="images/services/MobileDesign.jpg" className="img-fullwidth rounded-20 mb20" alt="" />
                <h4>Mobile App Development</h4>
                <hr className="s2" />
                <p>- Customer-friendly applications<br />
                  - Designed for flexibility & <br />
                  - seamless user experience.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div>
                <img src="images/services/AI.jpg" className="img-fullwidth rounded-20 mb20" alt="" />
                <h4>Data & AI</h4>
                <hr className="s2" />
                <p>- Data-driven actioable insights <br />
                  - Improved decision making <br />
                  - Save time & boost productivity
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div>
                <img src="images/services/CloudInfra.jpg" className="img-fullwidth rounded-20 mb20" alt="" />
                <h4>Cloud Infrastructure</h4>
                <hr className="s2" />
                <p>- Adopt cloud-native technologies<br />
                  - Improve acessibility <br />
                  - Increase scalability </p>
              </div>
            </div>
          </div>
          <div className="row g-4 sm-mt-0 z-1000">
            <div className="spacer-single d-lg-none d-sm-block"></div>
            <div className="col-lg-3 col-md-6">
              <div>
                <img src="images/services/QuantumComputing.jpg" className="img-fullwidth rounded-20 mb20" alt="" />
                <h4>Quantum Computing</h4>
                <hr className="s2" />
                <p>- Future-proof your business <br />
                  - Process complex data rapidly <br />
                  - Optimize operations & innovation</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div>
                <img src="images/services/MachineLearning.jpg" className="img-fullwidth rounded-20 mb20" alt="" />
                <h4>ML Solutions</h4>
                <hr className="s2" />
                <p>- Cut down manual inefficiencies <br />
                  - Streamline & automate tasks. <br />
                  - Hyper-personalize customer experience.</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div>
                <img src="images/services/BlockChain.jpg" className="img-fullwidth rounded-20 mb20" alt="" />
                <h4>Blockchain Development</h4>
                <hr className="s2" />
                <p>- Ensure operational transparency <br />
                  - Reinforce data security <br />
                  - Gain real-time visibility </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div>
                <img src="images/services/Cybersecurity.jpg" className="img-fullwidth rounded-20 mb20" alt="" />
                <h4>CyberSecurity</h4>
                <hr className="s2" />
                <p>- Immunity against data thefts<br />
                  - Minimize financial losses <br />
                  - Drive brand integrity & cutomer retention
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <h2 style={{textAlign: "center"}}>Domain Expertise</h2>
      <section className="pt60 pb60">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-12">
              <div id="owl-logo" className="logo-carousel no-alpha owl-carousel owl-theme">
                <img src="images/services/1.jpg" className="img-fluid" alt="" />
                <img src="images/services/2.jpg" className="img-fluid" alt="" />
                <img src="images/services/3.jpg" className="img-fluid" alt="" />
                <img src="images/services/4.jpg" className="img-fluid" alt="" />
                <img src="images/services/5.jpg" className="img-fluid" alt="" />
                <img src="images/services/6.jpg" className="img-fluid" alt="" />
                <img src="images/services/7.jpg" className="img-fluid" alt="" />
                <img src="images/services/8.png" className="img-fluid" alt="" />
                <img src="images/services/9.png" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <h2 style={{textAlign: "center"}}>Our Products</h2>
      <section className="bg-dark-2 text-light">
        <div className="container">
          <div className="row align-items-center gx-5">
            <div className="col-lg-6 mb-sm-20 position-relative">
              <div className="images-deco-1">
                <img src="images/services/MR_New1.jpg" className="d-img-1 wow zoomIn" data-wow-delay="0s" alt="" />
                <img src="images/misc/MetricRealties_Logo.jpg" className="d-img-2 wow zoomIn" data-wow-delay=".5s" data-jarallax-element="100" alt="" />
                <div className="d-img-3 bg-color wow zoomIn" data-wow-delay=".6s" data-jarallax-element="-50"></div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="subtitle s2 wow fadeInUp mb-3">PropTech SaaS Platform</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">MetricRealties</h2>
              <p className="wow fadeInUp">MetricRealties is flexible, scalable and affordable web / mobile solution for Real Estate agents to grow their business. It includes custom branded website, User & Agent Dashboards, CRM & Ticketing platform along with Pipeline Management system.<br /> It includes an exclsuvie mobile app everything that can be launched in a single click.</p>
              <hr className="s2" />
              <div className="spacer-10"></div>
              <a className="btn-line mb10" href="https://metricrealties.com/" target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
          </div>
          <div className="row align-items-center gx-5 mt100">
            <div className="col-lg-6">
              <div className="subtitle s2 wow fadeInUp mb-3">Cloud Based HRMS</div>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">IntraCrew</h2>
              <p className="wow fadeInUp">Intra Crew is an employee directory software that allows people in your organization to find each other or connect them with people and information that empowers their work.<br />We provide powerful search options and a detailed org chart for better understanding of the organization and employee empowerment.</p>
              <hr className="s2" />
              <div className="spacer-10"></div>
              <a className="btn-line mb10" href="https://intracrew.com/" target="_blank" rel="noopener noreferrer">Visit Website</a>
            </div>
            <div className="col-lg-6 mb-sm-20 position-relative">
              <div className="images-deco-1">
                <img src="images/services/IC_New1.jpg" className="d-img-1 wow zoomIn" data-wow-delay="0s" alt="" />
                <img src="images/misc/IntraCrew_Logo.jpg" className="d-img-2 wow zoomIn" data-wow-delay=".5s" data-jarallax-element="100" alt="" />
                <div className="d-img-3 bg-color wow zoomIn" data-wow-delay=".6s" data-jarallax-element="-50"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
    </div>
    )
};

export default Services;