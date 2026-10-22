import { useEffect } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Features, Marquee } from './components/Features'
import { EffectsGallery } from './components/EffectsGallery'
import { ArchDiagram } from './components/ArchDiagram'
import { Demos } from './components/Demos'
import { Constellation } from './components/Constellation'
import { Install } from './components/Install'
import { UpdateBanner } from './components/UpdateBanner'
import { Footer } from './components/Footer'
import { useUpdate } from './lib/useUpdate'
import { useTheme } from './lib/theme'

/** Adds .visible to .reveal elements as they scroll into view. */
function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll('.reveal')]
    const reveal = (el: Element) => el.classList.add('visible')

    const io =
      'IntersectionObserver' in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  reveal(entry.target)
                  io?.unobserve(entry.target)
                }
              }
            },
            { threshold: 0.12 },
          )
        : null
    if (io) for (const el of els) io.observe(el)

    // Fallback: IntersectionObserver never fires on hidden pages
    // (background tabs, headless screenshots) — reveal in-viewport elements.
    const timer = window.setTimeout(() => {
      for (const el of els) {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0) reveal(el)
      }
    }, 1200)

    return () => {
      io?.disconnect()
      window.clearTimeout(timer)
    }
  }, [])
}

export default function App() {
  const { status, remote, swReady, applyUpdate } = useUpdate()
  const { theme, toggle } = useTheme()
  useReveal()

  const available = status === 'available' || swReady

  return (
    <>
      <UpdateBanner available={available} swReady={swReady} remote={remote} onApply={applyUpdate} />
      <Nav theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <EffectsGallery />
        <ArchDiagram />
        <Demos />
        <Constellation />
        <Install />
      </main>
      <Footer />
    </>
  )
}
