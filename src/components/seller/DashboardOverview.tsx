"use client"
import React from 'react';

interface DashboardOverviewProps {
  sellerName: string;
  totalProducts: number;
  totalSales: number;
  averageRating: number;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ sellerName, totalProducts, totalSales, averageRating }) => {
  return (
    <div className="p-6 bg-white border border-blue-300 rounded-lg shadow-md">
      {/* Welcome Message */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-900">Welcome back, {sellerName}!</h2>
        <p className="text-sm text-gray-600">Here&apos;s a quick overview of your store&apos;s performance.</p>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-blue-700">Total Products</h3>
          <p className="text-2xl font-semibold text-blue-900">{totalProducts}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-blue-700">Total Sales</h3>
          <p className="text-2xl font-semibold text-blue-900">${totalSales.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-blue-700">Average Rating</h3>
          <p className="text-2xl font-semibold text-blue-900">{averageRating.toFixed(1)} / 5</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
