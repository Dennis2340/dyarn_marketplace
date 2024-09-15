"use client"
import PoweredByGenelineX from "@/components/PoweredByGenelineX";
import Image from "next/image";
//@ts-ignore
import {ConfigurableChatbot } from '@denno1000/genistudio-package'
import React from "react";

export default function Home() {
  return (
    <>
     {/* Powered by Geneline-X Component */}
     <div className="flex flex-col mtjustify-end">
       <PoweredByGenelineX />
     </div>
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white text-blue-900">
      <ConfigurableChatbot chatbotId={'clzbl9w3g000hgkbqpkeb64on'}/>
      {/* Hero Section */}
      <section className="w-full max-w-6xl text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to YarnCraft Marketplace</h1>
        <p className="text-lg mb-8">
          Your one-stop shop for high-quality yarn and crochet supplies. Perfect for crafters of all levels!
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Shop Now
        </button>
      </section>

      {/* Features Section */}
      <section className="mt-16 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 text-center">
        <div className="p-6 border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors">
          <Image
            src="/yarn_pic_1.avif"
            alt="High-Quality Yarn"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">High-Quality Yarn</h2>
          <p className="text-sm opacity-70">Discover a wide range of yarns in various colors and textures.</p>
        </div>
        <div className="p-6 border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors">
          <Image
            src="/yarn_pic_3.avif"
            alt="Handcrafted Items"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">Handcrafted Items</h2>
          <p className="text-sm opacity-70">Shop for handmade crafts and unique pieces created by talented artisans.</p>
        </div>
        <div className="p-6 border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors">
          <Image
            src="/yarn_pic_1.webp"
            alt="Join the Community"
            width={200}
            height={200}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold mb-2">Join the Community</h2>
          <p className="text-sm opacity-70">Connect with other crafters, share tips, and get inspired.</p>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="mt-16 w-full max-w-6xl">
        <h2 className="text-3xl font-semibold mb-6 text-center">Popular Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors">
            <Image
              src="/bag_hat.jpg"
              alt="Yarn Product 1"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Soft Wool Yarn</h3>
            <p className="text-sm opacity-70">$10.99</p>
          </div>
          <div className="p-6 border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors">
            <Image
              src="/knit_hat.jpg"
              alt="Yarn Product 2"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Rainbow Cotton Yarn</h3>
            <p className="text-sm opacity-70">$12.99</p>
          </div>
          <div className="p-6 border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors">
            <Image
              src="/middi.jpg"
              alt="Crochet Product 1"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Handcrafted Scarf</h3>
            <p className="text-sm opacity-70">$25.00</p>
          </div>
          <div className="p-6 border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors">
            <Image
              src="/hot_short.jpg"
              alt="Crochet Product 2"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Amigurumi Kit</h3>
            <p className="text-sm opacity-70">$18.99</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="mt-16 w-full max-w-6xl text-center">
        <h2 className="text-3xl font-semibold mb-4">Start Selling on YarnCraft Marketplace</h2>
        <p className="text-lg mb-8">
          Join our growing community of sellers. List your products and reach more customers today!
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          Become a Seller
        </button>
      </section>

      

    </main>
    </>
  );
}
