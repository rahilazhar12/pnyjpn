import React , {useEffect} from "react";
import './Home.css'
import Featured from "./Featured";


const Home = () => {
  useEffect(() => {
    window.scrollTo(0,0)
}, [])
  return (
    <>
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url("src/assets/img/hero/h1_hero.jpg")' }}
      >
        {/* Overlay for better contrast (optional) */}
        <div className="absolute inset-0 bg-white bg-opacity-0" />

        {/* Content Section */}
        <div className="relative z-10 flex flex-col justify-center items-center md:items-start h-full px-4 lg:px-16 text-center md:text-left">
          {/* Headline Text */}
          <h1 className="text-4xl lg:text-8xl font-bold text-gray-900 mb-6 lg:w-[1000px] leading-tight">
            Find the most exciting <br />
            startup jobs
          </h1>

          {/* Search Inputs Section */}
          <div className="flex flex-col md:flex-row md:flex-nowrap mt-4 md:mt-8 space-y-4 md:space-y-0 md:space-x-4 w-full max-w-lg xl:max-w-3xl">
            {/* Job Title Input */}
            <input
              type="text"
              placeholder="Job Title or Keyword"
              className="px-4 py-3 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            {/* Location Input */}
            <input
              type="text"
              placeholder="Location BD"
              className="px-4 py-3 w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            {/* Find Job Button */}
            <button className="px-8 py-3 bg-pink-500 text-white font-semibold hover:bg-pink-600 whitespace-nowrap w-full md:w-auto">
              Find Job
            </button>
          </div>
        </div>
      </section>

      {/* Featured */}
      <Featured/>



      <div className="relative bg-cover py-24" style={{ backgroundImage: 'url("src/assets/img/gallery/cv_bg.jpg")' }}>
  <div className="absolute inset-0 bg-blue-900 opacity-70"></div> {/* Overlay for background dimming */}
  
  <div className="container mx-auto relative z-10">
    <div className="flex justify-center">
      <div className="text-center text-white">
        <p className="text-sm uppercase tracking-wide mb-2">FEATURED TOURS Packages</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:w-[700px]">Make a Difference with Your Online Resume!</h2>
        <a href="#" className="inline-block px-8 py-3 border border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-900 transition-all">
          Create your Resume
        </a>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Home;
