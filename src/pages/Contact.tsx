import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const Contact = () => {
    return (
        <div>
            <Header />
             <div className="no-bottom no-top" id="content">
      <div id="top"></div>
      {/* section begin */}
      <section id="subheader" className="jarallax text-light">
        <img src="images/background/5.webp" className="jarallax-img" alt="" />
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 text-center">
              <div className="subtitle s2 wow fadeInUp mb-3">Contact</div>
              <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">We're here to help you</h2>
              <ul className="crumb">
                <li><a href="index.html">Home</a></li>
                <li className="active">Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* section close */}

      <section className="no-top no-bottom text-light">
        <div className="container-fluid">
          <div className="row g-0">
            <div className="col-lg-4 col-md-6">
              <div className="de-icon-text bg-dark-1 p-4">
                <img src="images/svg/phone-svgrepo-com-white.svg" className="" alt="" />
                <div className="d-text">
                  <h4>Phone</h4>
                  +1 425-900-9663
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="de-icon-text bg-dark-2 p-4">
                <img src="images/svg/email-address-svgrepo-com-white.svg" className="" alt="" />
                <div className="d-text">
                  <h4>Email</h4>
                  lohith@metricdust.com
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="de-icon-text bg-dark-3 p-4">
                <img src="images/svg/map-pin-svgrepo-com-white.svg" className="" alt="" />
                <div className="d-text">
                  <h4>Address</h4>
                  2519 Baker Ave. Unit 3 Everett, WA 98201
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <form name="contactForm" id="contact_form" className="position-relative z1000" method="POST" >
                <div className="row gx-4">
                  <div className="col-lg-6 col-md-6 mb10">
                    <div className="field-set">
                      <span className="d-label">Name</span>
                      <input type="text" name="Name" id="name" className="form-control" placeholder="Your Name" required />
                    </div>

                    <div className="field-set">
                      <span className="d-label">Email</span>
                      <input type="text" name="Email" id="email" className="form-control" placeholder="Your Email" required />
                    </div>

                    <div className="field-set">
                      <span className="d-label">Phone</span>
                      <input type="text" name="phone" id="phone" className="form-control" placeholder="Your Phone" required />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="field-set mb20">
                      <span className="d-label">Message</span>
                      <textarea name="message" id="message" className="form-control" placeholder="Your Message" required></textarea>
                    </div>
                  </div>
                </div>

                {/* <div className="g-recaptcha" data-sitekey="copy-your-site-key-here"></div> */}
                <div id="submit" className="mt20">
                  <input type="submit" id="send_message" value="Send Message" className="btn-main" />
                </div>
              </form>
              <div className="col-message" id="response"></div>
              <div className="col-error" id="errorResponse"></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
        </div>
    )
}

export default Contact;