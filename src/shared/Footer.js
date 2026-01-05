import { Facebook, Github, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const componentLinks = [
    { name: "Calendar", path: "/calendar" },
    { name: "Drag & Drop", path: "/drag-drop" },
    { name: "Chart", path: "/chart" },
    { name: "PDF Export", path: "/pdf-export" },
  ];

  const featureLinks = [
    { name: "DataTable", path: "/datatable" },
    { name: "Canvas", path: "/canvas" },
    { name: "Export Feature", path: "/export" },
    { name: "Filtering", path: "/filtering" },
  ];

  const utilityLinks = [
    { name: "Searchable", path: "/searchable" },
    { name: "Multiselect", path: "/multiselect" },
    { name: "Accordion", path: "/accordion" },
    { name: "Pagination", path: "/pagination" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold mb-4">
              Reusable Components
            </h3>
            <p className="text-sm">
              A comprehensive collection of reusable React components for your
              next project. Build faster, code smarter.
            </p>
            <div className="flex space-x-4 pt-4">
              <a
                href="#"
                className="hover:text-blue-400 transition duration-300"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-300"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="hover:text-blue-400 transition duration-300"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

        
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">
              Components
            </h4>
            <ul className="space-y-2">
              {componentLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-sm hover:text-blue-400 transition duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              {featureLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-sm hover:text-blue-400 transition duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Utilities</h4>
            <ul className="space-y-2 mb-6">
              {utilityLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-sm hover:text-blue-400 transition duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

    
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Mail size={16} className="text-blue-400" />
              <span>contact@components.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={16} className="text-blue-400" />
              <span>+880 1234-567890</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="text-blue-400" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

       
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {currentYear} Reusable Components. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
