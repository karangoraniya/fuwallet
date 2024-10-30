'use client'
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import BenefitCard from "@/components/BenefitCard"
import FeatureCard from "@/components/FeatureCard"
import StepCard from "@/components/StepCard"
interface Position {
  x: number
  y: number
}


export default function FuwalletHomepage() {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 })
  const [isMoving, setIsMoving] = useState(false)
  const [heroRect, setHeroRect] = useState<DOMRect | null>(null)
  const [loading, setLoading] = useState(true)  // State to manage loading
  const router = useRouter()

  const checkWalletData = () => {
    const seedPhrase = localStorage.getItem("seedPhrase");
    const walletAddress = localStorage.getItem("walletAddress");
    const privateKey = localStorage.getItem("privateKey");

    // Check if the required wallet data exists
    if (seedPhrase && walletAddress && privateKey) {
      router.push("/dashboard");
    } else {
      setLoading(false);  // Set loading to false if data is not valid
    }
  };

  useEffect(() => {
    checkWalletData();
  }, []);

  useEffect(() => {
    const updateHeroRect = () => {
      const heroSection = document.getElementById('hero-section')
      if (heroSection) {
        setHeroRect(heroSection.getBoundingClientRect())
      }
    }

    updateHeroRect()
    window.addEventListener('resize', updateHeroRect)
    return () => window.removeEventListener('resize', updateHeroRect)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!heroRect) return

    if (
      e.clientY >= heroRect.top &&
      e.clientY <= heroRect.bottom &&
      e.clientX >= heroRect.left &&
      e.clientX <= heroRect.right
    ) {
      if (!isMoving) {
        window.requestAnimationFrame(() => {
          setMousePosition({
            x: e.clientX,
            y: e.clientY - heroRect.top
          })
          setIsMoving(false)
        })
        setIsMoving(true)
      }
    }
  }, [isMoving, heroRect])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section with Moving Background */}
      <section 
        id="hero-section" 
        className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
      >
        {/* Moving Background */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: `radial-gradient(
              circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(99, 102, 241, 0.15) 0%,
              rgba(99, 102, 241, 0.05) 25%,
              rgba(99, 102, 241, 0) 50%
            )`
          }}
          animate={{ opacity: isMoving ? 0.8 : 1 }}
          transition={{ duration: 0.3 }}
          aria-hidden="true"
        />
        <div className="container relative mx-auto px-4">
          {/* Hero Content */}
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <h1 className="mb-6 animate-fade-in text-5xl font-bold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
              Secure & Efficient{" "}
              <span className="animate-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text bg-300% text-transparent">
                Crypto Wallet
              </span>
            </h1>
            <p className="mb-8 text-xl text-gray-400">
              Manage your digital assets with ease and confidence
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href="/create-wallet">
                <Button
                  className="group w-full bg-blue-500 px-8 py-3 text-lg transition-all duration-300 hover:bg-blue-600 hover:shadow-lg sm:w-auto"
                  variant="default"
                >
                  Create Wallet
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/import-wallet">
                <Button
                  className="group w-full bg-green-500 px-8 py-3 text-lg transition-all duration-300 hover:bg-green-600 hover:shadow-lg sm:w-auto"
                  variant="default"
                >
                  Import Wallet
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-blue-400" />}
              title="Bank-Grade Security"
              description="Your assets are protected with state-of-the-art encryption and security measures."
            />
            <FeatureCard
              icon={<Zap className="h-12 w-12 text-green-400" />}
              title="Lightning-Fast Transactions"
              description="Experience near-instantaneous transfers across multiple blockchain networks."
            />
            <FeatureCard
              icon={<RefreshCw className="h-12 w-12 text-purple-400" />}
              title="Multi-Chain Support"
              description="Seamlessly manage assets across various blockchain ecosystems in one place."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              number={1}
              title="Create or Import"
              description="Set up a new wallet or import an existing one"
            />
            <StepCard
              number={2}
              title="Secure Your Assets"
              description="Safely store and manage your cryptocurrencies"
            />
            <StepCard
              number={3}
              title="Transact with Ease"
              description="Send, receive, and swap assets effortlessly"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-4xl font-bold">Why Choose Fuwallet</h2>
          <div className="flex items-center justify-center gap-5">
            <BenefitCard
              title="User-Friendly Interface"
              description="Intuitive design for both beginners and experts"
            />
            <BenefitCard
              title="Regular Updates"
              description="Stay ahead with the latest features and improvements"
            />
          </div>
        </div>
      </section>
    </main>
  )
}





