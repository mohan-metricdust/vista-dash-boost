import React from 'react';
import MDlogovideo from '/MicrosoftTeams-video.mp4';
import { useNavigate } from 'react-router-dom';
import BlockChain from '../../public/images/icons/blockchain.png';
import Framework from '../../public/images/icons/framework.png';
import Microchip from '../../public/images/icons/microchip.png';
import Settings from '../../public/images/icons/settings.png';
import Technology from '../../public/images/icons/technology.png';



const AIPoweredServices = () => {
  const navigate = useNavigate();

  return (
      <div className="">
        <div className="d-flex align-items-start">
          
          {/* Left Fixed MD Video */}
          <div className="col-12 col-lg-6 position-sticky" style={{ top: '50px' }}>
            <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" className="w-80 h-80">
              <defs>
                <mask id="md-mask">
                  <rect width="80%" height="80%" fill="black" />
                  <text
                    x="35%"
                    y="70%"
                    textAnchor="middle"
                    fill="white"
                    fontSize="600"
                    fontFamily="Arial Black"
                    fontWeight="900"
                  >
                    M
                  </text>
                  <text
                    x="65%"
                    y="70%"
                    textAnchor="middle"
                    fill="white"
                    fontSize="600"
                    fontFamily="Arial Black"
                    fontWeight="900"
                  >
                    D
                  </text>
                </mask>
              </defs>
              <foreignObject width="100%" height="100%" mask="url(#md-mask)">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-100 h-100 object-fit-cover"
                >
                  <source src={MDlogovideo} type="video/mp4" />
                </video>
              </foreignObject>
            </svg>
          </div>

          {/* Right Side Content */}
          <div className="col-12 col-lg-6 d-flex flex-column justify-content-center mt-3 mt-sm-4 px-3 px-sm-4 gap-3">
            <h1
  className="gap-5 fs-lg-1 fw-semibold lh-sm text-dark"
  style={{ wordSpacing: "10px" }}
>
  Build products mounted on our <br /> AI-first approach for a future ready <br /> solution that's ready to scale
</h1>

            {/* Services Grid */}
            <div className="row text-dark fw-light">
              {[
                { icon: Technology, label: "Tech Development" },
                { icon: Framework, label: "Product Design" },
                { icon: Microchip, label: "AI Solutions" },
                { icon: Settings, label: "Growth Marketing" },
                { icon: BlockChain, label: "Digital Transformation" },
              ].map(({ icon, label }) => (
                <div key={label} className="col-12 col-sm-6 d-flex align-items-center mb-3">
                  <img src={icon} alt={label} className="me-2" style={{ width: '24px', height: '24px' }} />
                  <span className="fs-4 fs-lg-5 text-dark">{label}</span>
                </div>
              ))}
            </div>

            {/* Button */}
            {/* <button
              className="btn btn-link text-center text-decoration-underline p-0 text-dark fw-medium"
              onClick={() => navigate('/services')}
            >
              View all services →
            </button> */}
          </div>

        </div>
      </div>
  );
};

export default AIPoweredServices;
