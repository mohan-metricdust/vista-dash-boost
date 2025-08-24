import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const RiseQuantumComputing = () => {
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
                            <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">Rise of Quantum Computing and its use
                                cases</h2>
                            <ul className="crumb">
                                <li><a href="../index.html">Home</a></li>
                                <li className="active">Reflect</li>
                            </ul>
                            <div className="spacer-single"></div>
                        </div>

                        <div className="col-lg-6">
                            <img src="../images/news/quantum_computing0.jpg" className="img-fluid rounded-30" alt="" />
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
                                    <p>Quantum Computing has been around since the early 1980s. It has been up for
                                        debate ever since Richard Feynman initially coined the term and proposed a
                                        possible way of amalgamating quantum mechanics with the revolutionary invention
                                        of computers.</p>
                                    <p>The term Quantum Computing has a certain enigma attached to it; even after
                                        theorizing over it for a relatively long time, we are yet to see practical
                                        implication of this phenomenon touted to be a 'cultural reset' as far as
                                        technology and computers are concerned.</p>
                                    <p>Theorizing probable problems that can be solved through quantum computing is one
                                        thing, realizing these theories and implementing them on a mass scale is another
                                        question that keeps glaring at scientists & researchers unflinchingly.</p>
                                    <p>This is not to deny that there haven’t been experiments to put these theories to
                                        test and IBM has been successful in developing a 433 qubits computer. These
                                        theories have even proved to stand their ground, but the argument that we’re
                                        trying to drive is that despite the long discussions, debates & research gone
                                        into materializing quantum computing the results are at a rather nascent stage
                                        i.e., we are yet to see all the loose ends of quantum computing being tied &
                                        stitched together into a flawless and fully functioning system.</p>
                                    <p>This article discusses the challenges accounted for quantum computing to be as
                                        prevalent as AI is today. Keep reading... </p>
                                    <img src="../images/news/quantum_computing1.jpg" className="img-fluid rounded-30"
                                        alt="" />
                                </div>

                                <div className="post-text">
                                    <h3>Quantum Computing Facts</h3>
                                    <ol>
                                        <li>In 2021 alone, announced investments in quantum-computing start-ups have
                                            surpassed $1.7 billion, more than double the amount raised in 2020.</li>
                                        <li>The United States is home to the highest number of quantum-computing
                                            start-ups, with software seeing the highest level of global start-up growth.
                                        </li>
                                        <li>In 2000, scientists at IBM built a 5-qubit quantum computer and used it to
                                            demonstrate Shor's algorithm. In 2019, Google claimed quantum supremacy when
                                            their 53-qubit quantum computer performed a calculation in 200 seconds that
                                            would take a supercomputer 10,000 years. </li>
                                        <li>2020 alone saw about $700 million in private funding for quantum technology
                                            startups. Announced private investments for 2021 are already double this
                                            amount, bringing the total private investment in quantum computing from 2001
                                            to 2021 to more than $3.3 billion.</li>
                                        <li>In 2022, venture capitalists plowed a record $1.8 billion into companies
                                            working on quantum computing hardware or software worldwide, according to
                                            data from Pitchbook. That’s nearly five times the amount invested in 2019.
                                        </li>
                                        <li>Announced public investments in quantum computing are even higher: nearly
                                            $30 billion to date.</li>
                                    </ol>
                                </div>

                                <div className="post-text">
                                    <h3>Challenges</h3>
                                    <p>Quantum Computing occupies a liminal space in the world of technology—— we’re not
                                        very far from having an fully functioning quantum computer operating on a
                                        regular basis but we’re not close enough (ready) to quantum computing to be
                                        fully operational. </p>
                                    <h5>1. Hardware</h5>
                                    <p>Researchers are sceptic about having a fully functional quantum computer until
                                        they are not completely fault tolerant. A report by Mckinsey also suggests that
                                        it is
                                        not until 2030 that we may have fully fault-tolerant computers.<br />
                                        Although this does not render quantum computers unusable but may negatively
                                        affect their business value.</p>
                                    <h5>2. Software</h5>
                                    <p>McKinsey states “Quantum computing requires a new programming paradigm— and
                                        software
                                        stack.” It goes without being said companies are yet to build robust software
                                        that supports full-fledged quantum computers. A commercial quantum computer
                                        requires
                                        100x more qubits than what we can deliver today. Not to forget generating and
                                        managing qubits is an engineering challenge in that a stable qubit requires
                                        temperatures
                                        to be cooler than deep space.</p>
                                    <h5>3. Talent gap</h5>
                                    <p>To gain command over a field as niche as quantum computing requires a person to
                                        bridge a gap between diverse fields like computer science and an in-depth
                                        knowledge in concepts of physics like superposition, entanglement, and other
                                        quantum
                                        concepts.</p>
                                    <h5>5. Suitable Environment</h5>
                                    <p>Another hurdle in the way of quantum computing is the volatile nature of qubits.
                                        Compared to conventional computers that either exist in 1s or 0s, qubits exist
                                        in any combination of both digits. Eventually when the status of a qubit
                                        changes,
                                        the chances of qubits losing their inputs and even throwing off the results
                                        accuracy.</p>
                                    <img src="../images/news/quantum_computing2.jpg" className="img-fluid rounded-30"
                                        alt="" />
                                    <p>We've still got a long way to go when it comes to having a robust ecosystem which
                                        can help quantum computing thrive.</p>
                                </div>

                                <div className="post-text">
                                    <h3>UseCases</h3>
                                    <h5>Quantum Simulation</h5>
                                    <p>McKinsey defines Quantum Simulation as “simulation of quantum-mechanical systems
                                        or processes such as molecules, chemical reactions, or electrons in solids.
                                        Conventional computers available to us solve problems on an approximate basis or
                                        not at all, this is because current conventional computers do not have the
                                        capability to fully simulate quantum systems. This slows down the process
                                        considerably without any respite in the immediate future. </p>
                                    <p><b>Industry Use Cases:</b> Quantum Simulation use cases are mostly applicable in
                                        the pharmaceuticals and chemicals industries for tasks such as lead
                                        identification
                                        or catalyst optimization.</p>
                                    <h5>Quantum Linear Algebra</h5>
                                    <p>This sub-field of quantum computing uses quantum algorithms
                                        to solve problems in linear algebra more efficiently than classical algorithms.
                                        They can speed up complex algorithms but require a defined hardware to be able
                                        to
                                        process these algorithms. They are mostly applied in AI/ML, when deployed at
                                        scale, this
                                        processing will be useful for automation of complex tasks such as providing
                                        financial advice.</p>
                                    <p><b>Industry Use Case:</b> Quantum linear algebra enhances optimization,
                                        simulations, and data analysis in
                                        finance, healthcare, logistics, AI, telecommunications, automotive industry etc.
                                    </p>
                                    <h5>Quantum Optimization</h5>
                                    <p>Mckinsey again defines quantum optimization as a technique that “could find
                                        better solutions in the same amount of time and solve previously intractable
                                        problems”. Quantum optimization can increase the speed of
                                        calculations quadratic times as compared to present day systems. When deployed
                                        at scale, this process will be useful for automation of complex tasks such as
                                        providing financial advice.</p>
                                    <p><b>Industry Use Case:</b> Quantum optimization is most helpful in portfolio
                                        optimization
                                        within finance, where it helps balance risk and return more efficiently than
                                        classical methods, enhancing investment decision-making.</p>
                                    <h5>Quantum Factorization</h5>
                                    <p>This is the most widely known use case of quantum computing.
                                        “Efficient quantum factorization is most readily applicable to breaking RSA
                                        encryption, the basis of most of today's secure data-transfer protocols.”
                                        (McKinsey,
                                        18) The quantum factorization algorithm leverages quantum parallelism and
                                        entanglement to achieve this speedup. It requires a sufficiently powerful
                                        quantum
                                        computer with stable qubits and low error rates.</p>
                                    <p><b>Industry Use Case:</b> Quantum factorization, primarily through Shor's
                                        algorithm, has
                                        several prominent industry use cases due to its potential to solve the integer
                                        factorization problem exponentially faster than classical algorithms. These
                                        include: Cryptography & security; Blockchain & digital signatures; Cloud
                                        computing & data storage</p>
                                    <img src="../images/news/quantum_computing4.webp" className="img-fluid rounded-30"
                                        alt="" />
                                </div>

                                <div className="post-text">
                                    <h3>Business Growth</h3>
                                    <p>Quantum computing has still got a lot of roads to cover until we start to see the
                                        business impact and difference in numbers that quantum computing has brought
                                        about for organizations that have already invested in them. Even before we see a
                                        full-fledged functioning quantum computer, McKinsey claims that around 2030,
                                        quantum computing use-cases will have a hybrid operating model that is a cross
                                        between quantum and conventional high-performance computing. For example,
                                        conventional high-performance computers may benefit from quantum-inspired
                                        algorithms.</p>
                                    <p>However, based on the investments made so far, an estimated $300 billion to $700
                                        billion could be at stake. Here are key industries that may see a surge:</p>
                                    <ul>
                                        <li><b>Pharmaceuticals:</b> For a new drug to be discovered and reach the public
                                            it takes
                                            somewhere around $2 billion and more than ten years. This R&D can be
                                            comparatively cut short through quantum computing. This means a minimum
                                            increase
                                            of $15 billion to $75 billion in additional revenues. (McKinsey)</li>
                                        <li><b>Chemicals:</b> In the chemicals sector quantum computing can help improve
                                            R&D,
                                            production and even supply-chain management. If the industry gains in value,
                                            then they could increase their revenue between $20 billion to $40 billion in
                                            value. (McKinsey)</li>
                                        <li><b>Automotive:</b> We can expect the automotive industry to improve their
                                            product
                                            design, production, mobility and traffic management, etc. Through the
                                            integration of quantum computing. Researchers at Mckinsey state that with an
                                            annual spend of $500 billion in manufacturing and a mere gain of 2-5% the
                                            annual
                                            revenue could hike somewhere between $10 billion to $25 billion per year.
                                        </li>
                                        <li><b>Finance:</b> Finance is one industry that may these gains the latest of
                                            all these
                                            industries mentioned. The most prominent areas of improvement are portfolio
                                            &
                                            risk management. Mckinsey& Co. Report that the industry already stands at
                                            $6.9
                                            trillion, at the global lending market and quantum optimization will only
                                            take
                                            their benefits further.</li>
                                    </ul>
                                </div>

                                <div className="post-text">
                                    <h3>Our Services</h3>
                                    <p>At MetricDust we integrate Quantum Computing power to Artificial Intelligence,
                                        Machine Learning and Cyber Security applications. Our Quantum capabilities
                                        include: </p>
                                    <strong>1. Quantum Cloud Services:</strong>
                                    <p>An in-house fintech model which enhances security in financial transactions and
                                        fraudulent activities along with optimization of pricing models with highest
                                        accuracy. </p>

                                    <strong>2. Quantum Simulators:</strong>
                                    <p>We developed a model which could simulate the financial market behavior
                                        accurately and rapidly by assisting in understanding the market dynamics
                                        simulating & predicting the behavior accurately. </p>
                                    <img src="../images/news/quantum_computing5.webp" className="img-fluid rounded-30"
                                        alt="" />
                                </div>

                                <div className="post-text">
                                    <h3>Conclusion</h3>
                                    <p>As per the extensive research conducted by scientists and industry experts,
                                        transitioning quantum computing to a mainstream technology is dependent on six
                                        key factors—funding, accessibility, standardization, industry consortia, talent,
                                        and digital infrastructure.</p>
                                    <p>The biggest obstacle in the road to finally realizing this dream is the fallacy
                                        within the functioning of quantum machines themselves. Compared to existing
                                        systems quantum computers are way more error-prone and this is mainly because of
                                        decoherence.</p>
                                    <p>The chasm between the theoretical brilliance of quantum computing and the
                                        practical applications of it can be tied together by the following statement by
                                        Freeke Heijman “What we're looking at is not only the technological roadmap, but
                                        an ecosystem...how do you get the right talent, how to educate the right people
                                        to move into the field?”</p>
                                </div>

                                <div className="post-text">
                                    <h3>References</h3>
                                    <ol>
                                        <li><a href="https://www.mckinsey.com/~/media/mckinsey/business%20functions/mckinsey%20digital/our%20insights/quantum%20computing%20use%20cases%20are%20getting%20real%20what%20you%20need%20to%20know/quantum-computing-an-emerging-ecosystem.pdf#:~:text=Most%20known%20use%20cases%20fit%20into%20four%20archetypes%3A,learning%2C%20quantum%20optimization%20and%20search%2C%20and%20quantum%20factorization."
                                                target="_blank">Quantum computing: An emerging ecosystem and industry
                                                use case. McKinsey & Co.</a></li>
                                        <li><a href="https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/quantum-computing-use-cases-are-getting-real-what-you-need-to-know"
                                                target="_blank">Quantum computing use cases are getting real—what you
                                                need to know</a></li>
                                        <li><a href="https://www.thoughtworks.com/insights/blog/macro-trends-tech-industry-nov-2018"
                                                target="_blank">Macro trends in the tech industry</a></li>
                                        <li><a href="https://www.wired.com/story/wired-guide-to-quantum-computing/"
                                                target="_blank">The WIRED Guide to Quantum Computing</a></li>
                                        <li><a href="https://www.nature.com/articles/d41586-023-01692-9"
                                                target="_blank">Quantum computers: what are they good for?</a></li>
                                        <li><a href="https://www.technologyreview.com/2019/01/29/66141/what-is-quantum-computing/"
                                                target="_blank">Explainer: What is a quantum computer?</a></li>
                                        <li><a href="https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/a-game-plan-for-quantum-computing"
                                                target="_blank">A game plan for quantum computing</a></li>
                                    </ol>
                                </div>
                                <p style={{textAlign:'center'}}>- Anjali Burman, Creator <a
                                        href="https://www.linkedin.com/in/anjali-burman-blogwriting/" target="_blank"><i
                                            className="fa-brands fa-linkedin"></i></a></p>
                            </div>

                            <div className="spacer-single"></div>

                        </div>

                        <div className="col-lg-4">
                            <div className="widget widget-post">
                                <h4>Recent Posts</h4>
                                <ul className="de-bloglist-type-1">
                                    <li>
                                        <div className="d-image">
                                            <a href="rise-quantum-computing.html"><img
                                                    src="../images/news/quantum_computing0.jpg" alt="" /></a>
                                        </div>
                                        <div className="d-content">
                                            <a href="rise-quantum-computing.html">
                                                <h4>Rise of Quantum Computing and its use cases</h4>
                                            </a>
                                            <div className="d-date">July 28, 2024</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-image">
                                            <a href="metrictalks-webinar.html"><img
                                                    src="../images/news/reflect_metricTalks_2.jpg" alt="" /></a>
                                        </div>
                                        <div className="d-content">
                                            <a href="metrictalks-webinar.html">
                                                <h4>Watch 1st Edition of MetricTalks</h4>
                                            </a>
                                            <div className="d-date">July 15, 2024</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-image">
                                            <a href="ai-power-automation.html"><img
                                                    src="../images/news/aiAuto-thumb2.png" alt="" /></a>
                                        </div>
                                        <div className="d-content">
                                            <a href="ai-power-automation.html">
                                                <h4>What is AI-powered Automation? Its Implementation and Benefits</h4>
                                            </a>
                                            <div className="d-date">June 12, 2024</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="widget widget_tags">
                                <h4>Popular Tags</h4>
                                <ul>
                                    <li><a target="_blank"
                                            href="https://www.google.com/search?q=quantum computing">Quantum
                                            Computing</a></li>
                                    <li><a target="_blank" href="https://www.google.com/search?q=qubits">Qubits</a></li>
                                    <li><a target="_blank"
                                            href="https://www.google.com/search?q=supercomputer">Supercomputer</a></li>
                                    <li><a target="_blank"
                                            href="https://www.google.com/search?q=quantum simulation">Quantum
                                            Simulation</a></li>
                                    <li><a target="_blank"
                                            href="https://www.google.com/search?q=quantum liner algebra">Quantum Liner
                                            Algebra</a></li>
                                    <li><a target="_blank"
                                            href="https://www.google.com/search?q=quantum factorization">Quantum
                                            Factorization</a></li>
                                    <li><a target="_blank" href="https://www.google.com/search?q=ai">AI</a></li>
                                    <li><a target="_blank"
                                            href="https://www.google.com/search?q=quantum computers">Quantum
                                            Computers</a></li>
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

export default RiseQuantumComputing;