import { useEffect, useRef, useState } from 'react'
import './App.css'
import { DetailsForm } from './components/DetailsForm'

/* ─── DATA ─────────────────────────────────────────────────── */
const socialLinks = [
  {
    href: 'https://github.com/sukirtha2004',
    label: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/sukirtha-l-3b5233261/',
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.28 8.75H4.7V23H.28V8.75zm7.4 0h4.22v1.96h.06c.59-1.12 2.03-2.3 4.18-2.3 4.47 0 5.3 2.94 5.3 6.77V23h-4.43v-7.37c0-1.76-.03-4.02-2.45-4.02-2.45 0-2.82 1.91-2.82 3.89V23H7.68V8.75z" />
      </svg>
    ),
  },
  {
    href: 'https://leetcode.com/u/Sukirthaloganathan/',
    label: 'LeetCode',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
]

const skillList = [
  { name: 'Core Java', color: '#f97316' },
  { name: 'C Programming', color: '#a855f7' },
  { name: 'React', color: '#38bdf8' },
  { name: 'HTML & CSS', color: '#f43f5e' },
  { name: 'SQL', color: '#facc15' },
  { name: 'DBMS', color: '#34d399' },
  { name: 'Functionize AI Testing', color: '#818cf8' },
  { name: 'Software Testing', color: '#fb923c' },
  { name: 'GitHub', color: '#e2e8f0' },
  { name: 'Postman', color: '#f97316' },
  { name: 'JavaScript', color: '#fbbf24' },
  { name: 'VS Code', color: '#60a5fa' },
]

const projectList = [
  {
    title: 'Academic Performance Tracker',
    tech: 'React · SQL · MERN Stack',
    description:
      'Developed a full-stack application to calculate Course Outcome (CO) and Program Outcome (PO) attainment based on student marks. Implemented automatic mapping of scores to learning outcomes, helping faculty analyze and track student performance efficiently.',
    accent: '#3b82f6',
  },
  {
    title: 'Smart Candidate Skill Evaluation System',
    tech: 'MERN Stack',
    description:
      'An intelligent platform designed to evaluate candidate technical skills through automated assessments and performance analytics. The system analyzes coding ability, logical reasoning, and problem-solving skills to generate structured evaluation reports for recruiters.',
    accent: '#8b5cf6',
  },
  {
    title: 'Organ Donation Management System',
    tech: 'MERN Stack',
    description:
      'Developed an Organ Donation Management System to manage organ donors, recipients, and hospital coordination efficiently. The system tracks organ availability and enables organ booking based on blood group and tissue compatibility, reducing manual effort and improving emergency response.',
    accent: '#ec4899',
  },
]

const educationList = [
  {
    title: 'Bachelor of Engineering',
    year: '2022 – Present',
    score: '7.93 CGPA',
    institution: 'Bannari Amman Institute of Technology',
    icon: '🎓',
  },
  {
    title: 'Higher Secondary School',
    year: '2022',
    score: '90.17%',
    institution: 'Sri Krishna Matric Hr. Sec School',
    icon: '📚',
  },
  {
    title: 'Secondary School',
    year: '2020',
    score: '85.40%',
    institution: 'Sri Krishna Matric Hr. Sec School',
    icon: '🏫',
  },
]

/* ─── HOOK: scroll-flip observer ───────────────────────────── */
function useFlipObserver() {
  const refs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('flip-visible')
          }
        })
      },
      { threshold: 0.12 },
    )
    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const setRef = (i) => (el) => {
    refs.current[i] = el
  }
  return setRef
}

/* ─── NAVBAR ────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { label: 'About Me', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleNav = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="navbar">
      <div className="brand">
        <span className="brand-dot" />
        Sukirtha L
      </div>

      {/* Desktop nav */}
      <nav className="nav-links" aria-label="Main navigation">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={(e) => { e.preventDefault(); handleNav(l.href) }}
          >
            {l.label}
          </a>
        ))}
      </nav>

      {/* Hamburger */}
      <button
        className={`hamburger ${open ? 'open' : ''}`}
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>

      {/* Mobile drawer */}
      <nav className={`mobile-nav ${open ? 'mobile-nav--open' : ''}`} aria-label="Mobile navigation">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={(e) => { e.preventDefault(); handleNav(l.href) }}
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

/* ─── APP ───────────────────────────────────────────────────── */
export default function App() {
  const setRef = useFlipObserver()

  return (
    <div className="portfolio-shell">
      <Navbar />

      <main className="page-content">

        {/* ── HERO / HOME ── */}
        <section id="home" ref={setRef(0)} className="section hero-section">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-body">
            <span className="eyebrow">Hello, I'm</span>
            <h1 className="hero-name">Sukirtha Loganathan</h1>
            <p className="hero-role">
              Aspiring SDE &amp; QA Engineer&nbsp;|&nbsp;Java Programmer&nbsp;·&nbsp;JS&nbsp;·&nbsp;SQL&nbsp;·&nbsp;GenAI
              <br />
              AI-Powered Test Automation&nbsp;|&nbsp;Fresher
            </p>
            <p className="hero-bio">
              Turning ideas into reliable software through Java, automation, and AI-powered engineering.
            </p>

            <div className="hero-actions">
              <a
                className="btn-primary"
                href="https://drive.google.com/file/d/1AjVkBqwmTUpCLMpSQYHdGAJKs9bBBnr7/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
              <div className="social-row">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="social-btn"
                    aria-label={s.label}
                  >
                    {s.icon}
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" ref={setRef(1)} className="section about-section">
          <SectionHead eyebrow="About Me" title="Professional Introduction" />
          <div className="about-body">
            <p>
              I am an aspiring Software Developer and QA Engineer with hands-on knowledge in modern web
              development and quality automation. I enjoy building scalable, data-driven solutions in React
              and the MERN stack while applying intelligent testing practices to deliver reliable software.
            </p>
            <p>
              My focus is on creating efficient applications, mastering AI-powered test automation, and
              delivering strong software quality through practical experience and continuous learning.
            </p>
            <div className="about-social">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="about-social-btn"
                  aria-label={s.label}
                >
                  {s.icon}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" ref={setRef(2)} className="section skills-section">
          <SectionHead eyebrow="Skills" title="Technical Skillset" />
          <div className="skills-grid">
            {skillList.map((sk) => (
              <div
                key={sk.name}
                className="skill-card"
                style={{ '--accent': sk.color }}
              >
                <span className="skill-dot" style={{ background: sk.color }} />
                {sk.name}
              </div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" ref={setRef(3)} className="section experience-section">
          <SectionHead eyebrow="Experience" title="Work & Training" />
          <div className="exp-card">
            <div className="exp-header">
              <div className="exp-icon">💼</div>
              <div>
                <h3 className="exp-title">RW Team – Software Developer Trainee</h3>
                <span className="exp-tag">Technical Learning Experience</span>
              </div>
            </div>
            <p className="exp-desc">
              Worked with the RW team where I gained hands-on exposure to modern development technologies
              and backend application design. The learnings include React, Functionize AI testing tool,
              and software testing.
            </p>
            <div className="exp-tech-row">
              {['React', 'Functionize AI Testing Tool', 'Software Testing'].map((t) => (
                <span key={t} className="exp-tech-badge">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" ref={setRef(4)} className="section projects-section">
          <SectionHead eyebrow="Projects" title="Featured Work" />
          <div className="projects-grid">
            {projectList.map((p) => (
              <article
                key={p.title}
                className="project-card"
                style={{ '--accent': p.accent }}
              >
                <div className="project-accent-bar" />
                <h3 className="project-title">{p.title}</h3>
                <p className="project-tech">
                  <span className="tech-label">Technologies:</span> {p.tech}
                </p>
                <p className="project-desc">{p.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section id="education" ref={setRef(5)} className="section education-section">
          <SectionHead eyebrow="Education" title="Academic Background" />
          <div className="education-grid">
            {educationList.map((e) => (
              <div key={e.title} className="education-card">
                <div className="edu-icon">{e.icon}</div>
                <div className="edu-title">{e.title}</div>
                <div className="edu-year">{e.year}</div>
                <div className="edu-score">{e.score}</div>
                <div className="edu-venue">{e.institution}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" ref={setRef(6)} className="section contact-section">
          <SectionHead eyebrow="Contact" title="Get in Touch" />
          <div className="contact-grid">
            <ContactCard icon="👤" label="Name" value="Sukirtha Loganathan" />
            <ContactCard
              icon="✉️"
              label="Email"
              value={<a href="mailto:sukirthalogu@gmail.com">sukirthalogu@gmail.com</a>}
            />
            <ContactCard icon="📱" label="Mobile" value="+91 8508418507" />
          </div>
        </section>

        {/* ── DETAILS FORM ── */}
        <section id="details" ref={setRef(7)} className="section form-section">
          <SectionHead eyebrow="Details" title="Share Your Name, Age, and City" />
          <DetailsForm />
        </section>

      </main>

      <footer className="site-footer">
        <p>© 2025 Sukirtha Loganathan · Built with React &amp; Vite</p>
        <div className="footer-links">
          {socialLinks
            .filter((link) => link.label === 'GitHub' || link.label === 'LinkedIn')
            .map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="footer-link"
                aria-label={link.label}
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            ))}
        </div>
      </footer>
    </div>
  )
}

/* ─── SMALL COMPONENTS ──────────────────────────────────────── */
function SectionHead({ eyebrow, title }) {
  return (
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <div className="section-divider" />
    </div>
  )
}

function ContactCard({ icon, label, value }) {
  return (
    <div className="contact-card">
      <span className="contact-icon">{icon}</span>
      <span className="contact-label">{label}</span>
      <div className="contact-value">{value}</div>
    </div>
  )
}
