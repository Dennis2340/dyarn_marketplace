"use client";
import React, { useState } from "react";
import { MenuIcon, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Hamburger Menu for Mobile View */}
      <div className="md:hidden flex items-center p-4 bg-blue-600 text-white">
        <button onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
        <span className="ml-2 font-bold text-xl">Seller Dashboard</span>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full bg-blue-900 text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Seller Dashboard</h2>
          <nav className="space-y-4">
            <a href="#" className="block py-2 px-4 rounded hover:bg-blue-700">
              Dashboard Overview
            </a>
            <a href="/sellerdashboard/payment-details" className="block py-2 px-4 rounded hover:bg-blue-700">
              Payment Details
            </a>
            <a href="/sellerdashboard/products" className="block py-2 px-4 rounded hover:bg-blue-700">
              Products
            </a>
            <a href="/sellerdashboard/orders" className="block py-2 px-4 rounded hover:bg-blue-700">
              Orders
            </a>
            <a href="/sellerdashboard/preorders" className="block py-2 px-4 rounded hover:bg-blue-700">
              Preorders
            </a>
          </nav>
        </div>
      </div>

      {/* Overlay when Sidebar is open in Mobile View */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
