import React, { useEffect } from "react";
import husnain from "../../assets/img/service/support-img.jpg";

const Aboutus = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="slider-area">
        <div
          className="single-slider section-overly slider-height2 flex items-center"
          style={{ backgroundImage: 'url("assets/img/hero/about.jpg")' }}
        >
          <div className="container mx-auto">
            <div className="row flex justify-center">
              <div className="w-full">
                <div className="hero-cap text-center">
                  <h2>About us</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center px-20 mt-20">
        PNY Group of Companies has created another exciting venture for those
        who want to excel in their careers and explore better opportunities. For
        students aiming to pursue a career in IT but struggling to find
        direction, PNY Careers offers a comprehensive platform that simplifies
        your journey. We understand the need for young talent in the IT sector
        and are committed to fostering new opportunities for aspiring
        professionals. Through workshops, networking events, and hands-on
        training sessions, we create an environment that nurtures talent and
        empowers individuals to reach their full potential. In addition to
        supporting students, PNY Careers invites companies to participate
        actively in shaping the future of the IT workforce. Employers can post
        job openings, connect with emerging talent, and engage in collaborative
        initiatives that benefit both students and organisations. Pakistan's IT
        landscape is rapidly evolving, providing numerous facilities and
        opportunities for students to kick-start their careers. Navigating the
        job market can be challenging, but our platform is tailored to offer
        guidance, resources, and support to help you find your path. Whether
        you're just starting or looking to advance your skills, PNY Group of
        Companies is here to support you every step of the way. Together, let’s
        unlock the doors to endless possibilities and turn your aspirations into
        reality.
      </p>

      <div className="support-company-area fix px-32 mt-20 mb-20">
        <div className="container mx-auto">
          <div className="row flex items-center">
            <div className="xl:w-1/2 lg:w-1/2">
              <div className="right-caption">
                {/* Section Title */}
                <div className="section-tittle section-tittle2">
                  <span>What we are doing</span>
                  <h2>24k Talented people are getting Jobs</h2>
                </div>
                <div className="support-caption">
                  <p className="mt-4">
                    Mollit anim laborum duis au dolor in voluptate velit ess
                    cillum dolore eu lore dsu quality mollit anim laborumuis au
                    dolor in voluptate velit cillum.
                  </p>
                  <p className="mt-4">
                    Mollit anim laborum.Duis aute irufg dhjkolohr in re
                    voluptate velit esscillumlore eu quife nrulla parihatur.
                    Excghcepteur signjnt occa cupidatat non inulpadeserunt
                    mollit aboru. temnthp incididbnt ut labore mollit anim
                    laborum suis aute.
                  </p>
                  <a href="about.html" className="btn post-btn mt-4">
                    Post a job
                  </a>
                </div>
              </div>
            </div>
            <div className="xl:w-1/2 lg:w-1/2">
              <div className="support-location-img">
                <img src={husnain} alt />
                <div className="support-img-cap text-center">
                  <p>Since</p>
                  <span>2017</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutus;
