import React from "react";
import '../css/custom.css';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const News = () => {
    const navigate = useNavigate();
    return (
       <div>
        <Header />
         <div className="no-bottom no-top">
      <div id="top"></div>
      {/* section begin */}
      <section id="subheader">
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-8 offset-lg-2">
              <div className="subtitle s2 wow fadeInUp mb-3">Reflect</div>
              <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">Tech News, industry insights, knowledge base & more...</h2>
              <ul className="crumb">
                <li><a href="/">Home</a></li>
                <li className="active">Reflect</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* section close */}

      <section className="no-top">
        <div className="container">
          <div className="row g-4">

            {/* Blog 1 */}
            <div className="col-lg-4 col-md-6 mb10">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <div className="d-tagline">
                      <span>announcement</span>
                    </div>
                    <a href="reflect/MetricTalks_4th_Webinar_invitation"><img alt="" src="images/news/metrictalks_webinar4.jpg" className="lazy" /></a>
                  </div>
                  <div className="post-text">
                    <div>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i> May 16, 2025 &emsp;
                        <i className="fa-solid fa-user"></i> Satish A G
                      </p>
                    </div>
                    <h4><a href="reflect/MetricTalks_4th_Webinar_invitation">Invitation for 4th Edition of MetricTalks - RSVP Now</a></h4>
                    <p>Mark your calendars because we bring to you the 4th edition of MetricTalks on The Yield Crisis: Can AI improve Soil Health Management for Farmers? on 24 May, 2025 at 4:00 P.M. IST</p>
                    <button className="cust-button" onClick={() => navigate('/reflect/MetricTalks_4th_Webinar_invitation')}>Read More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 2 */}
            <div className="col-lg-4 col-md-6 mb10">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <div className="d-tagline">
                      <span>tech</span><span>blog</span>
                    </div>
                    <a href="reflect/AI_revolutionize_agritech"><img alt="" src="images/news/ai-agritech0.jpg" className="lazy" /></a>
                  </div>
                  <div className="post-text">
                    <div>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i> May 12, 2025 &emsp;
                        <i className="fa-solid fa-user"></i> Anjali Burman
                      </p>
                    </div>
                    <h4><a href="reflect/AI_revolutionize_agritech">How Can AI enable AgriTech & Revolutionize Soil Health Management?</a></h4>
                    <p>The global population shows no sign of stopping or slowing down and this intensifies the pressure on farmers to produce more crops and level up</p>
                    <button className="cust-button" onClick={() => window.location.href='reflect/AI_revolutionize_agritech'}>Read More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 3 */}
            <div className="col-lg-4 col-md-6 mb10">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <div className="d-tagline">
                      <span>announcement</span>
                    </div>
                    <a href="reflect/MetricTalks_3rd_Webinar"><img alt="" src="images/news/metrictalks_workshop3.jpg" className="lazy" /></a>
                  </div>
                  <div className="post-text">
                    <div>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i> Mar 15, 2025 &emsp;
                        <i className="fa-solid fa-user"></i> Satish A G
                      </p>
                    </div>
                    <h4><a href="reflect/MetricTalks_3rd_Webinar">Watch 3rd Edition of MetricTalks</a></h4>
                    <p>MetricDust hosted the third edition of MetricTalks on Local AI Assistants: A workshop on Integrating multi AI Locally. It was succesfully concluded on 8th March, 2025. In case you missed it, you can watch it now</p>
                    <button className="cust-button" onClick={() => window.location.href='reflect/MetricTalks_3rd_Webinar'}>Read More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 4 */}
            <div className="col-lg-4 col-md-6 mb10">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <div className="d-tagline">
                      <span>announcement</span>
                    </div>
                    <a href="reflect/MetricTalks_3rd_Webinar_Invitation"><img alt="" src="images/news/metrictalks_webinar3.jpg" className="lazy" /></a>
                  </div>
                  <div className="post-text">
                    <div>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i> Feb 25, 2025 &emsp;
                        <i className="fa-solid fa-user"></i> Satish A G
                      </p>
                    </div>
                    <h4><a href="reflect/MetricTalks_3rd_Webinar_Invitation">Invitation for 3rd Edition of MetricTalks - RSVP Now</a></h4>
                    <p>Mark your calendars because we bring to you the 3rd edition of MetricTalks on Local AI Assistants: Integrating Multi-AI Locally on 8 March, 2025 at 10:00 A.M. IST/ 8:30 PST</p>
                    <button className="cust-button" onClick={() => window.location.href='reflect/MetricTalks_3rd_Webinar_Invitation'}>Read More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 5 */}
            <div className="col-lg-4 col-md-6 mb10">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <div className="d-tagline">
                      <span>tech</span><span>blog</span>
                    </div>
                    <a href="reflect/microfrontend_perfect_for_saas"><img alt="" src="images/news/microFrontend_1.JPG" className="lazy" /></a>
                  </div>
                  <div className="post-text">
                    <div>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i> Nov 12, 2024 &emsp;
                        <i className="fa-solid fa-user"></i> Vivek V Pai
                      </p>
                    </div>
                    <h4><a href="reflect/microfrontend_perfect_for_saas">Micro Frontends: The Perfect Solution for Building SaaS Platforms</a></h4>
                    <p>Micro Frontend architecture offers a modern solution to these challenges by adopting a 'divide and develop' approach which is perfect for SaaS platforms development</p>
                    <button className="cust-button" onClick={() => window.location.href='reflect/microfrontend_perfect_for_saas'}>Read More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 6 */}
            <div className="col-lg-4 col-md-6 mb10">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <div className="d-tagline">
                      <span>tech</span><span>blog</span>
                    </div>
                    <a href="reflect/AI_ML_Deepfake_attacks"><img alt="" src="images/news/aiml_deefake_attacks.jpg" className="lazy" /></a>
                  </div>
                  <div className="post-text">
                    <div>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i> Oct 22, 2024 &emsp;
                        <i className="fa-solid fa-user"></i> Anjali Kumari
                      </p>
                    </div>
                    <h4><a href="reflect/AI_ML_Deepfake_attacks">Role of AIML in Deepfake Attacks</a></h4>
                    <p>With the growth and development of AI, this article aims to delve deeper into the role of AI/ML in these cybercrimes and how can we amalgamate AI/ML with cybersecurity to counter & minimize falling prey to it.</p>
                    <button className="cust-button" onClick={() => window.location.href='reflect/AI_ML_Deepfake_attacks'}>Read More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 7 */}
            <div className="col-lg-4 col-md-6 mb10">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <div className="d-tagline">
                      <span>announcement</span>
                    </div>
                    <a href="reflect/Metrictalks_2nd_webinar"><img alt="" src="images/news/metrictalks_webinar2.jpg" className="lazy" /></a>
                  </div>
                  <div className="post-text">
                    <div>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i> Sep 30, 2024 &emsp;
                        <i className="fa-solid fa-user"></i> Satish A G
                      </p>
                    </div>
                    <h4><a href="reflect/Metrictalks_2nd_webinar">Watch 2nd Edition of MetricTalks</a></h4>
                    <p>MetricDust held the second edition of its talk series, Metric Talks, on September 21st, 2024, and the focus was AI-powered automation and how businesses can leverage AI to streamline customer-centric activities.</p>
                    <button className="cust-button" onClick={() => window.location.href='reflect/Metrictalks_2nd_webinar'}>Read More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 8 */}
            <div className="col-lg-4 col-md-6 mb10">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <div className="d-tagline">
                      <span>announcement</span>
                    </div>
                    <a href="reflect/Sampada_magazine_feture"><img alt="" src="images/news/sampada_magazine_feature.jpg" className="lazy" /></a>
                  </div>
                  <div className="post-text">
                    <div>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i> Aug 20, 2024 &emsp;
                        <i className="fa-solid fa-user"></i> Anjali Kumari
                      </p>
                    </div>
                    <h4><a href="reflect/Sampada_magazine_feture">Featured in Sampada Magazine</a></h4>
                    <p>Sampada is an online UVCE alumni magazine published monthly. University Visvesvaraya College of Engineering is a 107+ years old college,the first Engineering college established in Karnataka</p>
                    <button className="cust-button" onClick={() => window.location.href='reflect/Sampada_magazine_feture'}>Read More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 9 */}
            <div className="col-lg-4 col-md-6 mb10">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <div className="d-tagline">
                      <span>tech</span> <span>blog</span>
                    </div>
                    <a href="reflect/rise_quantam_computing"><img alt="" src="images/news/quantum_computing0.jpg" className="lazy" /></a>
                  </div>
                  <div className="post-text">
                    <div>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i> July 28, 2024 &emsp;
                        <i className="fa-solid fa-user"></i> Anjali Kumari
                      </p>
                    </div>
                    <h4><a href="reflect/rise_quantam_computing">Rise of Quantum Computing and its use cases</a></h4>
                    <p>Quantum Computing has been around since the early 1980s. It has been up for debate ever since Richard Feynman initially coined the term and proposed a possible way</p>
                    <button className="cust-button" onClick={() => window.location.href='reflect/rise_quantam_computing'}>Read More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 10 */}
            <div className="col-lg-4 col-md-6 mb10">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <div className="d-tagline">
                      <span>announcement</span>
                    </div>
                    <a href="reflect/metrictalks_1st_webinar"><img alt="" src="images/news/reflect_metricTalks_2.jpg" className="lazy" /></a>
                  </div>
                  <div className="post-text">
                    <div>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i> July 15, 2024 &emsp;
                        <i className="fa-solid fa-user"></i> Satish A G
                      </p>
                    </div>
                    <h4><a href="reflect/metrictalks_1st_webinar">Watch 1st Edition of MetricTalks</a></h4>
                    <p>The first edition of MetricTalks by MetricDust successfully concluded on 6th July, 2024. With more than 50-60 participants listening to our esteemed speakers sharing their views and experiences on the AI impact</p>
                    <button className="cust-button" onClick={() => window.location.href='reflect/metrictalks_1st_webinar'}>Read More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 11 */}
            <div className="col-lg-4 col-md-6 mb10">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <div className="d-tagline">
                      <span>announcement</span>
                    </div>
                    <a href="reflect/metrictalks_1st_webinar_invite"><img alt="" src="images/news/reflect_metricTalks_1.jpg" className="lazy" /></a>
                  </div>
                  <div className="post-text">
                    <div>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i> July 4, 2024 &emsp;
                        <i className="fa-solid fa-user"></i> Bhagyalakshmi G
                      </p>
                    </div>
                    <h4><a href="reflect/metrictalks_1st_webinar_invite">MetricTalks | Webinar on AI & Ethics: The Impact of GenAI across domains</a></h4>
                    <p>The first edition of MetricTalks is here! We're organizing a special live webinar on GenAI & its impact across various domains, with some amazing speakers on 6th July, 2024</p>
                    <button className="cust-button" onClick={() => window.location.href='reflect/metrictalks_1st_webinar_invite'}>Read More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog 12 */}
            <div className="col-lg-4 col-md-6 mb10">
              <div className="bloglist item">
                <div className="post-content">
                  <div className="post-image">
                    <div className="d-tagline">
                      <span>tech</span>
                      <span>blog</span>
                    </div>
                    <a href="reflect/ai-automation"><img alt="" src="images/news/aiAuto-thumb2.png" className="lazy" /></a>
                  </div>
                  <div className="post-text">
                    <div>
                      <p>
                        <i className="fa-solid fa-calendar-days"></i> June 12, 2024 &emsp;
                        <i className="fa-solid fa-user"></i> Anjali Kumari
                      </p>
                    </div>
                    <h4><a href="reflect/ai-automation">What is AI-powered Automation? Its Implementation and Benefits</a></h4>
                    <p>Impact of AI-powered automation on businesses and industries. Know how artificial intelligence is revolutionizing processes, improving efficiency, and driving innovation in the modern world.</p>
                    <button className="cust-button" onClick={() => window.location.href='reflect/ai-automation'}>Read More</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
       </div>
    )
}

export default News;