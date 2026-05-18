import { useEffect, useRef } from 'react'
import './App.css'

const socialLinks = [
  {
    href: 'https://github.com/sukirtha2004',
    label: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0.5C5.4 0.5 0 5.9 0 12.5C0 17.8 3.4 22.2 8.2 23.8C8.9 23.9 9.1 23.5 9.1 23.2C9.1 22.9 9.1 22.1 9.1 21.1C5.8 21.8 5.1 19.5 5.1 19.5C4.6 18.1 3.8 17.7 3.8 17.7C2.6 16.9 3.9 16.9 3.9 16.9C5.3 17 6.1 18.2 6.1 18.2C7.3 20.1 9.4 19.6 10.2 19.3C10.3 18.5 10.7 17.9 11.1 17.6C8 17.3 4.8 16.3 4.8 11.5C4.8 10.2 5.3 9.2 6.1 8.4C6 8.1 5.6 7 6.2 5.3C6.2 5.3 7.2 5 9.1 6.1C10 5.8 11 5.7 12 5.7C13 5.7 14 5.8 14.9 6.1C16.8 5 17.8 5.3 17.8 5.3C18.4 7 18 8.1 17.9 8.4C18.7 9.2 19.2 10.2 19.2 11.5C19.2 16.4 15 17.3 11.8 17.6C12.3 18 12.7 18.8 12.7 20.1C12.7 21.8 12.7 22.9 12.7 23.2C12.7 23.5 12.9 23.9 13.6 23.8C18.4 22.2 21.8 17.8 21.8 12.5C21.8 5.9 16.4 0.5 9.8 0.5H12Z" />
      </svg>
    ),
  },
  {
    href: 'https://www.linkedin.com/in/sukirtha-l-3b5233261/',
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.6 4.08 5.5 2.98 5.5C1.88 5.5 1 4.6 1 3.5C1 2.4 1.88 1.5 2.98 1.5C4.08 1.5 4.98 2.4 4.98 3.5ZM.5 8.75H5.5V23H.5V8.75ZM8.5 8.75H13.1V10.3H13.2C13.9 9.1 15.5 7.9 17.7 7.9C22.6 7.9 23 10.9 23 15.2V23H18V15.9C18 13.7 17.9 11 15 11C12.1 11 11.6 13.3 11.6 15.8V23H6.6V8.75H8.5Z" />
      </svg>
    ),
  },
  {
    href: 'https://leetcode.com/u/Sukirthaloganathan/',
    label: 'LeetCode',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 2H2v20h20V2Zm-9.1 5.8l-1.5 1.4 3.7 3.7c-.1.1-.2.1-.2.2a1.8 1.8 0 0 1-1.8.5l-4.4-1a1.7 1.7 0 0 1-1.2-1.1l-1.1-3.6-2 .7 1.2 3.9a4 4 0 0 0 2.8 2.5l4.4 1c1.6.4 3.2-.4 3.9-1.7l3.1-3.1 1.4 1.4V7.4l-6.7 6.7-2.5-2.5 1.5-1.4L16.9 7.8h-4Z" />
      </svg>
    ),
  },
]

const skillList = [
  'Core Java',
  'C Programming',
  'React',
  'HTML & CSS',
  'SQL',
  'DBMS',
  'Functionize AI Testing Tool',
  'Software Testing',
  'GitHub',
  'Postman',
  'JavaScript',
  'VS Code',
]

const projectList = [
  {
    title: 'Academic Performance Tracker',
    tech: 'React · SQL · MERN Stack',
    description:
      'Developed a full-stack application to calculate Course Outcome (CO) and Program Outcome (PO) attainment based on student marks. Implemented automatic mapping of scores to learning outcomes, helping faculty analyze and track student performance efficiently.',
  },
  {
    title: 'Smart Candidate Skill Evaluation System',
    tech: 'MERN Stack',
    description:
      'An intelligent platform designed to evaluate candidate technical skills through automated assessments and performance analytics. The system analyzes coding ability, logical reasoning, and problem-solving skills to generate structured evaluation reports for recruiters.',
  },
  {
    title: 'Organ Donation Management System',
    tech: 'MERN Stack',
    description:
      'Developed an Organ Donation Management System to manage organ donors, recipients, and hospital coordination efficiently. The system tracks organ availability and enables organ booking based on blood group and tissue compatibility, reducing manual effort and improving emergency response.',
  },
]

const educationList = [
  {
    title: 'Bachelor of Engineering',
    year: '2022 – 2026',
    score: '7.93 CGPA',
    institution: 'Bannari Amman Institute of Technology',
  },
  {
    title: 'Higher Secondary School',
    year: '2022',
    score: '90.17%',
    institution: 'Sri Krishna Matric Hr. Sec School',
  },
  {
    title: 'Secondary School',
    year: '2020',
    score: '85.40%',
    institution: 'Sri Krishna Matric Hr. Sec School',
  },
]

function App() {
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('flip-visible')
          }
        })
      },
      { threshold: 0.3 },
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const setRef = (index) => (element) => {
    sectionRefs.current[index] = element
  }

  return (
    <div className="portfolio-shell">
      <header className="navbar">
        <div className="brand">Sukirtha L</div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Me</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="page-content">
        <section id="home" ref={setRef(0)} className="section home-section">
          <div className="section-head">
            <span className="eyebrow">Hello, I'm</span>
            <h1>Sukirtha Loganathan</h1>
            <p className="subtitle">
Turning ideas into reliable software through Java, automation, and AI-powered engineering.            </p>
          </div>

          <div className="home-actions">
            <a
              className="primary-button"
              href="https://drive.google.com/file/d/1AjVkBqwmTUpCLMpSQYHdGAJKs9bBBnr7/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              View Resume
            </a>
            <div className="home-social-row">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-button"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" ref={setRef(1)} className="section about-section">
          <div className="section-head">
            <span className="eyebrow">About Me</span>
            <h2>Professional Introduction</h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                I am an aspiring Software Developer and QA Engineer with hands-on knowledge in modern web
                development and quality automation. I enjoy building scalable, data-driven solutions in React
                and the MERN stack while applying intelligent testing practices to deliver reliable software.
              </p>
              <p>
                My focus is on creating efficient applications, mastering AI-powered test automation, and
                delivering strong software quality through practical experience and continuous learning.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" ref={setRef(2)} className="section skills-section">
          <div className="section-head">
            <span className="eyebrow">Skills</span>
            <h2>Technical Skillset</h2>
          </div>
          <div className="skills-grid">
            {skillList.map((skill) => (
              <div key={skill} className="skill-card">
                {skill}
              </div>
            ))}
          </div>
        </section>

        <section id="experience" ref={setRef(3)} className="section experience-section">
          <div className="section-head">
            <span className="eyebrow">Experience</span>
            <h2>RW Team – Software Developer Trainee</h2>
          </div>
          <div className="experience-copy">
            <p>
              Technical Learning Experience: Worked with the RW team, where I gained hands-on exposure to modern
              development technologies and backend application design. The learnings included React, Functionize AI
              testing tool, and software testing.
            </p>
          </div>
        </section>

        <section id="education" ref={setRef(4)} className="section education-section">
          <div className="section-head">
            <span className="eyebrow">Education</span>
            <h2>Academic Background</h2>
          </div>
          <div className="education-row">
            {educationList.map((item) => (
              <div key={item.title} className="education-card">
                <div className="education-title">{item.title}</div>
                <div className="education-year">{item.year}</div>
                <div className="education-score">{item.score}</div>
                <div className="education-venue">{item.institution}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" ref={setRef(5)} className="section projects-section">
          <div className="section-head">
            <span className="eyebrow">Projects</span>
            <h2>Featured Work</h2>
          </div>
          <div className="projects-grid">
            {projectList.map((project) => (
              <article key={project.title} className="project-card">
                <h3>{project.title}</h3>
                <p className="project-tech">Technologies: {project.tech}</p>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" ref={setRef(6)} className="section contact-section">
          <div className="section-head">
            <span className="eyebrow">Contact</span>
            <h2>Get in Touch</h2>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <span>Name</span>
              <strong>Sukirtha Loganathan</strong>
            </div>
            <div className="contact-card">
              <span>Email</span>
              <a href="mailto:sukirthalogu@gmail.com">sukirthalogu@gmail.com</a>
            </div>
            <div className="contact-card">
              <span>Mobile</span>
              <strong>+91 8508418507</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
