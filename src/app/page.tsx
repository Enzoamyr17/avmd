"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const portfolioItems = [
    { 
      id: 1, 
      title: "E-commerce Platform", 
      description: "A comprehensive online shopping platform featuring advanced product filtering, secure payment processing, and inventory management. Built with modern React components and optimized for mobile-first experiences. Includes admin dashboard, customer analytics, and seamless checkout flow."
    },
    { 
      id: 2, 
      title: "SaaS Dashboard", 
      description: "Enterprise-grade analytics and reporting dashboard for business intelligence. Features real-time data visualization, customizable widgets, and advanced filtering capabilities. Integrated with multiple data sources and built for scalability with role-based access control."
    },
    { 
      id: 3, 
      title: "Mobile App", 
      description: "Cross-platform mobile application developed with React Native for iOS and Android. Features offline functionality, push notifications, and seamless cloud synchronization. Optimized for performance with native-like user experience and modern UI/UX design patterns."
    },
    { 
      id: 4, 
      title: "Corporate Website", 
      description: "Professional corporate website with content management system, SEO optimization, and responsive design. Features dynamic content sections, integrated contact forms, and performance optimization. Built with accessibility standards and modern web technologies."
    },
    { 
      id: 5, 
      title: "Web Application", 
      description: "Custom business solution with complex workflow management, user authentication, and data processing capabilities. Features automated reporting, API integrations, and scalable architecture. Designed for high-traffic environments with enterprise security standards."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % portfolioItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen h-auto w-full overflow-x-hidden">

      <div className="fixed top-0 left-0 w-full flex justify-between items-center py-1 px-8 z-50 bg-background">
        <div className="w-1/3 flex justify-start gap-4">
          <h1 className="text-md tracking-wide font-semibold">sample.email@avmdigital.com</h1>
        </div>
        <div className="w-1/3 flex justify-center">
          <Image src="/logoWide.png" alt="AVM Digital" width={128} height={40} />
        </div>

        <div className="w-1/3 flex justify-end gap-4">
          <button onClick={() => document.getElementById("contact-us")?.scrollIntoView({ behavior: "smooth" })} className="flex gap-2 justify-evenly items-center bg-[#2DC5FF] text-white px-4 rounded-full font-bold text-md tracking-wide">
            <Phone className="size-4" />Contact Us
          </button>
        </div>
      </div>

      <div className="fixed top-10 left-0 w-full h-auto flex flex-col justify-evenly items-start py-1 z-10">
        <h1 className="text-[5vw] leading-[1] font-bold">Websites, Applications, and much more</h1>
        <h1 className="font-bevan text-[#2DC5FF] -tracking-[0.4vw] text-[16.4vw] leading-[0.95] w-auto">Designed & <span className="-tracking-[0.69vw]">Delivered</span></h1>
      </div>

      {/* Space for the fixed elements */}
      <div className="w-full h-[72vh]"></div>

      {/* First Section */}
      <div className="flex justify-between items-center leading-[1.2] gap-2 p-14 w-full h-[calc(100vh+20px)] bg-[#346D53] z-20">
        <div className="flex justify-center items-center w-2/3 h-full">
          <div className="w-3/4 h-3/4 border border-white/30 rounded-lg bg-white/20">

          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 items-start px-2 w-1/3 h-full">
          <h1 className="text-6xl tracking-wide font-bold">Build. Scale. Dominate.</h1>
          <h1 className="text-4xl tracking-wide font-light">—The digital advantage.</h1>
          <p className="text-2xl tracking-wide pl-2 pr-18">From simple websites to complex systems, we create digital solutions that drive results.</p>

          <div className="flex justify-end items-center w-3/4 gap-2">
            <button onClick={() => document.getElementById("contact-us")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#2DC5FF]  px-4 py-2 rounded-full font-bold text-md tracking-wide">Send a Proposal</button>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex flex-row-reverse justify-between items-center leading-[1.2] gap-2 p-14 w-full h-[calc(100vh+20px)] bg-[#FFB742] z-20">
        <div className="flex justify-center items-center w-2/3 h-full">
          <div className="grid grid-cols-2 grid-rows-2 gap-2 w-3/4 h-3/4">
            <div className="rounded-lg bg-white/30 border w-full h-full"></div>
            <div className="rounded-lg bg-white/30 border w-full h-full"></div>
            <div className="rounded-lg bg-white/30 border w-full h-full"></div>
            <div className="rounded-lg bg-white/30 border w-full h-full"></div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-6 items-end text-right px-2 w-1/3 h-full">
          <h1 className="text-6xl tracking-wide font-bold">4 Steps.</h1>
          <p className="text-4xl tracking-wide">Transform your business with our 4-step process that just works.</p>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="flex flex-col justify-evenly items-center leading-[1.2] gap-8 p-14 w-full h-[calc(100vh+20px)] bg-gradient-to-br from-orange-400 to-orange-600 z-20">
        <div className="flex flex-col justify-center gap-6 text-center px-2 py-4 w-full">
          <h1 className="text-6xl tracking-wide font-bold">Our Works.</h1>
        </div>

        <div className="grid grid-cols-2 justify-center gap-6 items-center px-2 w-full h-auto">

          <div>
              {/* Carousel Container */}
            <div className="relative w-full max-w-5xl h-140">
              {/* Navigation Buttons */}

              
             

              {/* Carousel Items */}
              <div className="relative w-full h-full overflow-hidden rounded-xl">
                <div 
                  className="flex h-full transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {portfolioItems.map((item) => (
                    <div key={item.id} className="flex-shrink-0 w-full h-full">
                      <div className="flex flex-col justify-center items-center h-full bg-white/30 backdrop-blur-sm border border-white/20 rounded-xl p-2 mx-2">
                        <div className="w-full h-3/4 bg-white/20 rounded-lg mb-4 flex items-center justify-center">
                          <div className="text-center text-white/80">
                            <div className="w-16 h-16 bg-white/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                              <span className="text-2xl font-bold">{item.id}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                            <p className="text-lg opacity-90">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Navigation and Pagination */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button 
                  onClick={prevSlide}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="flex items-center gap-3">
                  {portfolioItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index 
                          ? 'bg-white scale-125 shadow-lg' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={nextSlide}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 group"
                >
                  <svg className="w-5 h-5 text-white group-hover:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            
          </div>

          <div className="border border-white/30 bg-white/10 backdrop-blur-sm rounded-xl w-full h-full flex flex-col justify-center items-start p-8 gap-6">
            <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center mb-4">
              <span className="text-xl font-bold text-white">{portfolioItems[currentSlide].id}</span>
            </div>
            <h2 className="text-4xl font-bold text-white leading-tight">{portfolioItems[currentSlide].title}</h2>
            <p className="text-lg text-white/90 leading-relaxed">{portfolioItems[currentSlide].description}</p>
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 border border-white/30">
              View Project
            </button>
          </div>

        </div>
        
      </div>

      {/* Testimonials Section */}
      <div className="flex flex-col justify-evenly items-center leading-[1.2] gap-2 p-14 w-full h-[calc(100vh+20px)] bg-background z-20">
        <div className="flex flex-col justify-center gap-6 text-center px-2 py-4 w-full">
          <h1 className="text-6xl tracking-wide font-bold">Testimonials</h1>
        </div>
        <div className="flex justify-center-safe items-center gap-2 p-4 w-1/2 h-auto overflow-x-scroll">
          <div className="flex-shrink-0 justify-center gap-6 text-center px-2 py-4 w-100 h-135 border bg-white/30 rounded-lg"></div>
          <div className="flex-shrink-0 justify-center gap-6 text-center px-2 py-4 w-100 h-135 border bg-white/30 rounded-lg"></div>
          <div className="flex-shrink-0 justify-center gap-6 text-center px-2 py-4 w-100 h-135 border bg-white/30 rounded-lg"></div>
          <div className="flex-shrink-0 justify-center gap-6 text-center px-2 py-4 w-100 h-135 border bg-white/30 rounded-lg"></div>
          <div className="flex-shrink-0 justify-center gap-6 text-center px-2 py-4 w-100 h-135 border bg-white/30 rounded-lg"></div>
          <div className="flex-shrink-0 justify-center gap-6 text-center px-2 py-4 w-100 h-135 border bg-white/30 rounded-lg"></div>
          <div className="flex-shrink-0 justify-center gap-6 text-center px-2 py-4 w-100 h-135 border bg-white/30 rounded-lg"></div>

        </div>
      </div>
      
      {/* Contact Us Section */}
      <div id="contact-us" className="flex flex-col justify-evenly items-center leading-[1.2] gap-2 p-14 w-full h-[calc(100vh+20px)] bg-[#2DC5FF] z-20">
        <div className="flex flex-col justify-center gap-6 text-center px-2 py-4 w-full">
          <h1 className="text-6xl tracking-wide font-bold">Let&apos;s Work Together</h1>
        </div>
        <div className="flex justify-center-safe items-center gap-2 p-4 w-3/4 h-3/5 overflow-x-scroll border">
         <h1>Calendly Area</h1>

        </div>
      </div>

    </div>
  );
}
