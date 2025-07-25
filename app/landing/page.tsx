'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Globe, 
  Users, 
  TrendingUp, 
  Star, 
  Play, 
  ChevronDown, 
  MousePointer, 
  Layers, 
  Cpu,
  Menu,
  X,
  Mail,
  Check
} from 'lucide-react'
import './landing.css'
import { TestimonialSection } from '@/components/testimonial-section'

// Animation variants for staggered children
const container = {
  show: { 
    transition: { 
      staggerChildren: 0.14 
    } 
  },
  hidden: {},
}

const child = {
  hidden: { opacity: 0, y: 35 },
  show: {
    opacity: 1,
    y: 0
  },
}

// Generate static particle positions to avoid hydration mismatch
const generateParticlePositions = () => {
  const positions = []
  for (let i = 0; i < 30; i++) {
    positions.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 2
    })
  }
  return positions
}

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.44, 0, 0.56, 1] }}
    >
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="text-2xl font-bold text-glow-cyan"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Linkscrap
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {['Features', 'About', 'Pricing', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="navbar-item text-sm font-medium"
                variants={child}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.button
              className="cta-button text-sm px-6 py-2"
              variants={child}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-cyan-500/20"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 space-y-4">
                {['Features', 'About', 'Pricing', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block navbar-item py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button className="cta-button w-full py-3 mt-4">
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

// Hero Section Component
const HeroSection = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  
  // Use useMemo to generate static particle positions
  const particlePositions = useMemo(() => generateParticlePositions(), [])

  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Parallax Background */}
      <div className="parallax-bg" />
      
      {/* Floating Particles - using static positions */}
      {particlePositions.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-40"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      <div className="container-responsive text-center relative z-10">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 backdrop-blur-sm mb-8 hero-accent-glow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.44, 0, 0.56, 1] }}
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-cyan-400 font-medium">Next-Gen Digital Experience</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-8 leading-tight hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.44, 0, 0.56, 1] }}
        >
          Transform Your
          <br />
          <span className="text-glow-cyan">Digital Vision</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.44, 0, 0.56, 1] }}
        >
          Experience the future of web technology with our cutting-edge platform designed for creators, innovators, and visionaries.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.44, 0, 0.56, 1] }}
        >
          <motion.button 
            className="cta-button flex items-center gap-3 px-8 py-4 text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Creating
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </motion.button>

          <motion.button 
            className="flex items-center gap-3 px-8 py-4 border border-gray-600 rounded-xl font-semibold text-white hover:border-cyan-400 transition-all duration-300"
            whileHover={{ scale: 1.05, borderColor: '#00ffff' }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            Watch Demo
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </motion.div>
    </motion.section>
  )
}

// Feature Card Component
type FeatureCardProps = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  delay?: number
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className="feature-card p-8 stagger-item"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.44, 0, 0.56, 1]
      }}
      whileHover={{ scale: 1.03 }}
    >
      <motion.div
        className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-6"
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        <Icon className="w-6 h-6 text-white" />
      </motion.div>
      
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </motion.div>
  )
}

// Features Section
const FeaturesSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: Zap,
      title: "Lightning Performance",
      description: "Experience blazing-fast load times with our optimized architecture and cutting-edge technology stack."
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Reach audiences worldwide with our globally distributed infrastructure and CDN network."
    },
    {
      icon: Users,
      title: "Collaborative Tools",
      description: "Work seamlessly with your team using our real-time collaboration features and shared workspaces."
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Gain deep insights into your performance with comprehensive analytics and reporting tools."
    },
    {
      icon: Star,
      title: "Premium Quality",
      description: "Every detail is crafted with precision to deliver an exceptional user experience."
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "Leverage artificial intelligence to automate workflows and enhance your productivity."
    }
  ]

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="container-responsive">
        <div className="text-center mb-20">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: [0.44, 0, 0.56, 1] }}
          >
            Powerful Features
          </motion.h2>
          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.44, 0, 0.56, 1] }}
          >
            Discover the tools and capabilities that make our platform the choice of industry leaders and innovative teams.
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.12}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Stats Section
const StatsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [counts, setCounts] = useState({ users: 0, projects: 0, countries: 0, uptime: 0 })

  const stats = [
    { label: "Active Users", value: 50000, suffix: "+" },
    { label: "Projects Created", value: 250000, suffix: "+" },
    { label: "Countries", value: 120, suffix: "+" },
    { label: "Uptime", value: 99.9, suffix: "%" }
  ]

  useEffect(() => {
    if (isInView) {
      const timers = stats.map((stat, index) => {
        return setTimeout(() => {
          let start = 0
          const end = stat.value
          const duration = 1500
          const increment = end / (duration / 16)
          
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              start = end
              clearInterval(timer)
            }
            setCounts(prev => ({
              ...prev,
              [Object.keys(prev)[index]]: Math.floor(start)
            }))
          }, 16)
        }, index * 200)
      })

      return () => timers.forEach(clearTimeout)
    }
  }, [isInView])

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="container-responsive">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 0.8, ease: [0.44, 0, 0.56, 1] }}
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <motion.div
                className="stats-counter text-4xl md:text-5xl font-bold mb-2"
                initial={{ scale: 0.5 }}
                animate={isInView ? { scale: 1 } : { scale: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {Object.values(counts)[index]}{stat.suffix}
              </motion.div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// Newsletter Section
const NewsletterSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="container-responsive">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.44, 0, 0.56, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 hero-title">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Get the latest updates, features, and insights delivered to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="newsletter-input flex-1 px-4 py-3 rounded-lg"
              required
            />
            <motion.button
              type="submit"
              className="newsletter-button px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                <>
                  <Check className="w-4 h-4" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section
const CTASection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="container-responsive text-center">
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-8 hero-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.44, 0, 0.56, 1] }}
        >
          Ready to Get Started?
        </motion.h2>
        
        <motion.p
          className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.44, 0, 0.56, 1] }}
        >
          Join thousands of creators and businesses who are already transforming their digital presence with our platform.
        </motion.p>

        <motion.button
          className="cta-button px-12 py-6 text-lg font-bold"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.44, 0, 0.56, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Your Journey Today
        </motion.button>
      </div>
    </section>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="py-16 border-t border-gray-800 relative">
      <div className="container-responsive">
        <div className="text-center">
          <motion.div
            className="text-2xl font-bold mb-4 text-glow-cyan"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Linkscrap
          </motion.div>
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            © 2024 Linkscrap. Crafted with precision and innovation.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}

// Main Landing Page Component
export default function LandingPage() {
  useEffect(() => {
    // Check if we're in the browser before importing Lenis
    if (typeof window !== 'undefined') {
      import('lenis').then((Lenis) => {
        const lenis = new Lenis.default({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        })

        function raf(time: number) {
          lenis.raf(time)
          requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
          lenis.destroy()
        }
      })
    }
  }, [])

  return (
    <div className="landing-page">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialSection />
      <NewsletterSection />
      <CTASection />
      <Footer />
    </div>
  )
}