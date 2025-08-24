import React,{useEffect} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./HeroSlider.css";
import AnimatedButton  from './ui/SineWaveDivider'
import SineWaves from "./ui/SineWaveDivider";
import SineWaveDivider from "./ui/SineWaveDivider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

export default function HeroSlider() {
  
  return (
    <section className="text-light no-top no-bottom position-relative z-1000">
      <div className="v-center">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, Autoplay]}
          pagination={{ clickable: true }}
          navigation
          scrollbar={{ draggable: true }}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="mySwiper"
        >
          {/* Slide 1 */}
          {/* <SwiperSlide>
  <div
    className="swiper-inner"
    style={{
      backgroundImage: `url('/images/slider/NSlider1.webp')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="sw-caption">
      <div className="container">
        <div className="row gx-5 align-items-center">
          <div className="col-lg-12">
            <div className="subtitle s2 mb-4">Trusted IT Solutions</div>
          </div>
          <div className="col-lg-8 mb-sm-30">
            <h1 className="slider-title">
              Simplify.<br />Solve.<br />Succeed.
            </h1>
          </div>
          <div className="col-lg-4">
            <p className="slider-teaser">
              We promise to forge unparalleled digital solutions for you that are scalable.
            </p>
            <hr className="s2" />
            <div className="spacer-10"></div>
            <a className="btn-main mb10" href="/contact" rel="noopener">
              Free Consultation
            </a>
            <a className="btn-main mb10 ml10" target="_blank" href="interview/definedUser" rel="noopener">
              Talk to AI <FontAwesomeIcon icon={faMicrophone} className="ml-2" />
            </a>
            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
  <div style={{ width: "250px" }}>
    <SineWaveDivider height={80} background="transparent" speed={0.7} />
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
    <div className="sw-overlay s2"></div>
  </div>
</SwiperSlide> */}

          {/* Slide 2 */}
          <SwiperSlide>
            <div
              className="swiper-inner"
              style={{
                backgroundImage: `url('/images/slider/NSlider2.webp')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="sw-caption">
                <div className="container">
                  <div className="row gx-5 align-items-center">
                    <div className="col-lg-12">
                      <div className="subtitle s2 mb-4">Trusted IT Solutions</div>
                    </div>
                    <div className="col-lg-8 mb-sm-30">
                      <h1 className="slider-title">Transform your digital <br /> experience with <br /> future-enabled <br /> technology</h1>
                    </div>
                    <div className="col-lg-4">
                      <div className="slider-teaser">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="de_count">
                              <h3><span>15</span>+</h3>
                              <h5>Projects Completed</h5>
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="de_count">
                              <h3><span>99</span>%</h3>
                              <h5>Customer Satisfaction</h5>
                            </div>
                          </div>
                        </div>
                        <hr className="s2" />
                        <div className="spacer-10"></div>
                        <a className="btn-main" href="/contact">
                          Free Consultation
                        </a>
                        <a className="btn-main mb10 ml10" target="_blank" href="interview/definedUser" rel="noopener">
                          Talk to AI <FontAwesomeIcon icon={faMicrophone} className="ml-2" />
                        </a>
                       
    <SineWaveDivider height={80} background="transparent" speed={0.7} />
  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sw-overlay s2"></div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
