import React from "react";

const Demo = () => {
    return (
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
    )
}

export default Demo;