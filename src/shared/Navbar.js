"use client";
import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    { id: 1, name: "Calendar", path: "/calendar" },
    { id: 2, name: "Drag & Drop", path: "/drag-drop" },
    { id: 3, name: "Chart", path: "/chart" },
    { id: 4, name: "Export", path: "/pdf-export" },
    { id: 5, name: "DataTable", path: "/datatable" },
    { id: 6, name: "Canvas", path: "/canvas" },
    { id: 8, name: "Filtering", path: "/filtering" },
    { id: 9, name: "Searchable", path: "/searchable" },
    { id: 10, name: "Multiselect", path: "/multiselect" },
    { id: 11, name: "Accordion", path: "/accordion" },
    { id: 12, name: "Pagination", path: "/pagination" },
    { id: 13, name: "Map", path: "/map" },
  ];

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <nav className="bg-linear-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  className="text-white border-0 rounded-none hover:border-b hover:text-black hover:bg-opacity-20 px-3 py-2 text-sm font-medium transition duration-300 ease-in-out transform hover:scale-105"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-md transition duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-700 bg-opacity-95">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              className="text-white hover:bg-white hover:bg-opacity-20 block px-3 py-2 rounded-md text-base font-medium transition duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
