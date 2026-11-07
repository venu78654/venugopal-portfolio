import Shell from '@/components/Shell'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Metrics from '@/components/Metrics'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Why from '@/components/Why'
import Contact, { FloatingContact } from '@/components/Contact'

export default function Home() {
  return (
    <Shell>
      <Header />
      <main id="main">
        <Hero />
        <Metrics />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Why />
        <Contact />
      </main>
      <FloatingContact />
    </Shell>
  )
}
