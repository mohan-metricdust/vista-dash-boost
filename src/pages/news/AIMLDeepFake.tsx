import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const AIMLDeepFake = () => {
    return (
        <div id="wrapper">
            <Header />
            <div className="no-bottom no-top" id="content">
            <div id="top"></div>

            <section className="mt60">
                <div className="container">
                    <div className="row gx-5 align-items-center">
                        <div className="col-lg-6">
                            <div className="subtitle s2 wow fadeInUp mb-3">Latest News</div>
                            <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">Role of AIML in Deepfake Attacks</h2>
                            <ul className="crumb">
                                <li><a href="../index.html">Home</a></li>
                                <li className="active">Reflect</li>
                            </ul>
                            <div className="spacer-single"></div>
                        </div>

                        <div className="col-lg-6">
                            <img src="../images/news/aiml_deefake_attacks.jpg" className="img-fluid rounded-30" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="no-top">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-8">
                            <div className="blog-read">
                                <div className="post-text">
                                    <h3>Introduction</h3>
                                    <p>According to reports by BBC several calls made to New Hampshire voters, claiming
                                        to be President Joe Biden, urged them not to vote in the primary election. This
                                        is the kind of impact deepfakes have on collective social engineering and is
                                        pervasive. Deepfake attacks driven by AI supercharge cybercrimes that directly
                                        impact the spread misinformation on internet but also impact the security, and
                                        integrity of organizations, governments and the cultural fabric of society at a
                                        macro-level. </p>
                                    <p>“Deepfake, a portmanteau of “deep learning” and “fake,” refers to media that has
                                        been digitally altered to replace a person’s face or body with that of another.”
                                        <a href="https://builtin.com/machine-learning/deepfake#:~:text=Deepfake,%20a%20portmanteau%20of%20%E2%80%9Cdeep%20learning%E2%80%9D%20and%20%E2%80%9Cfake,%E2%80%9D"
                                            target="_blank">(Builtin)</a>
                                    </p>
                                    <p>While the growth and development of AI is infamously associated in tandem with
                                        the rise of deepfake attacks on the internet, deepfakes could also be a direct
                                        evolution of photoshops and morphing images in the early 2000s. This article
                                        aims to delve deeper into the role of AI/ML in these cybercrimes
                                        and how can we amalgamate AI/ML with cybersecurity to counter & minimize falling
                                        prey to it.</p>
                                    <img src="../images/news/aiml_deepfake1.webp" className="img-fluid rounded-30 " />
                                    <h3>Instances of Deepfake attacks</h3>
                                    <p>The Observer in its report says PwC has warned in its report that “undetected
                                        deepfakes can lead to severe consequences, including financial losses, job
                                        terminations, identity theft” etc. Some instances of these deepfake attacks as
                                        <a href="https://www.bbc.com/news/topics/crm5plqk980t" target="_blank">reported
                                            by BBC</a> are:
                                    </p>
                                    <ul>
                                        <li>“Senior British politicians have been subject to audio deepfakes as have
                                            politicians in other nations including Slovakia and Argentina.” </li>
                                        <li>“Sigurdur Arnason runs a music creation platform in Iceland. Before
                                            Christmas he was asked by the Icelandic National Broadcasting Service to
                                            create a video music skit using a deepfake of a beloved dead Icelandic
                                            comedian called Hemmi Gunn for a show that aired on New Year's Eve.”</li>
                                        <li>“A Maryland high school teacher at Baltimore had been arrested for allegedly
                                            using AI to deepfake a bogus recording of his principal making racist
                                            comments.”</li>
                                    </ul>
                                    <h3>Role of AI/ML in Deepfake attacks</h3>
                                    <p>TechTarget states “According to the U.S Department of Homeland Security's
                                        "Increasing Threat of Deepfake Identities" report, several AI tools are commonly
                                        used to generate deepfakes in a matter of seconds. Those tools include Deep Art
                                        Effects, Deepswap, Deep Video Portraits, FaceApp, etc...”</p>
                                    <p>AI/ML play a potent role in enabling deepfake attacks at the foundational level.
                                        It is only after the advent of AI and the development of Machine Learning
                                        technologies in tandem, that have spiked the cases of deepfake attacks in the
                                        last year or so. The specific aspects of these technologies that are used by
                                        attackers: </p>
                                    <ol>
                                        <li><b>Generative Adversarial Networks (GANs)</b>: It consists of two neural
                                            networks: a. A generator that creates synthetic media b. a discriminator
                                            that evaluates their authenticity, they work together to produce convincing
                                            deepfakes that continuously improve because the generator keeps getting
                                            better.</li>
                                        <li><b>Deep Learning Techniques</b>: A subset of ML, deep learning models
                                            analyze volumes of data to learn and replicate complex patterns. Especially
                                            in video, image, and audio manipulation, enable AI to replicate a person’s
                                            facial expressions, movements, etc. <br />Autoencoders and Variational
                                            Autoencoders (VAEs) are another type of deep learning that compress and
                                            reconstruct data are used in deepfakes to map an individual’s expressions on
                                            the other enabling seamless expression manipulation in videos.</li>
                                        <li><b>Data Augmentation and Synthetic Data</b>: By artificially expanding and
                                            diversifying training datasets through techniques like rotation and scaling,
                                            AI models learn to generate more robust and varied deepfakes. This is aided
                                            by synthetic data generation also aids in creating realistic fake content
                                            even with limited real data.</li>
                                    </ol>
                                    <p>All these technologies are automated and are streamlined to create deepfakes on a
                                        large scale, allowing even non-experts to create and distribute them. </p>
                                    <img src="../images/news/aiml_deepfake2.png" className="img-fluid rounded-30 " />
                                    <h3>Types of AI/ ML driven attacks</h3>
                                    <ol>
                                        <li><b>AI-driven social engineering</b>: CrowdStrike mentions these
                                            social-engineering attacks to pose the most threats to cybersecurity:
                                            <ul>
                                                <li>Identify an ideal target, including both the overall corporate
                                                    target and a person within the organization who can serve as a
                                                    gateway to the IT environment.</li>
                                                <li>Develop a realistic and plausible scenario that would generate
                                                    attention </li>
                                                <li>Multimedia assets, such as audio recordings or video footage, to
                                                    engage the target.</li>
                                            </ul>
                                        </li>
                                        <li><b>Adversarial AI/ML</b>: The most common adversarial AI/ML techniques used
                                            by attackers are:
                                            <ul>
                                                <li>Poisoning attacks to inject fake/misleading information into the
                                                    system to compromise the model's accuracy</li>
                                                <li>Model tampering targets the structure of a pre-trained AI/ML. This
                                                    allows unauthorized alterations to the model to compromise its
                                                    output accuracy.</li>
                                            </ul>
                                        </li>
                                        <li><b>Malicious GPTs</b>: This refers to an altered and evil version of
                                            commercial Gen AI that produces harmful or deliberately misinformed outputs.
                                        </li>
                                        <li><b>Financial Frauds</b>: These kinds of attacks are most rampant, where
                                            attackers use voice phishing or vishing to impersonate executives to get
                                            sensitive information out of their employees or even for fund transfer.</li>
                                    </ol>
                                    <h3>Collating AI/ML with Cybersecurity to mitigate these risks</h3>
                                    <p>While the advancement in AI/ML technology are the bedrock of deepfake
                                        cyber-attacks, it is also the antigen that can be used to counter these attacks
                                        and minimize identity theft, privacy violation and spread of false information.
                                    </p>
                                    <p>According to a study by <a
                                            href="https://www.deloitte.com/middle-east/en/our-thinking/mepov-magazine/securing-the-future/ai-in-cybersecurity.html"
                                            target="_blank">Deloitte</a> “69% of enterprises believe that AI is
                                        necessary for cybersecurity due to increasing number of threats that
                                        cybersecurity analysts can handle.”</p>
                                    <p>Some approaches that could help are listed below:</p>
                                    <ul>
                                        <li><b>Deepfake Detection Algorithms</b>: AI/ML models can be trained and
                                            continuously iterated to identify subtle inconsistencies in deepfake
                                            content, such as unnatural facial movements, irregular blinking, or
                                            mismatched audio-visual cues. distinguish between them. </li>
                                        <li><b>Forensic Analysis Tools</b>: AI/ML can be used to develop forensic tools
                                            that examine things like compression inconsistencies, lighting anomalies, or
                                            pixel-level discrepancies and determine the origin of deepfakes. </li>
                                        <li><b>Behavioral Biometrics</b>: AI/ML can analyze behavioral patterns such as
                                            typing speed, mouse movements, or speech cadence to authenticate users and
                                            detect anomalies. </li>
                                        <li><b>Blockchain for Content Authentication</b>: Combining AI/ML with
                                            blockchain technology can help establish the authenticity of the content and
                                            create immutable records of the same. AI can embed cryptographic signatures
                                            into media files, and any subsequent alterations would be easily detectable.
                                        </li>
                                    </ul>
                                    <h3>MetricDust's Expertise in Cybersecurity</h3>
                                    <p>With every day that passes, more and more companies are becoming aware of the
                                        benefits of leveraging AI to counter deepfake attacks, Deloitte makes a point by
                                        predicting the growth in AI in cybersecurity market to grow from US $17.4
                                        billion in 2022 to US$102.78 billion by 2032, growing at a CAGR of 19.43%.</p>
                                    <p>We at MetricDust are vigilant and cognitive of these developments and are
                                        well-equipped to flex our cybersecurity muscles by helping you develop and
                                        enforce comprehensive cybersecurity policies, including: </p>
                                    <ul>
                                        <li>data protection,</li>
                                        <li>access control,</li>
                                        <li>incident management to protect its assets,</li>
                                        <li>comply with regulations and</li>
                                        <li>maintain customer trust in an increasingly digital world.</li>
                                    </ul>
                                    <p>By investing in the measures like employee training, network security, conduct
                                        regular vulnerability assessments and penetration testing to identify and
                                        mitigate security gaps and Compliance and Risk Management we significantly help
                                        in reduce the risk of cyber threats and position our company as a secure and
                                        resilient organization</p>
                                    <p style={{textAlign:'right'}}>- Anjali Burman, Creator <a
                                            href="https://www.linkedin.com/in/anjali-burman-blogwriting/"
                                            target="_blank"><i className="fa-brands fa-linkedin"></i></a></p>
                                </div>

                            </div>

                            <div className="spacer-single"></div>

                        </div>

                        <div className="col-lg-4">
                            <div className="widget widget-post">
                                <h4>Recent Posts</h4>
                                <ul className="de-bloglist-type-1">
                                    <li>
                                        <div className="d-image">
                                            <a href="metrictalks-2nd_webinar.html"><img
                                                    src="../images/news/metrictalks_webinar2.jpg" alt="" /></a>
                                        </div>
                                        <div className="d-content">
                                            <a href="metrictalks-2nd_webinar.html">
                                                <h4>Watch 2nd Edition of MetricTalks</h4>
                                            </a>
                                            <div className="d-date">Sep 30, 2024</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-image">
                                            <a href="sampada-magazine-feature.html"><img
                                                    src="../images/news/sampada_magazine_feature.jpg" alt="" /></a>
                                        </div>
                                        <div className="d-content">
                                            <a href="sampada-magazine-feature.html">
                                                <h4>Featured in Sampada Magazine</h4>
                                            </a>
                                            <div className="d-date">Aug 20, 2024</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-image">
                                            <a href="rise-quantum-computing.html"><img
                                                    src="../images/news/quantum_computing0.jpg" alt="" /></a>
                                        </div>
                                        <div className="d-content">
                                            <a href="rise-quantum-computing.html">
                                                <h4>Rise of Quantum Computing and its use cases</h4>
                                            </a>
                                            <div className="d-date">Jul 28, 2024</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="widget widget_tags">
                                <h4>Popular Tags</h4>
                                <ul>
                                    <li><a target="_blank" href="https://www.google.com/search?q=ai">AI</a></li>
                                    <li><a target="_blank"
                                            href="https://www.google.com/search?q=artificial intelligence">Artificial
                                            Intelligence
                                            Agents</a></li>
                                    <li><a target="_blank" href="https://www.google.com/search?q=genai">GenAI</a></li>
                                    <li><a target="_blank" href="https://www.google.com/search?q=ai & fmcg">FMCG</a>
                                    </li>
                                    <li><a target="_blank" href="https://www.google.com/search?q=ai & bfsi">BFSI</a>
                                    </li>
                                    <li><a target="_blank" href="https://www.google.com/search?q=webinar on ai">Webinar
                                            on AI
                                        </a></li>
                                    <li><a target="_blank" href="https://www.google.com/search?q=ai & banking">Banking
                                        </a></li>
                                    <li><a target="_blank" href="https://www.google.com/search?q=ai & branding">Branding
                                            and Marketing Analytics</a></li>
                                    <li><a target="_blank" href="https://www.google.com/search?q=ai & healthcare">
                                            Healthcare</a></li>
                                    <li><a target="_blank"
                                            href="https://www.google.com/search?q=machine learning">Machine Learning
                                            (ML)</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
            <Footer />
        </div>
    )
}

export default AIMLDeepFake;