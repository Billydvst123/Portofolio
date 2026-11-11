# Billy's Personal Portfolio — Web Developer Intern

A modern, high-performance personal portfolio website built with pure semantic **HTML5**, **Vanilla CSS**, and **Vanilla JavaScript** (no external frameworks, no build tools, zero dependencies except Google Fonts).

Tailored to convince tech recruiters and engineering leads within 30–60 seconds for a **Web Developer Internship**.

---

## 🎨 Design System & Visual Inspiration
- **Visual Reference**: Based on the dark, modern tech aesthetic from the reference layout, featuring a dark pitch backdrop, organic gradient blob cutout, geometric decor accents (`+`, circles), and dedicated social icon strips.
- **Brand Palette**:
  - Deep Black: `#000000` / `#070709`
  - Crimson Maroon: `#830000`
  - Vibrant Primary Red: `#BC0202`
  - Bright Accent Red: `#FF0000`
- **Typography**: Google Fonts [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for sleek, geometric legibility.
- **Theme Modes**: Full **Dark Mode** (default) and **Light Mode** support with smooth color transitions, `localStorage` persistence, and automatic `prefers-color-scheme` detection.

---

## 📁 Project Structure

```text
Porto/
├── index.html               # Semantic HTML5 markup (SEO & OpenGraph ready)
├── css/
│   └── style.css            # Modular CSS tokens, mobile-first responsive layout
├── js/
│   ├── data.js              # Centralized data store (Projects, Skills, Experience, Blog)
│   └── main.js              # Theme switcher, dynamic renderers, mobile menu, scroll spy
├── assets/
│   ├── images/
│   │   ├── billy-portrait.jpg     # Professional portrait asset
│   │   ├── project-printink.svg   # PrintInk Araya preview mockup
│   │   ├── project-fitnessvals.svg# FitnessVals AI preview mockup
│   │   ├── project-campusspace.svg# CampusSpace Hub preview mockup
│   │   └── favicon.svg            # Custom SVG favicon
│   └── cv-billy.pdf         # Resume / CV download placeholder
└── README.md                # Documentation & deployment guide
```

---

## 🚀 How to Run Locally

Because this project is built entirely on native web standards:

1. **Direct File Open**:
   Double click `index.html` or open it with any web browser (Chrome, Edge, Firefox, Safari).

2. **Using Python Local Server** (Optional):
   ```bash
   python -m http.server 3000
   ```
   Then visit `http://localhost:3000` in your browser.

3. **Using VS Code Live Server**:
   Right-click `index.html` -> click **"Open with Live Server"**.

---

## ✏️ How to Customize Your Data (`js/data.js`)

All content on the website is decoupled and cleanly maintained inside `js/data.js`:

- **Personal Info & Contact**:
  Modify `portfolioData.personal` (Name, tagline, pitch, bio paragraphs, email, LinkedIn, GitHub).
- **Projects**:
  Add, remove, or edit entries in `portfolioData.projects`. Each card supports:
  - `title`, `description`, `role`, `category`, `stack` (array of tags), `demoUrl`, `githubUrl`, and `image`.
- **Skills**:
  Update `portfolioData.skills` categories (`Languages`, `Frontend Development`, `Backend & APIs`, `Database`, `Developer Tools`, `UI/UX & Methodology`). No percentage bars are used, keeping it honest and professional.
- **Experience & Milestones**:
  Update `portfolioData.experience` for organizations, hackathons, or academic research.
- **Learning Notes / Blog**:
  Add or edit articles in `portfolioData.articles`.

---

## 🌐 Deploying to GitHub Pages

Deploying takes less than 2 minutes:

1. Initialize a git repository and commit all files:
   ```bash
   git init
   git add .
   git commit -m "feat: initial release of personal portfolio"
   ```
2. Create a new repository on [GitHub](https://github.com/new) named `portfolio` or `username.github.io`.
3. Push your repository:
   ```bash
   git remote add origin https://github.com/your-username/portfolio.git
   git branch -M main
   git push -u origin main
   ```
4. In your GitHub repository:
   - Go to **Settings** -> **Pages**.
   - Under **Build and deployment** -> **Branch**, select `main` and root `/`.
   - Click **Save**. Your site will be live within seconds at `https://your-username.github.io/portfolio/`.

---

## ♿ Accessibility & Performance Compliance
- **WCAG AA Contrast**: Tested text and button contrast across both light and dark themes.
- **Keyboard Navigation**: Full tab index flow with visible red `:focus-visible` focus rings.
- **Reduced Motion**: Respects users with `prefers-reduced-motion: reduce` by disabling non-essential transitions and animations.
- **Zero Framework Bloat**: Extremely fast initial paint (FCP), zero JS bundle overhead, lazy-loaded images with explicit dimensions to avoid Layout Shift (CLS).
