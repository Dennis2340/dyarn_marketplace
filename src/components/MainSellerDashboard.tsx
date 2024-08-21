"use client"
import React from 'react'
import DashboardOverview from './seller/DashboardOverview';
import MaxWidthWrapper from './MaxWidthWrapper';

interface Props {}

const sellerName = 'Jane Doe';
const totalProducts = 25;
const totalSales = 1534.75;
const averageRating = 4.8;
const MainSellerDashboard = () => {
  return (
    <MaxWidthWrapper>
    <div className="p-8">
      <DashboardOverview 
        sellerName={sellerName}
        totalProducts={totalProducts}
        totalSales={totalSales}
        averageRating={averageRating}
      />
    </div>
    </MaxWidthWrapper>
  )
}

export default MainSellerDashboard