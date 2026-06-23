# Portfolio Website - Program Flow Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture & Tech Stack](#architecture--tech-stack)
3. [Application Flow](#application-flow)
4. [Component Structure](#component-structure)
5. [Data Flow](#data-flow)
6. [File Structure](#file-structure)
7. [Key Features](#key-features)

---

## Project Overview

This is a **React-based portfolio website** built with Vite, showcasing professional profile, skills, projects, and contact information. It features smooth animations, responsive design, and interactive Intersection Observer-based animations.

**Project Name:** portfolio  
**Type:** Single Page Application (SPA)  
**Framework:** React 19.2.6  
**Build Tool:** Vite 8.0.12  

---

## Architecture & Tech Stack

```
Frontend Architecture:
┌─────────────────────────────────────┐
│        React Application            │
│  ├─ App.jsx (Main Component)        │
│  ├─ index.css (Global Styles)       │
│  ├─ App.css (Component Styles)      │
│  └─ main.jsx (Entry Point)          │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│       HTML + CSS + JavaScript       │
│   Rendered via React DOM in #root   │
└─────────────────────────────────────┘
```

### Technologies Used:
- **React 19.2.6** - UI Framework
- **Vite 8.0.12** - Build tool & dev server
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling with animations
- **Intersection Observer API** - Scroll-based animations

### Dev Dependencies:
- ESLint - Code linting
- @vitejs/plugin-react - React support for Vite
- React & React-DOM Type definitions

---

## Application Flow

### 1. **Application Startup**

```
index.html
    ↓
Loads <div id="root"></div>
    ↓
Runs <script type="module" src="/src/main.jsx"></script>
    ↓
main.jsx
    ↓
Imports React, ReactDOM, CSS, and App component
    ↓
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
)
    ↓
App Component Mounts
```

### 2. **App Component Initialization**

```
App Component Mounts
    ↓
useRef hook creates sectionRefs array to store section references
    ↓
useEffect hook triggers on component mount
    ↓
Creates IntersectionObserver instance
    ↓
Attaches observer to all sections (7 sections total)
    ↓
Observes visibility with 0.3 threshold
```

### 3. **User Interaction Flow**

```
User Scrolls Down Page
    ↓
IntersectionObserver detects section visibility
    ↓
When section enters viewport (threshold: 0.3)
    ↓
Adds 'flip-visible' class to section
    ↓
CSS transforms trigger:
    - opacity: 0 → 1
    - rotateX: -75deg → 0deg
    - translateY: 80px → 0
    ↓
Section animates into view with flip effect
```

### 4. **Navigation Flow**

```
Sticky Navbar at top
    ↓
Contains 7 navigation links:
- Home (#home)
- About Me (#about)
- Skills (#skills)
- Experience (#experience)
- Education (#education)
- Projects (#projects)
- Contact (#contact)
    ↓
Click navigation link → Smooth scroll to section
    ↓
HTML anchor links trigger browser scroll behavior
```

---

## Component Structure

### **App.jsx** - Main Component

#### Data Objects:
1. **socialLinks** - Array of social profile links
   - GitHub
   - LinkedIn
   - LeetCode
   - Each includes href, label, and SVG icon

2. **skillList** - Array of technical skills (12 skills)
   - Core Java, C Programming, React, HTML & CSS, SQL, DBMS, etc.

3. **projectList** - Array of featured projects (3 projects)
   - Academic Performance Tracker
   - Smart Candidate Skill Evaluation System
   - Organ Donation Management System
   - Each includes title, tech stack, and description

4. **educationList** - Array of educational background (3 entries)
   - Bachelor of Engineering
   - Higher Secondary School
   - Secondary School
   - Each includes title, year, score, and institution

#### Component Sections:

```
<App>
├── <header className="navbar">
│   ├── .brand (Logo/Name)
│   └── .nav-links (Navigation Menu)
│
└── <main className="page-content">
    ├── Section 0: #home (Hero Section)
    │   ├── Name & subtitle
    │   ├── Resume link (button)
    │   └── Social links (GitHub, LinkedIn, LeetCode)
    │
    ├── Section 1: #about (Professional Intro)
    │   └── About copy (paragraph text)
    │
    ├── Section 2: #skills (Technical Skills)
    │   └── Skills grid (12 skill cards)
    │
    ├── Section 3: #experience (Work Experience)
    │   └── RW Team experience description
    │
    ├── Section 4: #education (Academic Background)
    │   └── Education cards (3 cards)
    │
    ├── Section 5: #projects (Featured Projects)
    │   └── Project cards grid (3 projects)
    │
    └── Section 6: #contact (Contact Information)
        └── Contact cards (Name, Email, Phone)
```

---

## Data Flow

### **State Management:**
- **Component State:** None (stateless in terms of useState)
- **Refs:** `sectionRefs` - Array of DOM references for Intersection Observer

### **Props Flow:**
- No prop passing between components (Single component structure)
- Data flows from hardcoded arrays → map functions → rendered UI

### **Data Rendering Pattern:**

```
Data Array (socialLinks, skillList, projectList, educationList)
    ↓
.map() function
    ↓
Transform each item into JSX element
    ↓
Render in DOM with unique key
```

**Example - Skills Grid:**
```javascript
{skillList.map((skill) => (
    <div key={skill} className="skill-card">
        {skill}
    </div>
))}
```

---

## File Structure

```
portfolio/
├── index.html                 # Entry HTML file
├── package.json              # Project metadata & dependencies
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint rules
├── README.md                 # Project documentation
├── PROGRAM_FLOW.md          # This file
├── public/                   # Static assets
│   └── favicon.svg
├── src/
│   ├── main.jsx             # React app entry point
│   ├── App.jsx              # Main App component
│   ├── index.css            # Global styles
│   ├── App.css              # Component-specific styles
│   └── assets/              # Static images
│       ├── hero.png         # Profile/hero image
│       ├── react.svg        # React logo
│       └── vite.svg         # Vite logo
└── node_modules/            # Dependencies (generated)
```

---

## Key Features

### 1. **Smooth Scrolling**
- CSS `scroll-behavior: smooth` enables smooth page scroll
- Navigation links use anchor tags for quick jumps

### 2. **Intersection Observer Animation**
- Detects when sections enter viewport
- Triggers CSS flip animation (3D rotation effect)
- Creates engaging visual experience on scroll

```javascript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('flip-visible')
        }
      })
    },
    { threshold: 0.3 }
  )
  // ... attach observer to sections
}, [])
```

### 3. **Responsive Design**
- Sticky navbar with backdrop blur
- Grid layouts for skills, projects, education
- Responsive typography and spacing

### 4. **CSS Animations**
- **Section animations:** 3D flip effect on scroll
- **Hover effects:** Scale and shadow enhancement on section hover
- **Navigation hover:** Subtle background and transform effects

### 5. **External Links**
- Resume link (Google Drive)
- Social profiles (GitHub, LinkedIn, LeetCode)
- Email and phone contact
- All open in new tabs with security (`target="_blank"`, `rel="noreferrer"`)

---

## Styling Overview

### Color Scheme:
- **Background:** Dark slate (`#111827` - rgba(17, 24, 39, 1))
- **Text:** Light slate (`#f8fafc`)
- **Accent:** Blue (`#3b82f6` - rgba(59, 130, 246, 0.18))
- **Border:** Muted blue (`#94a3b8` - rgba(148, 163, 184, 0.12))

### CSS Key Classes:
- `.portfolio-shell` - Main container
- `.navbar` - Sticky navigation
- `.section` - Main content sections with animations
- `.section.flip-visible` - Triggered animation state
- `.skill-card`, `.project-card`, `.education-card` - Data display cards

### Typography:
- **Font:** 'Inter', system-ui, sans-serif
- **Base size:** 16px
- **Line height:** 1.6

---

## Development Commands

```bash
npm run dev      # Start Vite dev server (localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

---

## Deployment

This is a static SPA that can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Build output: `dist/` directory (generated by `npm run build`)

---

## Future Enhancement Possibilities

1. Add form validation for contact section
2. Implement backend API for contact form submission
3. Add dark/light theme toggle
4. Include blog section with markdown rendering
5. Add filtering for projects by technology
6. Implement image optimization and lazy loading
7. Add SEO meta tags and Open Graph tags
8. Integrate analytics (Google Analytics)
9. Add testimonials section
10. Implement search functionality

---

## Notes

- This is a **static portfolio** - no backend required
- All data is hardcoded in the component
- For dynamic content, consider adding a CMS or backend API
- Animations are CSS-based for optimal performance
- Fully responsive and accessible design
