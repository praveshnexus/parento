import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold">Parento</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering parents with tools, resources, and community support for raising healthy, happy children.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-gray-400 hover:text-white transition text-sm">
                  Track Milestones
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-white transition text-sm">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-gray-400 hover:text-white transition text-sm">
                  Learning Hub
                </Link>
              </li>
              <li>
                <Link to="/consult" className="text-gray-400 hover:text-white transition text-sm">
                  Consult Doctors
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                <a href="mailto:support@parento.com" className="text-gray-400 hover:text-white transition text-sm">
                  support@parento.com
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-white transition text-sm">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  123 Parent Street<br />
                  Suite 100<br />
                  New York, NY 10001
                </span>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Parento. All rights reserved. Made with{" "}
            <Heart className="w-4 h-4 inline text-red-500" /> for parents everywhere.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition text-sm">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-sm">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}