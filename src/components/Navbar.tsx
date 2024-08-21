"use client";
import React, { useState } from "react";
import { MenuIcon, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          YarnCraft Marketplace
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={handleMenuClick}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {isSidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </nav>

      {/* Render Sidebar as a Slide-in Menu for Mobile */}
      {isSidebarOpen && (
        <div
        className={`fixed md:static top-0 left-0 h-full bg-blue-900 text-white w-64 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Seller Dashboard</h2>
          <nav className="space-y-4">
            <a href="#" className="block py-2 px-4 rounded hover:bg-blue-700">
              Dashboard Overview
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-blue-700">
              Products
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-blue-700">
              Orders
            </a>
            <a href="#" className="block py-2 px-4 rounded hover:bg-blue-700">
              Preorders
            </a>
          </nav>
        </div>
      </div>
      )}
    </>
  );
};

export default Navbar;
