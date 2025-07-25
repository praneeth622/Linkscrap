'use client';

import { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David Kim",
    role: "Freelance Photographer",
    content: "The reliability is top-notch. My page is always online, fast to load, and looks great on any device. Highly recommended.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Creative Director",
    content: "Linkscap transformed how I showcase my portfolio.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    role: "Content Creator",
    content: "The analytics insights are game-changing for my content strategy.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Elena Vasquez",
    role: "Startup Founder",
    content: "Finally, a tool that gets the job done without the complexity. It's fast, mobile-friendly, and just works.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Olivia Garcia",
    role: "Online Coach",
    content: "The monetization features are a huge plus. Being able to take live and sell digital products is amazing.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Liam Martinez",
    role: "Fitness Influencer",
    content: "It's not just links; it's a mini-website. The block system helps me build a truly unique page for my followers.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 7,
    name: "Sophia Nguyen",
    role: "E-commerce Specialist",
    content: "The custom domain feature makes my brand look so much more professional. It's a small detail with a big impact.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 8,
    name: "Noah Wilson",
    role: "Small Business Owner",
    content: "Customer support is fantastic. I had a question and they got me a solution in minutes.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face"
  }
];

// Create two rows for infinite scroll effect
const firstRow = testimonials.slice(0, 4);
const secondRow = testimonials.slice(4, 8);

export default function TestimonialHorizontal() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold font-sf-pro mb-6 text-white">
            Trusted by <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">innovators</span> worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Hear from creators, founders, and professionals who use Linkscap to build their brand and connect with their audience.
          </p>
        </div>

        {/* Testimonials Grid with Horizontal Animation */}
        <div className={`relative transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* First Row - Moving Right */}
          <div className="mb-8 overflow-hidden">
            <div className="flex animate-scroll-right space-x-6">
              {[...firstRow, ...firstRow].map((testimonial, index) => (
                <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Second Row - Moving Left */}
          <div className="overflow-hidden">
            <div className="flex animate-scroll-left space-x-6">
              {[...secondRow, ...secondRow].map((testimonial, index) => (
                <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-80 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote className="w-8 h-8 text-purple-400 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      {/* Content */}
      <p className="text-gray-200 mb-6 leading-relaxed text-sm group-hover:text-white transition-colors duration-300">
        "{testimonial.content}"
      </p>
      
      {/* Author */}
      <div className="flex items-center">
        <div className="relative">
          <img 
            src={testimonial.avatar} 
            alt={testimonial.name}
            className="w-12 h-12 rounded-full border-2 border-purple-400/30 group-hover:border-purple-400/60 transition-all duration-300"
          />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-blue-400/20 group-hover:from-purple-400/30 group-hover:to-blue-400/30 transition-all duration-300"></div>
        </div>
        <div className="ml-4">
          <h4 className="font-semibold text-white group-hover:text-purple-200 transition-colors duration-300">
            {testimonial.name}
          </h4>
          <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
}
