"use client";

import React, { useState } from "react";

const WORKERS_DATA = [
  {
    id: 1,
    name: "Ramesh Kumar",
    category: "Electrician",
    experience: "6 Years Exp",
    location: "Peddapalli",
    rating: "4.9",
    reviews: 42,
    phone: "919876543210",
    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80",
    verified: true,
  },
  {
    id: 2,
    name: "Suresh Verma",
    category: "Plumber",
    experience: "4 Years Exp",
    location: "Karimnagar",
    rating: "4.8",
    reviews: 28,
    phone: "919876543211",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verified: true,
  },
  {
    id: 3,
    name: "Mahesh Babu",
    category: "Carpenter",
    experience: "8 Years Exp",
    location: "Peddapalli",
    rating: "5.0",
    reviews: 64,
    phone: "919876543212",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    verified: true,
  },
  {
    id: 4,
    name: "Ravi Teja",
    category: "Painter",
    experience: "5 Years Exp",
    location: "Peddapalli",
    rating: "4.7",
    reviews: 19,
    phone: "919876543213",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    verified: true,
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["All", "Electrician", "Plumber", "Carpenter", "Painter"];

  const filteredWorkers = WORKERS_DATA.filter((worker) => {
    const matchesCategory =
      selectedCategory === "All" || worker.category === selectedCategory;
    const matchesSearch =
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* 1. TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 text-white font-black text-xl px-3 py-1 rounded-lg">
            N
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">NINT</h1>
            <p className="text-xs text-slate-500">Local Service Marketplace</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <input
            type="text"
            placeholder="Search worker, skill, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-100 border border-slate-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="text-sm font-semibold text-slate-700 hover:text-emerald-600">
            Login
          </button>
          <a
            href="#worker-register"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
          >
            Join as Worker
          </a>
        </div>
      </header>

      {/* 2. HERO / DUAL DASHBOARD BANNER */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl p-6 md:p-10 shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
              Direct Customer to Worker Connection
            </span>
            <h2 className="text-2xl md:text-4xl font-bold">
              Find Verified Local Workers Near You Instantly
            </h2>
            <p className="text-slate-300 text-sm md:text-base">
              Instant WhatsApp or Call access. No agency commission. Fast and reliable service for your home.
            </p>
          </div>

          {/* Worker Sub Card */}
          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-xl w-full md:w-80 space-y-3">
            <h3 className="font-bold text-emerald-400 text-sm">Are You a Skilled Worker?</h3>
            <p className="text-xs text-slate-300">
              Get direct customer calls daily. Register your profile today.
            </p>
            <div className="text-lg font-bold text-white">
              ₹99 <span className="text-xs font-normal text-slate-400">/ 30 Days</span>
            </div>
            <a
              href="#worker-register"
              className="block text-center w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm py-2 rounded-lg transition"
            >
              Add Profile Now
            </a>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY SELECTOR & FILTER */}
      <section className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-xl text-slate-800">Select Skilled Category</h3>
          <span className="text-xs text-slate-500">{filteredWorkers.length} Workers Available</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? "bg-emerald-600 text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 4. WORKER LIST (CUSTOMER DASHBOARD) */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row gap-4 items-center"
            >
              <img
                src={worker.image}
                alt={worker.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500"
              />

              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h4 className="font-bold text-lg text-slate-900">{worker.name}</h4>
                  {worker.verified && (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Verified ✓
                    </span>
                  )}
                </div>

                <p className="text-sm font-medium text-emerald-600">
                  {worker.category} • {worker.experience}
                </p>

                <p className="text-xs text-slate-500">
                  📍 {worker.location} • ★ {worker.rating} ({worker.reviews} Reviews)
                </p>

                {/* Direct Connect Buttons */}
                <div className="flex gap-2 pt-2 justify-center sm:justify-start">
                  <a
                    href={`tel:${worker.phone}`}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 px-3 rounded-lg text-center"
                  >
                    📞 Call Now
                  </a>
                  <a
                    href={`https://wa.me/${worker.phone}?text=Hello%20${worker.name},%20I%20found%20your%20profile%20on%20NINT.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold py-2 px-3 rounded-lg text-center"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. WORKER REGISTRATION SECTION */}
      <section id="worker-register" className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-md space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">Worker Profile Registration</h3>
            <p className="text-sm text-slate-600">
              Fill in your details, pay ₹99 for 30 days, and start receiving direct work calls.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Mobile / WhatsApp Number
                </label>
                <input
                  type="text"
                  placeholder="10-digit mobile number"
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Skill Category
                </label>
                <select className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                  <option>Electrician</option>
                  <option>Plumber</option>
                  <option>Carpenter</option>
                  <option>Painter</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Location / City
              </label>
              <input
                type="text"
                placeholder="e.g. Peddapalli"
                className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-bold text-sm text-slate-900">30 Days Subscription Fee</p>
                <p className="text-xs text-slate-500">Your profile will stay active for 1 month</p>
              </div>
              <span className="text-xl font-black text-emerald-600">₹99</span>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition text-sm"
            >
              Pay ₹99 & Submit Profile
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}