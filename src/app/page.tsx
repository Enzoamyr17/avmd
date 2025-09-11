"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [snapMode, setSnapMode] = useState(false);
  const [lastScrollTime, setLastScrollTime] = useState(0);
  
  // Define sections for scroll snapping
  const sections = [
    'hero',
    'build-scale',
    'four-steps', 
    'our-works',
    'testimonials',
    'our-team',
    'contact-us'
  ];
  
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

  const testimonialItems = [
    { 
      id: 1, 
      name: "Sarah Johnson",
      company: "Tech Innovators Inc",
      testimonial: "AVM Digital transformed our online presence completely. Their attention to detail and innovative approach exceeded our expectations."
    },
    { 
      id: 2, 
      name: "Michael Chen",
      company: "StartupCorp",
      testimonial: "The team delivered our project on time and within budget. The quality of their work speaks for itself."
    },
    { 
      id: 3, 
      name: "Emily Rodriguez",
      company: "Digital Solutions Ltd",
      testimonial: "Outstanding service and technical expertise. They understood our needs perfectly and delivered exactly what we wanted."
    },
    { 
      id: 4, 
      name: "David Thompson",
      company: "Enterprise Systems",
      testimonial: "Professional, reliable, and innovative. Working with AVM Digital was one of our best decisions this year."
    },
    { 
      id: 5, 
      name: "Lisa Park",
      company: "Creative Agency Co",
      testimonial: "Their creative vision and technical skills are unmatched. They brought our ideas to life beautifully."
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Alex Rodriguez",
      role: "Lead Developer & Co-Founder",
      specialization: "Full-Stack Development",
      description: "Expert in React, Next.js, and Node.js with 8+ years of experience building scalable web applications."
    },
    {
      id: 2,
      name: "Maria Santos",
      role: "UI/UX Designer & Co-Founder",
      specialization: "User Experience Design",
      description: "Creative visionary specializing in user-centered design and modern interface development."
    },
    {
      id: 3,
      name: "David Chen",
      role: "Backend Engineer",
      specialization: "System Architecture",
      description: "Database and server infrastructure specialist with expertise in cloud technologies and API development."
    },
    {
      id: 4,
      name: "Sophie Williams",
      role: "Project Manager",
      specialization: "Digital Strategy",
      description: "Ensures seamless project delivery and client communication while coordinating development workflows."
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

  const nextTestimonialSlide = () => {
    setCurrentTestimonialSlide((prev) => (prev + 1) % testimonialItems.length);
  };

  const prevTestimonialSlide = () => {
    setCurrentTestimonialSlide((prev) => (prev - 1 + testimonialItems.length) % testimonialItems.length);
  };

  const goToTestimonialSlide = (index: number) => {
    setCurrentTestimonialSlide(index);
  };

  // Scroll snapping functions
  const scrollToSection = (sectionIndex: number) => {
    if (sectionIndex < 0 || sectionIndex >= sections.length) return;
    
    const sectionId = sections[sectionIndex];
    const element = document.getElementById(sectionId);
    
    if (element) {
      setIsScrolling(true);
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(sectionIndex);
      
      // Reset scrolling flag after animation
      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    }
  };

  // Update current section based on scroll position
  const updateCurrentSection = () => {
    if (isScrolling) return;
    
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const element = document.getElementById(sections[i]);
      if (element && element.offsetTop <= scrollPosition) {
        if (i !== currentSection) {
          setCurrentSection(i);
        }
        break;
      }
    }
  };

  const handleWheel = (e: WheelEvent) => {
    const currentTime = Date.now();
    const timeSinceLastScroll = currentTime - lastScrollTime;
    
    // If currently animating, prevent all scrolling
    if (isScrolling) {
      e.preventDefault();
      return;
    }
    
    // Check if user is doing rapid scrolling (likely trying to scroll within content)
    const isRapidScrolling = timeSinceLastScroll < 150;
    
    // Check scroll magnitude - large scrolls indicate intentional section jumping
    const isLargeScroll = Math.abs(e.deltaY) > 50;
    
    // Activate snap mode if user does a large scroll or if already in snap mode
    if (isLargeScroll && !isRapidScrolling) {
      setSnapMode(true);
    }
    
    // If in snap mode and not rapid scrolling, do section snapping
    if (snapMode && !isRapidScrolling && isLargeScroll) {
      e.preventDefault();
      
      if (e.deltaY > 0) {
        // Scroll down
        if (currentSection < sections.length - 1) {
          scrollToSection(currentSection + 1);
        }
      } else {
        // Scroll up
        if (currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    }
    // Otherwise allow normal scrolling
    
    setLastScrollTime(currentTime);
    
    // Reset snap mode after period of inactivity
    setTimeout(() => {
      if (Date.now() - currentTime > 2000) {
        setSnapMode(false);
      }
    }, 2000);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      const existingLink = document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]');
      if (existingScript) existingScript.remove();
      if (existingLink) existingLink.remove();
    };
  }, []);

  // Add scroll snapping event listener
  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, isScrolling, snapMode, lastScrollTime]);

  // Add scroll listener to track current section during normal scrolling
  useEffect(() => {
    const handleScroll = () => {
      updateCurrentSection();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection, isScrolling]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen h-auto w-full overflow-x-hidden">
      
      {/* Header Section */}
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

      {/* Hero Section */}
      <div className="fixed top-10 left-0 w-full h-[100vh] flex flex-col justify-evenly items-start pt-5 z-10">
        <motion.h1 
          className="text-[4.5vw] leading-[0.8] tracking-wider font-regular pl-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Websites, Applications, and much more
        </motion.h1>
        <div className="flex flex-nowrap justify-center items-start">
          <motion.h1 
            className="font-roboto-slab font-black text-[#2DC5FF] -tracking-[0.1vw] text-[17vw] leading-[0.95] w-auto pl-0"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Designed <span className="-tracking-[0.30vw]">Delivered</span>
          </motion.h1>
          <div className="relative flex flex-nowrap">
            <motion.h1 
              className="absolute top-0 right-6 -translate-y-1/4 font-roboto-slab font-black text-[#2DC5FF] text-[40vw]"
              initial={{ opacity: 0, y: 150, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            >
              &
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Space for Hero Section */}
      <div id="hero" className="w-full h-[100vh] z-0 spacer snap-start"></div>

      {/* Build. Scale. Dominate. Section */}
      <div id="build-scale" className="flex justify-between items-center leading-[1.2] gap-2 p-14 w-full h-[100vh] bg-[#346D53] z-20 snap-start">
        <motion.div 
          className="flex justify-center items-center w-2/3 h-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-3/4 h-3/4 border border-white/30 rounded-lg bg-white/20">

          </div>
        </motion.div>
        <motion.div 
          className="flex flex-col justify-center gap-6 items-start px-2 w-1/3 h-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-6xl tracking-tight font-bold">Build. Scale. Dominate.</h1>
          <h2 className="text-4xl font-thin">—The digital advantage.</h2>
          <p className="text-2xl font-light tracking-wide pl-2 pr-18">From simple websites to complex systems, we create digital solutions that drive results.</p>

          <div className="flex justify-end items-center w-3/4 gap-2">
            <button onClick={() => document.getElementById("contact-us")?.scrollIntoView({ behavior: "smooth" })} className="bg-[#2DC5FF]  px-4 py-2 rounded-full font-bold text-md tracking-wide">Send a Proposal</button>
          </div>
        </motion.div>
      </div>

      {/* 4 steps Section */}
      <div id="four-steps" className="flex flex-row-reverse justify-between items-center leading-[1.2] gap-2 p-14 w-full h-[100vh] bg-[#FFB742] z-20 snap-start">
        <motion.div 
          className="flex justify-center items-center w-2/3 h-full"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 grid-rows-2 gap-2 w-3/4 h-3/4">
            <motion.div 
              className="rounded-lg bg-white/30 border w-full h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            ></motion.div>
            <motion.div 
              className="rounded-lg bg-white/30 border w-full h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            ></motion.div>
            <motion.div 
              className="rounded-lg bg-white/30 border w-full h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            ></motion.div>
            <motion.div 
              className="rounded-lg bg-white/30 border w-full h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
            ></motion.div>
          </div>
        </motion.div>
        <motion.div 
          className="flex flex-col justify-center gap-6 items-end text-right px-2 w-1/3 h-full"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-6xl tracking-wide font-bold">4 Steps.</h1>
          <p className="">Transform your business with our 4-step process that just works.</p>
        </motion.div>
      </div>

      {/* Our Works Section */}
      <div id="our-works" className="flex flex-col justify-evenly items-center leading-[1.2] gap-8 p-14 w-full h-[100vh] bg-gradient-to-br from-orange-400 to-orange-600 z-20 snap-start">
        <motion.div 
          className="flex flex-col justify-center gap-6 text-center px-2 py-4 w-full"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl tracking-wide font-bold">Our Works.</h1>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 justify-center gap-6 items-center px-2 w-full h-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >

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
            <h1 className="text-4xl font-roboto-slab font-bold text-white leading-tight">{portfolioItems[currentSlide].title}</h1>
            <p className="leading-relaxed">{portfolioItems[currentSlide].description}</p>
            <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 border border-white/30">
              View Project
            </button>
          </div>

        </motion.div>
        
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="flex flex-col justify-evenly items-center leading-[1.2] gap-8 p-14 w-full h-[100vh] bg-gradient-to-br from-purple-400 to-purple-600 z-20 snap-start">
        <motion.div 
          className="flex flex-col justify-center gap-6 text-center px-2 py-4 w-full"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl tracking-wide font-bold text-white">Testimonials</h1>
        </motion.div>

        <motion.div 
          className="flex justify-center items-center px-2 w-full h-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative w-full max-w-4xl h-96">
            {/* Carousel Items */}
            <div className="relative w-full h-full overflow-hidden rounded-xl">
              <div 
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonialSlide * 100}%)` }}
              >
                {testimonialItems.map((item) => (
                  <div key={item.id} className="flex-shrink-0 w-full h-full">
                    <div className="flex flex-col justify-center items-center h-full bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-8 mx-2">
                      <div className="text-center space-y-6">
                        <div className="text-6xl text-white/30 mb-4">&ldquo;</div>
                        <p className="text-xl text-white leading-relaxed italic mb-8">
                          {item.testimonial}
                        </p>
                        <div className="space-y-2">
                          <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                          <p className="text-lg text-white/80">{item.company}</p>
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
                onClick={prevTestimonialSlide}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 group"
              >
                <svg className="w-5 h-5 text-white group-hover:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex items-center gap-3">
                {testimonialItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonialSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentTestimonialSlide === index 
                        ? 'bg-white scale-125 shadow-lg' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                onClick={nextTestimonialSlide}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all duration-200 group"
              >
                <svg className="w-5 h-5 text-white group-hover:text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
        
      </div>

      {/* Our Team Section */}
      <div id="our-team" className="flex flex-col justify-evenly items-center leading-[1.2] gap-8 p-14 w-full h-[100vh] bg-gradient-to-br from-green-400 to-green-600 z-20 snap-start">
        <motion.div 
          className="flex flex-col justify-center gap-6 text-center px-2 py-4 w-full"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl tracking-wide font-bold text-white">Our Team</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">Meet the talented individuals behind AVM Digital who bring your vision to life</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div 
              key={member.id} 
              className="flex flex-col items-center text-center bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/25 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              <div className="w-32 h-32 bg-white/30 rounded-full mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
              <h4 className="text-lg font-semibold text-white/90 mb-1">{member.role}</h4>
              <p className="text-sm text-white/80 font-medium mb-4">{member.specialization}</p>
              <p className="text-sm text-white/75 leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center text-white/90 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-lg">Ready to work with our team? <button onClick={() => document.getElementById("contact-us")?.scrollIntoView({ behavior: "smooth" })} className="underline hover:text-white transition-colors cursor-pointer">Get in touch</button> and let&apos;s create something amazing together.</p>
        </motion.div>
      </div>
      
      {/* Contact Us Section */}
      <div 
        id="contact-us" 
        className="flex flex-col justify-evenly items-center leading-[1.2] gap-8 p-14 w-full h-[100vh] bg-[#2DC5FF] z-20 snap-start"
      >
        <motion.div 
          className="flex flex-col justify-center gap-6 text-center px-2 py-4 w-full"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl tracking-wide font-bold text-white">Let&apos;s Work Together</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Ready to transform your business? Schedule a consultation with our team to discuss your project and get started.</p>
        </motion.div>
        <motion.div 
          className="flex justify-center items-center w-full max-w-4xl h-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div 
            className="calendly-inline-widget w-full h-[700px]" 
            data-url="https://calendly.com/gregoriorenzo05"
            style={{ minWidth: '320px' }}
          ></div>
        </motion.div>
        <motion.div 
          className="text-center text-white/80 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-sm">Don&apos;t have time right now? <a href="mailto:sample.email@avmdigital.com" className="underline hover:text-white transition-colors">Send us an email</a> and we&apos;ll get back to you within 24 hours.</p>
        </motion.div>
      </div>

    </div>
  );
}
