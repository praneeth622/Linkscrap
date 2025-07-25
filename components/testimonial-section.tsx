'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Quote } from 'lucide-react'

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    quote: "Linkscap transformed how I showcase my portfolio. The interface is intuitive and the results speak for themselves.",
    name: "Sarah Chen",
    role: "Creative Director",
    initials: "SC"
  },
  {
    id: 2,
    quote: "The analytics insights are game-changing for my content strategy. I can finally understand what resonates with my audience.",
    name: "Marcus Rodriguez",
    role: "Digital Marketer",
    initials: "MR"
  },
  {
    id: 3,
    quote: "Finally, a tool that gets the Gen Z workflow. It's fast, mobile-first, and just works without any learning curve.",
    name: "Zoe Kim",
    role: "Content Creator",
    initials: "ZK"
  },
  {
    id: 4,
    quote: "Linkscap helped me build my personal brand from scratch. The customization options are endless and professional.",
    name: "Alex Thompson",
    role: "Entrepreneur",
    initials: "AT"
  },
  {
    id: 5,
    quote: "The collaboration features make working with my team seamless. We've increased our productivity by 40% since switching.",
    name: "Maya Patel",
    role: "Product Manager",
    initials: "MP"
  },
  {
    id: 6,
    quote: "As an influencer, presentation is everything. Linkscap gives me the professional edge I need to stand out.",
    name: "Jordan Blake",
    role: "Social Media Influencer",
    initials: "JB"
  },
  {
    id: 7,
    quote: "The mobile experience is flawless. I can manage my entire online presence from my phone during commutes.",
    name: "Emma Wilson",
    role: "Freelance Designer",
    initials: "EW"
  },
  {
    id: 8,
    quote: "Linkscap's automation features save me hours every week. It's like having a personal assistant for my digital presence.",
    name: "David Park",
    role: "Tech Consultant",
    initials: "DP"
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0
  }
}

const headerVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0
  }
}

// Individual Testimonial Card Component
const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) => {
  return (
    <motion.article
      variants={cardVariants}
      className="group relative bg-[#121212] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 8px 25px rgba(0, 255, 255, 0.1)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Quote Icon */}
      <div className="mb-4">
        <Quote 
          className="w-8 h-8 text-cyan-400 opacity-60" 
          fill="currentColor"
        />
      </div>

      {/* Testimonial Text */}
      <blockquote className="mb-6">
        <p className="text-white text-base leading-relaxed font-normal">
          "{testimonial.quote}"
        </p>
      </blockquote>

      {/* User Info */}
      <figure className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm ring-2 ring-gray-700 group-hover:ring-cyan-400 transition-all duration-300">
            {testimonial.initials}
          </div>
        </div>
        <figcaption className="flex flex-col">
          <cite className="text-white font-bold text-sm not-italic">
            {testimonial.name}
          </cite>
          <span className="text-gray-400 text-xs">
            {testimonial.role}
          </span>
        </figcaption>
      </figure>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.article>
  )
}

// Main Testimonial Section Component
export const TestimonialSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px 0px -100px 0px" 
  })

  return (
    <section 
      ref={ref}
      className="bg-[#0D0D0D] py-20 px-6"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <motion.header 
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headerVariants}
        >
          <motion.h2 
            id="testimonials-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
            variants={headerVariants}
          >
            Trusted by innovators worldwide
          </motion.h2>
          <motion.p 
            className="text-[#CCCCCC] text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            variants={headerVariants}
          >
            Hear from creators, founders, and professionals who use Linkscap to build their brand and connect with their audience.
          </motion.p>
        </motion.header>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialSection