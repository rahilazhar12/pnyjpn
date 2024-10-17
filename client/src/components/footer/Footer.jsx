import { FaFacebookF, FaTwitter, FaGlobe, FaBehance } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 relative bg-cover bg-center"
    style={{ backgroundImage: 'url("../../src/assets/img/footer/bg.jpg")' }}>
    {/* Overlay for background image with reduced opacity */}
    <div className="absolute inset-0 bg-black opacity-60"></div> 
    
    <div className="relative z-10 container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl p-4">
      {/* About Us */}
      <div>
        <h4 className="text-xl font-semibold mb-4">About Us</h4>
        <p className="text-gray-400">Heaven fruitful doesn't cover lesser days. Appear creeping seasons so behold.</p>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
        <ul className="text-gray-400 space-y-2">
          <li>Address: Your address goes here, your demo address.</li>
          <li>Phone: +8880 44338899</li>
          <li>Email: info@colorlib.com</li>
        </ul>
      </div>

      {/* Important Links */}
      <div>
        <h4 className="text-xl font-semibold mb-4">Important Links</h4>
        <ul className="text-gray-400 space-y-2">
          <li><a href="#" className="hover:text-white">View Project</a></li>
          <li><a href="#" className="hover:text-white">Contact Us</a></li>
          <li><a href="#" className="hover:text-white">Testimonial</a></li>
          <li><a href="#" className="hover:text-white">Properties</a></li>
          <li><a href="#" className="hover:text-white">Support</a></li>
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
        <p className="text-gray-400 mb-4">
          Heaven fruitful doesn't over lesser in days. Appear creeping.
        </p>
        <form className="flex">
          <input
            type="email"
            className="p-2 w-full rounded-l bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none"
            placeholder="Email Address"
          />
          <button type="submit" className="p-2 bg-pink-500 rounded-r hover:bg-pink-600">
           Submit
          </button>
        </form>
      </div>
    </div>

  
</footer>

  );
}

export default Footer;
