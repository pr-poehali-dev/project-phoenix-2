import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Section from './Section'
import Layout from './Layout'
import { sections } from './sections'

const NAV_LABELS = ['Главная', 'О формате', 'Расписание', 'Ведущие', 'Вопросы', 'Участие']

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPosition = containerRef.current.scrollTop
        const windowHeight = window.innerHeight
        const newActiveSection = Math.floor((scrollPosition + windowHeight * 0.3) / windowHeight)
        setActiveSection(Math.min(newActiveSection, sections.length - 1))
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleNavClick = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Layout>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ backgroundColor: 'var(--brand-cream)', borderBottom: '1px solid var(--brand-border)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="font-cormorant text-xl md:text-2xl font-semibold tracking-wide" style={{ color: 'var(--brand-dark)' }}>
            МЕД-ОБРАЗ
          </span>
          <span className="hidden md:block text-xs uppercase tracking-widest mt-0.5 opacity-50" style={{ color: 'var(--brand-dark)' }}>
            Вопрос Ребром
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LABELS.map((label, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(index)}
              className="px-3 py-1.5 text-xs uppercase tracking-widest rounded-full transition-all duration-200"
              style={{
                color: index === activeSection ? 'var(--brand-cream)' : 'var(--brand-dark)',
                backgroundColor: index === activeSection ? 'var(--brand-dark)' : 'transparent',
                opacity: index === activeSection ? 1 : 0.5,
              }}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <button
          onClick={() => handleNavClick(sections.length - 1)}
          className="text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200 hover:opacity-80"
          style={{ backgroundColor: 'var(--brand-dark)', color: 'var(--brand-cream)' }}
        >
          Участвовать
        </button>
      </header>

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-40 origin-left"
        style={{ scaleX, backgroundColor: 'var(--brand-brown)' }}
      />

      {/* Dot nav (mobile) */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-30 md:hidden flex flex-col gap-2">
        {sections.map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full transition-all duration-200"
            style={{
              backgroundColor: index === activeSection ? 'var(--brand-dark)' : 'var(--brand-border)',
              transform: index === activeSection ? 'scale(1.4)' : 'scale(1)',
            }}
            onClick={() => handleNavClick(index)}
          />
        ))}
      </nav>

      {/* Scrollable content */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory"
      >
        {sections.map((section, index) => (
          <Section
            key={section.id}
            {...section}
            isActive={index === activeSection}
          />
        ))}
      </div>
    </Layout>
  )
}
