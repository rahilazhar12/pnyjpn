import React, { useEffect } from "react";

const Contactus = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="contact-section p-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="w-full">
              <h2 className="contact-title text-3xl font-semibold mb-6">
                Get in Touch
              </h2>
            </div>
            <div className="w-full lg:w-8/12">
              <form
                className="form-contact contact_form"
                action="contact_process.php"
                method="post"
                id="contactForm"
                noValidate="novalidate"
              >
                <div className="flex flex-wrap">
                  <div className="w-full">
                    <div className="form-group mb-4">
                      <textarea
                        className="form-control w-full h-36 p-4 border border-gray-300 rounded-lg"
                        name="message"
                        id="message"
                        cols={30}
                        rows={9}
                        onFocus="this.placeholder = ''"
                        onBlur="this.placeholder = 'Enter Message'"
                        placeholder=" Enter Message"
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="form-group mb-4">
                      <input
                        className="form-control valid w-full p-4 border border-gray-300 rounded-lg"
                        name="name"
                        id="name"
                        type="text"
                        onFocus="this.placeholder = ''"
                        onBlur="this.placeholder = 'Enter your name'"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>
                  <div className="w-full sm:w-1/2">
                    <div className="form-group mb-4">
                      <input
                        className="form-control valid w-full p-4 border border-gray-300 rounded-lg"
                        name="email"
                        id="email"
                        type="email"
                        onFocus="this.placeholder = ''"
                        onBlur="this.placeholder = 'Enter email address'"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="form-group mb-4">
                      <input
                        className="form-control w-full p-4 border border-gray-300 rounded-lg"
                        name="subject"
                        id="subject"
                        type="text"
                        onFocus="this.placeholder = ''"
                        onBlur="this.placeholder = 'Enter Subject'"
                        placeholder="Enter Subject"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mt-3">
                  <button
                    type="submit"
                    className="button-contactForm boxed-btn py-3 px-6 rounded-lg"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full lg:w-3/12 lg:ml-auto">
              <div className="media contact-info flex items-center mb-4">
                <span className="contact-info__icon mr-4">
                  <i className="ti-home text-2xl" />
                </span>
                <div className="media-body">
                  <h3 className="text-xl font-semibold">Address</h3>
                  <p>
                    Office 1, Level #14, Arfa Software Technology Park,
                    Ferozepur Road, Lahore
                  </p>
                </div>
              </div>
              <div className="media contact-info flex items-center mb-4">
                <span className="contact-info__icon mr-4">
                  <i className="ti-tablet text-2xl" />
                </span>
                <div className="media-body">
                  <h3 className="text-xl font-semibold">+92 309 7779401</h3>
                  <p>Mon to Sat 9am to 6pm</p>
                </div>
              </div>
              <div className="media contact-info flex items-center">
                <span className="contact-info__icon mr-4">
                  <i className="ti-email text-2xl" />
                </span>
                <div className="media-body">
                  <h3 className="text-xl font-semibold">
                    info@pnytrainings.com
                  </h3>
                  <p>Send us your query anytime!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contactus;
